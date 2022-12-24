const minRadius = 3;

// Create the map
const center = [44.8650, 3.084];
const map = leaflet.map('map').setView(center, 10);

// Set up the OSM layer
leaflet.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Basemap (c) <a href="http://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);


function changeRadius(aCircle, nb) {
    console.log(aCircle)
    newRadius = parseInt(Math.max(aCircle.getRadius() + nb, minRadius));
    aCircle.setRadius(newRadius);
    if (pancheck.checked) map.fitBounds(aCircle.getBounds());
}

function setBtnsCircle(aCircle){
    btnRadiusMore.onclick = () => changeRadius(aCircle, 5);
    btnRadiusPlus.onclick = () => changeRadius(aCircle, 1);
    btnRadiusMinus.onclick = () => changeRadius(aCircle, -1);
    btnRadiusLess.onclick = () => changeRadius(aCircle, -5);
}

let btnRadiusMore = document.createElement('button');
btnRadiusMore.textContent = "++";
let btnRadiusPlus = document.createElement('button');
btnRadiusPlus.textContent = "+";
let btnRadiusMinus = document.createElement('button');
btnRadiusMinus.textContent = "-";
let btnRadiusLess = document.createElement('button');
btnRadiusLess.textContent = "--";

let btnDiv = document.createElement('div')
btnDiv.append(btnRadiusMore)
btnDiv.append(btnRadiusPlus)
btnDiv.append(btnRadiusMinus)
btnDiv.append(btnRadiusLess)

//////////////////////////////////

const infobox = document.getElementById("pos");
const pancheck = document.getElementById("pancheck");

var content = btnDiv;
var popup = leaflet.popup({closeOnClick: false}).setContent(content);



map.on("click", function(e) {
  if (popup.isOpen()) {
    popup.close();
  }
  else {
    new PigeonSound(e.latlng);
    updateTableInfo(PigeonSound.all);
  }
});
