var CacheMixin = require('ampersand-local-cache-mixin');
var AmpersandCollection = require('ampersand-collection');
var ms = require('milliseconds');
var Marker = require('./marker');


module.exports = AmpersandCollection.extend(CacheMixin, {
  model: Marker,
  ttl: ms.minutes(5),
  storageKey: 'local-markers',

  initialize: function() {
    this.initStorage();

    this.on('stale empty', this.fetch, this);

    // **note: you have to tell it when to write to storage**
    // otherwise nothing ever gets cached.
    this.on('change', this.writeToStorage, this);
  }
});
