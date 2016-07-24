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
//var applicationStore = require('./applicationStore');
var applicationStore = require('./salesforceConnect');
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
			'client_id': 'mangolatitudeaus',
			'client_secret': 'password99',
			'grant_type': 'password',
			'username': 'latitudeausfc',
			'password': 'password99',
			'scope': 'api',
		})

		var options = {
			hostname: 'mango-identityservice.clearmatch.co',
			path: '/connect/token',
			method: 'POST',
			agent: false,
			requestCert: false,
			rejectUnauthorized: false,
			strictSSL: false,
		}

		console.log("option ", options);

		var req = https.request(options, function (res,err) {
			if (err) {
				reject(err);
			}
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
					host: 'mango-api.clearmatch.co',
					path: '/v1/unsecuredLoans/application/A122420', //A101318 A084754  A110832 A110712 A110712
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


