const express = require("express");
require("express-async-errors");
const cors = require("cors");

const {
  tokenAuthenticator,
  unknownEndpoint,
  errorHandler,
} = require("./utils/middleware.js");
const userRouter = require("./controller/user");
const eventRouter = require("./controller/event");
const reviewRouter = require("./controller/review");
const bookingRouter = require("./controller/booking");

const app = express();

app.use(cors())
app.use(express.json());

app.get("/api/v1/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/v1/user", tokenAuthenticator, userRouter);
app.use("/api/v1/event", tokenAuthenticator, eventRouter);
app.use("/api/v1/review", tokenAuthenticator, reviewRouter);
app.use("/api/v1/booking", tokenAuthenticator, bookingRouter);

app.use("/api/v1", unknownEndpoint);
app.use("/api/v1", errorHandler);

module.exports = app;