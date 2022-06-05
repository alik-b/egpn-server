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

// endpoint to get all players from the Call of Duty table that have a
// higher kd than the tag
app.get(
  "/callofduty/:tag",
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
// as of 6/4/22 changes
app.get(
  "/apexlegends/:team",
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
    const query = "SELECT * FROM Apex_Playoff_Players WHERE UPPER(team) LIKE UPPER($1)";
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
  },

// endpoint to get all players from the League of Legends table
app.get("/leagueoflegends", (req, res) => {
  const query =
    "SELECT tag, team, wins, losses, total_kills, total_deaths, \
  total_assists FROM League_Of_Legends NATURAL JOIN Players";

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
}));

// endpoint to get all players from the League of Legends table
app.get("/leagueoflegends/:avgtype", (req, res) => {
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
// endpoint to find the max per stat for each team
app.get("/rocketleague/:max", (req, res) => {
  const column = req.params.max;
  const query = `SELECT team, MAX(${column}) FROM rocket_league NATURAL JOIN Players GROUP BY team`;

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
// endpoint to find the max per stat for each team
app.get("/siege/:max", (req, res) => {
  const column = req.params.max;
  const query = `SELECT team, MAX(${column}) FROM Siege NATURAL JOIN Players GROUP BY team`;

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

    // order table by stat
    app.get("/valorant/:orderBy", (req, res) => {
      const column = req.params.orderBy;
    
      const query = 'SELECT * FROM VALORANT ORDER BY $1 desc';
      //console;
    
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
