var request = require('request');
var cheerio = require('cheerio');

var cookie;
var json_data;

function get_data(from_date, to_date, fin_yr, user, pass, callback) {
	var opt1 = {
		url: 'http://182.73.103.34:8080/panyam/login.jsp',
		method: 'GET'
	};

	var opt2 = {
		url: 'http://182.73.103.34:8080/panyam/UserLogin',
		headers: {
			'Cookie': cookie
		},
		method: 'POST',
		form:{userName: user, password: pass}
	};

	var opt3 = {
		url: 'http://182.73.103.34:8080/panyam/sales/GradeWiseDespatch2.jsp',
		headers: {
			'Cookie': cookie
		},
		method: 'POST',
		form:{classlist:'0', classname:'Stocklist', distcode:'0', financialYear: fin_yr, formatfield:'dd/MM/yyyy', fromdate:from_date, generate:' >> Show Report >>', mbranchcode:'3', output:'B', period:'01', plantspo:'0', product:'product', state:'0', todate:to_date}
	};

	function cback1(error, response, body) {
		if (!error && response.statusCode == 200) {
			cookie = response.headers['set-cookie'];
			request(opt2, cback2);
		}
		else {
			console.log(error);
		}
	}

	function cback2(error, response, body) {
		if (!error && response.statusCode == 200) {
			request(opt3, cback3);
		}
		else {
			console.log(error);
		}
	}

	function cback3(error, response, body) {
		if (!error && response.statusCode == 200) {

			var $ = cheerio.load(body);

			var result = $('tr')
			.not(function (i, element){
				return !(/^\d+$/.test($(element).find('td:nth-of-type(1)').text().trim()));
			})
			.map((i, element) => ({
				id: $(element).find('td:nth-of-type(1)').text().trim(),
				address: $(element).find('td:nth-of-type(4)').text().trim() + ', ' + $(element).find('td:nth-of-type(5)').text().trim(),
				opc43_d: $(element).find('td:nth-of-type(6)').text().trim(),
				opc53_d: $(element).find('td:nth-of-type(7)').text().trim(),
				ppc_d: $(element).find('td:nth-of-type(8)').text().trim(),
				psc_d: $(element).find('td:nth-of-type(9)').text().trim(),
				opc43_p: $(element).find('td:nth-of-type(11)').text().trim(),
				opc53_p: $(element).find('td:nth-of-type(12)').text().trim(),
				ppc_p: $(element).find('td:nth-of-type(13)').text().trim(),
				psc_p: $(element).find('td:nth-of-type(14)').text().trim()

			})).get()

			if( typeof callback == 'function' ){
	    		callback(JSON.stringify(result, null, 2));
			}
		}
		else {
			console.log(error);
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

// Dispatched
// OPC 43 GRADE _ OPC 53 GRADE _ PPC _ PSC
// opc43_d opc53_d ppc_d psc_d
// col6 col7 col8 col9

// Pending
// OPC 43 GRADE _ OPC 53 GRADE _ PPC _ PSC
// opc43_p opc53_p ppc_p psc_p
// col11 col12 col13 col14

// col1 Sr No
// col4 destination
// col5 district

// var from_date = '01/03/2015';
// var to_date = '02/03/2015';
// var fin_yr = '20172018';

// var user = 'T0058';
// var pass = 'T0058';