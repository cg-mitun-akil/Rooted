const dotenv = require('dotenv');
dotenv.config();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const { getConnection } = require("../databaseConfig");

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" });
  next();
};

const getTokenFrom = request => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
}

const tokenAuthenticator = async (request, response, next) => {
  console.log('tolken authentication');
  const token = getTokenFrom(request);
  if(token === null)
    return next();
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.username) {
    return next();
  }
  const userSelectSql = `SELECT * FROM User WHERE username = ${mysql.escape(decodedToken.username)};`
  getConnection().query(userSelectSql, async(err, result) => {
    if (err) throw err;
    const users = result;
    let user;
    if(users !== undefined && users.length > 0)
    {
      user = users[0];
    }
    else
    {
      return response.status(404).json({ error: 'user not found' })
    }
    request.user = user;
    request.isAuthenticated = true;
    console.log(request.isAuthenticated);
    next();
  });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id idk" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error);
};

module.exports = {unknownEndpoint, tokenAuthenticator, errorHandler};