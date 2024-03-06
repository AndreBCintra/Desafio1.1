const Vertice = require('./questao1');
const Triangulo = require('./questao2');
const Poligono = require('./questao3');
const {Aluno, Turma} = require('./questao4');
const Cliente = require('./questao5');

const prompt = require('prompt-sync') ();

function testeVertice() {
    var x1 = prompt("Coordenada x do vertice 1: ");
    var y1 = prompt("Coordenada y do vertice 1: ");
    var x2 = prompt("Coordenada x do vertice 2: ");
    var y2 = prompt("Coordenada y do vertice 2: ");
    var x3 = prompt("Coordenada x do vertice 3: ");
    var y3 = prompt("Coordenada y do vertice 3: ");

    let v1 = new Vertice(x1, y1);
    let v2 = new Vertice(x2, y2);
    let v3 = new Vertice(x3, y3);

    let vs = new Array(v1, v2, v3);

    let exitVertice = false;
    while (!exitVertice){
        console.log("Digite qual método você quer testar\n0- Sair\n1- Distancia\n2- Move\n3- Equals");
        let testeVerticeMetodo = prompt("");
        switch(testeVerticeMetodo){
            case '1':
                console.log(`Escolha o primeiro vértice\n1- (${v1.getx}, ${v1.gety})\n2- (${v2.getx}, ${v2.gety})\n3- (${v3.getx}, ${v3.gety})`);
                let vTesteD1 = prompt("");
                console.log(`Escolha o segundo vértice\n1- (${v1.getx}, ${v1.gety})\n2- (${v2.getx}, ${v2.gety})\n3- (${v3.getx}, ${v3.gety})`);
                let vTesteD2 = prompt("");
                console.log(`A distancia do vertice (${vs[vTesteD1-1].getx}, ${vs[vTesteD1-1].gety}) e (${vs[vTesteD2-1].getx}, ${vs[vTesteD2-1].gety}) é ${vs[vTesteD1-1].distancia(vs[vTesteD2-1])}`);
                break;
            case '2':
                console.log(`Escolha o vértice que você quer mover\n1- (${v1.getx}, ${v1.gety})\n2- (${v2.getx}, ${v2.gety})\n3- (${v3.getx}, ${v3.gety})`);
                let vTeste = prompt("");
                let novoX = prompt(`Digite a nova coordenada x: `);
                let novoY = prompt(`Digite a nova coordenada y: `);
                vs[vTeste-1].move(novoX, novoY);
                console.log("Vertice movido");
                break;
            case '3':
                console.log(`Escolha o primeiro vértice\n1- (${v1.getx}, ${v1.gety})\n2- (${v2.getx}, ${v2.gety})\n3- (${v3.getx}, ${v3.gety})`);
                let vTesteEq1 = prompt("");
                console.log(`Escolha o segundo vértice\n1- (${v1.getx}, ${v1.gety})\n2- (${v2.getx}, ${v2.gety})\n3- (${v3.getx}, ${v3.gety})`);
                let vTesteEq2 = prompt("");
                if (vs[vTesteEq1-1].equals(vs[vTesteEq2-1])){
                    console.log("Os vértices são iguais");
                }
                else{
                    console.log("Os vértices são diferentes");
                }
                break;
            default:
                exitVertice = true;
                break;
        }   
    }
}

