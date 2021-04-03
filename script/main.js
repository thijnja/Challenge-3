// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoidGhpam5qYSIsImEiOiJja21sdG9nZTcwOWJvMnBtemtvcms2ZjFoIn0.be4ivbEs_5rye2gH8cC5mg';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.322840, 52.067101],
  zoom: 11.15
});


var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

// Voeg de zoekbalk toe
map.addControl( geocoder, 'top-right');

map.on('load', function () {
	// Listen for the `geocoder.input` event that is triggered when a user
	// makes a selection
	geocoder.on('result', function (ev) {
    console.log(ev.result.center);
	  document.getDocumentById.inner.html = ev.result.center[0] +' - '+ ev.result.center[1];
	getAPIdata(ev.result.center[0], ev.result.center[1]);
  });
});

// wacht tot de map en styles geladen zijn
map.on('load', function () {

  // laad een extern bestand
  map.loadImage('https://github.com/thijnja/Challenge-3/blob/e596ada3231828755bf9f24642f33ea786e9473e/images/raket.png', function (error, image) {

      // voeg image toe
      map.addImage('raket', image);

      // defineer een punt in het geheugen
      map.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [4.32284, 52.067101]
            }
          }]
        }
      });

      // plak de nieuwe source 'point' op de kaart in een eigen layer
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'point',
        layout: {
          'icon-image': 'raket',
          'icon-size': 0.25
        }
      });
    }
  );
});
