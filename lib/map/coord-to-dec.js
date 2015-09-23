/*
 * Transform a coordinate object into a decimal location
 */
module.exports = function(coord, ref) {
  var latlong = (coord[0] + coord[1]/60 + coord[2]/3600);
  if (ref === 'W' || ref === 'S') {
    return latlong * -1;
  }
  return latlong;
};
