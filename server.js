var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
//var mongodb = require("mongodb");
//var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";
var EventEmitter = require('events').EventEmitter;
var societyclient = require('./libs/societyclient');

// When we submit an appication it can take a long time
var submitApplicationProcess = new EventEmitter();

/**
 * Offline processing of an application should be handled here. Ensure that the
 * processing status is updated when you are done.
 */
submitApplicationProcess.on('submit-application', function (application) {
  
  societyclient.sendMessage('A110712');
});

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
//var db;

// Connect to the database before starting the application server. 
/*mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
*/
  // Save database object from the callback for reuse.
 // db = database;
  //console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("Society one apps now running on port", port);
  });


// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// Generic Success handler used by all endpoints.
function handleSucess(res, reason, message, code) {
  console.log("SUCCESS: " + reason);
  res.status(code || 201).json({"success": message});
}


app.post("/api/v0/notification", function(req, res) {
  var newContact = req.body;
  var app = req.body.id;
  console.log("POST: ");
  //newContact.createDate = new Date();
  console.log("ID: " + req.body);
  console.log(req.headers['content-type']);
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
  }
});
  /*db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  }); */
