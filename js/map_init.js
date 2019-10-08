/*

	@ File : map_init.js
	@ Author : Hassen Chougar, Service Cartographie du CGET
	@ Date : 10/2019

	@ For : Regions_VRL  -
	@ Main file : index.html

	@ Description : script d'initialisation du conteneur et de la carte Leaflet.
                  C'est ici qu'est paramétrée la carte Leaflet. C'est également
                  ici que sont ajoutés les cercles des DROM.

*/

let mymap;
let reg;

initMap();

function initMap() {
  // FOND
  let basemap_layer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>&copy; <a href="https://carto.com/attributions">Fond cartographique CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19});

  // bloquer le défilement infini de la carte
  let soutWest = L.latLng(55, -23);
  let northEast = L.latLng(37, 26);
  let bounds = L.latLngBounds(soutWest, northEast);
  mymap = L.map('mapid', {
    maxBounds: bounds,
    maxZoom: 11,
    minZoom: 6,
    zoomSnap: 0.25,
    attribution:'CGET - Couleurs Debuf O.'
    // layers:[basemap_layer],
  }).setView([46.5, 6.8], 6,{ animation: true });
  mymap.zoomControl.setPosition('topright');
  mymap.touchZoom.disable();
  mymap.doubleClickZoom.disable();
  mymap.scrollWheelZoom.disable();
  mymap.attributionControl.addAttribution("<a href='https://cartotheque.cget.gouv.fr/cartes' style='text-decoration:none;' target='_blank'>CGET</a> - Couleurs Olivier DEBUF'")

  // CGET LOGO
  L.Control.Watermark = L.Control.extend({
    onAdd: function(mymap) {
        let img = L.DomUtil.create('img');

        img.src = 'css/img/CGET-logotype.png';
        img.href = 'https://cartotheque.cget.gouv.fr/';
        // img.src = 'css/img/cget_logo.svg';
        img.style.width = '100px';

        return img;
    },
    onRemove: function(mymap) {
    }
  });

  L.control.watermark = function(opts) {
      return new L.Control.Watermark(opts);
  };
  L.control.watermark({ position: 'bottomright'}).addTo(mymap);
};

// cercles DROM
let gridCercles;
const cercles_drom = 'data/cercles_drom.geojson';
fetch(cercles_drom)
  .then(response => response.json())
  .then(data => {
    gridCercles = L.geoJSON(data, {
      style: {
          fill:false,
          fillOpacity: 1,
          color: "white",
          weight: 1,
          opacity: 1,
        }
    }).addTo(mymap);
  })

///////////////////////// MOUSEOVER sur les REGIONS ////////////////////////
// surligner les entités sur lesquelles passe la souris
function highlightFeature(e) {
	var layer = e.target;
	layer.setStyle({
		weight: 5,
		color: 'white',
		dashArray: '',
		fillOpacity: 0.7
	});
};

function resetHighlight(e) {
	reg.resetStyle(e.target);
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover:highlightFeature,
    mouseout:resetHighlight
  })
}
