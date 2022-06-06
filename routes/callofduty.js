const express = require("express");
const pool = require("../sql_conn.js");
const router = express.Router();

// endpoint to get all players from the Call of Duty table
router.get("/", (req, res) => {
  const query = "SELECT * FROM Call_Of_Duty";

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

// endpoint to get all players from the Call of Duty table that have a
// higher kd than the tag
router.get(
  "/:tag",
  (req, res, next) => {
    const tag = req.params.tag;

    if (!tag) {
      res.status(400).send({
        message: "Missing required information.",
      });
      return;
    }

    console.log("passed check tag");

    // check to see that tag exists inside call of duty player
    const query = "SELECT * FROM Call_Of_Duty WHERE UPPER(tag) LIKE UPPER($1)";
    const values = [tag];

    pool
      .query(query, values)
      .then((result) => {
        if (result.rowCount == 0) {
          res.status(404).send({
            message: "Tag not found",
          });
          return;
        }

        next();
      })
      .catch((err) => {
        console.log("error: " + err);
        res.status(400).send({
          message: "SQL ERROR on checking if tag exists.",
          error: err,
        });
        return;
      });
  },
  (req, res) => {
    console.log("passed check tag exists in db");
    // Get the players who have a higher KD than the tag
    const query = `SELECT * FROM Call_Of_Duty WHERE
                     kd > (SELECT kd FROM Call_Of_Duty WHERE UPPER(tag) LIKE UPPER($1))`;

    const values = [req.params.tag];

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
          message: "SQL ERROR on getting players who have a higher kd than tag",
          error: err,
        });
        return;
      });
  }
);

module.exports = router;
