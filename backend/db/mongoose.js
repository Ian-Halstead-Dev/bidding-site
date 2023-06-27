const mongoose = require("mongoose");
require("dotenv").config();
const connectionUrl = process.env.DBNAME;

const connectToDb = () => {
  if (connectionUrl === undefined) {
    console.log("Db Connection Error");
    return "error";
  }
  mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });
};

module.exports = connectToDb;
