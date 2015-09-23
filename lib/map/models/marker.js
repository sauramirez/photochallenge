// Marker state class
var AmpersandState = require('ampersand-state');


module.exports = AmpersandState.extend({
  props: {
    lat: 'number',
    lng: 'number',
    image: 'any'
  },
});
