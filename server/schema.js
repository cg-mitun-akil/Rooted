const { getConnection } = require("./databaseConfig");

const userSchema = `
CREATE TABLE IF NOT EXISTS User(
	userid INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	username VARCHAR(50) NOT NULL, 
	firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL, 
	email VARCHAR(50) NOT NULL, 
	passwordHash VARCHAR(255) NOT NULL, 
	dateCreated DATE NOT NULL
);
`
const eventSchema = `
CREATE TABLE IF NOT EXISTS Event(
	eventid INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	userCreated INT NOT NULL, 
	title VARCHAR(50) NOT NULL,
	eventType VARCHAR(50) NOT NULL,
	nativeLocation VARCHAR(50),
	nativeLanguage VARCHAR(50),
	description VARCHAR(1023), 
	verified BOOLEAN NOT NULL,
	contactNumber INT NOT NULL,
	contactCountryCode INT,
	contactEmail VARCHAR(50) NOT NULL,
  FOREIGN KEY (userCreated) REFERENCES User(userid)
);
`
const reviewSchema = `
CREATE TABLE IF NOT EXISTS Review(
	userid INT NOT NULL, 
	eventid INT NOT NULL,  
	stars INT NOT NULL, 
	comment VARCHAR(1023),
  PRIMARY KEY (userid, eventid),
  FOREIGN KEY (userid) REFERENCES User(userid),
  FOREIGN KEY (eventid) REFERENCES Event(eventid)
);
`
const pictureSchema = `
CREATE TABLE IF NOT EXISTS Picture(
	eventid INT NOT NULL, 
	url VARCHAR(255) NOT NULL,
  PRIMARY KEY (eventid, url),
  FOREIGN KEY (eventid) REFERENCES Event(eventid)
);
`
const videoSchema = `
CREATE TABLE IF NOT EXISTS Video(
	eventid INT NOT NULL, 
	url VARCHAR(255) NOT NULL,
  PRIMARY KEY (eventid, url),
  FOREIGN KEY (eventid) REFERENCES Event(eventid)
);
`

const createTables = () => {
  getConnection().query(userSchema, (err, result) => {
    if (err) throw err;
    console.log("User Schema Created or Already Exists");
  });
  getConnection().query(eventSchema, (err, result) => {
    if (err) throw err;
    console.log("Event Schema Created or Already Exists");
  });
  getConnection().query(reviewSchema, (err, result) => {
    if (err) throw err;
    console.log("Review Schema Created or Already Exists");
  });
  getConnection().query(pictureSchema, (err, result) => {
    if (err) throw err;
    console.log("Picture Schema Created or Already Exists");
  });
  getConnection().query(videoSchema, (err, result) => {
    if (err) throw err;
    console.log("Video Schema Created or Already Exists");
  });
}

module.exports = {createTables};