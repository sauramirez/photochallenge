Photo Challenge
===============

The photo challenge app allows you to drag and drop images into the map and
it will render the image location if it has been set.

Running the App
===============

You can run the app by opening index.html in your browser. A map should be
displayed and you should be able to drop images into it.

Development
===========

The app was developed using Ampersand, leaflet and browserify. You should
be able to compile the build.js file into the static/js folder by running
`npm install` to install all of the dependencies and
`browserify lib/map-browser.js > static/js/build.js` to compile the app.

TODO
====

* Improve the thumbnail creation
* Defer the creation of the marker popups
* Add the file input button
