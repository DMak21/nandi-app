const manipulated_data = require('./scripts/manipulated_data')

// let map, heatmap;

var user = 'T0058';
var pass = 'T0058';

var from_date = '01/03/2015';
var to_date = '02/03/2015';

var dis_pen = '3';
var cem_type = '15';



function initMap() {
  map = new google.maps.Map(document.getElementById('heatmap'), {
    zoom: 8,
    center: new google.maps.LatLng(14.681888, 77.600591),
    mapTypeId: 'terrain'
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });

  var gradient = [
  'rgba(0, 255, 255, 0)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(0, 127, 255, 1)',
  'rgba(0, 63, 255, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 0, 223, 1)',
  'rgba(0, 0, 191, 1)',
  'rgba(0, 0, 159, 1)',
  'rgba(0, 0, 127, 1)',
  'rgba(63, 0, 91, 1)',
  'rgba(127, 0, 63, 1)',
  'rgba(191, 0, 31, 1)',
  'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', gradient);

  heatmap.set('radius',30);
}


function getPoints() {
  manipulated_data(from_date, to_date, user, pass, dis_pen, cem_type, function(res) {
    let b = res.map(function (obj) {
      return ({location: new google.maps.LatLng(obj.coordinates.lat, obj.coordinates.lng), weight: obj.weight})
    })

    return b;
  })


  // return [
  // {location: new google.maps.LatLng(13.217176, 79.1003289), weight: 100},
  // {location: new google.maps.LatLng(14.1130272, 78.1605586), weight: 200},
  // {location: new google.maps.LatLng(13.1990798,78.7469436), weight: 30},
  // {location: new google.maps.LatLng(11.2587531,75.78041), weight: 40},
  // {location: new google.maps.LatLng(14.7491864, 78.5531577), weight: 50},
  // {location: new google.maps.LatLng(9.9816358,76.2998842), weight: 60},
  // {location: new google.maps.LatLng(14.696869, 76.854650), weight: 70},
  // ];  
// }
