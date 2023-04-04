const { getConnection } = require("./databaseConfig");

const userSchema = `
CREATE TABLE IF NOT EXISTS User(
	userid INT NOT NULL PRIMARY KEY, 
	username VARCHAR(50) NOT NULL, 
	name VARCHAR(255) NOT NULL, 
	email VARCHAR(50) NOT NULL, 
	displayPicture VARCHAR(255), 
	passwordHash VARCHAR(255) NOT NULL, 
	dateCreated DATE NOT NULL, 
	mobileNumber INT, 
	countryCode INT, 
	profileComment VARCHAR(1023)
);
`
const eventSchema = `
CREATE TABLE IF NOT EXISTS Event(
	eventid INT NOT NULL PRIMARY KEY, 
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
const eventPackageSchema = `
CREATE TABLE IF NOT EXISTS EventPackage(
	eventid INT NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	description VARCHAR(1023) NOT NULL,
  FOREIGN KEY (eventid) REFERENCES Event(eventid)
);
`
const reviewSchema = `
CREATE TABLE IF NOT EXISTS Review(
  reviewid INT NOT NULL PRIMARY KEY,
	userid INT NOT NULL, 
	eventid INT NOT NULL,  
	stars INT NOT NULL, 
	comment VARCHAR(1023),
  FOREIGN KEY (userid) REFERENCES User(userid),
  FOREIGN KEY (eventid) REFERENCES Event(eventid)
);
`
const bookingSchema = `
CREATE TABLE IF NOT EXISTS Booking(
  bookingid INT NOT NULL PRIMARY KEY,
	eventid INT NOT NULL, 
	startdate DATE NOT NULL, 
	enddate DATE NOT NULL,
  FOREIGN KEY (eventid) REFERENCES Event(eventid)
);
`
const pictureSchema = `
CREATE TABLE IF NOT EXISTS Picture(
	pictureid INT NOT NULL PRIMARY KEY, 
	eventid INT NOT NULL, 
	link VARCHAR(255) NOT NULL,
  FOREIGN KEY (eventid) REFERENCES Event(eventid)
);
`
const reviewHelpfulSchema = `
CREATE TABLE IF NOT EXISTS ReviewHelpful(
  reviewid INT NOT NULL,
  userid INT NOT NULL,
  helful BOOLEAN NOT NULL,
  FOREIGN KEY (reviewid) REFERENCES Review(reviewid),
  FOREIGN KEY (userid) REFERENCES User(userid)
);
`
;

const createTables = () => {
  getConnection().query(userSchema, (err, result) => {
    if (err) throw err;
    console.log("User Schema Created or Already Exists");
  });
  getConnection().query(eventSchema, (err, result) => {
    if (err) throw err;
    console.log("Event Schema Created or Already Exists");
  });
  getConnection().query(eventPackageSchema, (err, result) => {
    if (err) throw err;
    console.log("Event Package Schema Created or Already Exists");
  });
  getConnection().query(reviewSchema, (err, result) => {
    if (err) throw err;
    console.log("Review Schema Created or Already Exists");
  });
  getConnection().query(bookingSchema, (err, result) => {
    if (err) throw err;
    console.log("Booking Schema Created or Already Exists");
  });
  getConnection().query(pictureSchema, (err, result) => {
    if (err) throw err;
    console.log("Picture Schema Created or Already Exists");
  });
  getConnection().query(reviewHelpfulSchema, (err, result) => {
    if (err) throw err;
    console.log("Review Helpful Schema Created or Already Exists");
  });
}

module.exports = {createTables};