function testeTriangulo(){
    var t1x1 = prompt("Coordenada x do vertice 1 do triângulo 1: ");
    var t1y1 = prompt("Coordenada y do vertice 1 do triângulo 1: ");
    var t1x2 = prompt("Coordenada x do vertice 2 do triângulo 1: ");
    var t1y2 = prompt("Coordenada y do vertice 2 do triângulo 1: ");
    var t1x3 = prompt("Coordenada x do vertice 3 do triângulo 1: ");
    var t1y3 = prompt("Coordenada y do vertice 3 do triângulo 1: ");
    let t1v1 = new Vertice(t1x1, t1y1);
    let t1v2 = new Vertice(t1x2, t1y2);
    let t1v3 = new Vertice(t1x3, t1y3);
    let t1 = new Triangulo(t1v1, t1v2, t1v3);
    var t2x1 = prompt("Coordenada x do vertice 1 do triângulo 2: ");
    var t2y1 = prompt("Coordenada y do vertice 1 do triângulo 2: ");
    var t2x2 = prompt("Coordenada x do vertice 2 do triângulo 2: ");
    var t2y2 = prompt("Coordenada y do vertice 2 do triângulo 2: ");
    var t2x3 = prompt("Coordenada x do vertice 3 do triângulo 2: ");
    var t2y3 = prompt("Coordenada y do vertice 3 do triângulo 2: ");
    let t2v1 = new Vertice(t2x1, t2y1);
    let t2v2 = new Vertice(t2x2, t2y2);
    let t2v3 = new Vertice(t2x3, t2y3);
    let t2 = new Triangulo(t2v1, t2v2, t2v3);
    var t3x1 = prompt("Coordenada x do vertice 1 do triângulo 3: ");
    var t3y1 = prompt("Coordenada y do vertice 1 do triângulo 3: ");
    var t3x2 = prompt("Coordenada x do vertice 2 do triângulo 3: ");
    var t3y2 = prompt("Coordenada y do vertice 2 do triângulo 3: ");
    var t3x3 = prompt("Coordenada x do vertice 3 do triângulo 3: ");
    var t3y3 = prompt("Coordenada y do vertice 3 do triângulo 3: ");
    let t3v1 = new Vertice(t3x1, t3y1);
    let t3v2 = new Vertice(t3x2, t3y2);
    let t3v3 = new Vertice(t3x3, t3y3);
    let t3 = new Triangulo(t3v1, t3v2, t3v3);

    let ts = new Array(t1, t2, t3);

    let exitTriangulo = false;
    while (!exitTriangulo){
        console.log("Digite qual método você quer testar\n0- Sair\n1- Equals\n2- Perimetro\n3- Tipo\n4- Clone\n5- Área");
        let testeTrianguloMetodo = prompt("");
        switch(testeTrianguloMetodo){
            default:
                exitTriangulo = true;
                break;
            case '1':
                console.log(`Escolha o primeiro Triângulo
1- (${t1v1.getx}, ${t1v1.gety}) (${t1v2.getx}, ${t1v2.gety}) (${t1v3.getx}, ${t1v3.gety})
2- (${t2v1.getx}, ${t2v1.gety}) (${t2v2.getx}, ${t2v2.gety}) (${t1v3.getx}, ${t1v3.gety})
3- (${t3v1.getx}, ${t3v1.gety}) (${t3v2.getx}, ${t3v2.gety}) (${t3v3.getx}, ${t3v3.gety})`);
                let tTesteEq1 = prompt("");
                console.log(`Escolha o segundo Triângulo
1- (${t1v1.getx}, ${t1v1.gety}) (${t1v2.getx}, ${t1v2.gety}) (${t1v3.getx}, ${t1v3.gety})
2- (${t2v1.getx}, ${t2v1.gety}) (${t2v2.getx}, ${t2v2.gety}) (${t1v3.getx}, ${t1v3.gety})
3- (${t3v1.getx}, ${t3v1.gety}) (${t3v2.getx}, ${t3v2.gety}) (${t3v3.getx}, ${t3v3.gety})`);
                let tTesteEq2 = prompt("");
                if (ts[tTesteEq1-1].equals(ts[tTesteEq2-1])){
                    console.log("Os triângulos são iguais");
                }
                else{
                    console.log("Os triângulos são diferentes");
                }
                break;
            case '2':
                console.log(`Escolha o Triângulo para calcular o perimetro
1- (${t1v1.getx}, ${t1v1.gety}) (${t1v2.getx}, ${t1v2.gety}) (${t1v3.getx}, ${t1v3.gety})
2- (${t2v1.getx}, ${t2v1.gety}) (${t2v2.getx}, ${t2v2.gety}) (${t1v3.getx}, ${t1v3.gety})
3- (${t3v1.getx}, ${t3v1.gety}) (${t3v2.getx}, ${t3v2.gety}) (${t3v3.getx}, ${t3v3.gety})`);
                let tTesteP = prompt("");
                console.log(ts[tTesteP-1].perimetro);
                break;
            case '3':
                console.log(`Escolha o Triângulo para saber o tipo
1- (${t1v1.getx}, ${t1v1.gety}) (${t1v2.getx}, ${t1v2.gety}) (${t1v3.getx}, ${t1v3.gety})
2- (${t2v1.getx}, ${t2v1.gety}) (${t2v2.getx}, ${t2v2.gety}) (${t1v3.getx}, ${t1v3.gety})
3- (${t3v1.getx}, ${t3v1.gety}) (${t3v2.getx}, ${t3v2.gety}) (${t3v3.getx}, ${t3v3.gety})`);
                let tTesteT = prompt("");
                console.log(ts[tTesteT-1].tipo());
                break;
            case '4':
                console.log(`Escolha o Triângulo para clonar
1- (${t1v1.getx}, ${t1v1.gety}) (${t1v2.getx}, ${t1v2.gety}) (${t1v3.getx}, ${t1v3.gety})
2- (${t2v1.getx}, ${t2v1.gety}) (${t2v2.getx}, ${t2v2.gety}) (${t1v3.getx}, ${t1v3.gety})
3- (${t3v1.getx}, ${t3v1.gety}) (${t3v2.getx}, ${t3v2.gety}) (${t3v3.getx}, ${t3v3.gety})`);
                let tTesteC1 = prompt("");
                console.log(`Escolha o Triângulo para ser o clone
1- (${t1v1.getx}, ${t1v1.gety}) (${t1v2.getx}, ${t1v2.gety}) (${t1v3.getx}, ${t1v3.gety})
2- (${t2v1.getx}, ${t2v1.gety}) (${t2v2.getx}, ${t2v2.gety}) (${t1v3.getx}, ${t1v3.gety})
3- (${t3v1.getx}, ${t3v1.gety}) (${t3v2.getx}, ${t3v2.gety}) (${t3v3.getx}, ${t3v3.gety})`);
                let tTesteC2 = prompt("");
                ts[tTesteC2-1].clone(ts[tTesteC1-1]);
                break;
            case '5':
                console.log(`Escolha o Triângulo para calcular a área
1- (${t1v1.getx}, ${t1v1.gety}) (${t1v2.getx}, ${t1v2.gety}) (${t1v3.getx}, ${t1v3.gety})
2- (${t2v1.getx}, ${t2v1.gety}) (${t2v2.getx}, ${t2v2.gety}) (${t1v3.getx}, ${t1v3.gety})
3- (${t3v1.getx}, ${t3v1.gety}) (${t3v2.getx}, ${t3v2.gety}) (${t3v3.getx}, ${t3v3.gety})`);
                let tTesteA = prompt("");
                console.log(ts[tTesteA-1].area);
                break;
        }
    }
}

