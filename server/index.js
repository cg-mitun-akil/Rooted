const http = require("http");
require('dotenv').config();
const app = require("./app.js");
const {connectToDatabase} = require('./databaseConfig');
const {createTables} = require('./schema.js');
const {createTriggers} = require('./trigger.js');

const server = http.createServer(app);
connectToDatabase();
createTables();
createTriggers();

const PORT = process.env.PORT || 8080;


server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`)
})