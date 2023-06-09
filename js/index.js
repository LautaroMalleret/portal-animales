
function mostrar_registro() {
  div_register = document.getElementById('form-register');
  div_login = document.getElementById('form-login');

  div_register.style.display = "block";
  div_register.className += " animate__animated animate__bounceInRight";
  div_login.style.display = "none";

}

function mostrar_login() {
  div_register = document.getElementById('form-register');
  div_login = document.getElementById('form-login');

  div_login.style.display = "block";
  div_login.className += " animate__animated animate__bounceInLeft";
  div_register.style.display = "none";


}

function mostrar_apartado_organizaciones() {
  div_organizaciones = document.getElementById('organizaciones');
  div_avisos = document.getElementById('avisos');

  // div_organizaciones.style.visibility = 'visible';
  // div_organizaciones.style.position='static';
  div_organizaciones.style.display = "block";
  div_avisos.style.display = "none";


}

function mostrar_apartado_avisos() {
  div_organizaciones = document.getElementById('organizaciones');
  div_avisos = document.getElementById('avisos');

  // div_organizaciones.style.visibility = 'hidden';
  // div_organizaciones.style.position='absolute';
  div_avisos.style.display = "block";
  div_organizaciones.style.display = "none";


}