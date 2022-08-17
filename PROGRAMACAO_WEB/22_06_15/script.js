let contador;
function reiniciar() {
  let valor = parseInt(document.querySelector(`#input`).value);
  contador = valor;
  document.querySelector(`#display`).innerHTML = contador;
}
function aumentar() {
  if (contador == NaN) {
    let valor = parseInt(document.querySelector(`#input`).value);
    contador = valor;
    document.querySelector(`#display`).innerHTML = contador;
  } else {
    contador++;
    document.querySelector(`#display`).innerHTML = contador;
  }
}
function diminuir() {
  if (contador == undefined) {
    let valor = parseInt(document.querySelector(`#input`).value);
    contador = valor;
  } else {
    contador--;
    document.querySelector(`#display`).innerHTML = contador;
  }
}