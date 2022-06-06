const express = require("express");
const pool = require("../sql_conn.js");
const router = express.Router();

// endpoint to get all players from the Siege table
router.get("/", (req, res) => {
  const query = "SELECT * FROM Siege";

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

// endpoint to find the max per stat for each team
router.get("/:max", (req, res) => {
  const column = req.params.max;
  const query = `SELECT team, MAX(${column}) AS max FROM Siege NATURAL JOIN Players GROUP BY team ORDER BY max DESC`;

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
