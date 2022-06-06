const express = require("express");
const pool = require("../sql_conn.js");
const router = express.Router();

// endpoint to get all players from the League of Legends table
router.get("/", (req, res) => {
  const query =
    "SELECT tag, team, wins, losses, total_kills, total_deaths, \
    total_assists FROM League_Of_Legends NATURAL JOIN Players ORDER BY team";

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

// endpoint to get avg stat of each team and ordered from highest to lowest
router.get("/:avgtype", (req, res) => {
  const column = req.params.avgtype;

  const query = `SELECT team, ROUND(AVG(${column}), 2) AS avg \
    FROM League_Of_Legends NATURAL JOIN Players GROUP BY team ORDER BY avg DESC`;
  console;

  pool
    .query(query)
    .then((result) => {
      console.log("success");
      res.send({
        success: true,
        result: result.rows,
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

module.exports = router;
