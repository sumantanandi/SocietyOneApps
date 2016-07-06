'use strict';

var request = require("request");
var https = require('https');
//var testoauth = require('./testoauth');
var clienttokens = '';
var parsedresponsedata = '';
var responsedata = '';
//var cert = require('ssl-root-cas').inject().addFile('localcert.cer');
var fs = require('fs');
var querystring = require('querystring');
var body = '';
var parsed = '';
var accesstoken = '';
var bodyforapplication = '';
var applicationStore = require('./applicationStore');
//var bodyParser = require('body-parser')

var EventEmitter = require('events').EventEmitter;

// When we submit an appication it can take a long time
var saveApplication = new EventEmitter();

/**
 * Offline processing of an application should be handled here. Ensure that the
 * processing status is updated when you are done.
 */
saveApplication.on('save-application', function (application) {
  
  //save application
  applicationStore.saveApplication(application);
});


exports.sendMessage = (applicationNumber) => {

	var access_token = null;
	var expires_in = null;
	console.log("applicationNumber ============== ", applicationNumber);

	return new Promise(function (resolve, reject) {

		var postData = querystring.stringify({
			//'grant_type' : 'client_credentials'
			'username': 'societyon',
			'password': 'password99',
			'grant_type': 'password',
			'scope': 'api',
			'redirect_uri': 'www.google.com'
		})

		var postData = querystring.stringify({
			//'grant_type' : 'client_credentials'
			'username': 'societyon',
			'password': 'password99',
			'grant_type': 'password',
			'scope': 'api',
			'redirect_uri': 'www.google.com'
		})

		var options = {
			hostname: 'mango-identityservice.clearmatch.local',
			path: '/connect/token',
			method: 'POST',
			agent: false,
			//ca: [fs.readFileSync('clearmatch.crt')],
			//ca: fs.readFileSync('localcert.cer') ,
			requestCert: true,
			rejectUnauthorized: false,
			strictSSL: false,
			headers: {
				'Authorization': 'Basic ' + new Buffer(
					'mangolatitudeaus' + ":" + 'password99'
				).toString('base64'),

				//'client_id':'mangolatitudeaus',
				//'client_secret':'password99',
				'Content-Type': 'application/x-www-form-urlencoded',
				//'grant_type':'password',
				'username': 'societyon',
				'password': 'password99',
				//'scope':'api',
				'Content-Length': postData.length
			} // headers
		}
		//console.log("option ",options);

		var req = https.request(options, function (res) {
			//console.log("option ",options);
			console.log("statusCode: ", res.statusCode);
			//console.log("headers: ", res.headers);
			if (res.statusCode != 200) {
				console.log('bad statusCode from auth token request ', res.statusCode);
				reject('bad statusCode from auth token request :::' + res.statusCode);
			}

			res.on('data', function (d) {

				if (res.statusCode == 200) {
					process.stdout.write(d);
					//copy response data in Body Format
					body += d;
					parsed = JSON.parse(body);
					access_token = parsed.access_token;
					expires_in = parsed.expires_in;
					console.log("\n\n access token Value : ", access_token);
					console.log("\n\n access token Expire : ", expires_in);
					module.exports = parsed;

					//call API
					//));		
				}		// options for GET
				var optionsget = {
					//host : 'clearmatchapi.herokuapp.com', // here only the domain name // (no http/https !)
					host: 'mango-api.clearmatch.local',
					//port : 443,
					//path : '/contacts',
					path: '/v1/unsecuredLoans/application/' + applicationNumber, //A101318 A084754  A110832 A110712
					//path : '/v1/{assetclass}/whoami', 
					appnumber: 'A110843',// the rest of the url with parameters if needed  GET /v1/{assetclass}/whoami A110843 A084754
					method: 'GET', // do GET
					requestCert: true,
					rejectUnauthorized: false,
					strictSSL: false,
					headers: {
						'Authorization': 'Bearer ' + access_token,
						//'Content-Length': '450000',
					}

				};

				//console.info(" PAY LOAD ",optionsget);
				var reqGet = https.request(optionsget, function (res) {
					//console.info('Do the GET call ===============%%%% ', access_token);
					//var jsonParser = bodyParser.json();
					res.on('data', function (d) {
						bodyforapplication += d;
					});

					res.on('end', function () {
						parsedresponsedata = JSON.parse(bodyforapplication);
						saveApplication.emit('save-application', parsedresponsedata);
						//console.info('parsedresponsedata : ', parsedresponsedata);
						var status = parsedresponsedata.applicationStatus;
						var applicationNumber = parsedresponsedata.applicationNumber;
						//console.info('APPLICATION NUMBER  : ', applicationNumber);
						//console.info('STATUS : ', status);
					});


				});
				console.log("statusCode: ================", res.statusCode);
				reqGet.end();
				reqGet.on('error', function (e) {
					console.log("ERRRROR  ");
					console.error(e);
				});


			});
			//reqGet.end();
			//reqGet.on('error', function(e) {
			//console.error(e);
		});


		// call API




		req.on('error', function (e) {
			console.log("ERRRROR");
			console.error(e);
		});

		req.write(postData);
		req.end();

	});

}


