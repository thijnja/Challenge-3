
// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoidGhpam5qYSIsImEiOiJja21sdG9nZTcwOWJvMnBtemtvcms2ZjFoIn0.be4ivbEs_5rye2gH8cC5mg';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/thijnja/ckn8qtyyv0h3l17kkis37l9it',
  center: [-73.9866, 40.7306],
  zoom: 7
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
              coordinates: [-73.9866, 40.7306]
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


// -------  FOTO API --------  //
document.getElementById("zoek").onclick = function getAPIdata() {

  // construct request
  var url = "https://api.teleport.org/api/cities/?search=";

  //var id = "5391959"; 
  //var id = document.getElementById('invoer1').value;

  var stadn = document.getElementById('invoer1').value;
  var stada = document.getElementById('invoer2').value;

  //var request = url + stad;
  var request = url + stadn + "%20" + stada;// + "=" + stadn + "%20" + stada;
  fetch(request) 
  
  // parse response to JSON format
  .then(function(response) {
    return response.json();
  })
  
  // do something with response
  .then(function(response) {
    // show full JSON object
    //console.log(response._embedded["city:search-results"][0].matching_alternate_names[1].name);
    //console.log(response._embedded["city:search-results"][0].matching_alternate_names[1].name);

    var uitkomst = document.getElementById('uitkomst');
    //uitkomst.innerHTML =  response.population + " " + "mensen wonen in" + " " + response.name;
    //uitkomst.innerHTML =  response._embedded["city:search-results"].matching_alternate_names;
    uitkomst.innerHTML = "Ook wel" + " " + response._embedded["city:search-results"][0].matching_alternate_names[1].name + " " + "genoemd." ;
  });
}

// ------ FOTOS LATEN ZIEN -------//
document.getElementById("zoekplaatje").onclick = function getAPIdata() {

  // construct request
  var url = "https://api.teleport.org/api/urban_areas/slug:";

  var stadn = document.getElementById('invoer1').value;
  var stada = document.getElementById('invoer2').value;

  //var request = url + stad;
  
  if(stada == "") {
    var request = url + stadn + "/images/";
    fetch(request) 

    // parse response to JSON format
  .then(function(response) {
    return response.json();
  })
  
  // do something with response
  .then(function(response) {
    // show full JSON object
    //console.log(response._embedded["city:search-results"][0].matching_alternate_names[1].name);
    //console.log(response.photos[0].image.web);
    var img = document.createElement('img');
    img.src  = (response.photos[0].image.web);
    var src = document.getElementById("plaatje");
     
    plaatje.appendChild(img);

  });
   
  } else {
     request = url + stadn + "-" + stada +"/images/";
    fetch(request)
    // parse response to JSON format
  .then(function(response) {
    return response.json();
  })
  
  // do something with response
  .then(function(response) {
    // show full JSON object
    //console.log(response._embedded["city:search-results"][0].matching_alternate_names[1].name);
    //console.log(response.photos[0].image.web);
    var img = document.createElement('img');
    img.src  = (response.photos[0].image.web);
    var src = document.getElementById("plaatje");
     
    plaatje.appendChild(img);

  });
  }
  

}









