// Send GET and POST requests
const request = require('request');
// Used for Web Scraping
const cheerio = require('cheerio');
// Geocoding API for converting text address to latitudes and longitudes
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBhPa8nt82MpL2KMhWdU5-4Xy9r_UZ5PSQ'
});

let cookie;
let json_data;

// Main Function
function get_data(from_date, to_date, user, pass, callback) {
	// Options for request 1
	const opt1 = {
		url: 'http://182.73.103.34:8080/panyam/login.jsp',
		method: 'GET'
	};

	// Options for request 2
	const opt2 = {
		url: 'http://182.73.103.34:8080/panyam/UserLogin',
		headers: {
			'Cookie': cookie
		},
		method: 'POST',
		form:{userName: user, password: pass}
	};

	// Options for request 3
	const opt3 = {
		url: 'http://182.73.103.34:8080/panyam/sales/GradeWiseDespatch2.jsp',
		headers: {
			'Cookie': cookie
		},
		method: 'POST',
		form:{classlist:'0', classname:'Stocklist', distcode:'0', formatfield:'dd/MM/yyyy', fromdate:from_date, generate:' >> Show Report >>', mbranchcode:'3', output:'B', period:'01', plantspo:'0', product:'product', state:'0', todate:to_date}
	};

	// Callback function for request 1
	function cback1(error, response, body) {
		if (!error && response.statusCode == 200) {
			cookie = response.headers['set-cookie'];
			request(opt2, cback2);
		}
		else {
			console.log(error);
			if (typeof callback == 'function' ){
	    		callback(null);
			}
		}
	}

	// Callback function for request 2
	function cback2(error, response, body) {
		if (!error && response.statusCode == 200) {
			request(opt3, cback3);
		}
		else {
			console.log(error);
			if (typeof callback == 'function' ){
	    		callback(null);
			}
		}
	}

	// Callback function for request 3
	// Callback Hell Ahead..
	// Promises can be used to improve this
	function cback3(error, response, body) {
		if (!error && response.statusCode == 200) {

			// Cheerio is ♥
			const $ = cheerio.load(body);

			// Javascript Object res is an array of data of the form as defined in map
			const res = $('tr')
			.not(function (i, element){
				return !(/^\d+$/.test($(element).find('td:nth-of-type(1)').text().trim()));
			})
			.map((i, element) => ({
				id: $(element).find('td:nth-of-type(1)').text().trim(),
				destination: $(element).find('td:nth-of-type(4)').text().trim(),
				opc43_d: $(element).find('td:nth-of-type(6)').text().trim(),
				opc53_d: $(element).find('td:nth-of-type(7)').text().trim(),
				ppc_d: $(element).find('td:nth-of-type(8)').text().trim(),
				psc_d: $(element).find('td:nth-of-type(9)').text().trim(),
				opc43_p: $(element).find('td:nth-of-type(11)').text().trim(),
				opc53_p: $(element).find('td:nth-of-type(12)').text().trim(),
				ppc_p: $(element).find('td:nth-of-type(13)').text().trim(),
				psc_p: $(element).find('td:nth-of-type(14)').text().trim()

			})).get()

			// Callback Function
			if( typeof callback == 'function' ){
				
				// This piece of code is used to convert the text address to latitudes and longitudes
				// Promises have been used ahead
				// Because callbacks didn't work ;(
	    		let requests = res.map(function(json_obj){
					return new Promise(function (resolve, reject) {
						googleMapsClient.geocode({
							address: json_obj.destination
						}, function(err, response) {
							if (!err) {
								json_obj.address = response.json.results[0].geometry.location;
								resolve(json_obj);
							}
							else{
								reject(err);
							}
						});
					})
				})

	    		// Handles all promises in series
				Promise.all(requests)
				.then(function (answer) {
					callback(answer);
				})
				.catch(function (err) {
					console.log(err)
					callback(null);
				});
			}

		}
		else {
			console.log(error);
			if (typeof callback == 'function' ){
	    		callback(null);
			}
		}
	}

	request(opt1, cback1);
}

module.exports = get_data;

// Period
// 1Q 01/04 30/06
// 2Q 01/07 30/09
// 3Q 01/10 31/12
// 4Q 01/01 31/03

// 1H 01/04 30/09
// 2H 01/10 31/03

// A 01/04 31/03

// Dispatched - 0
// OPC 43 GRADE _ OPC 53 GRADE _ PPC _ PSC
// opc43_d opc53_d ppc_d psc_d
// 00 01 02 03
// col6 col7 col8 col9

// Pending - 1
// OPC 43 GRADE _ OPC 53 GRADE _ PPC _ PSC
// opc43_p opc53_p ppc_p psc_p
// 10 11 12 13
// col11 col12 col13 col14

// col1 Sr No
// col4 destination
// col5 district

// var from_date = '01/03/2015';
// var to_date = '02/03/2015';

// var user = 'T0058';
// var pass = 'T0058';

// 1 2 4 8

// 1,2 3
// 1,4 5
// 1,8 9
// 2,4 6
// 2,8 10
// 4,8 12

// 1,2,4 7
// 1,2,8 11
// 1,4,8 13
// 2,4,8 14

// 1,2,4,8 15