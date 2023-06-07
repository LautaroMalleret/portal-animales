function solicitud() {

  const direccionInput = document.getElementById('direccion');
  const opcionesDiv = document.getElementById('select_direccion');

  const direccion = direccionInput.value;
  let xhttp = new XMLHttpRequest();

  xhttp.open("GET", "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=" + encodeURIComponent(direccion), false);
  xhttp.send();

  if (xhttp.status == 200) {
    let response = JSON.parse(xhttp.response).direccionesNormalizadas;
    // console.log(response)
    mostrarDireccion(response);
  }
  else {
    console.log("error");
  }

}
//OBTIENE LAS COORDENADAS DE UNA DIRECCION PARA LUEGO PODER GRAFICARLO
function obtenerCoordenadas(direccion) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=" + encodeURIComponent(direccion), false);
  xhttp.send();

  if (xhttp.status == 200) {
    let response = JSON.parse(xhttp.response).direccionesNormalizadas;
    // console.log(response);
    return response[0].coordenadas;
  }

  else {
    console.log("error para obtener las coordenadas de la direccion");
  }

}

//muestra las direcciones normalizadas en el front para que el usuario elija una
function mostrarDireccion(response) {
  const opcionesDiv = document.getElementById('select_direccion');
 
  limpiarDirecciones();
  response.forEach(direccion => {
    let select = document.createElement('option');
    select.append(direccion.direccion);
    select.value = direccion.direccion;
    opcionesDiv.appendChild(select);
  });
}

//elimina las direcciones que tiene como opcion el usuario
function limpiarDirecciones() {    //elimino las organizacion que se observan en el front para que no se vean duplicadas
  const div_organizaciones = document.getElementById("select_direccion");
  while (div_organizaciones.firstChild) {
    div_organizaciones.removeChild(div_organizaciones.firstChild);
  }
}