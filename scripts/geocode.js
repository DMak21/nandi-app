// Geocoding API
const googleMapsClient = require('@google/maps').createClient({
	key: 'AIzaSyDhvaeKq5yYSGTrf-k55HquVtr7NcS_yDc'
});

// geocode : Text Address to Latitudes and Longitudes
// input - JS Object | Ex. {address_txt: 'Nagpur'}
// output - Promise JS Object | Ex. {address_txt: 'Nagpur', address_latlng: {lat: 24.5, lng: 45.8}}
function geocode(json_obj) {
	return new Promise((resolve) => {
		googleMapsClient.geocode({
			address: json_obj.address_txt,
			region: 'in'
		}, (err, response) => {
			if (!err ) {
				if (response.json.results.length !== 0) {
					json_obj.address_latlng = response.json.results[0].geometry.location;
				}
				resolve(json_obj);
			}
			else{
				new Error(err);
			}
		});
	});
}

module.exports = geocode;