const express = require("express");
require("express-async-errors");
const cors = require("cors");

const userRouter = require("./controller/user");

const app = express();

app.use(cors())
app.use(express.json());

app.get("/api/v1/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/v1/user", userRouter);

module.exports = app;