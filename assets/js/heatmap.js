const manipulate_data = require('./scripts/manipulate_data');
const get_data = require('./scripts/get_data');
const limit_data = require('./scripts/reduce_array');
const local_geocode = require('./scripts/local_geocode');

const Rainbow = require('rainbowvis.js');

let map;
let gradient = new Rainbow();

function initMap() {
	map = new google.maps.Map(document.getElementById('heatmap'), {
		zoom: 8,
		center: new google.maps.LatLng(14.681888, 77.600591),
		mapTypeId: 'terrain'
	});
}

async function add_markers(user, pass, from_date, to_date, cem_type, dis_pen) {
	let data = await get_data(user, pass, from_date, to_date);
	console.log(data);
	let data2 = manipulate_data(data, cem_type, dis_pen);
	console.log(data2);
	let data3 = limit_data(data2);
	console.log(data3);
	let data4 = await local_geocode(data3);
	console.log(data4);
	let max = Math.max.apply(Math,data4.map(function(b){return b.weight;}));
	let min = Math.min.apply(Math,data4.map(function(b){return b.weight;}));
	for (var i = data4.length - 1; i >= 0; i--) {
		let weight = data4[i].weight;
		let address_latlng = data4[i].address_latlng;
		let address_txt = data4[i].address_txt;
		let infowindow = new google.maps.InfoWindow({
			content: address_txt + ' - ' + weight
		});

		let marker = new google.maps.Marker({
			position: new google.maps.LatLng(address_latlng.lat, address_latlng.lng),
			// position: new google.maps.LatLng(14.681888, 77.600591),
			icon: getCircle(weight, max, min),
			label: {
				fontWeight: '600',
				text: weight.toString(),
				color: '#000'
			},
			map: map
		});

		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});
	}
}
function getCircle(magnitude, max, min) {
	gradient.setNumberRange(min, max);
	// gradient.setSpectrum('red', 'blue');
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: '#' + gradient.colorAt(magnitude),
		fillOpacity: .8,
		scale: 15,
		// Math.round((magnitude - 1)/(max - 1) * 25)
		strokeColor: 'white',
		strokeWeight: .5
	};
}