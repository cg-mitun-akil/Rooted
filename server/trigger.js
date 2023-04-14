const { getConnection } = require("./databaseConfig");

const reviewInsertTrigger = `
  CREATE TRIGGER IF NOT EXISTS UPDATE_EVENT_RATING_INSERT
  AFTER INSERT ON Review
  FOR EACH ROW
  BEGIN
    UPDATE Event
    SET rating = (
      SELECT CAST(AVG(stars) AS DECIMAL(4,2))
      FROM Review
      WHERE eventid = NEW.eventid
    )
    WHERE eventid = NEW.eventid;
  END;
`;

const reviewDeleteTrigger = `
  CREATE TRIGGER IF NOT EXISTS UPDATE_EVENT_RATING_DELETE
  AFTER DELETE ON Review
  FOR EACH ROW
  BEGIN
    UPDATE Event
    SET rating = (
      SELECT CAST(AVG(stars) AS DECIMAL(4,2))
      FROM Review
      WHERE eventid = OLD.eventid
    )
    WHERE eventid = OLD.eventid;
  END;
`;

const createTriggers = () => {
  getConnection().query(reviewInsertTrigger, (err, result) => {
    if (err) throw err;
    console.log("Review Insert Trigger Created or Already Exists");
  });
  getConnection().query(reviewDeleteTrigger, (err, result) => {
    if (err) throw err;
    console.log("Review Delete Trigger Created or Already Exists");
  });
}

module.exports = { createTriggers };