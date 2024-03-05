const Vertice = require('./questao1');

class Poligono {

    #vertices;
    // Resolvi criar um array com os n vertices do poligono, onde o vertice i possue uma aresta com o vertice i + 1 e o vertice n uma aresta com o vertice 0
    constructor(Vertices){
        if (Vertices.length < 3){
            throw "Menos que 3 vertices";
        }
        this.#vertices = Vertices;
    }

    addVertice(v) {
        for (let i in this.#vertices){
            if (this.#vertices[i].equals(v)){
                return false;
            }
        }
        this.#vertices.push(v);
        return true;
    }

    get perimetro(){
        let perimetro = 0;
        for (let i = 0; i < this.#vertices.length - 1; i++){
            perimetro += this.#vertices[i].distancia(this.#vertices[i+1]);
        }
        perimetro += this.#vertices[this.#vertices.length - 1].distancia(this.#vertices[0]);
        return perimetro;
    }

    get qtdVertices(){
        let qtd = this.#vertices.length;
        return qtd;
    }
}

const prompt = require('prompt-sync') ();
var entrada = prompt("Entre uma série de coordenadas x e y dos vertices: ");

let vertices = [];
let entradaSeparada = entrada.split(" ");
for (let i = 0; i < entradaSeparada.length / 2; i++){
    let v = new Vertice(parseInt(entradaSeparada[2*i]), parseInt(entradaSeparada[(2*i)+1]));
    vertices.push(v);
}
p = new Poligono(vertices);
console.log(`O perimetro do poligono é: ${p.perimetro}`);
console.log(`A quantidade de vertices do poligono é ${p.qtdVertices}`);
console.log(`O vertice (3, 8) foi adicionado? ${p.addVertice(new Vertice(3, 8))}`);
console.log(`O perimetro do poligono é: ${p.perimetro}`);
console.log(`A quantidade de vertices do poligono é ${p.qtdVertices}`);
