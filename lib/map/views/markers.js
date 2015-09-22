// The marker collection view
var AmpersandView = require('ampersand-view');
var L = require('leaflet');


var MarkerView = AmpersandView.extend({
  initialize: function(opts) {
    opts = opts || {};
    this.map = opts.map;
  },
  render: function() {
    // create an empty element to pass ampersand view checks
    this.el = document.createElement('div');
    L.marker([
        this.model.lat, this.model.lng]).addTo(
      this.map);
  }
});


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
