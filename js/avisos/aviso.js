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
}

//Lee el JSON de avisos y realiza la funcion que recibe por parametro con los avisos
function cargarAvisosDesdeJson(callback) {
  fetch('../../JSON/avisos.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      var lista_Avisos = crearAvisosDesdeJSON(json);
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
    }
  });
  return listaAvisos;
}

//RECIBE UNA LISTA DE AVISOS Y LOS MUESTRA EN EL FRONT
function mostrar_avisos(listaDeAvisos) {
  var contenedorDeAvisos = document.getElementById('contenedorDeAvisos');
  var contenedorDeModales = document.getElementById('modales_de_avisos');
  limpiar_avisos();
  listaDeAvisos.forEach(avisoJSON => {
    contenedorDeAvisos.appendChild(crearAviso(avisoJSON));
    contenedorDeModales.appendChild(crearModal(avisoJSON));
  })
}

//recibe objeto tipo aviso y devueve la informacion en formato html para luego mostrar en el front
function crearAviso(aviso) {
  var colDiv = document.createElement('div');
  colDiv.className = 'col';

  var cardDiv = document.createElement('div');
  cardDiv.className = 'card h-100';
  cardDiv.setAttribute('data-bs-toggle', 'modal');
  cardDiv.setAttribute('data-bs-target', '#modal-' + aviso.mascota.nombre);

  var image = document.createElement('img');
  image.src = aviso.mascota.URLfoto;

  var cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body';

  var title = document.createElement('h3');
  title.textContent = aviso.mascota.nombre;

  var tipoDeAviso = document.createElement('h5');
  tipoDeAviso.textContent = aviso.tipo;

  // Construir la estructura HTML
  cardBodyDiv.appendChild(title);
  cardBodyDiv.appendChild(tipoDeAviso);

  cardDiv.appendChild(image);
  cardDiv.appendChild(cardBodyDiv);

  colDiv.appendChild(cardDiv);

  // Devolver el elemento contenedor completo
  return colDiv;
}

//recibe objeto tipo aviso y devueve la informacion en formato html para luego mostrar en el front como un popup
function crearModal(aviso) {
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('modal', 'fade');
  modalDiv.id = 'modal-' + aviso.mascota.nombre;

  const modalDialogDiv = document.createElement('div');
  modalDialogDiv.classList.add('modal-dialog', 'modal-content');

  // Crear el botón de cierre
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('btn-close');
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');

  // Crear la imagen
  const image = document.createElement('img');
  image.src = aviso.mascota.URLfoto;

  // Crear el título h3
  const title = document.createElement('h3');
  title.classList.add('text-center', 'm-4');
  title.textContent = aviso.mascota.nombre;

  // Crear el párrafo
  const paragraph = document.createElement('p');
  paragraph.classList.add('card-text', 'p-2');
  paragraph.innerHTML = "<b>" + aviso.tipo + "</b>" +
    "<br> <b>contacto: </b>" + aviso.contacto +
    "<br> <b>nombre: </b>" + aviso.mascota.nombre +
    "<br> <b>raza: </b>" + aviso.mascota.raza +
    "<br> <b>edad: </b>" + aviso.mascota.edad +
    "<br> <b>caracteristica: </b>" + aviso.mascota.caracteristicas

  // Agregar los elementos al div modal-dialog
  modalDialogDiv.appendChild(closeButton);
  modalDialogDiv.appendChild(image);
  modalDialogDiv.appendChild(title);
  modalDialogDiv.appendChild(paragraph);

  // Agregar el div modal-dialog al div modal
  modalDiv.appendChild(modalDialogDiv);

  // Devolver el elemento div modal completo
  return modalDiv;
}

//verifica la seleccion en el front y filtra los avisos
function filtrarAvisos() {
  const select_tipo = document.getElementById("select-tipo-aviso").value;
  const select_mascota = document.getElementById("select-tipo-mascota").value;
  //si no se seleciono ningun filtro muestro todas las organizaciones
  if (select_tipo == "todos" && select_mascota == "todos") { mostrarTodosLosAvisos(); }
  else {
    cargarAvisosDesdeJson(mostrar_avisos_filtrados);
  }
}

//filtra los avisos y los envia para mostrar al front
function mostrar_avisos_filtrados(listaDeAvisos) {
  var contenedorDeAvisos = document.getElementById('contenedorDeAvisos');
  const select_tipo = document.getElementById("select-tipo-aviso").value;
  const select_mascota = document.getElementById("select-tipo-mascota").value;

  limpiar_avisos();

  listaDeAvisos.forEach(aviso => {
    if (chequearFiltro(aviso.tipo, aviso.mascota.tipoAnimal, select_tipo, select_mascota)) {
      contenedorDeAvisos.appendChild(crearAviso(aviso));
    }
  })
  if (contenedorDeAvisos.children.length == 0) {
    let mensaje = document.createElement('p');
    mensaje.append("No se encontraron avisos con el filtro solicitado !");
    contenedorDeAvisos.appendChild(mensaje);
  }
}

//chequea que el aviso cumpla el filtro
function chequearFiltro(tipoAviso, tipoMascota, tipoFiltro, mascotaFiltro) {
  if (tipoFiltro == "todos") {
    return (tipoMascota == mascotaFiltro)
  }
  else if (mascotaFiltro == "todos") {
    return (tipoFiltro == tipoAviso);
  }
  else {
    return (tipoAviso == tipoFiltro && tipoMascota == mascotaFiltro)
  }
}

//elimina los avisos en el front para que no se dupliquen
function limpiar_avisos() {
  const div_avisos = document.getElementById("contenedorDeAvisos");
  while (div_avisos.firstChild) {
    div_avisos.removeChild(div_avisos.firstChild);
  }
}