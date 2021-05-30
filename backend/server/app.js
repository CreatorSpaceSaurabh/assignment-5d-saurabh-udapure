"use strict";

var SwaggerExpress = require("swagger-express-mw");
var SwaggerUi = require("swagger-tools/middleware/swagger-ui");
var express = require("express");
var path = require("path");
var app = require("express")();
var bodyParser = require("body-parser");
module.exports = app; // for testing
require("./config/db");
var utils = require("./api/lib/utils");
var fileUpload = require("express-fileupload");
// for fetching build from public folder
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(
  fileUpload({
    // limits: { fileSize: 50  1024  1024 },
  })
);
app.use(
  "/moment_image",
  express.static(path.join(__dirname, "./public/upload/moments"))
);

var config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  app.use(function (req, res, next) {
    if (!req.files) {
      req.files = {};
    }
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header(
      "Access-Control-Allow-Headers",
      "Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization"
    );

    if (req.method == "OPTIONS") {
      res.status(200).end();
    } else {
      next();
    }
  });

  app.use("/api/*", function (req, res, next) {
    var freeAuthPath = ["/api/login", "/api/signup"];
    var available = false;
    for (var i = 0; i < freeAuthPath.length; i++) {
      if (freeAuthPath[i] == req.baseUrl) {
        available = true;
        break;
      }
    }
    if (!available) {
      utils.ensureAuthorized(req, res, next);
    } else {
      next();
    }
  });

  app.use(
    bodyParser.json({
      limit: "50mb",
    })
  );
  //parse application/x-www-form-urlencoded
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: "50mb",
    })
  );

  // app.use(swaggerExpress.runner.swaggerTools.swaggerUi());
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 9596;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths["/hello"]) {
    console.log(
      "try this:\ncurl http://127.0.0.1:" + port + "/hello?name=Scott"
    );
  }
});
