// // Importar archivo2.js
// var script = document.createElement('script');
// script.src = 'Mascota.js';
// document.head.appendChild(script);

class Mascota {
  constructor(nombre, raza, edad, caracteristicas, tipoAnimal, URLfoto) {
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
    this.caracteristicas = caracteristicas;
    this.tipoAnimal = tipoAnimal;
    this.URLfoto = URLfoto;
  }
}

class Aviso {
  constructor(tipo, contacto, fechaPublicacion, estado, mascota) {
    this.id,
      this.tipo = tipo;
    this.contacto = contacto;
    this.fechaPublicacion = fechaPublicacion;
    this.estado = estado;
    this.mascota = mascota;
  }
}

class AvisoBusqueda extends Aviso {
  constructor(tipo, contacto, fechaPublicacion, estado, mascota, direccion, fechaSuceso) {
    super(tipo, contacto, fechaPublicacion, estado, mascota);
    this.direccion = direccion;
    this.fechaSuceso = fechaSuceso;
  }
}

class AvisoAdopcion extends Aviso {
  constructor(tipo, contacto, fechaPublicacion, estado, mascota, detalles) {
    super(tipo, contacto, fechaPublicacion, estado, mascota);
    this.detalles = detalles;
  }
}


function mostrarTodosLosAvisos() {
  cargarAvisosDesdeJson(mostrar_avisos)
  // lista_todos_avisos = cargarAvisosDesdeJson();
  // console.log(lista_todos_avisos);
  // mostrar_avisos(lista_todos_avisos);
}

//devuelve todos los avisos del json en una lista
function cargarAvisosDesdeJson(callback) {
  fetch('../../JSON/avisos.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      // console.log("okkkkkkkkk")
      var lista_Avisos = crearAvisosDesdeJSON(json);
      // console.log(lista_Avisos);
      // console.log(216516);
      callback(lista_Avisos);

    })
    .catch(function (error) {
      console.log('Error al cargar el archivo JSON:', error);
    });

}

//recibe un json y crea los objetos avisos y los devuelve en una lista
function crearAvisosDesdeJSON(json) {
  var listaAvisos = [];

  json.avisos.forEach(function (aviso) {
    if (aviso.tipo === "encontrado" || aviso.tipo === "perdido") {
      var avisoBusqueda = new AvisoBusqueda(
        aviso.tipo,
        aviso.datosContacto,
        aviso.fechaPublicacion,
        aviso.estado,
        new Mascota(aviso.perfilMascota.nombre,
          aviso.perfilMascota.raza,
          aviso.perfilMascota.edad,
          aviso.perfilMascota.caracteristicas,
          aviso.perfilMascota.tipo,
          aviso.perfilMascota.URLfoto),
        aviso.direccion,
        aviso.fechaSuceso
      );
      listaAvisos.push(avisoBusqueda);
      // console.log(avisoBusqueda)
    }
    else if (aviso.tipo === "adopcion") {
      var avisoAdopcion = new AvisoAdopcion(
        aviso.tipo,
        aviso.datosContacto,
        aviso.fechaPublicacion,
        aviso.estado,
        new Mascota(aviso.perfilMascota.nombre,
          aviso.perfilMascota.raza,
          aviso.perfilMascota.edad,
          aviso.perfilMascota.caracteristicas,
          aviso.perfilMascota.tipo,
          aviso.perfilMascota.URLfoto),
        aviso.detalles
      );
      listaAvisos.push(avisoAdopcion);
      // console.log(avisoAdopcion)
    }
  });
  // console.log(listaAvisos);
  return listaAvisos;
}


//RECIBE UNA LISTA DE AVISOS Y LOS MUESTRA EN EL FRONT
function mostrar_avisos(listaDeAvisos) {
  var contenedorDeAvisos = document.getElementById('contenedorDeAvisos');

  listaDeAvisos.forEach(avisoJSON => {
    // console.log(avisoJSON);
    contenedorDeAvisos.appendChild(crearAviso(avisoJSON));
  })
}


function crearAviso(aviso) {

  var colDiv = document.createElement('div');
  colDiv.className = 'col';

  var cardDiv = document.createElement('div');
  cardDiv.className = 'card h-100';
  cardDiv.setAttribute('data-bs-toggle', 'modal');
  cardDiv.setAttribute('data-bs-target', '#exampleModal');

  var image = document.createElement('img');
  image.src = aviso.mascota.URLfoto;

  var cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body';

  var title = document.createElement('h3');
  title.textContent = aviso.mascota.nombre;

  var tipoDeAviso = document.createElement('h5');
  title.textContent = aviso.tipo;


  // Construir la estructura HTML
  cardBodyDiv.appendChild(title);
  cardBodyDiv.appendChild(tipoDeAviso);

  cardDiv.appendChild(image);
  cardDiv.appendChild(cardBodyDiv);

  colDiv.appendChild(cardDiv);

  // Devolver el elemento contenedor completo
  return colDiv;
}













function filtrarAvisos() {

  const select_tipo = document.getElementById("select-tipo-aviso").value;
  const select_mascota = document.getElementById("select-tipo-mascota").value;
  //si no se seleciono ningun filtro muestro todas las organizaciones
  if (select_tipo == "todos" && select_mascota == "todos") { mostrarTodosLosAvisos(); }
  else {

    cargarAvisosJsonParaFiltrar();

  }
}


function mostrar_avisos_filtrados(listaDeAvisos) {
  var contenedorDeAvisos = document.getElementById('contenedorDeAvisos');
  const select_tipo = document.getElementById("select-tipo-aviso").value;
  const select_mascota = document.getElementById("select-tipo-mascota").value;

limpiar_avisos();

  listaDeAvisos.forEach(aviso => {
    if (chequearFiltro(aviso.tipo, aviso.mascota.tipoAnimal, select_tipo, select_mascota)) {
      console.log(aviso.mascota.nombre);
      contenedorDeAvisos.appendChild(crearAviso(aviso)); 
     }
    // console.log(avisoJSON);
  })

  if(contenedorDeAvisos.children.length == 0){
    let mensaje = document.createElement('p');
    mensaje.append("No se encontraron avisos con el filtro solicitado !");
    contenedorDeAvisos.appendChild(mensaje);
  }
}

function chequearFiltro(tipoAviso, tipoMascota, tipoFiltro, mascotaFiltro){
  console.log(tipoAviso, tipoFiltro, tipoMascota,mascotaFiltro );

  if(tipoFiltro == "todos"){
    return (tipoMascota == mascotaFiltro)
  }
  else if(mascotaFiltro == "todos"){
    return (tipoFiltro == tipoAviso);
  }
  else{
    return (tipoAviso == tipoFiltro && tipoMascota == mascotaFiltro)
  }


}

function cargarAvisosJsonParaFiltrar() {
  fetch('../../JSON/avisos.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      // console.log("okkkkkkkkk")
      var lista_Avisos = crearAvisosDesdeJSON(json);
      // console.log(lista_Avisos);
      // console.log(216516);
      mostrar_avisos_filtrados( lista_Avisos);
    })
    .catch(function (error) {
      console.log('Error al cargar el archivo JSON:', error);
    });

}


function limpiar_avisos(){
  const div_avisos = document.getElementById("contenedorDeAvisos");
  while (div_avisos.firstChild) {
      div_avisos.removeChild(div_avisos.firstChild);
  }
}