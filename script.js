let btnEncriptar1 = document.querySelector('#btnEncriptar');
let btnDescencriptar1 = document.querySelector('#btnDescencriptar');
let btnEncriptar2 = document.querySelector('#btnEncriptar2');
let btnDescencriptar2 = document.querySelector('#btnDescencriptar2');
let operacion = 1;

let vocales = ['a', 'e', 'i', 'o', 'u']
let claves = ['f4C2', '%238923', '023%#F:342', '04', '~5']


cambiarTextoProceso();
function encriptarTexto(grupo) {
  operacion = 1;
  cambiarTextoProceso();
  removeClass(btnDescencriptar1);
  addClass(btnEncriptar1);
  procesar();
}

function cambiarTextoProceso() {
  let complemento = operacion === 1 ? 'Encriptado' : 'Descencriptado'
  document.querySelector('#botonValorProceso').innerHTML = `Texto ${complemento}`

}

function desecriptarTexto() {
  operacion = 2;
  cambiarTextoProceso();
    removeClass(btnEncriptar1);
    // removeClass(btnDescencriptar2);

    addClass(btnDescencriptar1);
    // addClass(btnEncriptar2);   
    procesar();
  

}


function removeClass(btn) {
  if(btn.className.includes('active')) {
    btn.classList.remove('active');
  }
}

function addClass(btn) {
  if (!btn.className.includes('active')) {
    btn.classList.add('active')
  }
}


function procesar() {
  console.log("operacion", operacion);
  if (operacion === 1) {
    encriptar();
  } else {
    desencriptar();
  }
}

function encriptar() {  
  console.log("funcion encriptar");
  let valorTexto = document.querySelector('#textBox1').value;
  let texto = valorTexto;

  for (let i = 0; i < vocales.length; i++ ) {
    texto = texto.replaceAll(vocales[i], claves[i]);
    console.log("texto nuevo: ", texto);
    document.querySelector('#textBox2').innerHTML = texto;
  }
}

function desencriptar() {
  console.log("funcion desencriptar");
  let valorTexto = document.querySelector('#textBox1').value;
  let texto = valorTexto;
  console.log("entro", texto);
  for (let i = 0; i < claves.length; i++ ) {
    texto = texto.replaceAll(claves[i], vocales[i]);
    console.log("textonuevo", texto);
    document.querySelector('#textBox2').innerHTML = texto;
  }
}



function intercambiarProcesos() {
  
  let text1 = document.querySelector('#textBox1').value;  
  let text2 = document.querySelector('#textBox2').innerHTML;

  document.querySelector('#textBox1').value = text2;
  document.querySelector('#textBox2').innerHTML = text1;

  if(operacion === 1) {
    desecriptarTexto(1)
  } else {
    encriptarTexto(1);
  }



}