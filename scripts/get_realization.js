// Request Promise Native Module: To send requests
const rp = require('request-promise-native');
// Cheerio: For Webscraping
const cheerio = require('cheerio');

// get_data : Get data from ERP
// input - from date, to date, username, password | Ex. '01/03/2017', '02/03/2017', 'USERNAME', 'PASSWORD'
// output - JS Object | Ex. {id: '1qPD3V2b', address_txt: 'NAGPUR', opc43_d: 4, opc53_d: 0, ppc_d: 4, psc_d: 0, opc43_p: 0, opc53_p: 6, ppc_p: 0, psc_p: 0}
async function get_data(user, pass, fromDate, toDate) {
	let cookie, res;

	const opt1 = {
		url: 'http://182.73.103.34:8080/panyam/login.jsp',
		method: 'GET',
		resolveWithFullResponse: true
	};

	const opt2 = {
		url: 'http://182.73.103.34:8080/panyam/UserLogin',
		headers: {
			'Cookie': cookie
		},
		method: 'POST',
		form: { userName: user, password: pass }
	};

	const opt3 = {
		url: 'http://182.73.103.34:8080/panyam/sales/NprOrderWiseInvoiceReport2.jsp',
		headers: {
			'Cookie': cookie
		},
		method: 'POST',
		form: { comp_id:'1', custCls:'0', editFlag:'N', fDate:fromDate, 
			formatfield:'dd/MM/yyyy', mbranchcode:3, packCode:0, page:'View', 
			pgmCaption:'Order wise Realisation details', pgmId:'3012', 
			plant_code:'3', submit:' >>Show Report >>', tDate:toDate },
		transform: (body) => {
			return cheerio.load(body);
		}
	};

	try {
		cookie = await rp(opt1).headers['set-cookie'];
		opt2.headers.Cookie = cookie;
		opt3.headers.Cookie = cookie;

		await rp(opt2);
		
		const $ = await rp(opt3);

		res = $('tr')
			.not(function (i, element){
				return !(/^\d+$/.test($(element).find('td:nth-of-type(1)').text().trim()));
			})
			.map((i, element) => ({
				id: $(element).find('td:nth-of-type(1)').text().trim(),
				// Remove 1-3 letter words from address_txt
				address_txt: $(element).find('td:nth-of-type(4)').text().replace(/(\b(\w{1,3})\b(\s|$))/g,'').trim(),
				realization: $(element).find('td:nth-of-type(13)').text().trim(),
			})).get();
	}
	catch (e) {
		return Error(e);
	}
	return new Promise((resolve) => {resolve(res);});
}

module.exports = get_data;