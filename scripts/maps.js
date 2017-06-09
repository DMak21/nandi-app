var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('heatmap'), {
    zoom: 10,
    center: {lat: 15.500631, lng: 78.210203},
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  // script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
  // document.getElementsByTagName('head')[0].appendChild(script);

var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  service.getDetails({
    placeId: 'ChIJiT-s1XrLtTsRCVLq00tF75U'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
        infowindow.open(map, this);
      });
    }
  });

}

// function eqfeed_callback(results) {
//   var heatmapData = [];
//   for (var i = 0; i < results.features.length; i++) {
//     var coords = results.features[i].geometry.coordinates;
//     var latLng = new google.maps.LatLng(coords[1], coords[0]);
//     heatmapData.push(latLng);
//   }
//   var heatmap = new google.maps.visualization.HeatmapLayer({
//     data: heatmapData,
//     dissipating: false,
//     map: map
//   });
// }