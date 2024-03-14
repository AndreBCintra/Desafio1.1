const Paciente = require('./Paciente');
const ListaPacientes = require('./ListaPacientes');

const prompt = require('prompt-sync') ();

class InterfaceGrafica {
    constructor(){
        this.lista = new ListaPacientes();
    }

    listagemPacientes(){

    }

    menuPrincipal(){
        let exit = false;
        while (!exit){
            console.log(`\nMenu Principal
1-Cadastro de pacientes
2-Agenda
3-Fim\n`);
            let escolhido = prompt("");
            switch(escolhido){
                case '1':
                    this.menuCadastroDePacientes();
                    break;
                case '2':
                    this.menuAgenda();
                    break;
                default:
                    exit = true;
                    break;
            }
        }
    }

    menuCadastroDePacientes(){
        let exit = false;
        while (!exit){
            console.log(`\nMenu Principal
1-Cadastrar novo paciente
2-Excluir paciente
3-Listar pacientes (ordenado por CPF)
4-Listar pacientes (ordenado por nome)
5-Voltar p/ menu principal\n`);
            let escolhido = prompt("");
            switch(escolhido){
                case '1':
                    this.cadastrarPaciente();
                    break;
                case '2':
                    this.excluirPaciente();
                    break;
                case '3':
                    this.listarPacientes('1');
                    break;
                case '4':
                    this.listarPacientes('2');
                    break;
                default:
                    exit = true;
            }
        }
    }

    menuAgenda(){
        let exit = false;
        while (!exit){
            console.log(`\nMenu Principal
1-Agendar consulta
2-Cancelar agendamento
3-Listar agenda
4-Voltar p/ menu principal\n`);
            let escolhido = prompt("");
            switch(escolhido){
                case '1':
                    break;
                case '2':
                    break;
                case '3':
                    break;
                default:
                    exit = true;
                    break;
            }
        }
    }

    cadastrarPaciente(){
        let P = new Paciente();
        let cpf = prompt("CPF: ");
        while (!P.setCpf(cpf) || !(this.lista.verificaPacientePorCpf(cpf))){
            cpf = prompt("CPF: ");
        }
        let nome = prompt("Nome: ");
        while (!P.setNome(nome)){
            nome = prompt("Nome: ");
        }
        let dataNasc = prompt("Data de nascimento: ");
        while (!P.setDataNasc(dataNasc)){
            dataNasc = prompt("Data de nascimento: ");
        }
        this.lista.addPaciente(P);
        console.log("\nPaciente cadastrado com sucesso!")
    }

    excluirPaciente(){
        let cpf = prompt("CPF: ");
        this.lista.remPaciente(cpf);
    }

    listarPacientes(caso){
        this.lista.sort(caso);
        let maiorNome = this.lista.getPacientePorPosicao(0).nome;
        for (let i = 0; i < this.lista.length; i++){
            let PAtual = this.lista.getPacientePorPosicao(i);
            let nomeAtual = PAtual.nome;
            if (nomeAtual.length > maiorNome.length){
                maiorNome = nomeAtual;
            }
        }
        let linhaTracos = "----------------------------"
        let linhaMenu = "CPF         Nome";
        for (let i = 0; i < maiorNome.length; i++){
            linhaTracos = linhaTracos.concat("-");
            if (i > 3){
                linhaMenu = linhaMenu.concat(" ");
            }
        }
        linhaMenu = linhaMenu.concat("  Dt.Nasc. Idade");
        console.log(linhaTracos);
        console.log(linhaMenu);
        console.log(linhaTracos);
        for (let i = 0; i < this.lista.length; i++){
            let PAtual = this.lista.getPacientePorPosicao(i);
            let linhaPaciente = PAtual.cpf;
            linhaPaciente = linhaPaciente.concat(" ");
            linhaPaciente = linhaPaciente.concat(PAtual.nome);
            for (let j = 0; j < maiorNome.length - PAtual.nome.length + 1; j++){
                linhaPaciente = linhaPaciente.concat(" ");
            }
            linhaPaciente = linhaPaciente.concat(PAtual.dataNasc);
            linhaPaciente = linhaPaciente.concat("   ");
            linhaPaciente = linhaPaciente.concat(PAtual.idade(PAtual.dataNasc));
            console.log(linhaPaciente);
        }
    }
}

let ig = new InterfaceGrafica();
ig.menuPrincipal();