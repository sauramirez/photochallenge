// the map view
var AmpersandView = require('ampersand-view');
var L = require('leaflet');
var bind = require('lodash.bind');
var Marker = require('./models/marker');
var Markers = require('./models/markers');
var MarkersView = require('./views/markers');
var Exif = require('exif-js');

L.Icon.Default.imagePath = 'static/images/';

function coordinatesToDec(coord) {
  return (coord[0] + coord[1]/60 + coord[2]/3600);
}


module.exports = AmpersandView.extend({
  template: '<div class="map-container"><div id="map"><div class="markers"></div></div><input type="file" id="files" name="files[]" multiple /></div>',
  events: {
    'change #files': 'addImg'
  },
  initialize: function() {
    this.markers = new Markers();
  },
  initializeMap: function() {
    this.map = L.map('map').setView(
      [20.7082788,-103.4117612], 17);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // the initial marker
    this.map.on('click', bind(this.mapClicked, this));
  },

  addImg: function(e) {
    // FileList object
    var files = e.target.files,
        reader = new FileReader(),
        that = this,
        marker;
    reader.onload = function() {
      var exif = Exif.readFromBinaryFile(reader.result);
      console.log(exif.GPSLatitudeRef);
      console.log(exif.GPSLongitudeRef);
      var lat = coordinatesToDec(exif.GPSLatitude);
      var lng = coordinatesToDec(exif.GPSLongitude);
      if (exif.GPSLatitudeRef === 'S') {
        lat = lat * -1;
      }
      if (exif.GPSLongitudeRef === 'W') {
        lng = lng * -1;
      }

      marker = new Marker({
        lat: lat,
        lng: lng
      });
      that.markers.add(marker);
      that.map.panTo(
        L.latLng(lat, lng), 17);
    };
    reader.readAsArrayBuffer(files[0]);
  },
  mapClicked: function(e) {
    console.log('clicked');
    console.log(e.latlng);
    var marker = new Marker({
      lat: e.latlng.lat,
      lng: e.latlng.lng
    });
    this.markers.add(marker);
  },
  render: function() {
    this.renderWithTemplate();
    this.initializeMap();
    var markersView = new MarkersView({
      map: this.map,
      collection: this.markers
    });
    this.renderSubview(markersView, '.markers');
  }
});
