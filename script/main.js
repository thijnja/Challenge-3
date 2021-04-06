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
  map.loadImage('https://raw.githubusercontent.com/thijnja/Challenge-3/e596ada3231828755bf9f24642f33ea786e9473e/images/raket.png', function (error, image) {

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
          'icon-size': 0.19
        }
      });
    }
  );
});


// -------  MUZIEK API --------  //
function getAPIdata() {

  // construct request
  var url = "https://api.musixmatch.com/ws/1.1/";
  var apiKey = "b878392d8486d494f51ed751768bf0b2";
  var artiestZoek = "artist.search?q_artist="
  var artiest = document.getElementById('invoer');
  var zoek = document.getElementById('zoek');
  // construct request
  var requestArtist = url + artiestZoek + artiest + "?" + "apikey=" + apiKey;
  fetch(requestArtist)

  //var requestSearch = 'https://api.musixmatch.com/ws/1.1/track.search?apikey=b878392d8486d494f51ed751768bf0b2';
  //var requestTrack = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=b878392d8486d494f51ed751768bf0b2';

  // get current weather
 //fetch(requestSearch)  
  
  // parse response to JSON format
  .then(function(response) {
    return response.json();
  })
  
  // do something with response
  .then(function(response) {
    // show full JSON object
    console.log(response);
  
    //var weatherBox = document.getElementById('weather');

//var uitkomstNummer = document.getElementById('uitkomst');

    //weatherBox.innerHTML = (response.main.temp - 273.15).toFixed(1) + ' &#730;C <br>' + response.weather[0].description; 
  });
}

getAPIdata();


 














