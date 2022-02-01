
const TIEMPO_MS = 100

const el_input    = document.querySelector('#input')
const el_button   = document.querySelector('#button')
const el_number_1 = document.querySelector('#num1')
const el_number_2 = document.querySelector('#num2')

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

async function iniciar() {
  const value = el_input.value
  
  await cuenta_atras(value, (value) => {
    const value_parts = String(value).padStart(2, '0').split('')
    el_number_1.innerHTML = value_parts[0]
    el_number_2.innerHTML = value_parts[1]
  })

  alert('terminé')
}

el_button.addEventListener('click', iniciar)