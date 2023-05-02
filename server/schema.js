const { getConnection } = require("./databaseConfig");

const userSchema = `
CREATE TABLE IF NOT EXISTS User(
	username VARCHAR(50) PRIMARY KEY NOT NULL, 
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
	userCreated VARCHAR(50) NOT NULL, 
	title VARCHAR(50) NOT NULL,
	eventType VARCHAR(50) NOT NULL,
	nativeLocation VARCHAR(50),
	nativeLanguage VARCHAR(50),
	description VARCHAR(1023),
	contactNumber VARCHAR(15) NOT NULL,
	contactCountryCode INT,
	contactEmail VARCHAR(50) NOT NULL,
  rating DECIMAL(4,2),
  FOREIGN KEY (userCreated) REFERENCES User(username)
);
`
const reviewSchema = `
CREATE TABLE IF NOT EXISTS Review(
	username VARCHAR(50) NOT NULL, 
	eventid INT NOT NULL,  
	stars INT NOT NULL, 
	comment VARCHAR(1023),
  PRIMARY KEY (username, eventid),
  FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE,
  FOREIGN KEY (eventid) REFERENCES Event(eventid) ON DELETE CASCADE
);
`
const pictureSchema = `
CREATE TABLE IF NOT EXISTS Picture(
	eventid INT NOT NULL, 
	url VARCHAR(255) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  PRIMARY KEY (eventid, url),
  FOREIGN KEY (eventid) REFERENCES Event(eventid) ON DELETE CASCADE
);
`
const videoSchema = `
CREATE TABLE IF NOT EXISTS Video(
	eventid INT NOT NULL, 
	url VARCHAR(255) NOT NULL,
  PRIMARY KEY (eventid, url),
  FOREIGN KEY (eventid) REFERENCES Event(eventid) ON DELETE CASCADE
);
`
const bookingSchema = `
CREATE TABLE IF NOT EXISTS Booking(
	eventid INT NOT NULL, 
  dateBooked DATE NOT NULL,
  PRIMARY KEY (eventid, dateBooked),
  FOREIGN KEY (eventid) REFERENCES Event(eventid) ON DELETE CASCADE
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
  getConnection().query(bookingSchema, (err, result) => {
    if (err) throw err;
    console.log("Booking Schema Created or Already Exists");
  });
}

module.exports = {createTables};

/*
DROP TABLE Booking;
DROP TABLE Picture;
DROP TABLE Video;
DROP TABLE Review;
DROP TABLE Event;
DROP TABLE User;
*/