function testePoligono(){
    let coordenadas = prompt("Entre uma série de coordenadas x e y dos vertices: ");
    let vertices = [];
    let coordenadasSeparada = coordenadas.split(" ");
    for (let i = 0; i < coordenadasSeparada.length / 2; i++){
        let v = new Vertice(parseInt(coordenadasSeparada[2*i]), parseInt(coordenadasSeparada[(2*i)+1]));
        vertices.push(v);
    }
    p = new Poligono(vertices);
    let exitPoligono = false;
    while (!exitPoligono){
        console.log("Digite qual método você quer testar\n0- Sair\n1- addVertice\n2- Perimetro\n3- qtdVertices");
        let testePoligonoMetodo = prompt("");
        switch(testePoligonoMetodo){
            default:
                exitPoligono = true;
                break;
            case '1':
                let xAdd = prompt("Digite a coordenada x do vértice acrescentado: ");
                let yAdd = prompt("Digite a coordenada y do vértice acrescentado: ");
                let novoV = new Vertice(xAdd, yAdd);
                let sucesso = p.addVertice(novoV);
                if (sucesso){
                    console.log("Vertice adicionado com sucesso");
                }
                else{   console.log("Falha em adicionar o vértice") };
                break;
            case '2':
                console.log(`O perimetro do polígono é ${p.perimetro}`);
                break;
            case '3':
                console.log(`A quantidade de vertices no polígono é ${p.qtdVertices}`);
                break;
        }
    }
}

