class Organizacion {
    constructor(nombre, tipo, coordenadaX, coordenadaY, patrocinador) {
      this._nombre = nombre;
      this._tipo = tipo;
      this._coordenadaX = coordenadaX;
      this._coordenadaY = coordenadaY;
      this.patrocinador = patrocinador;
      this.servicio = "";
      this.actividad = "";
    }

    setServicio( servicio){
        this.servicio = servicio;
    }

    
    setActividad( actividad){
        this.actividad = actividad;
    }


  getPatrocinador(){
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
  }

    // CREO LAS ORGANIZACIONES REGISTRADAS PARA MOSTRAR EN EL FRONT 
    var nuevaOrganizacion1 = new Organizacion("Somos Mascotas", "Tienda de animales", -34.53590200275432,  -58.70621350089678, true);
    var nuevaOrganizacion2 = new Organizacion("Fundacion Viva La Vida Por El Bienestar Animal", "Protectora de animales",-34.5666871221488,  -58.63911818036918, false);
    var nuevaOrganizacion3 = new Organizacion("Zoonosis de José C. Paz", "Hospital veterinario",-34.512869013223266, -58.75508666190319, true);
    var nuevaOrganizacion4 = new Organizacion("Organización Mi Fiel Amigo", "Refugio para animales",-34.60994654797199,  -58.992593545969065, false);
    //creo lista de todas las organizaciones

    nuevaOrganizacion1.setServicio("peluqueria");
    nuevaOrganizacion2.setServicio("peluqueria");
    nuevaOrganizacion3.setServicio("guarderia");
    nuevaOrganizacion4.setServicio("paseo");

    nuevaOrganizacion1.setActividad("rescate");
    nuevaOrganizacion2.setActividad("transito");
    nuevaOrganizacion3.setActividad("rescate");
    nuevaOrganizacion4.setActividad("venta");
  
    const lista_organizaciones = [];



    lista_organizaciones.push(nuevaOrganizacion1,nuevaOrganizacion2,nuevaOrganizacion3,nuevaOrganizacion4);

function filtrar(){

    const select_actividad = document.getElementById("select-actividad").value;
    const select_servicio = document.getElementById("select-servicio").value;

    const organizaciones = document.getElementsByClassName("organizacion");
    console.log(organizaciones);

    lista_organizaciones.forEach(org => {
        
        // if(org.actividad.) CONSULTAR SI ES DE LA ACTIVIDAD DEL SELECTOR 



        
        agregarMarcador(org._coordenadaX,org._coordenadaY, org.patrocinador);

        const h3 = document.createElement('h3');
        h3.textContent = org._nombre;

        const h5 = document.createElement('h5');
        h5.textContent = org._tipo;
        
        const button = document.createElement('button');

        button.appendChild(h3);
        button.appendChild(h5);
        button.type = 'button';
        button.classList.add('list-group-item', 'list-group-item-action','organizacion');
        button.addEventListener('click',function(){ 
            cambiarUbicacion([org._coordenadaX, org._coordenadaY],this, event);
        });

        organizaciones.appendChild(button);

    })




}


 function cargarOrganizaciones(){



    //agrego las organizaciones al dom
    const organizaciones = document.getElementById("listaDeOrganizaciones");

    lista_organizaciones.forEach(org => {
        
        agregarMarcador(org._coordenadaX,org._coordenadaY, org.patrocinador);

        const h3 = document.createElement('h3');
        h3.textContent = org._nombre;

        const h5 = document.createElement('h5');
        h5.textContent = org._tipo;
        
        const button = document.createElement('button');

        button.appendChild(h3);
        button.appendChild(h5);
        button.type = 'button';
        button.classList.add('list-group-item', 'list-group-item-action','organizacion');
        button.addEventListener('click',function(){ 
            cambiarUbicacion([org._coordenadaX, org._coordenadaY],this, event);
        });

        organizaciones.appendChild(button);

    })
 }








function mostrar_registro(){
    div_register = document.getElementById('form-register');
    div_login = document.getElementById('form-login');

        div_register.style.display="block";
        div_register.className += " animate__animated animate__bounceInRight";
        div_login.style.display="none" ;

    }

function mostrar_login(){
    div_register = document.getElementById('form-register');
    div_login = document.getElementById('form-login');
    
    div_login.style.display="block";
    div_login.className += " animate__animated animate__bounceInLeft";
    div_register.style.display="none" ;

    
    }    

function mostrar_organizaciones(){
    div_organizaciones = document.getElementById('organizaciones');
    div_avisos = document.getElementById('avisos');

    div_organizaciones.style.display="block";
    div_avisos.style.display="none";

    
    }

    function mostrar_avisos(){
        div_organizaciones = document.getElementById('organizaciones');
        div_avisos = document.getElementById('avisos');
    
        div_avisos.style.display="block";
        div_organizaciones.style.display="none";
    
        
        }