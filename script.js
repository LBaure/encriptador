const textArea = document.querySelector('.text-area');
const mensaje = document.querySelector('.mensaje-procesado')
const btnEncriptar = document.querySelector('#btnEncriptar');
const btnDescencriptar = document.querySelector('#btnDescencriptar');
const btnBorrar = document.querySelector('.boton-borrar');
let procesoRealizar = 'encriptar' // encriptar | desencriptar

const matrizCodigo = [
  ['e', 'enter'],
  ['i', 'imes'],
  ['a', 'ai'],
  ['o', 'ober'],
  ['u', 'ufat']
]


// Este bloque de codigo sirve para aumentar el tamaño del textarea
// de forma dinamica, cuando va creciendo se le va asignando el alto.
textArea.addEventListener("input", OnInput, false);

function OnInput() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + "px";
}

// Este bloque de codigo limitamos a que el textarea acepte caracteres
// especiales, numeros y mayusculas
textArea.addEventListener("input", (event) => {  
  const inputValue = event.target.value;
  const ultimoCaracter = inputValue.slice(-1);
  const caracteresPermitidos = ultimoCaracter  === " " || /^[a-z]{1}$/.test(ultimoCaracter);
  if (inputValue.length && !caracteresPermitidos ) {
    alerta("Solo se permiten letras minúsculas y espacios, sin caracteres especiales y sin acentos", 'error');
    event.preventDefault();
    event.target.value = inputValue.slice(0, -1); 
  }
});

function elegirOperacion(botonRemoverClase, botonAgregarClase, tipoProceso) {
  procesoRealizar = tipoProceso
  // ********************** Cambia el texto del boton del mensaje **********************
  let complemento = procesoRealizar === 'encriptar' ? 'Encriptado' : 'Descencriptado'
  document.querySelector('#botonValorProceso').innerHTML = `Texto ${complemento}`
  // ***********************************************************************************
  removeClass(botonRemoverClase);
  addClass(botonAgregarClase);
  procesar();
}

function removeClass(boton) {
  let botonRemover = document.querySelector(`#${boton}`);
  if (botonRemover.className.includes('active')) {
    botonRemover.classList.remove('active')
  }  
}

function addClass(boton) {
  let botonAgregar = document.querySelector(`#${boton}`);
  if (!botonAgregar.className.includes('active')) {
    botonAgregar.classList.add('active')
  }
}


function procesar() {
  // muestra/oculta el boton para borrar el contenido del textarea
  if (textArea.value) {
    btnBorrar.style.display = 'flex';
    document.querySelector('.contenido-encriptado').style.backgroundImage ='none'
  } else {
    btnBorrar.style.display = 'none';
    document.querySelector('.contenido-encriptado').style.backgroundImage ='url(imagenes/undraw_file_searching_re_3evy.svg)'
  }

  if (procesoRealizar === 'encriptar') {
    encriptarTexto();
  } else {
    desencriptarTexto();
  }
}


function encriptarTexto() {
  let valorTextArea = textArea.value;
  valorTextArea = valorTextArea.toLowerCase();

  for(let i = 0; i < matrizCodigo.length; i++){
    // condicion para validar si el valorTextArea estan dentro del array
    if (valorTextArea.includes(matrizCodigo[i][0])) {
      valorTextArea = valorTextArea.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
    }
  }
  mensaje.value = valorTextArea;
}


function desencriptarTexto() {
  let valorTextArea = textArea.value;
  valorTextArea = valorTextArea.toLowerCase();
  
  for(let i = 0; i < matrizCodigo.length; i++){
    // condicion para validar si el valorTextArea estan dentro del array
    if (valorTextArea.includes(matrizCodigo[i][1])) {
      valorTextArea = valorTextArea.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
    }
  }
  mensaje.value = valorTextArea;
}

function intercambiarProcesos() {
  let textoAreaTemp = textArea.value;
  textArea.value = mensaje.value;
  mensaje.value = textoAreaTemp;

  if (procesoRealizar === 'encriptar') {
    elegirOperacion('btnEncriptar', 'btnDescencriptar', 'desencriptar');
  } else {
    elegirOperacion('btnDescencriptar', 'btnEncriptar', 'encriptar');
  }
}


function btnCopiar() {
  const texto = mensaje.value;
  if (!texto) {
    alerta('No hay nada que copiar ;(', 'error')
    return;
  }

  navigator.clipboard
    .writeText(texto)
    .then(function () {
      alerta("Texto copiado correctamente :)", 'ok');
    })
    .catch(function (error) {
      console.error("Error al copiar el texto: ", error);
    });
}


function alerta(mensaje, estado) {
  let alerta = document.querySelector('.alerta');
  alerta.style.background = estado === 'ok' ? '#2A2B2E' : '#c52f2f'; 
  alerta.innerHTML = mensaje
  alerta.style.opacity = '1';
  alerta.style.visibility = 'visible';

  setTimeout(() => {    
  alerta.style.opacity = '0';
  alerta.style.visibility = 'hidden';
  }, 3000);
}

function reiniciar() {
  textArea.value = '';
  mensaje.value = '';
  elegirOperacion('btnDescencriptar', 'btnEncriptar', 'encriptar');
  textArea.setAttribute("style", "height:auto;");
}
