const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const { getConnection } = require('../databaseConfig');
const bcrypt = require('bcrypt');

const userRouter = express.Router();
const saltRounds = 10;

userRouter.post("/signin", async (req, res) => {
  const credentials = req.body.credentials;
  if (!credentials) {
    return res.status(400).json({ error: "credentials not found" });
  }
  const username = credentials.username;
  if (!username) {
    return res.status(400).json({ error: "username not found" });
  }
  //FIND A USER FROM THE DATABASE
  const userSelectSql = `SELECT * FROM User WHERE username = ${mysql.escape(credentials.username)};`
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
      const username = credentials.username;
      const email = credentials.email;
      const password = credentials.password;
      const firstname = credentials.firstname;
      const lastname = credentials.lastname;
      const dateCreated = new Date(Date.now());
      const passwordHash = await bcrypt.hash(password, saltRounds);
      if(!username || !email || !firstname || !lastname || !password)
      {
        return res.status(400).json({ error: "username incorrect" });
      }
      user = {username, email, passwordHash};
      
      //ADD USER TO THE DATABASE
      const userInputSql = `INSERT INTO User (username, firstname, lastname, email, passwordHash, dateCreated)
        VALUES (${mysql.escape(username)}, ${mysql.escape(firstname)}, ${mysql.escape(lastname)}, 
        ${mysql.escape(email)}, ${mysql.escape(passwordHash)}, ${mysql.escape(dateCreated)});`;
      getConnection().query(userInputSql, function (err, result) {
        if (err) throw err;
        console.log("1 user inserted");
      });
    }
    if (user.passwordHash === null) {
      return res.status(403).json({ error: "password not allocated" });
    }
    const passwordCorrect = await bcrypt.compare(
      (credentials.password), user.passwordHash
    );
    if (!passwordCorrect) {
      return res.status(403).json({ error: "wrong password" });
    }
    const userForToken = {
      name: user.username,
      email: user.email
    };
    const loginToken = jwt.sign(userForToken, process.env.SECRET);
    res
      .status(200)
      .json({user: userForToken, token: loginToken});
    });
});

module.exports = userRouter;