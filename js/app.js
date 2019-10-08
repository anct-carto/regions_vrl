
/******************************************************************************/
/*********************** CONNEXION GOOGLE spreadsheets ************************/
/******************************************************************************/

drawregions();
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
    tabDrive.push(data[i])
  }
}

console.log(tabDrive)

window.addEventListener('DOMContentLoaded', init)

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
        sticky:true,
        direction:'top'
      }).on("click", layer => {
        if (panel.style.width != '35%') {
          showContent();
        }
        insee_reg = layer.layer.feature.properties.insee_reg;
        for (let i in tabDrive) {
          if (insee_reg == tabDrive[i].insee_reg) {
            insee_regDrive = tabDrive[i].insee_reg;
            // affichage block ;
              showFiche();
              // récupération des différentes variables
              region = tabDrive[i].lib_reg;
              contact = info(tabDrive[i].contact);
              contact2 = info(tabDrive[i].contact2);
              contact3 = info(tabDrive[i].contact3);
              structure =  info(tabDrive[i].structure);
              email = info(tabDrive[i].mail) ;
              phone = info(tabDrive[i].tel) ;
              url = urlInfo(tabDrive[i].url);
              tab = [contact,contact2,contact3,structure,email,phone]
              for (let i in tab) {
              // for (let i in tab) {
                if (tab[i] == 'non') {
                  featureInfo.innerHTML ="<h2>"+ region + "</h2>" +"coucou"+ url
                } else {
                  featureInfo.innerHTML = "<h2>"+ region + "</h2>"+
                  pictoContact+"".concat(contact,"</p><p>",contact2,"</p><p>",contact3,"</p>") +
                  "<p>".concat(info(structure),"</p>") +
                  "<p>"+ email + "</p>"+
                  "<p>"+ phone + "</p>"+
                  url
                }
              }
              // bouton retour
              let retour = document.createElement('button');
              retour.id = 'backBtn';
              retour.innerHTML = "<img src='css/img/arrow.svg' width = '20px'>"
              +"<span>Retour à l'accueil</span>";
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
    return "<p>".concat(variable,"</p>")
  } else {
    return ''
  }
}

function urlInfo(url) {
  if (url != 'non') {
    return "<p>Plus d'informations <a href='"+ url +"' target = '_blank'>en suivant ce lien</p>"
  } else {
    return ''
  }
}
