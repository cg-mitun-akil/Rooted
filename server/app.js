const express = require("express");
require("express-async-errors");

const app = express();

app.get("/api/v1/ping", (_req, res) => {
  res.send("pong");
});

module.exports = app;