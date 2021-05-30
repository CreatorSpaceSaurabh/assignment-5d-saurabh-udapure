"use strict";
var mongoose = require("mongoose");
// localhost
mongoose.connect("mongodb://localhost:27017/5d-moment", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
require("../api/models/moment_schema");
require("../api/models/user_schema");

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("database conected");
});
