const Paciente = require('./Paciente');
const ListaPacientes = require('./ListaPacientes');
const Consulta = require('./Consulta');
const ListaConsultas = require('./ListaConsultas');

const prompt = require('prompt-sync') ();

class InterfaceGrafica {
    constructor(){
        this.listaPaciente = new ListaPacientes();
        this.listaConsulta = new ListaConsultas();
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

    cadastrarPaciente(){
        let P = new Paciente();

        let cpf = prompt("CPF: ");
        while (!P.setCpf(cpf) || !(this.listaPaciente.verificaPacientePorCpf(cpf))){
            if (!this.listaPaciente.verificaPacientePorCpf(cpf)){   console.log("Erro: CPF já cadastrado"); }
            if (cpf == "exit"){ return false;   }
            cpf = prompt("CPF: ");
        }

        let nome = prompt("Nome: ");
        while (!P.setNome(nome)){
            if (nome == "exit"){    return false;   }
            nome = prompt("Nome: ");
        }

        let dataNasc = prompt("Data de nascimento: ");
        while (!P.setDataNasc(dataNasc)){
            if (dataNasc == "exit"){    return false;   }
            dataNasc = prompt("Data de nascimento: ");
        }

        this.listaPaciente.addPaciente(P);
    }

    excluirPaciente(){
        let cpf = prompt("CPF: ");
        if (cpf == "exit"){ return false;   }
        this.listaPaciente.remPaciente(cpf);
        this.listaConsulta.excluiPaciente(cpf);
    }

    listarPacientes(caso){
        if (this.listaPaciente.length == 0){
            console.log("\nErro: nenhum paciente cadastrado\n");
            return false;
        }
        this.listaPaciente.sort(caso);
        let maiorNome = this.listaPaciente.getPacientePorPosicao(0).nome;
        for (let i = 0; i < this.listaPaciente.length; i++){
            let PAtual = this.listaPaciente.getPacientePorPosicao(i);
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
        for (let i = 0; i < this.listaPaciente.length; i++){
            let PAtual = this.listaPaciente.getPacientePorPosicao(i);
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
            let k = this.listaConsulta.encontraConsultaValida(PAtual.cpf);
            if (k){
                let linhaConsulta1 = "            Agendado para: ";
                linhaConsulta1 = linhaConsulta1.concat(this.listaConsulta.getConsultaNaPosicaoI(k-1).data);
                console.log(linhaConsulta1);
                let linhaConsulta2 = "            ";
                linhaConsulta2 = linhaConsulta2.concat(this.#formataHora(this.listaConsulta.getConsultaNaPosicaoI(k-1).horaI));
                linhaConsulta2 = linhaConsulta2.concat(" às ");
                linhaConsulta2 = linhaConsulta2.concat(this.#formataHora(this.listaConsulta.getConsultaNaPosicaoI(k-1).horaF));
                console.log(linhaConsulta2);
            }
        }
    }

    #formataHora(hora){
        let horaSeparada = hora.split("");
        let horaFormatada = horaSeparada[0].concat(horaSeparada[1]).concat(":").concat(horaSeparada[2]).concat(horaSeparada[3]);
        return horaFormatada;
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
                    this.agendarConsulta();
                    break;
                case '2':
                    this.cancelarAgendamento();
                    break;
                case '3':
                    this.listarAgenda();
                    break;
                default:
                    exit = true;
                    break;
            }
        }
    }

    agendarConsulta(){
        let C = new Consulta();
        let cpf = prompt("CPF: ");

        while (this.listaPaciente.verificaPacientePorCpf(cpf)){
            console.log("\nErro: paciente não cadastrado\n");
            if (cpf == "exit"){ return false;   }
            cpf = prompt("CPF: ");
        }
        while (!this.listaConsulta.verificaConsultaNoCpf(cpf)){
            cpf = prompt("CPF: ");
            if (cpf == "exit"){ return false;   }
        }
        C.setCpf(cpf);

        let data = prompt("Data da consulta: ");
        if (data == "exit"){    return false;   }
        while (!C.setData(data)){
            data = prompt("Data da consulta: ");
            if (data == "exit"){    return false;   }
        }

        let horaI = prompt("Hora inicial: ");
        if (horaI == "exit"){   return false;   }
        while (!C.setHoraInicial(horaI)){
            horaI = prompt("Hora inicial: ");
            if (horaI == "exit"){   return false;   }
        }

        let horaF = prompt("Hora final: ");
        if (horaF == "exit"){   return false;   }
        while (!C.setHoraFinal(horaF)){
            horaF = prompt("Hora final: ");
            if (horaF == "exit"){   return false;   }
        }

        this.listaConsulta.addConsulta(C);
        return true;
    }
    
    cancelarAgendamento(){
        let cpf = prompt("CPF: ");
        if (cpf == "exit"){ return false;   }
        while (this.listaPaciente.verificaPacientePorCpf(cpf)){
            cpf = prompt("CPF: ");
            if (cpf == "exit"){ return false;   }
        }

        let data = prompt("Data da consulta: ");
        if (data == "exit"){    return false;   }
        while (!this.#validaData(data)){
            data = prompt("Data de nascimento: ");
            if (data == "exit"){    return false;   }
        }

        let horaI = prompt("Hora inicial: ");
        if (horaI == "exit"){   return false;   }
        while (!this.#validaHora(horaI)){
            horaI = prompt("Hora inicial: ");
            if (horaI == "exit"){   return false;   }
        }

        if (this.listaConsulta.cancelarAgendamento(cpf, data, horaI)){
            console.log("\nAgendamento cancelado com sucesso!\n");
            return true;
        }
        return false;
    }

    #validaData(data){
        let dataSeparada = data.split("/");
        if (dataSeparada.length != 3){
            console.log("\nErro: formato de data inválida, digite no formato DD/MM/AAAA\n");
            return false;
        }
        return true;
    }

