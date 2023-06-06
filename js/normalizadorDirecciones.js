function solicitud(){

  
    const direccionInput = document.getElementById('direccion');
    const opcionesDiv = document.getElementById('opciones');
  
    
    const direccion = direccionInput.value;
    // console.log(direccion);
    let xhttp = new XMLHttpRequest();
  
    xhttp.open("GET","http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion="+encodeURIComponent(direccion),false );
    xhttp.send();
  
    if(xhttp.status == 200){
        
        let response = JSON.parse(xhttp.response).direccionesNormalizadas;
        
        // console.log(response)
        mostrarDireccion(response);

      }
      else{
        console.log("error");
      }


    }

    function obtenerCoordenadas(direccion){
        let xhttp = new XMLHttpRequest();
  
        xhttp.open("GET","http://servicios.usig.buenosaires.gob.ar/normalizar/?direccion="+encodeURIComponent(direccion),false );
        xhttp.send();
      
        if(xhttp.status == 200){
            
            let response = JSON.parse(xhttp.response).direccionesNormalizadas;
            
            console.log(response);
            return response[0].coordenadas;
    
          }
          else{
            console.log("error");
          }
    
    }

    function mostrarDireccion(response){
        const opcionesDiv = document.getElementById('select_direccion');
        limpiarDirecciones();
        response.forEach(direccion => {
            let select = document.createElement('option');
            select.append(direccion.direccion);
            select.value=direccion.direccion;
            opcionesDiv.appendChild(select);
        });
    }

    function limpiarDirecciones(){    //elimino las organizacion que se observan en el front para que no se vean duplicadas
        const div_organizaciones = document.getElementById("select_direccion");
        while (div_organizaciones.firstChild) {
            div_organizaciones.removeChild(div_organizaciones.firstChild);
          }
    }