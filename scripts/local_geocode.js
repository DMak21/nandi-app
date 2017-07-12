const geocode = require('./geocode');
// Nedb Database
const Datastore = require('nedb');

const db = new Datastore({filename: './database/coordinates.db', autoload: true});

// local_geocode : Searches Database for stored coordinates, if not found uses geocoding API to find
// input - JS Array | Ex. [{address_txt: 'NAGPUR'}, {address_txt: 'PUNE'}]
// output - Promise
async function local_geocode(js_array) {
	let promises = [];

	for (let i = js_array.length - 1; i >= 0; i--) {
		let doc = await find(js_array[i].address_txt);
		if (doc.length !== 0) {
			js_array[i].address_latlng = doc[0].address_latlng;
		}
		else {
			// console.log(js_array[i].address_txt);
			await geocode(js_array[i]);
			// console.log(js_array[i]);
			if (js_array[i].address_latlng !== undefined) {
				db.insert({address_txt: js_array[i].address_txt, address_latlng: js_array[i].address_latlng});
			}
		}
		// console.log(js_array[i].address_latlng);
		await promises.push(new Promise((res) => {
			res(js_array[i]);
		}));
	}
	return Promise.all(promises);
}

// find : Find address in database
// input - Address | Ex. 'NAGPUR'
// output - Array of Results
async function find(address_txt_0) {
	return new Promise((res) => {
		db.find({address_txt: address_txt_0}, (err, doc) => {
			res(doc);
		});
	});
}

module.exports = local_geocode;