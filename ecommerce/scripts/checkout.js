import {loadCartItem,removeCartItem} from "./functions.js";
let cartItens = JSON.parse(localStorage.getItem("listaCompras")) 


let pedidos = JSON.parse(localStorage.getItem("pedidos"))
if (pedidos == null){ /* Criando uma lista de pedidos vazia*/
    pedidos = []
}

let cartItensHTML = document.querySelector('#checkout .grid_col_1')
loadCartItem(cartItens,cartItensHTML)
removeCartItem(cartItens)

// Apresentar outras partes do proocesso de compra
// let buttonBuy = document.querySelector("#button-buy");
// let sectionOne = document.querySelector("#fist-section");
// let sectionTwo = document.querySelector("#secund-section");

// A função tem finalidade de aparecr o elemento selecionado
function displayFlex(elemento, duracao){
    elemento.style.display = "flex";
    elemento.style.transition = `opacity ${duracao}s`;
    elemento.style.opacity = 0;
    setTimeout(() => {
        elemento.style.opacity = 1;
    }, 100);
}

// A função tem finalidade de ocutar o elemento selecionado com um certo delay
function displayNone(elemento, duracao){
    elemento.style.transition = `opacity ${duracao}s`;
    elemento.style.opacity = 1;
    setTimeout(() => {
        elemento.style.opacity = 0;
    }, 100);
    setTimeout(() => {
        elemento.style.display = "none";
    }, duracao*1000);
}

document.getElementById("button-buy").addEventListener("click", function() {
    let sectionTwo = document.getElementById("secund-section");
    let sectionOne = document.getElementById("first-section");

    if(sectionTwo.style.display === "none" || sectionTwo.style.display === ""){
        displayNone(sectionOne, 0.5);
        displayFlex(sectionTwo, 0.5);
    }else{
        displayNone(sectionTwo, 0.5);
    }
});
