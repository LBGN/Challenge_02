var botonIniciarJuego = document.querySelector("#iniciar-juego");
var botonVerificar = document.querySelector("#verificar-letra");
var botonJugarDeNuevo = document.querySelector("#jugar-de-nuevo");
var resultado = document.querySelector("#resultado");
var input = document.querySelector("#ingresar-letra");
var palabraExhibida = document.getElementById("palabra-sorteada");
var letrasIncorrectas = document.querySelector("#letras-incorrectas");

var listaPalabras = ["rinoceronte","maceta","ventana","billete","caballo","milanesa","flamenco","hormiga","folklore","lampara","rotula","sabado","insecto","monologo"];
var numeroAzar = numeroRandom();
var listaLetrasIncorrectas = [];
var listaLetrasCorrectas = [];
var intentos = 0;

// FUNCIONES PRINCIPALES
// inicia el juego
function iniciaJuego(){
    var letrasPalabra = sorteo(numeroAzar);

    resultado.innerHTML = "<p>adiviná la palabra</p>"+"<p>de lo contrario</p>"+"<p>el hombrecito será ahorcado</p>";

    baseAhorcado ();

    cuadritosCompletar(letrasPalabra);

    inputyBoton();
}

// captura y valida input
function ingresaLetra(){
    var letraAux = input.value;
    var letra = letraAux.toLowerCase();
    input.value = "";
    input.focus();

    if(!validacion(letra)){
        inputValidado(letra);
    }
}

// jugar de nuevo
function jugarDeNuevo(){
    var letrasPalabra = sorteo(numeroAzar);

    // borrar palabra anterior
    borrarTh(letrasPalabra);

    // borrar listas
    listaLetrasIncorrectas.splice(0);
    listaLetrasCorrectas.splice(0);

    // borrar textos laterales
    resultado.textContent = "";
    letrasIncorrectas.textContent = "";
    letrasIncorrectas.style.backgroundImage = "";

    // sortea nueva palabra
    numeroAzar = numeroRandom();
    letrasPalabra = sorteo(numeroAzar);

    reiniciar ();

    baseAhorcado ();

    cuadritosCompletar(letrasPalabra);

    inputyBoton()
}

// LLAMADAS A LAS FUNCIONES PRINCIPALES
botonIniciarJuego.addEventListener("click", iniciaJuego);

botonVerificar.addEventListener("click", ingresaLetra);

botonJugarDeNuevo.addEventListener("click", jugarDeNuevo);



// FUNCIONES AUXILIARES
// complementarias al inicio de juego
    // sortea número aleatorio
function numeroRandom(){
    var random = Math.floor((Math.random() * (listaPalabras.length - 0 )) + 0);
    return random;
}
    // sortea palabra
function sorteo(numero){
    var palabraSorteada = listaPalabras[numero];
    var letrasPalabra = palabraSorteada.split("");
    return letrasPalabra;
}
    //aparecen cuadritos por cada letra de la palabra sorteada:
function cuadritosCompletar(letrasPalabra){
    for(i = 0; i < letrasPalabra.length; i++){
        var th = document.createElement("th");
        th.classList.add(letrasPalabra[i]+i);
        palabraExhibida.appendChild(th);
        th.textContent = " _ ";
    }
}
    //aparece el input y el boton para ingresar texto:
function inputyBoton(){
    input.classList.remove("invisible");
    input.classList.add("inputClass");
    input.focus();
    botonVerificar.classList.remove("invisible");
    botonVerificar.classList.add("btn");
    botonIniciarJuego.disabled = true;
    botonIniciarJuego.classList.remove("btn");
    botonIniciarJuego.classList.add("btn2");
}
// desaparece input y boton de inicio al final del juego
function inputyBotonFin(){
    input.classList.add("invisible");
    botonVerificar.classList.add("invisible");
    botonIniciarJuego.classList.remove("btn");
    botonIniciarJuego.classList.add("invisible");
    botonJugarDeNuevo.classList.remove("invisible");
    botonJugarDeNuevo.classList.add("btn");
}
    // borrar th
function borrarTh(letrasPalabra){
    for(i = 0; i < letrasPalabra.length; i++){
        var th = document.querySelector("."+letrasPalabra[i]+i);
        th.classList.remove(letrasPalabra[i]+i);
        palabraExhibida.removeChild(th);
    }
}

