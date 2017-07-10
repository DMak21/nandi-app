// Request Module: To send requests
let request = require('request');

let cookie;

// check_valid : Check if credentials are valid
// input - username, password, callback function
// output - true, false, null
function check_valid(user, pass, callback) {
	let opt1 = {
		url: 'http://182.73.103.34:8080/panyam/login.jsp',
		method: 'GET',
	};

	let opt2 = {
		url: 'http://182.73.103.34:8080/panyam/UserLogin',
		headers: {
			'Cookie': cookie,
		},
		method: 'POST',
		form: {userName: user, password: pass},
	};

	function cback1(error, response) {
		if (!error && response.statusCode == 200) {
			cookie = response.headers['set-cookie'];
			request(opt2, cback2);
		} else {
			if (typeof callback == 'function' ) {
				callback(null);
			}
		}
	}

	function cback2(error, response) {
		if (!error && response.statusCode == 200) {
			if (typeof callback == 'function' ) {
				callback(true);
			}
		} else if (response.statusCode == 302) {
			if (typeof callback == 'function' ) {
				callback(false);
			}
		} else {
			if (typeof callback == 'function' ) {
				callback(null);
			}
		}
	}
	request(opt1, cback1);
}

module.exports = check_valid;