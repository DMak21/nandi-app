var googleMapsClient = require("@google/maps").createClient({
	key: "AIzaSyCxrveMK87vQ-KlxGChUuXj9d_GAx6gXWk"
});

let requests = ["CHITTOOR","KADIRI","PALAMANER"].map(function(item){
	return new Promise(function (resolve, reject) {
		googleMapsClient.geocode({
			address: item
		}, function(err, response) {
			if (!err) {
				resolve(response.json.results[0].geometry.location);
			}
			else{
				reject(err);
			}
		});
	});
});

Promise.all(requests).then(function (answer) {
	console.log(answer);
});





