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
  var mensaj = document.createElement('li');
  mensaj.append("Se encontraron las siguiente direcciones disponibles, Por favor especifique nuevamente la direccion que desea utilizar ingresando nombre de la calle, altura y partido.");
  mensaj.style.listStyleType= "none";
  mensaj.id="mensaje";
  mensaj.style.fontWeight="bold";
  mensaj.style.color="black";

  opcionesDiv.appendChild(mensaj);
  
  response.forEach(direccion => {
    if(direccion.tipo == 'calle_altura'){
      let select = document.createElement('li');
      select.append(direccion.direccion);
      select.id="direccion-normalizada";
      select.value= direccion.direccion;
      opcionesDiv.appendChild(select);
    }
  });
  if(opcionesDiv.children.length==1){
    let mensaje = document.getElementById('mensaje');
    mensaje.style.color="red";
    mensaje.textContent="No se encontraron direcciones que coincidan,verifique que la direccion ingresada contenga el nombre de la calle, la altura y el partido";
    // opcionesDiv.appendChild(mensaje);
  }
  if(opcionesDiv.children.length==2){
    let mensaje = document.getElementById('mensaje');
    mensaje.style.color="green";
    mensaje.textContent="La direccion ingresada es correcta! continue con el formulario.";
  }
}

//elimina las direcciones que tiene como opcion el usuario
function limpiarDirecciones() {    //elimino las organizacion que se observan en el front para que no se vean duplicadas
  const div_organizaciones = document.getElementById("select_direccion");
  while (div_organizaciones.firstChild) {
    div_organizaciones.removeChild(div_organizaciones.firstChild);
  }
}