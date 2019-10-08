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
drawregions();

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
  // contrôle zoom avec bouton de réinitialisation de vue
  // mymap.addControl(new L.Control.ZoomMin({position:'topright'}))

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
        // Nothing to do here
    }
  });

  L.control.watermark = function(opts) {
      return new L.Control.Watermark(opts);
  };
  L.control.watermark({ position: 'bottomright'}).addTo(mymap);
    // guyane
    // fetch('data/guyane.geojson')
    //   .then(res => res.json())
    //   .then(guyane => {
    //     gridGuyane = L.vectorGrid.slicer(guyane, {
    //       rendererFactory: L.canvas.tile,
    //       vectorTileLayerStyles: {
    //         sliced: {
    //           fill:true,
    //           fillColor: '#fafaf8',
    //           fillOpacity: 1,
    //           color:'white',
    //           weight:2,
    //           opacity:1
    //         }
    //       },
    //       interactive:false
    //     }).addTo(mymap);
    //   });
};

/******************************************************************************/
/*********************** CONNEXION GOOGLE spreadsheets ************************/
/******************************************************************************/


//Chargement tableau de données google sheet
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ZCMzIqMnkw8I9fPtN8pOxgyRx_oQv1kneZxVtfjggRs/edit#gid=0';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  })
}

tabDrive = [];

function showInfo(data, tabletop) {
  for (var i in data){
    // console.log(data[i]);
    tabDrive.push(data[i])
  }
}

console.log(tabDrive)

window.addEventListener('DOMContentLoaded', init)

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

let pictoContact = "<img  class = 'picto' src='css/img/contact.svg'/>"
let pictoStrucutre = "<img  class = 'picto' src='css/img/structure.svg'/>"
let pictoPhone = "<img  class = 'picto' src='css/img/telephone.svg'/>"
let pictoEmail = "<img  class = 'picto' src='css/img/email.svg'/>"
let pictoLink = "<img class = 'picto'  src='css/img/link.svg'/>"

/******************************************************************************/
/************************** REGIONS **************************/
/******************************************************************************/

function drawregions() {
  fetch('data/reg.geojson')
    .then(res => res.json())
    .then(res => {
      features = res;
      console.log(features);
      reg = L.geoJSON(res, {
        style: function(feature) {
          // couleurs olivier debuf par région
          switch (feature.properties.insee_reg) {
            case "01": return {fillColor:"#d1bd60",fillOpacity:"1",weight:"1",color:"white"};
            case "02": return {fillColor:"#caa974",fillOpacity:"1",weight:"1",color:"white"}
            case "03": return {fillColor:"#be9054",fillOpacity:"1",weight:"1",color:"white"}
            case "04": return {fillColor:"#ac675b",fillOpacity:"1",weight:"1",color:"white"}
            case "06": return {fillColor:"#ca4965",fillOpacity:"1",weight:"1",color:"white"}
            case "11": return {fillColor:"#799ba1",fillOpacity:"1",weight:"1",color:"white"}
            case "24": return {fillColor:"#99b669",fillOpacity:"1",weight:"1",color:"white"}
            case "27": return {fillColor:"#85aa64",fillOpacity:"1",weight:"1",color:"white"}
            case "28": return {fillColor:"#809dd1",fillOpacity:"1",weight:"1",color:"white"}
            case "32": return {fillColor:"#7295aa",fillOpacity:"1",weight:"1",color:"white"}
            case "44": return {fillColor:"#709c80",fillOpacity:"1",weight:"1",color:"white"}
            case "52": return {fillColor:"#6e75ac",fillOpacity:"1",weight:"1",color:"white"}
            case "53": return {fillColor:"#545190",fillOpacity:"1",weight:"1",color:"white"}
            case "75": return {fillColor:"#67538b",fillOpacity:"1",weight:"1",color:"white"}
            case "76": return {fillColor:"#83608e",fillOpacity:"1",weight:"1",color:"white"}
            case "84": return {fillColor:"#a0799e",fillOpacity:"1",weight:"1",color:"white"}
            case "93": return {fillColor:"#b06780",fillOpacity:"1",weight:"1",color:"white"}
            case "94": return {fillColor:"#bc7e94",fillOpacity:"1",weight:"1",color:"white"}
          };
        },
        onEachFeature:onEachFeature
      }).bindTooltip(function(layer) {
        return layer.feature.properties.lib_reg;
      },
      {
        className:"tooltip",
        sticky:true
      }).on("click", layer => {
        console.log(layer.layer.feature.properties.insee_reg);
        insee_reg = layer.layer.feature.properties.insee_reg;
        for (let i in tabDrive) {
          if (insee_reg == tabDrive[i].insee_reg) {
            insee_regDrive = tabDrive[i].insee_reg;
            // affichage block ;
              if (panel.style.width != '35%') {
                showContent();
              }
              showFiche();
              // récupération des différentes variables
              region = tabDrive[i].lib_reg;
              contact = info(tabDrive[i].contact);
              contact2 = info(tabDrive[i].contact2);
              contact3 = info(tabDrive[i].contact3);
              structure =  info(tabDrive[i].structure);
              email = info(tabDrive[i].mail) ;
              phone = info(tabDrive[i].tel) ;
              url = info(tabDrive[i].url);
              tab = [contact,contact2,contact3,structure,email,phone]
              for (let i in tab) {
                if (tab[i] == 'non') {
                  featureInfo.innerHTML ="<h2>"+ region + "</h2>"+
                  "<p>Retrouvez les dates de formation et les contacts pour vous y inscrire <b><a href = '"+
                  url+"' target = '_blank'>ici</a></b></p>";
                } else {
                  featureInfo.innerHTML = "<h2>"+ region + "</h2>"+
                  pictoContact+"".concat(contact,"</p><p>",contact2,"</p><p>",contact3,"</p>") +
                  "<p>".concat(info(structure),"</p>") +
                  "<p>"+email + "</p>"+
                  "<p>"+phone + "</p>"+
                  "<p>Plus d'informations <b><a href = '"+url+"' target = '_blank'>ici</a></b></p>";
                }
              }
              // bouton retour
              let retour = document.createElement('button');
              retour.id = 'backBtn';
              retour.innerHTML = "<img src='css/img/arrow.svg' width = '25px'>"+'<span>Retour</span>';
              featureInfo.appendChild(retour);
              retour.addEventListener("click", function() {
                hideFiche();
              })
          }
        }
      }).addTo(mymap)
    })
};

function info(variable) {
  if (variable != 'non') {
    return variable
  } else {
    return ''
  }
}

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
