var actualPoint;

if (document.getElementById('mapid') != null) {
  var mymap = L.map("mapid").setView(
    [-34.522898465065765, -58.70039177232011],
    11
  );
  mymap.invalidateSize();

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(mymap);
  mymap.invalidateSize();
}
//ICONO PARA ORGANIZACIONES DESTACADAS
var goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
//ICONO PARA ORGANIZACIONES NO DESTACADAS
var greyIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

//AGREGA UN MARCADOR AL MAPA
function agregarMarcador(coordenadaX, coordenadaY, patrocinador) {
  let marker = L.marker([coordenadaX, coordenadaY],
    { icon: (patrocinador ? goldIcon : greyIcon) }).addTo(mymap);
}

//SE DESPLAZA CUANDO SE SELECCIONA UNA ORGANIZACION
function cambiarUbicacion(coords, title, event) {
  if (actualPoint) {
    mymap.removeLayer(actualPoint);
  }
  mymap.setView(coords, 12);
  //Añade marcador con la informacion del DIV extraida que vuebe en title y conserva el formato con "innerHTML"

  actualPoint = L.marker(coords)
    .addTo(mymap)
    .bindPopup(title.innerHTML)
    .openPopup();
}

