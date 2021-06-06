//1. CREAR UNA VARIABLE QUE ALMACENE LA URL DEL SERVICIO DE SPOTIFY


//1. DEFINIR LA URL
let urlPOST = "https://accounts.spotify.com/api/token";

//2. DEFINIR LOS DATOS QUE SE ENVIAN AL SERVIDOR POST
let llave1 = "grant_type=client_credentials";
let llave2 = "client_id=9ae8cdfcf06743ec91c0caf7ebd6e542";
let llave3 = "client_secret=1348b7676f024078a463d46bc6b020f4";


//3. CONSTRUIR LA PETICION

let peticionPOST = {
    method: "POST",
    headers: { "Content-Type": 'application/x-www-form-urlencoded' },
    body: llave1 + '&' + llave2 + '&' + llave3
}

//4.LLAMAR AL SERVIDOR

fetch(urlPOST, peticionPOST)
    .then(function (respuesta) {
        return (respuesta.json())
    })
    .then(function (datos) {

        let token = datos.token_type + " " + datos.access_token;
        console.log(token);
        traerCanciones(token);
    })


//5.CREAR FUNCION  PARA LLAMAR LAS CANCIONES´

function traerCanciones(token) {

    //1.URL
    let URL = "https://api.spotify.com/v1/artists/4q3ewBCX7sLwd24euuV69X/top-tracks?market=US";

    //3. Configurar el metodo http, las cabeceras y el body de la peticion a enviar
    let peticion = {
        method: "GET",
        headers: { Authorization: token }
    }
    //4. Crear un llamado al servidor y le llevamos nuestros parametros
    fetch(URL, peticion)
        .then(function (respuesta) {
            return (respuesta.json())
        })
        .then(function (datosLlegada) {

            console.log(datosLlegada); //ACCEDIANDO AL OBJETO DE LLEGADA
            console.log(datosLlegada.tracks); //arreglo de 10 elementos
            console.log(datosLlegada.tracks[0]);
            console.log(datosLlegada.tracks[0].name);
            console.log(datosLlegada.tracks[0].preview_url);
            console.log(datosLlegada.tracks[0].album.images[0].url);

            let canciones = datosLlegada.tracks;
            pintarDatos(canciones);

        })
}



//5. Pintando las canciones en el HTML
function pintarDatos(canciones) {

    let contenedorPadre = document.getElementById("contenedorPadre");

    //Recorremos el arreglo de canciones:
    canciones.map(function (cancion) {

        //CREO UN DIV CON LA CLASE COL
        let columna = document.createElement('div');
        columna.classList.add("col");

        //CREO UN DIV CON LA CLASE CARD H-100
        let tarjeta = document.createElement('div');
        tarjeta.classList.add("card");
        tarjeta.classList.add("h-100");

        //IMAGEN DE LA TARJETA
        let imagen = document.createElement('img');
        imagen.classList.add("card-img-top");
        imagen.src = cancion.album.images[0].url;

        //TITULO DE LA TARJETA
        let titulo = document.createElement('h3');
        titulo.classList.add("text-center");
        titulo.textContent = cancion.name;

        //CANCION DE LA TARJETA
        let audio = document.createElement('audio');
        audio.classList.add("w-100");
        audio.setAttribute("controls", "");
        audio.src = cancion.preview_url;

        //ANIDAMOS COMPONENTES

        //EL TITULO ESTA POR DENTRO DE LA TARJETA
        tarjeta.appendChild(titulo);

        //LA FOTO ESTA POR DENTRO DE LA TARJETA
        tarjeta.appendChild(imagen);

        //EL AUDIO ESTA DENTRO DE LA TARJETA
        tarjeta.appendChild(audio);

        //LA TARJETA ESTA POR DENTRO DE LA COLUMNA
        columna.appendChild(tarjeta);

        //LA COLUMNA ESTA POR DENTRO DE LA FILA
        contenedorPadre.appendChild(columna);



    });



}

