const express = require("express");
const pool = require("../sql_conn.js");
const router = express.Router();

// endpoint to get all players from the Apex Legends table
router.get("/", (req, res) => {
  const query = "SELECT * FROM Apex_Playoff_Players";

  pool
    .query(query)
    .then((result) => {
      console.log("success");
      res.send({
        success: true,
        result: result,
      });
    })
    .catch((err) => {
      console.log("error: " + err);
      res.status(400).send({
        message: "SQL ERROR",
        error: err,
      });
      return;
    });
});

// endpint to get teams with higher kills with the team that is passed in
router.get(
  "/:team",
  (req, res, next) => {
    const team = req.params.team;

    if (!team) {
      res.status(400).send({
        message: "Missing required information.",
      });
      return;
    }

    console.log("passed check team");

    // check to see that team exists inside apex_playoff_players
    const query =
      "SELECT * FROM Apex_Playoff_Players WHERE UPPER(team) LIKE UPPER($1)";
    const values = [team];

    pool
      .query(query, values)
      .then((result) => {
        if (result.rowCount == 0) {
          res.status(404).send({
            message: "Team not found",
          });
          return;
        }

        next();
      })
      .catch((err) => {
        console.log("error: " + err);
        res.status(400).send({
          message: "SQL ERROR on checking if team exists.",
          error: err,
        });
        return;
      });
  },

  (req, res) => {
    console.log("passed check team exists in db");
    // Get the team with higher kills than input Team
    const query = `SELECT team, SUM(player_kills) AS team_kills
                    FROM Apex_Playoff_Players
                    GROUP BY team
                    HAVING SUM(player_kills) > ANY (SELECT SUM(player_kills)
                                                    FROM Apex_Playoff_Players
                                                    GROUP BY team
                                                    HAVING UPPER(team) = UPPER($1))`;

    const values = [req.params.team];

    pool
      .query(query, values)
      .then((result) => {
        res.send({
          success: true,
          result: result.rows,
        });
      })
      .catch((err) => {
        console.log("error: " + err);
        res.status(400).send({
          message: "SQL ERROR on getting teams who have a higher kd than team",
          error: err,
        });
        return;
      });
  }
);

module.exports = router;
