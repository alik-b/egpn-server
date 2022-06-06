const express = require("express");
const pool = require("../sql_conn.js");
const router = express.Router();

// endpoint to get all players from the Valorant table
router.get("/", (req, res) => {
  const query = "SELECT * FROM Valorant";

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

  // order table by stat
  router.get("/:orderByStat", (req, res) => {
    const column = req.params.orderByStat;
    const query = `SELECT * FROM Valorant ORDER BY ${column} desc`;
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
});

module.exports = router;
