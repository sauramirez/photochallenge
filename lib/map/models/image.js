// Image file wrapper class
var Exif = require('exif-js');
var AmpersandState = require('ampersand-state');
var coordinatesToDec = require('../coord-to-dec');


module.exports = AmpersandState.extend({
  props: {
    image: 'any'
  },
  /*
   * Get the image exif data using exif-js
   */
  getExif: function(cb) {
    var reader = new FileReader();
    reader.onload = function() {
      var exif = Exif.readFromBinaryFile(reader.result);
      return cb(exif);
    };
    reader.readAsArrayBuffer(this.image);
  },
  /*
   * returns coordinates object
   */
  getGPSLocation: function(cb){
    this.getExif(function(exif) {
      if (typeof exif.GPSLatitude !== undefined && exif.GPSLongitude !== undefined) {
        var lat = coordinatesToDec(exif.GPSLatitude, exif.GPSLatitudeRef);
        var lng = coordinatesToDec(exif.GPSLongitude, exif.GPSLongitudeRef);
        return cb({lat: lat, lng: lng});
      }
      return cb(undefined);
    });
  },
  getData: function(cb) {
    var reader = new FileReader();
    reader.onload = function() {
      return cb(reader.result);
    };
    reader.readAsDataURL(this.image);
  },

  /*
   * Create a thumbnail of the image to use less memory
   */
  getThumbnailData: function(width, cb) {
    var reader = new FileReader();
    reader.onload = function() {
      var img = document.createElement('img');
      // get the width coefficient
      img.src = reader.result;
      img.onload = function() {
        var coefficient = img.width / width;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, parseInt(img.height / coefficient));
        var shrinked = canvas.toDataURL('image/jpeg');
        return cb(shrinked);
      };
    };
    reader.readAsDataURL(this.image);
  },
  parse: function(data) {
    return data;
  }
});