    #validaHora(hora){
        let horaSeparada = hora.split("");
        if (horaSeparada.length != 4){
            console.log("\nErro: formato de hora inválida, digite no formato HHMM\n");
            return false;
        }
        return true;
    }

    listarAgenda(){
        let caso = prompt("Apresentar a agenda T-Toda ou P-Periodo: ");
        while (caso != "T" && caso != "P"){
            console.log("\nErro: escolha entre T ou P\n");
            caso = prompt("Apresentar a agenda T-Toda ou P-Período");
        }
        let lista = [];
        switch(caso){
            case 'P':
                let dataI = prompt("Data inicial: ");
                while (!this.#validaData(dataI)){
                    let dataI = prompt("Data inicial: ");
                }
                let dataF = prompt("Data final: ")
                while (!this.#validaData(dataF)){
                    let dataF = prompt("Data final: ");
                }
                this.listaConsulta.sort();
                lista = this.listaConsulta.filtra(dataI, dataF);
                break;
            case 'T':
                this.listaConsulta.sort();
                lista = this.listaConsulta.listaDeConsultas;
                break;
        }
        let maiorNome = this.listaPaciente.getPacientePorPosicao(0).nome;
        for (let i = 0; i < this.listaPaciente.length; i++){
            let PAtual = this.listaPaciente.getPacientePorPosicao(i);
            let nomeAtual = PAtual.nome;
            if (nomeAtual.length > maiorNome.length){
                maiorNome = nomeAtual;
            }
        }
        let linhaTracos = "----------------------------------------";
        for (let i = 0; i < maiorNome.length; i++){
            linhaTracos = linhaTracos.concat("-");
        }
        let linhaMenu = "   Data    H.Ini H.Fim Tempo Nome";
        for (let i = 0; i < maiorNome.length - 4; i++){
            linhaMenu = linhaMenu.concat(" ");
        }
        linhaMenu = linhaMenu.concat("  Dt.Nasc. ");
        console.log(linhaTracos);
        console.log(linhaMenu);
        console.log(linhaTracos);
        let dataAnterior = "00/00/0000";
        for (let i in lista){
            let linhaConsulta = "";
            if (lista[i].data == dataAnterior){
                linhaConsulta = linhaConsulta.concat("           ");
            }
            else{
                linhaConsulta = linhaConsulta.concat(lista[i].data).concat(" ");
            }
            dataAnterior = lista[i].data;
            linhaConsulta = linhaConsulta.concat(this.#formataHora(lista[i].horaI)).concat(" ").concat(this.#formataHora(lista[i].horaF)).concat(" ");
            linhaConsulta = linhaConsulta.concat(this.#calculaDuracao(lista[i].horaI, lista[i].horaF)).concat(" ");
            let PAtual = this.listaPaciente.getPaciente(lista[i].cpf);
            let nomeAtual = PAtual.nome;
            linhaConsulta = linhaConsulta.concat(nomeAtual).concat(" ");
            let dtNascAtual = PAtual.dataNasc;
            linhaConsulta = linhaConsulta.concat(dtNascAtual);
            console.log(linhaConsulta);
        }
    }

    #calculaDuracao(horaI, horaF){
        let horasISeparada = horaI.split("");
        let horasI = parseInt(horasISeparada[0])*10 + parseInt(horasISeparada[1]);
        let minutosI = parseInt(horasISeparada[2])*10 + parseInt(horasISeparada[3]);
        let horasFSeparada = horaF.split("");
        let horasF = parseInt(horasFSeparada[0])*10 + parseInt(horasFSeparada[1]);
        let minutosF = parseInt(horasFSeparada[2])*10 + parseInt(horasFSeparada[3]);
        let diferencaMinutos = minutosF - minutosI;
        let diferencaHoras = horasF - horasI;
        if (diferencaMinutos < 0){
            diferencaHoras--;
            diferencaMinutos += 60;
        }
        let stringHoras = String(diferencaHoras);
        let stringMinutos = String(diferencaMinutos);
        if (diferencaHoras < 10){
            stringHoras = "0".concat(stringHoras);
        }
        if (diferencaMinutos < 10){
            stringMinutos = "0".concat(stringMinutos);
        }
        let duracaoFormatada = stringHoras.concat(":").concat(stringMinutos);
        return duracaoFormatada;
    }
}

let ig = new InterfaceGrafica();
ig.menuPrincipal();