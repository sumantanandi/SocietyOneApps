'use strict';
var express = require("express");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

var environment = process.env.NODE_ENV || 'prodsupport';
exports.environment = environment;

//var connectionURL = process.env.DATABASE_URL || 'postgres://ythaatkhclsrbf:dpb30mSasjoou_bWUS2WeKjt0q@ec2-54-225-195-254.compute-1.amazonaws.com:5432/delv202g5ov939';
//var pg = require('pg');
//pg.defaults.ssl = true;

var EventEmitter = require('events').EventEmitter;
var societyclient = require('./libs/societyclient');
var credential = require('./model/Credential');
var fetchBasicAuthFromDatabase = {};
var fetchBasicAuthFromConfig = {};

// When we submit an appication it can take a long time
var submitApplicationProcess = new EventEmitter();

/**
 * Offline processing of an application should be handled here. Ensure that the
 * processing status is updated when you are done.
 */
submitApplicationProcess.on('submit-application', function (application) {
  console.log(" submit submitApplicationProcess ", application);
  societyclient.sendMessage(application); //A131909 A130016
});

var app = express();
var basicAuth = require('basic-auth');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("Society one apps now running on port", port);
});

// Validate Basic Authenticatation details for Config JSON
fetchBasicAuthFromConfig = () => {

  var configuration = JSON.parse(
    fs.readFileSync('./config/configs.js')
  );

  console.log(" NODE ENV ", environment);
  var user = configuration[environment].apiKeys.username;
  var pass = configuration[environment].apiKeys.password;
  //console.log('USERRR ', user);
  //console.log('PASSS ',pass);
  return new Promise(function (resolve, reject) {
    credential.username = user;
    credential.client_secret = pass;
    console.log("user name ::", credential.username);
    console.log("pass code ::", credential.client_secret);
    resolve(credential);
  });
}

// Validate Basic Authenticatation details for Database
/*
fetchBasicAuthFromDatabase = () => {
  var Client = require('pg').Client;
  var client = new Client(connectionURL);
  return new Promise(function (resolve, reject) {
    client.connect();
    pg.connect(connectionURL, function (err, client) {
      if (err) {
        reject(err);
        console.log('Connection to postgres! Failed to Connect database  ...', err);
        //throw err;
      }
      console.log('Connected to postgres! Getting user_authentification table  ...');
      client
        .query('SELECT auth_key,user_name,client_secret  FROM salesforce.user_authentification;')
        .on('row', function (row) {
          console.log(JSON.stringify(row));
          credential.username = row.user_name;
          credential.client_secret = row.client_secret;
          console.log("user name ::", credential.username);
          console.log("pass code ::", credential.client_secret);
          resolve(credential);
        });
    });
  });
}*/

var auth = function (req, res, next) {
  var user = basicAuth(req);
  //console.log("config.Level: ", config.label);

  //console.log(JSON.stringify(configDetails.apiKeys.username));

  fetchBasicAuthFromConfig().then(accessToken => {
    console.log("user.name: ", user.name);
    console.log("user.pass: ", user.pass);
    console.log("credential.username: ", accessToken.username);
    console.log("credential.client_secret: ", accessToken.client_secret);

    if (!user || !user.name || !user.pass) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
    if (user.name == accessToken.username && user.pass == accessToken.client_secret) {
      console.log("User Authenticated.");
      next();
    } else {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
  });
}

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ "error": message });
}

// Generic Success handler used by all endpoints.
function handleSucess(res, reason, message, code) {
  console.log("SUCCESS: " + reason);
  res.status(code || 201).json({ "success": message });
}

app.all("/*", auth);

app.post("/api/v0/notification", function (req, res) {
  var newContact = req.body;
  var app = req.body.id;
  var content = req.body.content;
  console.log("Society One Application Notification Received:", app);
  //newContact.createDate = new Date();
  console.log("ID: " + req.body);
  //console.log(req.headers['content-type']);
  if (!(req.body.id || req.body.content)) {
    handleError(res, "Invalid user input", "Must provide a S1 app ID or content.", 400);
    //res.status(400).send("Invalid user input");
  } else {
    console.log("ID: " + req.body.id);
    console.log("content: " + req.body.content);
    console.log("notificationType: " + req.body.notificationType);
    console.log("partnerCode: " + req.body.partnerCode);
    //emit sync response
    handleSucess(res, "notification done", 201);
    //then emit save application to PG
    submitApplicationProcess.emit('submit-application', app);
    res.end();
  }
});
/*db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
  if (err) {
    handleError(res, err.message, "Failed to create new contact.");
  } else {
    res.status(201).json(doc.ops[0]);
  }
}); */

//app.listen(3030);
//console.log("app running on localhost:3030");
module.exports = app;