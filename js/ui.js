/*

	@ File : ui.js
	@ Author : Hassen Chougar, Service Cartographie du CGET
	@ Date : 10/2019

	@ For : Regions_VRL
	@ Main file : index.html

	@ Description : script nécessaire à la gestion dynamique de certains éléments
                  d'interface : sidebar, sidepanel, boutons sidebar, fiche
                  territoire, checkboxes, popup "à propos".
                  Certaines des fonctions présentes dans ce fichier sont
                  également appelées au sein du ficher layer_management.js :
                   -> showContent();
                   -> showFiche() et hideFiche();
                   -> showFiche() et hideFiche();

                 A manipuler avec précaution.
*/

/******************************************************************************/
/************************ INTERACTION PANNEAU LATERAL *************************/
/******************************************************************************/
// sidebar buttons
var homeBtn = document.getElementById('homeBtn');
var closeBtn = document.getElementById('closeContent');

// elements to toggle
let panel =  document.getElementById('sidebar-panel');
let featureInfo = document.getElementById("fiche");
let intro = document.getElementById('intro');
// ouvrir la fenetre latérale au chargement
var interval = setInterval(function() {
    if(document.readyState === 'complete') {
        panelSlide();
        clearInterval(interval);
      }
    }, 500);

// sur chaque bouton, appliquer la fonction pour fermer le panneau latéral
[homeBtn,closeBtn].forEach(function (btn) {
  btn.addEventListener('click', function() {
    showContent();
    hideFiche();
  });
})


function showContent() {
  if (panel.style.width === '0%') {
    panelSlide();
  } else {
    closeBtn.style.transform = 'rotate(-180deg)';
    panel.style.width = '0%';
    let t = setInterval(function() {
      mymap.setZoom(5.55);
      mymap.setView([46.5, 3]);
      clearInterval(t)
    },0);
  }
};

function panelSlide() {
  closeBtn.style.transform = 'rotate(0deg)';
  panel.style.width = '35%';
  // déplacement du centre de la carte
  let t = setInterval(function() {
    mymap.setView([46.5, -2])
    clearInterval(t)
  },0);
  if (panel.style.width === '35%') {
    var x = setInterval(function () {
      if (featureInfo.style.display == "block") {
        intro.style.display = 'none';
      } else {
        intro.style.display = 'block'
      }
      clearInterval(x)
    },50);
  }
};

function showFiche() {
  featureInfo.style.display = "block";
  intro.style.display = "none";
};

function hideFiche() {
  featureInfo.style.display = "none";
  intro.style.display = "block";
};

function openPanel() {
    panel.style.width === '30%'
    // panel.style.width === '0%'
}
