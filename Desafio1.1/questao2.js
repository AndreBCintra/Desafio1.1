const Vertice = require('./Desafio1.1/questao1')

class Triangulo {
    #v1;
    #v2;
    #v3;

    constructor(V1, V2, V3){

        // O triangulo pode ser invalido caso o determinante desses pontos seja = 0
        let determinante = (V1.getx * V2.gety) + (V2.getx * V3.gety) + (V3.getx * V1.gety) - (V1.gety * V2.getx) - (V2.gety * V3.getx) - (V3.gety * V1.getx); 
        if (determinante == 0) {
            throw "Triangulo invalido";
        }
        this.#v1 = V1;
        this.#v2 = V2;
        this.#v3 = V3;
        
    }

    equals(t){
        if (this.#v1.equals(t.#v1) && this.#v2.equals(t.#v2) && this.#v3.equals(t.#v3) ||
            this.#v1.equals(t.#v1) && this.#v2.equals(t.#v3) && this.#v3.equals(t.#v2) ||
            this.#v1.equals(t.#v2) && this.#v2.equals(t.#v1) && this.#v3.equals(t.#v3) ||
            this.#v1.equals(t.#v2) && this.#v2.equals(t.#v3) && this.#v3.equals(t.#v1) ||
            this.#v1.equals(t.#v3) && this.#v2.equals(t.#v1) && this.#v3.equals(t.#v2) ||
            this.#v1.equals(t.#v3) && this.#v2.equals(t.#v2) && this.#v3.equals(t.#v1)){
            return true;
        }
        else {
            return false;
        }
    }

    get perimetro(){
        let perimetro = this.#v1.distancia(this.#v2) + this.#v2.distancia(this.#v3) + this.#v3.distancia(this.#v1);
        return perimetro;
    }

    tipo(){
        let lado1 = this.#v1.distancia(this.#v2)
        let lado2 = this.#v2.distancia(this.#v3)
        let lado3 = this.#v3.distancia(this.#v1)
        if (lado1 == lado2 == lado3){
            return "Equilatero";
        }
        else if((lado1 != lado2) && (lado1 != lado3) && (lado2 != lado3)){
            return "Escaleno";
        }
        else {
            return "Isoceles"
        }
    }

    clone(original){
        this.#v1.move(original.#v1.getx, original.#v1.gety);
        this.#v2.move(original.#v2.getx, original.#v2.gety);
        this.#v3.move(original.#v3.getx, original.#v3.gety);
    }

    get area(){
        let a = this.#v1.distancia(this.#v2)
        let b = this.#v2.distancia(this.#v3)
        let c = this.#v3.distancia(this.#v1)
        let S = this.perimetro / 2;
        let area = Math.sqrt(S * (S-a) * (S-b) * (S-c));
        return area;
    }
}

module.exports = Triangulo
/*
// Entrada dos dados

// Entrada das coordenadas dos vertices do triangulo 1
const prompt = require('prompt-sync') ();
var t1x1 = prompt("Coordenada x do vertice 1: ");
var t1y1 = prompt("Coordenada y do vertice 1: ");
var t1x2 = prompt("Coordenada x do vertice 2: ");
var t1y2 = prompt("Coordenada y do vertice 2: ");
var t1x3 = prompt("Coordenada x do vertice 3: ");
var t1y3 = prompt("Coordenada y do vertice 3: ");
// Criacao dos vertices do triangulo 1
let t1v1 = new Vertice(t1x1, t1y1);
let t1v2 = new Vertice(t1x2, t1y2);
let t1v3 = new Vertice(t1x3, t1y3);
// Criacao do triangulo 1
let t1 = new Triangulo(t1v1, t1v2, t1v3);

// Entrada das coordenadas dos vertices do triangulo 2
var t2x1 = prompt("Coordenada x do vertice 1: ");
var t2y1 = prompt("Coordenada y do vertice 1: ");
var t2x2 = prompt("Coordenada x do vertice 2: ");
var t2y2 = prompt("Coordenada y do vertice 2: ");
var t2x3 = prompt("Coordenada x do vertice 3: ");
var t2y3 = prompt("Coordenada y do vertice 3: ");
// Criacao dos vertices do triangulo 2
let t2v1 = new Vertice(t2x1, t2y1);
let t2v2 = new Vertice(t2x2, t2y2);
let t2v3 = new Vertice(t2x3, t2y3);
// Criacao do triangulo 2
let t2 = new Triangulo(t2v1, t2v2, t2v3);

// Entrada das coordenadas dos vertices do triangulo 3
var t3x1 = prompt("Coordenada x do vertice 1: ");
var t3y1 = prompt("Coordenada y do vertice 1: ");
var t3x2 = prompt("Coordenada x do vertice 2: ");
var t3y2 = prompt("Coordenada y do vertice 2: ");
var t3x3 = prompt("Coordenada x do vertice 3: ");
var t3y3 = prompt("Coordenada y do vertice 3: ");
// Criacao dos vertices do triangulo 3
let t3v1 = new Vertice(t3x1, t3y1);
let t3v2 = new Vertice(t3x2, t3y2);
let t3v3 = new Vertice(t3x3, t3y3);
// Criacao do triangulo 3
let t3 = new Triangulo(t3v1, t3v2, t3v3);

let t4 = t1.clone();

// Testando os métodos da classe
console.log(`O perimetro do triangulo é = ${t1.perimetro}`);
console.log(`O triangulo é um triangulo ${t1.tipo()}`);
console.log(`A área do triangulo = ${t1.area}`);
console.log(`O triangulo t1 é igual ao t4? ${t1.equals(t4)}`);
console.log(`O triangulo t2 é igual ao t3? ${t2.equals(t3)}`);*/