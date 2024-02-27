const express = require("express");
const db = require("./config/database");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/orders", require("./routes/order"));

db.authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log("Connected & Running on " + port);
    });
  })
  .catch((err) => {
    throw err;
  });