function testeTurma(){
    let Turma5 = new Turma();

    let novoAlunoMatr = prompt("Digite a matricula do aluno: ");
    let novoAlunoNome = prompt("Digite o nome do aluno: ");
    let novoAluno = new Aluno(novoAlunoMatr, novoAlunoNome);
    Turma5.addAluno(novoAluno);
    let exitTurma = false;
    while (!exitTurma){
        console.log("Digite o que você quer fazer\n0- Sair\n1- Adicionar um aluno\n2- Remover um aluno\n3- Lançar nota\n4- Imprimir relatório");
        let testeTurmaMetodo = prompt("");
        switch(testeTurmaMetodo){
            default:
                exitTurma = true;
                break;
            case '1':
                novoAlunoMatr = prompt("Digite a matricula do aluno: ");
                novoAlunoNome = prompt("Digite o nome do aluno: ");
                novoAluno = new Aluno(novoAlunoMatr, novoAlunoNome);
                Turma5.addAluno(novoAluno);
                break;
            case '2':
                let alunoRemovidoMatr = prompt("Digite a matricula do aluno: ");
                Turma5.remAluno(alunoRemovidoMatr);
                break;
            case '3':
                let alunoNotaMatr = prompt("Digite a matricula do aluno: ");
                let alunoNotaNota = prompt("Digite a nota do aluno: ");
                let alunoNotaProva = prompt("Digite a prova (1 ou 2): ");
                Turma5.lancarNota(alunoNotaNota, alunoNotaProva, alunoNotaMatr);
                break;
            case '4':
                Turma5.imprimeRelatorio();
                break;
        }
    }
}

function testeCliente(){
    let c1 = new Cliente()

    let exitCliente = false;
    while (!exitCliente){
        console.log("Digite o que você quer fazer\n0- Sair\n1- Criar um cliente");
        let testeClienteMetodo = prompt("");
        switch(testeClienteMetodo){
            default:
                exitCliente = true;
                break;
            case '1':
                let nomeAdded;
                while (!nomeAdded) {
                    var nome = prompt("Digite o nome do cliente: ");
                    nomeAdded = c1.setNome(nome);
                }

                let cpfAdded;
                while (!cpfAdded) {
                    var cpf = prompt("Digite o CPF do cliente: ");
                    cpfAdded = c1.setCPF(cpf);
                }

                let dataAdded;
                while (!dataAdded) {
                    var dataNasc = prompt("Digite a data de nascimento do cliente: ");
                    dataAdded = c1.setDataNasc(dataNasc);
                }

                let rendaAdded;
                while (!rendaAdded) {
                    var renda = prompt("Digite a renda mensal do cliente: ");
                    rendaAdded = c1.setRenda(renda);
                }

                let estadoCivilAdded;
                while (!estadoCivilAdded) {
                    var estadoCivil = prompt("Digite o estado civil do cliente: ");
                    estadoCivilAdded = c1.setEstadoCivil(estadoCivil);
                }

                let dependentesAdded;
                while (!dependentesAdded) {
                    var dependentes = prompt("Digite o número de dependentes do cliente: ");
                    dependentesAdded = c1.setDependentes(dependentes);
                }

                c1.imprime();
                break;
        }
        
    }
}

let exit = false;
while (!exit){
    console.log("Escolha qual questão testar:\n0- Sair\n1- Vertice\n2- Triangulo\n3- Poligono\n4- Turma\n5- Cliente")
    let entrada = prompt("");
    switch(entrada){
        default:
            exit = true;
            break;
        case '1':
            testeVertice();
            break;
        case '2':
            testeTriangulo();
            break;
        case '3':
            testePoligono();
            break;
        case '4':
            testeTurma();
            break;
        case '5':
            testeCliente();
            break;
    }
}