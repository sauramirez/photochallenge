var domready = require('domready');
var MapView = require('./map/map');

domready(function() {
  var mapView = new MapView({
    el: document.querySelector('.map-container')
  });
  mapView.render();
});
