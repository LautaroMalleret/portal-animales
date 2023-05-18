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