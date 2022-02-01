
// Constantes

const TIEMPO_MS = 1 

// Elementos

const el_boton   = document.querySelector('.boton.iniciar')
const els_digitos = Array.from(document.querySelectorAll('.digito'))

// Ayuda

function pausa(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  })
}

// Datos

let continuar = false
let valor = 0

function get_numero() {
  return els_digitos
    .map(el => el.innerHTML)
    .join('')
}

function set_numero(valor) {
  valor
    .toString()
    .padStart(els_digitos.length, '0')
    .split('')
    .forEach((digito, index) => {
      els_digitos[index].innerHTML = digito
    })
}

async function iniciar() {
  valor = get_numero()

  el_boton.innerHTML = 'Pausar'

  while (continuar === true && valor > 0) {
    valor--
    set_numero(valor)      
    await pausa(TIEMPO_MS)
  }
  
  el_boton.innerHTML = 'Iniciar'
  
  continuar = false
}

// Handlers

async function on_click_digito(event) {
  const el_digito = event.target
  const valor = parseInt(el_digito.innerHTML)
  if(valor < 9) {
    el_digito.innerHTML = valor + 1
  }
}

async function on_click_boton() {
  if(continuar === false) {
    continuar = true
    iniciar()
  } else {
    continuar = false
  }
}


// Eventos

el_boton.addEventListener('click', on_click_boton)

for (const el_digito of els_digitos) {
  el_digito.addEventListener('click', on_click_digito)
}
