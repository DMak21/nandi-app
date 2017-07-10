// Geocoding API
const googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyCxrveMK87vQ-KlxGChUuXj9d_GAx6gXWk'
});

// geocode : Text Address to Latitudes and Longitudes
// input - JS Object | Ex. {address.txt: 'Nagpur'}
// output - Promise JS Object | Ex. {address.txt: 'Nagpur', address.latlng: {lat: 24.5, lng: 45.8}}
async function geocode(json_obj) {
	return new Promise((resolve) => {
		googleMapsClient.geocode({
			address: json_obj.address_txt,
			region: 'in'
		}, (err, response) => {
			if (!err) {
				json_obj.address_latlng = response.json.results[0].geometry.location;
				resolve(json_obj);
			}
		});
	});
}

module.exports = geocode;