// the map view
var AmpersandView = require('ampersand-view');
var L = require('leaflet');
var bind = require('lodash.bind');

L.Icon.Default.imagePath = 'static/images/';


module.exports = AmpersandView.extend({
  template: '<div id="map"></div>',
  initializeMap: function() {
    this.map = L.map('map').setView(
      [20.7082788,-103.4117612], 17);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // the initial marker
    this.map.on('click', bind(this.mapClicked, this));
    L.marker([20.7082788, -103.4117612]).addTo(this.map);
  },
  mapClicked: function() {
  },
  render: function() {
    this.renderWithTemplate();
    this.initializeMap();
  }
});
