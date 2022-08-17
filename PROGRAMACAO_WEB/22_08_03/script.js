function calcularNota() {
    let nota1 = parseInt(document.querySelector("#nota1").value);
    let nota2 = parseInt(document.querySelector("#nota2").value);
    let nome = document.querySelector('#nome').value;

    let media = (nota1 + nota2) / 2;

    document.querySelector("#resultado").innerHTML = nome + ", a sua média das notas é: " + media;

    if (media >= 7) {
        document.querySelector('#resultado').style.color = '#1bd11b'
     } else {
        document.querySelector('#resultado').style.color = '#ff0000'
     }
}
var tabela = document.querySelector('table');
var nome = document.querySelector('#nome');
var nota1 = document.querySelector('#nota1');
var nota2 = document.querySelector('#nota2');
var botao = document.querySelector('#butao');

botao.addEventListener('click', function(){
    let n1 = parseInt(nota1.value);
    let n2 = parseInt(nota2.value);
    let media = (n1 + n2) /2 
})