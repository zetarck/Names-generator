const generar = document.querySelector('#generar-nombre');


//EventListener
generar.addEventListener('submit', cargarNombres);



//Llamado a AJAX e imprimir resultados
function cargarNombres(e) {
    e.preventDefault();
    //Leer las variables. Lee el pais del elemento
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;
    //Lee el genero seleccionado
    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;
    //Devuelve la cantidad de numeros a generar
    const cantidad = document.getElementById('numero').value;
    
    //Construimos la URL
    let url = '';
    //Agrega la URL base
    url += 'https://randomuser.me/api?';
    //Si hay origen agregarlo a la URL
    if (origenSeleccionado !== '') {
        url += `region=${origenSeleccionado}&`;
    }
    //Si hay un genero agregarlo a la URL
    if (generoSeleccionado !== '') {
        url += `gender=${generoSeleccionado}&`;
    }

    //Si hay una cantidad agregarlo a la URL
    if (cantidad !== '') {
        url += `amount=${cantidad}&`;
    }
    //Conectar con AJAX. Iniciamos XMLHTTPRequest
    const xhr = new XMLHttpRequest();
    //Abrimos la conexion
    xhr.open('GET',url, true);
    //Datos e impresion del template
    xhr.onload = function () {
        if (this.status === 200) {
            const nombres = JSON.parse(this.responseText).results;
            //Generar el HTML
            let htmlNombres = '<h2>Nombres Generados </h2>';
            htmlNombres += '<ul class="lista">';
            //Imprimir cada nombre
            nombres.forEach(function(nombre) {
                htmlNombres += `
                    <li>${nombre.name.first} </li>
                `;
            })
            htmlNombres += '</ul>';
            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    };
    xhr.send();
}





