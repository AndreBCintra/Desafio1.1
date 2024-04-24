export default class Listagem {
    constructor(){}

    exibirMensagem(mensagem){
        console.log(mensagem);
    }

    listarPacientes(caso, listaDePacientes, agenda){
        if (listaDePacientes.length == 0){
            return "nenhum paciente cadastrado";
        }
        listaDePacientes.sort(caso); // Funcionalidade 5.a (ordenação)
        let maiorNome = listaDePacientes.getPacientePorPosicao(0).nome;
        for (let i = 0; i < listaDePacientes.length; i++){
            let PAtual = listaDePacientes.getPacientePorPosicao(i);
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
        for (let i = 0; i < listaDePacientes.length; i++){
            let PAtual = listaDePacientes.getPacientePorPosicao(i);
            let linhaPaciente = PAtual.cpf;
            linhaPaciente = linhaPaciente.concat(" ");
            linhaPaciente = linhaPaciente.concat(PAtual.nome);
            for (let j = 0; j < maiorNome.length - PAtual.nome.length + 1; j++){
                linhaPaciente = linhaPaciente.concat(" ");
            }
            linhaPaciente = linhaPaciente.concat(PAtual.data);
            linhaPaciente = linhaPaciente.concat("   ");
            linhaPaciente = linhaPaciente.concat(PAtual.idade());
            console.log(linhaPaciente);

            let k = agenda.encontraConsultaValida(PAtual.cpf);
            if (k){ // Funcionalidade 5.b
                let linhaConsulta1 = "            Agendado para: ";
                linhaConsulta1 = linhaConsulta1.concat(agenda.getConsultaNaPosicaoI(k-1).data);
                console.log(linhaConsulta1);
                let linhaConsulta2 = "            ";
                linhaConsulta2 = linhaConsulta2.concat(this.#formataHora(agenda.getConsultaNaPosicaoI(k-1).horaI));
                linhaConsulta2 = linhaConsulta2.concat(" às ");
                linhaConsulta2 = linhaConsulta2.concat(this.#formataHora(agenda.getConsultaNaPosicaoI(k-1).horaF));
                console.log(linhaConsulta2);
            }
        }
        return false;
    }

    #formataHora(hora){
        let horaSeparada = hora.split("");
        let horaFormatada = horaSeparada[0].concat(horaSeparada[1]).concat(":").concat(horaSeparada[2]).concat(horaSeparada[3]);
        return horaFormatada;
    }

    listarAgenda(lista, listaDePacientes){
        if (lista.length == 0){
            return "não há consultas";
        }
        let maiorNome = listaDePacientes.getPacientePorPosicao(0).nome;
        for (let i = 0; i < listaDePacientes.length; i++){
            let PAtual = listaDePacientes.getPacientePorPosicao(i);
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
            let PAtual = listaDePacientes.getPaciente(lista[i].cpf);
            let nomeAtual = PAtual.nome;
            linhaConsulta = linhaConsulta.concat(nomeAtual).concat(" ");
            let dtNascAtual = PAtual.dataNasc;
            linhaConsulta = linhaConsulta.concat(dtNascAtual);
            console.log(linhaConsulta);
        }
        return false;
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