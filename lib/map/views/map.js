// the map view
var AmpersandView = require('ampersand-view');
var L = require('leaflet');
var bind = require('lodash.bind');
var Exif = require('exif-js');
var Image = require('../models/image');
var Marker = require('../models/marker');
var Markers = require('../models/markers');
var MarkersView = require('./markers');

L.Icon.Default.imagePath = 'static/images/';

function coordinatesToDec(coord) {
  return (coord[0] + coord[1]/60 + coord[2]/3600);
}


module.exports = AmpersandView.extend({
  template: '<div class="map-content"><div id="map"><div class="markers"></div></div></div>',
  /*
   * TODO add file input support
  <input type="file" id="files" name="files[]" class="file-input" multiple />
  events: {
    'change #files': 'handleInput'
  },
  */
  initialize: function() {
    this.markers = new Markers();
  },
  initializeMap: function() {
    this.map = L.map('map').setView(
      [20.7082788,-103.4117612], 17);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  },

  dragOver: function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  },
  handleFileDrop: function(e) {
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files;
    // add files dropped into the container
    for (var i = 0; i < files.length; i += 1) {
      this.addImg(files[i]);
    }
  },

  /*
   * Handle file input button
   */
  handleInput: function(e) {
    // FileList object
    var files = e.target.files;
    for (var i = 0; i < files.length; i += 1) {
      this.addImg(files[i]);
    }
  },

  addImg: function(img) {
    var wrappedImage = new Image({
      image: img
    });
    var marker,
        that = this;
    wrappedImage.getGPSLocation(function(latlong) {
      // image didn't have gps location
      if (latlong === undefined) {
        console.log("Image is missing latitude and longitude");
        return;
      }
      marker = new Marker({
        lat: latlong.lat,
        lng: latlong.lng,
        image: wrappedImage
      });
      that.markers.add(marker);
      that.map.panTo(
        L.latLng(marker.lat, marker.lng), 17);
    });
  },
  render: function() {
    this.renderWithTemplate();
    // file drag n drop
    this.el.addEventListener('dragover', this.dragOver, false);
    this.el.addEventListener('drop', bind(this.handleFileDrop, this), false);
    this.initializeMap();
    var markersView = new MarkersView({
      map: this.map,
      collection: this.markers
    });
    this.renderSubview(markersView, '.markers');
  },
});
