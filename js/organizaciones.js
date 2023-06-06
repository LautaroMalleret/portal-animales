class Organizacion {
    constructor(nombre, tipo, direccion, patrocinador) {
        this._nombre = nombre;
        this._tipo = tipo;
        this.direccion = direccion;
        // this._coordenadaX = coordenadaX;
        // this._coordenadaY = coordenadaY;
        this.patrocinador = patrocinador;
        this.servicio = "";
        this.actividad = "";
    }

    setServicio(servicio) {
        this.servicio = servicio;
    }


    setActividad(actividad) {
        this.actividad = actividad;
    }


    getPatrocinador() {
        return this.patrocinador;
    }
    // Getter y Setter para el atributo "nombre"
    get nombre() {
        return this._nombre;
    }

    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }

    // Getter y Setter para el atributo "tipo"
    get tipo() {
        return this._tipo;
    }

    set tipo(nuevoTipo) {
        this._tipo = nuevoTipo;
    }

    // Getter y Setter para el atributo "coordenadaX"
    get coordenadaX() {
        return this._coordenadaX;
    }

    set coordenadaX(nuevaCoordenadaX) {
        this._coordenadaX = nuevaCoordenadaX;
    }

    // Getter y Setter para el atributo "coordenadaY"
    get coordenadaY() {
        return this._coordenadaY;
    }

    set coordenadaY(nuevaCoordenadaY) {
        this._coordenadaY = nuevaCoordenadaY;
    }

    match(actividad, servicio) { //verifica si la actividad o el servicio por parametro coincide con los de la org
        return this.actividad == actividad || this.servicio == servicio;
    }
}

class Direccion {
    // constructor(nombre) {
    //   this.nombre = nombre;
    //   this.coordenadaX = 0;
    //   this.coordenadaY = 0;
    // }
    constructor(nombre, coordx, coordy) {
        this.nombre = nombre;
        this.coordenadaX = coordx;
        this.coordenadaY = coordy;
    }

    setCoordenadaX(x) {
        this.coordenadaX = x;
    }
    setCoordenadaY(y) {
        this.coordenadaY = y;
    }
}


// CREO LAS ORGANIZACIONES REGISTRADAS PARA MOSTRAR EN EL FRONT 
var nuevaOrganizacion1 = new Organizacion("Somos Mascotas", "Tienda de animales", new Direccion("a", -34.53590200275432, -58.70621350089678), true);
var nuevaOrganizacion2 = new Organizacion("Fundacion Viva La Vida Por El Bienestar Animal", "Protectora de animales", new Direccion("b", -34.5666871221488, -58.63911818036918), false);
var nuevaOrganizacion3 = new Organizacion("Zoonosis de José C. Paz", "Hospital veterinario", new Direccion("c", -34.512869013223266, -58.75508666190319), true);
var nuevaOrganizacion4 = new Organizacion("Organización Mi Fiel Amigo", "Refugio para animales", new Direccion("d", -34.60994654797199, -58.992593545969065), false);
//creo lista de todas las organizaciones

nuevaOrganizacion1.setActividad("rescate");
nuevaOrganizacion2.setActividad("transito");
nuevaOrganizacion3.setActividad("rescate");
nuevaOrganizacion4.setActividad("cuidados");


nuevaOrganizacion1.setServicio("peluqueria");
nuevaOrganizacion2.setServicio("peluqueria");
nuevaOrganizacion3.setServicio("guarderia");
nuevaOrganizacion4.setServicio("paseo");


var _ORGANIZACIONES = [];

_ORGANIZACIONES.push(nuevaOrganizacion1, nuevaOrganizacion2, nuevaOrganizacion3, nuevaOrganizacion4);

localStorage.setItem('_ORGANIZACIONES', JSON.stringify(_ORGANIZACIONES));

function filtrar() {

    const select_actividad = document.getElementById("select-actividad").value;
    const select_servicio = document.getElementById("select-servicio").value;
    //si no se seleciono ningun filtro muestro todas las organizaciones
    if (select_actividad == "todos" && select_servicio == "todos") { mostrar_todas_las_organizaciones(); }
    else {

        var organizacionesFiltradas = [];    //creo lista de organizaciones que cumplen el filtro
        _ORGANIZACIONES.forEach(org => {
            if (org.match(select_actividad, select_servicio)) {   //si coincide la actividad o el servicio
                organizacionesFiltradas.push(org);              //agrego a la lista
            }
        })
        mostrar_organizaciones(organizacionesFiltradas);        //las envio para que se grafiquen
    }
}

function mostrar_organizaciones(listaDeOrganizaciones) {
    limpiarLista(); //quita las organizacion actuales del front
    listaDeOrganizaciones.forEach(org => {
        mostrar_organizacion_en_el_front(org);
    })
}

//Recibe una organizacion por parametro y la grafica en el front, en la lista de org y el mapa
function mostrar_organizacion_en_el_front(org) {

    const div_organizaciones = document.getElementById("listaDeOrganizaciones");
    //agrega el marcador en el mapa
    agregarMarcador(org.direccion.coordenadaX, org.direccion.coordenadaY, org.patrocinador);
    //crea los elementos html
    const h3 = document.createElement('h3');
    h3.textContent = org._nombre;
    const h5 = document.createElement('h5');
    h5.textContent = org._tipo;
    const button = document.createElement('button');
    //concateno el titulo y subtitulo
    button.appendChild(h3);
    button.appendChild(h5);
    //agrego atributos
    button.type = 'button';
    button.classList.add('list-group-item', 'list-group-item-action', 'organizacion');
    button.addEventListener('click', function () { cambiarUbicacion([org.direccion.coordenadaX, org.direccion.coordenadaY], this, event); });
    //agrego el nuevo elemento al front
    div_organizaciones.appendChild(button);
}

function limpiarLista() {    //elimino las organizacion que se observan en el front para que no se vean duplicadas
    const div_organizaciones = document.getElementById("listaDeOrganizaciones");
    while (div_organizaciones.firstChild) {
        div_organizaciones.removeChild(div_organizaciones.firstChild);
    }
}

function mostrar_todas_las_organizaciones() { mostrar_organizaciones(_ORGANIZACIONES); }


function registrar_organizacion() {
    var direccion = document.getElementById('select_direccion').value;
    if (direccion == null || direccion.length === 0) {
        alert("faltan completar campos")
    }
    else {
        // Obtener los valores ingresados por el usuario desde el formulario
        var nombre = document.getElementById('nombre').value;
        var descripcion = document.getElementById('descripcion').value;

        // var horarios = document.getElementById('horarios').value;
        // var telefono = document.getElementById('telefono').value;
        var actividades = document.getElementById('actividades').value;

        var coordenadas = obtenerCoordenadas(direccion);
        console.log(coordenadas);

        // Crear una instancia de la clase Organizacion con los valores ingresados
        var nueva_organizacion = new Organizacion(nombre, descripcion, new Direccion(direccion, coordenadas.x, coordenadas.y), false);
        // console.log(nueva_organizacion);
        //agrego la nueva org al resto
        var _ORGANIZACIONES = JSON.parse(localStorage.getItem('_ORGANIZACIONES')) || [];


        //SOLUCIONAR GUARDAR UNA ORG CUANDO SE CREA NUEVA PQ SE BORRA CUANDO ACTUALIZO PAG


        _ORGANIZACIONES.push(nueva_organizacion);
        // console.log(_ORGANIZACIONES);
        localStorage.setItem('_ORGANIZACIONES', JSON.stringify(_ORGANIZACIONES));

    }
}



