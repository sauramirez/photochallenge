// The marker collection view
var AmpersandView = require('ampersand-view');
var L = require('leaflet');


// TODO Add the ability to remove markers
var MarkerView = AmpersandView.extend({
  initialize: function(opts) {
    opts = opts || {};
    this.map = opts.map;
  },
  render: function() {
    // create an empty element to pass ampersand view checks
    this.el = document.createElement('div');
    var that = this;
    this.marker = L.marker([
        this.model.lat, this.model.lng]).addTo(
      this.map);
    this.model.image.getThumbnailData(300, function(data) {
      // binding popup here seemed to have less issues
      // TODO see if we can defer this until the marker is clicked
      that.marker.bindPopup('<div class="popup-container"><img class="popup" src="' + data + '"></img></div>');
    });
  }
});


/*
 * The collection view that will render all of the collection markers
 */
module.exports = AmpersandView.extend({
  initialize: function(opts) {
    opts = opts || {};
    this.map = opts.map;
  },
  render: function() {
    this.el = document.createElement('div');
    this.renderCollection(this.collection, MarkerView, this.el, {
      viewOptions: {
        map: this.map
      }
    });
  }
});
