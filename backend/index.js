const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo(); //
const app = express();
const port = 8000;
app.use(cors());
// To use reqest body data.

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
