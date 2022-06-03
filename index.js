const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "egpn",
});

// endpoint to get all players from the Players table
app.get("/getplayers", (req, res) => {
  const query = "SELECT * FROM Players";

  db.query(query, (err, result) => {
    if (err) {
      console.log("error: " + err);
      res.send(err);
      return;
    }
    console.log("success");
    res.send(result);
  });
});

// endpoint to get all players from the Call of Duty table
app.get("/callofduty", (req, res) => {
  const query = "SELECT * FROM Call_Of_Duty";

  db.query(query, (err, result) => {
    if (err) {
      console.log("error: " + err);
      res.send(err);
      return;
    }
    console.log("success");
    res.send(result);
  });
});

// endpoint to get all players from the Apex table
app.get("/apexlegends", (req, res) => {
  const query = "SELECT * FROM Apex_Playoff_Players";

  db.query(query, (err, result) => {
    if (err) {
      console.log("error: " + err);
      res.send(err);
      return;
    }
    console.log("success");
    res.send(result);
  });
});

// endpoint to get all players from the League of Legends table
app.get("/leagueoflegends", (req, res) => {
  const query = "SELECT * FROM League_Of_Legends";

  db.query(query, (err, result) => {
    if (err) {
      console.log("error: " + err);
      res.send(err);
      return;
    }
    console.log("success");
    res.send(result);
  });
});

// endpoint to get all players from the Rocket League table
app.get("/rocketleague", (req, res) => {
  const query = "SELECT * FROM Rocket_League";

  db.query(query, (err, result) => {
    if (err) {
      console.log("error: " + err);
      res.send(err);
      return;
    }
    console.log("success");
    res.send(result);
  });
});

// endpoint to get all players from the Siege table
app.get("/siege", (req, res) => {
  const query = "SELECT * FROM Siege";

  db.query(query, (err, result) => {
    if (err) {
      console.log("error: " + err);
      res.send(err);
      return;
    }
    console.log("success");
    res.send(result);
  });
});

// endpoint to get all players from the Valorant table
app.get("/valorant", (req, res) => {
  const query = "SELECT * FROM Valorant";

  db.query(query, (err, result) => {
    if (err) {
      console.log("error: " + err);
      res.send(err);
      return;
    }
    console.log("success");
    res.send(result);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
