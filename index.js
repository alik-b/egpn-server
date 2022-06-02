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

app.get("/getplayers", (req, res) => {
  // const tag = req.query.tag;

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
