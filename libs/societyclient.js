'use strict';

var mockEnabled = process.env.MOCK_ENABLED || 'yes';
var request = require("request");
var https = require('https');
var config = require('../config/config.js');
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
var applicationResourceURL = '';
var quotaguardstaticURL = process.env.QUOTAGUARDSTATIC_URL = 'http://quotaguard6398:fe41e4de067b@us-east-static-01.quotaguard.com:9293';
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

//mockEnabled
function applicationResource(accesstoken, applicationNumber) {
	console.log(" Access Token Inside Application Resource API Call ", accesstoken);
	console.log(" Application Number Inside Application Resource API Call ", applicationNumber);
	if (mockEnabled == 'yes') {
		applicationResourceURL = 'http://www.mocky.io/v2/'+applicationNumber;
	} else {
		applicationResourceURL = 'https://uat2-api.clearmatch.co/v1/unsecuredLoans/application/'+applicationNumber;
	}
	conssole.log(" applicationResourceURL ======= ",applicationResourceURL);
    var optionsget = {
		proxy: quotaguardstaticURL,
		//url: 'https://uat2-api.clearmatch.co/v1/unsecuredLoans/application/' + applicationNumber,
		//url: 'http://www.mocky.io/v2/' + applicationNumber,
		url:applicationResourceURL,
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + accesstoken,
			//'Content-Length': '450000',
		}
	};

	function societyoneApplicationService(error, response, body) {
		console.log(" response ", response);
		console.log(" response ", response.statusCode);
		if (!error && response.statusCode == 200) {
			parsedresponsedata = JSON.parse(body);
			saveApplication.emit('save-application', parsedresponsedata);
			//console.info('parsedresponsedata : ', parsedresponsedata);
			var status = parsedresponsedata.applicationStatus;
		}
		if (response.statusCode == 400) {
			console.info('societyoneApplicationService : User does not have permissions to the application :', applicationNumber);
		}
	}

    request(optionsget, societyoneApplicationService);

}

exports.sendMessage = (applicationNumber) => {

	var access_token = null;
	var expires_in = null;
	console.log("applicationNumber ============== ", applicationNumber);

	//return new Promise(function (resolve, reject) {

	var postData = querystring.stringify({
		'client_id': 'uat2latitudeaus',
		'client_secret': 'password99',
		'grant_type': 'password',
		'username': 'latitudeausfc',
		'password': 'password99',
		'scope': 'api',
	})

	var options = {
		proxy: quotaguardstaticURL,
		url: 'https://uat2-identityservice.clearmatch.co/connect/token',
		body: postData,
		method: 'POST',
		headers: {
			'User-Agent': 'node.js'
		}
	};

	function tokenService(error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body);
			parsed = JSON.parse(body);
			access_token = parsed.access_token;
			expires_in = parsed.expires_in;
			console.log("access token Value : ", access_token);
			console.log("access token Expire : ", expires_in);
			applicationResource(access_token, applicationNumber);
		}
		if (error) {
			console.log(error);
		}
	}

	request(options, tokenService);
	//});
}



