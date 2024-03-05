class Vertice {

    #x;
    #y;

    constructor(x, y){
        this.#x = x;
        this.#y = y;
    }

    get getx(){
        return this.#x;
    }
    get gety(){
        return this.#y;
    }


    distancia(v){
        let a = v.#x - this.#x;
        let b = v.#y - this.#y;
        let distancia = Math.sqrt(a*a + b*b);
        return distancia;
    }

    move(novo_x, novo_y){
        this.#x = novo_x;
        this.#y = novo_y;
    }

    equals(v){
        if (this.#x == v.#x && this.#y == v.#y){
            return true;
        }
        return false;
    }
}

module.exports = Vertice
/*
// Entrada dos dados
const prompt = require('prompt-sync') ();
var x1 = prompt("Coordenada x do vertice 1: ");
var y1 = prompt("Coordenada y do vertice 1: ");
var x2 = prompt("Coordenada x do vertice 2: ");
var y2 = prompt("Coordenada y do vertice 2: ");
var x3 = prompt("Coordenada x do vertice 3: ");
var y3 = prompt("Coordenada y do vertice 3: ");

// Criacao dos vertices
let v1 = new Vertice(x1, y1);
let v2 = new Vertice(x2, y2);
let v3 = new Vertice(x3, y3);

// Testando os metodos da classe
console.log(`coordenada x de v1 = ${v1.getx}, coordenada y de v1 = ${v1.gety}`)
console.log(`coordenada x de v2 = ${v2.getx}, coordenada y de v2 = ${v2.gety}`)
console.log(`coordenada x de v3 = ${v3.getx}, coordenada y de v3 = ${v3.gety}`)
console.log("distancia de v1 pra v2 = " + v1.distancia(v2))
v1.move(10, 10)
console.log("ponto v1 movido para x = 10 e y = 10")
console.log(`nova coordenada x de v1 = ${v1.getx}, nova coordenada y de v1 = ${v1.gety}`)
console.log("distancia de v1 pra v2 = " + v1.distancia(v2))
console.log("distancia de v1 pra v3 = " + v1.distancia(v3))
console.log(`O ponto v1 é igual ao ponto v2? ${v1.equals(v2)}`)
v2.move(10, 10)
console.log("ponto v2 movido para x = 10 e y = 10")
console.log(`O ponto v1 é igual ao ponto v2? ${v1.equals(v2)}`)
console.log("distancia de v1 pra v2 = " + v1.distancia(v2))
console.log("distancia de v1 pra v3 = " + v1.distancia(v3))*/