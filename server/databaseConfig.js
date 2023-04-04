require('dotenv').config();
const mysql = require("mysql");

var connection;

const connectToDatabase = () => {
  connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DATABASE,
    port: process.env.SQL_PORT
  });
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
}

const getConnection = () => connection;

module.exports = {connectToDatabase, getConnection};