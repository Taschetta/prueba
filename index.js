
// Constantes

const TIEMPO_MS = 1 

// Elementos

const el_boton   = document.querySelector('.boton.iniciar')
const els_digitos = Array.from(document.querySelectorAll('.digito'))

// Funcionalidad

function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  })
}

async function cuenta_atras(value, callback) {
  if(value === 0) {
    return true
  }
  
  value--
  callback(value)
  await esperar(TIEMPO_MS)
  return cuenta_atras(value, callback)
}

// Presentacion

async function digito_incrementar(event) {
  const el_digito = event.target
  const valor = parseInt(el_digito.innerHTML)
  if(valor < 9) {
    el_digito.innerHTML = valor + 1
  }
}

async function iniciar() {
  const numero = els_digitos.map(el_digito => el_digito.innerHTML).join('')
  
  await cuenta_atras(numero, (value) => {
    const digitos = value.toString().padStart(els_digitos.length, '0').split('')

    digitos.forEach((digito, index) => {
      els_digitos[index].innerHTML = digito
    })
  })

  alert('terminé')
}

// Eventos

el_boton.addEventListener('click', iniciar)

for (const el_digito of els_digitos) {
  el_digito.addEventListener('click', digito_incrementar)
}
