const textArea = document.querySelector('.text-area');
const mensaje = document.querySelector('.mensaje-procesado')
const btnEncriptar = document.querySelector('#btnEncriptar');
const btnDescencriptar = document.querySelector('#btnDescencriptar');
let procesoRealizar = 'encriptar' // encriptar | desencriptar


const matrizCodigo = [
  ['e', 'enter'],
  ['i', 'imes'],
  ['a', 'ai'],
  ['o', 'ober'],
  ['u', 'ufat']
]

function elegirOperacion(botonRemoverClase, botonAgregarClase, tipoProceso) {
  procesoRealizar = tipoProceso
  cambiarTextoProceso();
  removeClass(botonRemoverClase);
  addClass(botonAgregarClase);
  procesar();
}

function cambiarTextoProceso() {
  let complemento = procesoRealizar === 'encriptar' ? 'Encriptado' : 'Descencriptado'
  document.querySelector('#botonValorProceso').innerHTML = `Texto ${complemento}`
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
  console.log("procesoRealizar", procesoRealizar);
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

  console.log("valorTextArea", valorTextArea);
  
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
  alerta.style.background = estado === 'ok' ? '#2A2B2E' : '#FF928B'; 
  alerta.innerHTML = mensaje
  alerta.style.opacity = '1';

  setTimeout(() => {    
  alerta.style.opacity = '0';
  }, 2000);
}


cambiarTextoProceso();