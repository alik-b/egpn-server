const express = require("express");
const app = express();
const pool = require("./sql_conn.js");
// const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "password",
//   database: "egpn",
// });

// endpoint to get all players from the Players table
app.get("/getplayers", (req, res) => {
  const query = "SELECT * FROM Players";

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

  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log("error: " + err);
  //     res.send(err);
  //     return;
  //   }
  //   console.log("success");
  //   res.send(result);
  // });
});

// endpoint to get all players from the Call of Duty table
app.get("/callofduty", (req, res) => {
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

  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log("error: " + err);
  //     res.send(err);
  //     return;
  //   }
  //   console.log("success");
  //   res.send(result);
  // });
});

// endpoint to get all players from the Apex table
app.get("/apexlegends", (req, res) => {
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

  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log("error: " + err);
  //     res.send(err);
  //     return;
  //   }
  //   console.log("success");
  //   res.send(result);
  // });
});

// endpoint to get all players from the League of Legends table
app.get("/leagueoflegends", (req, res) => {
  const query = "SELECT * FROM League_Of_Legends";

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

  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log("error: " + err);
  //     res.send(err);
  //     return;
  //   }
  //   console.log("success");
  //   res.send(result);
  // });
});

// endpoint to get all players from the Rocket League table
app.get("/rocketleague", (req, res) => {
  const query = "SELECT * FROM Rocket_League";

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

  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log("error: " + err);
  //     res.send(err);
  //     return;
  //   }
  //   console.log("success");
  //   res.send(result);
  // });
});

// endpoint to get all players from the Siege table
app.get("/siege", (req, res) => {
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

  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log("error: " + err);
  //     res.send(err);
  //     return;
  //   }
  //   console.log("success");
  //   res.send(result);
  // });
});

// endpoint to get all players from the Valorant table
app.get("/valorant", (req, res) => {
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

  // db.query(query, (err, result) => {
  //   if (err) {
  //     console.log("error: " + err);
  //     res.send(err);
  //     return;
  //   }
  //   console.log("success");
  //   res.send(result);
  // });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