// generales de validación
    //funcion input correcto, validado
function inputValidado(letra){
    var letrasPalabra = sorteo(numeroAzar);

        //aparece la letra en las celdas
    if(letrasPalabra.includes(letra)){
        for(i=0;i <= letrasPalabra.length; i++){
            if(letra == letrasPalabra[i]){
                var th = document.querySelector("."+letra+i);
                th.textContent = letrasPalabra[i];
                listaLetrasCorrectas.push(letra);

                if(listaLetrasCorrectas.length == letrasPalabra.length){
                    // resultado GANASTE
                    resultado.textContent = "GANASTE!";
                    inputyBotonFin();
                }else{
                    resultado.textContent = "";
                }
            }
        }
    }else{
        if(listaLetrasIncorrectas.length <= 4){
        //aparecen letras incorrectas
        listaLetrasIncorrectas.push(letra);
        letrasIncorrectas.textContent = listaLetrasIncorrectas.join(" ");
        letrasIncorrectas.style.backgroundImage = "url(letras-incorrectas.jpg)";
        letrasIncorrectas.style.backgroundRepeat = "no-repeat";
        letrasIncorrectas.style.backgroundPosition = "top";
        }else{
            // resultado PERDISTE
            var palabraSorteada = letrasPalabra.join(" ");
            resultado.innerHTML = "<P>PERDISTE<p>"+"<p>la palabra era <p>" + palabraSorteada.toUpperCase();
            listaLetrasIncorrectas.push(letra);
            letrasIncorrectas.textContent = listaLetrasIncorrectas.join(" ");
            inputyBotonFin();
        }
        intentos = listaLetrasIncorrectas.length;
        ahorcado(intentos);
    }
}
    //funcion que engloba todas las validaciones y mensajes de error
function validacion(letra){
    var inputValidaCorrectoRepetido = validaInputCorrectoRepetido(letra);
    var inputValidaIncorrectoRepetido = validaInputIncorrectoRepetido(letra);
    var inputValidaLongitud = validaInputlargo(letra);
    var inputValidaNumero = validaInputNumero(letra);
    var inputValidaCaracterEsp = validaInputCaracteresEspeciales(letra);

    if(!inputValidaCorrectoRepetido){
        resultado.innerHTML = "<p>ya esta puesta esa <br/><br/> probá otra<p>";
    }

    if(!inputValidaIncorrectoRepetido){
        resultado.innerHTML = "<p>ya escribiste la letra <p>" + letra + "<p> y encima no está en la palabra...<p>";
    }

    if(!inputValidaLongitud){
        resultado.innerHTML = "<p> escribiste mas de un caracter <br/><br/> calmate <br/><br/> escribí una sola letra por favor </p>";
    }

    if(!inputValidaNumero){
        resultado.textContent = "eso es un número";
    }

    if(!inputValidaCaracterEsp){
        resultado.innerHTML  = "<p> bueh cualquier pavada <br/><br/> escribí una letra por favor </p>";
    }

    if(!inputValidaCorrectoRepetido || !inputValidaLongitud || !inputValidaIncorrectoRepetido || !inputValidaNumero || !inputValidaCaracterEsp){
        return true;
    }else{
        return false;
    }
}
    //funciones de validacion del input
        //letra correcta repetida
function validaInputCorrectoRepetido(letra){
    if(listaLetrasCorrectas.includes(letra)){
        return false;
    }else{
        return true;
    }
}
        //letra incorrecta repetida
function validaInputIncorrectoRepetido(letra){
    if(listaLetrasIncorrectas.includes(letra)){
        return false;
    }else{
        return true;
    }
}
        //mas de una letra
function validaInputlargo(letra){
    if(letra.length>1){
        return false;
    }else{
        return true;
    }
}
        //numeros
function validaInputNumero (letra){
    if(letra = (parseInt(letra)>=0)){
        return false;
    }else{
        return true;
    }
}
        //caracteres especiales
function validaInputCaracteresEspeciales (letra){
    var tipo = /[A-Za-z0-9]/;
    var validaTipo = tipo.test(letra);

    if(!validaTipo){
        return false;
    }else{
        return true;
    }
}

// si se usa enter en lugar de click para ingresar letra
input.addEventListener("keyup",function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        botonVerificar.click();
    }
})