const express = require("express");
const db = require("./config/database");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/orders", require("./routes/order"));
app.use("/users", require("./routes/user"));
app.use("/style", require("./routes/style"));
app.use("/uploads", express.static("uploads"));

db.authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log("Connected & Running on " + port);
    });
  })
  .catch((err) => {
    throw err;
  });
