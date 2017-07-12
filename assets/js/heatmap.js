const manipulate_data = require('./scripts/manipulate_data');
const get_data = require('./scripts/get_data');
const limit_data = require('./scripts/reduce_array');
const local_geocode = require('./scripts/local_geocode');

const Rainbow = require('rainbowvis.js');

let map;
let gradient = new Rainbow();
let infowindow, markers;

function initMap() {
	markers = [];
	infowindow = new google.maps.InfoWindow();

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: new google.maps.LatLng(14.681888, 77.600591),
		mapTypeId: 'terrain'
	});
}

function add_marker(address_txt, address_latlng, weight, max, min) {
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
	google.maps.event.addListener(marker, 'click', infoCallback(marker, address_txt, weight));
	markers.push(marker);
}

function infoCallback(marker, address_txt, weight) {
	return function() {
		infowindow.close();

		infowindow.setContent(address_txt + ' - ' + weight);
		infowindow.open(map, marker);
	};
}

function remove_all_markers() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

async function add_markers(user, pass, from_date, to_date, cem_type, dis_pen) {
	remove_all_markers();
	let data = await get_data(user, pass, from_date, to_date);
	// console.log(data);
	let data2 = manipulate_data(data, cem_type, dis_pen);
	// console.log(data2);
	let data3 = limit_data(data2);
	// console.log(data3);
	let data4 = await local_geocode(data3);
	// console.log(data4);
	let max = Math.max.apply(Math,data4.map(function(b){return b.weight;}));
	let min = Math.min.apply(Math,data4.map(function(b){return b.weight;}));
	document.getElementById('min').innerText = min.toString();
	document.getElementById('max').innerText = max.toString();

	document.getElementById('heatmap_loader').style.display = 'none';
	document.getElementById('map').style.display = 'block';

	for (var i = data4.length - 1; i >= 0; i--) {
		let weight = data4[i].weight;
		let address_latlng = data4[i].address_latlng;
		let address_txt = data4[i].address_txt;

		if (weight != 0 && address_latlng !== undefined) {
			add_marker(address_txt, address_latlng, weight, max, min);
		}
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