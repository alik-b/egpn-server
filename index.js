const express = require("express");
const app = express();
const pool = require("./sql_conn.js");
const cors = require("cors");

app.use(cors());

app.use("/callofduty", require("./routes/callofduty.js"));

app.use("/apexlegends", require("./routes/apexlegends.js"));

app.use("/leagueoflegends", require("./routes/leagueoflegends.js"));

app.use("/rocketleague", require("./routes/rocketleague.js"));

app.use("/siege", require("./routes/siege.js"));

app.use("/valorant", require("./routes/valorant.js"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
