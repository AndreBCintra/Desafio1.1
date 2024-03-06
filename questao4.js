class Aluno{
    constructor(matricula, nome){
        this.matricula = matricula;
        this.nome = nome;
        this.P1 = "-";
        this.P2 = "-";
    }

    lancarNota(nota, prova){
        if (prova == 1){
            this.P1 = parseFloat(nota);
            return true;
        }
        if (prova == 2){
            this.P2 = parseFloat(nota);
            return true;
        }
        return false;
    }
}

class Turma{
    constructor(){
        this.alunos = [];
    }

    addAluno(aluno){
        for (let i in this.alunos){
            if (this.alunos[i].matricula == aluno.matricula){
                return false;
            }
        }
        this.alunos.push(aluno);
        return true;
    }

    remAluno(matricula){
        for (let i in this.alunos){
            if (this.alunos[i].matricula == matricula){
                this.alunos.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    lancarNota(nota, prova, matricula){
        let sucesso = false;
        for (let i in this.alunos){
            if (this.alunos[i].matricula == matricula){
                sucesso = this.alunos[i].lancarNota(nota, prova);
            }
        }
        return sucesso;
    }

    imprimeRelatorio(){ // O metodo vai adaptar pra manter o formato independente do tamanho do nome dos alunos
        let maiorNome = this.alunos[0].nome;
        for (let i in this.alunos){
            if (this.alunos[i].nome.length > maiorNome.length){
                maiorNome = this.alunos[i].nome;
            }
        }

        let linhaTracos = "--------------------------";
        for (let i = 0; i < maiorNome.length; i++){
            linhaTracos = linhaTracos.concat("-");
        }
        let linhaMenu = "Matricula Nome";
        for (let i = 0; i < maiorNome.length - 4; i++){
            linhaMenu = linhaMenu.concat(" ");
        }
        linhaMenu = linhaMenu.concat("    P1   P2   NF");

        console.log(linhaTracos);
        console.log(linhaMenu);
        console.log(linhaTracos);

        for (let i in this.alunos){
            let linhaAluno = String("  " + this.alunos[i].matricula + "   ");
            linhaAluno = linhaAluno.concat(this.alunos[i].nome);
            for (let j = 0; j < maiorNome.length - this.alunos[i].nome.length + 3; j++){
                linhaAluno = linhaAluno.concat(" ");
            }
            let NF = 0.0;
            if (this.alunos[i].P1 != "-"){
                linhaAluno = linhaAluno.concat(String(this.alunos[i].P1.toFixed(1)))
                NF += this.alunos[i].P1 / 2;
            }
            else{   linhaAluno = linhaAluno.concat("  -");}
            linhaAluno = linhaAluno.concat("  ");
            if (this.alunos[i].P2 != "-"){
                linhaAluno = linhaAluno.concat(String(this.alunos[i].P2.toFixed(1)))
                NF += this.alunos[i].P2 / 2;
            }
            else{   linhaAluno = linhaAluno.concat("  -");}
            linhaAluno = linhaAluno.concat("  ");
            linhaAluno = linhaAluno.concat(String(NF.toFixed(1)));
            console.log(linhaAluno);
        }

        console.log(linhaTracos);
    }
}

module.exports = {Aluno, Turma}

/*let Turma5 = new Turma();
let Ana = new Aluno(12345, "Ana de Almeida");
let Bruno = new Aluno(23456, "Bruno Carvalho");
let Fernanda = new Aluno(34567, "Fernanda Abreu");
let Joao = new Aluno(45678, "Joao Santos");

Ana.lancarNota(8, 1);
Ana.lancarNota(9.5, 2);
Bruno.lancarNota(7, 1);
Fernanda.lancarNota(8.5, 2);

Turma5.addAluno(Ana);
Turma5.addAluno(Bruno);
Turma5.addAluno(Fernanda);
Turma5.addAluno(Joao);

Turma5.imprimeRelatorio();

Turma5.remAluno(Bruno.matricula);

Turma5.imprimeRelatorio();*/