export default class Validador {
    constructor(){}

    validaCPF(cpf, LP){
        if (!LP.verificaPacientePorCpf(cpf)){
            return "CPF já cadastrado";
        }
        if (cpf.length != 11){
            return "CPF com mais ou menos de 11 dígitos";
        }
        let tudoRepetido = true;
        let i = 1;
        while (tudoRepetido && i < cpf.length){ // Verifica se todos os digitos são iguais
            if (cpf[i] == cpf[i-1]){
                tudoRepetido = true;
            }
            else{
                tudoRepetido = false;
            }
            i++;
        }
        if (tudoRepetido){
            return "CPF inválido";
        }
        let cpfArray = cpf.split("");
        let jCorreto = 0;
        for (let i = 0; i < 9; i++){ // Calcula iterativamente o valor de J
            jCorreto += (10-i) * (cpfArray[i]);
        }
        let resto = jCorreto % 11;
        if (resto == 0 || resto == 1){
            jCorreto = 0;
        }
        else{
            jCorreto = 11 - resto;
        }
        if (cpfArray[9] != jCorreto){
            return "CPF com dígito J inválido";
        }
        let kCorreto = 0;
        for (let i = 0; i < 10; i++){ // Calcula iterativamente o valor de J
            kCorreto += (11-i) * (cpfArray[i]);
        }
        resto = kCorreto % 11;
        if (resto == 0 || resto == 1){
            kCorreto = 0;
        }
        else{
            kCorreto = 11 - resto;
        }
        if (cpfArray[10] != kCorreto){
            return "CPF com dígito K inválido";
        }
        return false;
    }

    verificaSeCPFCadastrado(Cpf, LP){
        if (LP.verificaPacientePorCpf(Cpf)){
            return "paciente não cadastrado";
        }
        return false;
    }

    verificaConsultaMarcada(Cpf, A){
        if (A.encontraConsultaValida(Cpf)){
            return "paciente já tem consulta agendada";
        }
        return false;
    }

    validaNome(nome){
        if (nome.length < 5){
            return "nome deve ter pelo menos 5 digitos";
        }
        return false;
    }

    validaDataNascimento(dataNasc){
        let dataSeparada = dataNasc.split("/");
        if (dataSeparada.length != 3){
            return "Data de nascimento deve ser no formato DD/MM/AAAA";
        }
        let data = {
            dia: dataSeparada[0],
            mes: dataSeparada[1],
            ano: dataSeparada[2]
        }
        let dia = parseInt(data.dia);
        let mes = parseInt(data.mes);
        let ano = parseInt(data.ano);
        let diaPorMes = [ 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (ano % 400 === 0 || ano % 4 === 0 && ano % 100 !== 0) {
            diaPorMes[2] = 29;
        }
        if (mes < 1 || mes > 12){
            return "mês inválido";
        }
        if (dia < 1 || dia > diaPorMes[mes]){
            return "dia inválido";
        }
        let idade = this.idade(dataNasc);
        if (idade < 13){
            return "o paciente precisa ter pelo menos 13 anos";
        }
        return false;
    }

    idade(dataNasc){
        let dataSeparada = dataNasc.split("/");
        let data = {
            dia: dataSeparada[0],
            mes: dataSeparada[1],
            ano: dataSeparada[2]
        }
        let dia = parseInt(data.dia);
        let mes = parseInt(data.mes);
        let ano = parseInt(data.ano);
        let hoje = new Date();
        let idade = hoje.getFullYear() - ano;
        let m = hoje.getMonth() - mes;
        if (m < 0 || (m == 0 && hoje.getDate() < dia)){
            idade --
        }
        return idade;
    }

    validaRemocao(cpf, LP, A){
        if (LP.verificaPacientePorCpf(cpf)){
            return "paciente não cadastrado";
        }
        if (A.encontraConsultaValida(cpf)){
            return "paciente está agendado";
        }
        return false;
    }

    validaData(data){
        let hoje = new Date();
        let dataSeparada = data.split("/");
        let dataNova = new Date(dataSeparada[2], dataSeparada[1] - 1, dataSeparada[0]);
        let dataHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDay());
        if (dataNova < dataHoje){
            return "data agendada já passou";
        }
        return false;
    }

    validaFormatoData(data){
        let dataSeparada = data.split("/");
        if (dataSeparada.length != 3){
            return "formato de data inválida, digite no formato DD/MM/AAAA";
        }
        return false;
    }

    validaFormatoHora(hora){
        let horaSeparada = hora.split("");
        if (horaSeparada.length != 4){
            return "formato de hora inválida, digite no formato HHMM";
        }
        return false;
    }

    validaHoraInicial(data, hora){
        let hoje = new Date();
        let horaSeparada = hora.split("");
        let dataSeparada = data.split("/");
        if (horaSeparada.length != 4){
            return "formato de data inválido, digite no formato HHMM";
        }
        let horas = parseInt(horaSeparada[0])*10 + parseInt(horaSeparada[1]);
        let minutos = parseInt(horaSeparada[2])*10 + parseInt(horaSeparada[3]);
        let dia = parseInt(dataSeparada[0]);
        let mes = parseInt(dataSeparada[1]-1);
        let ano = parseInt(dataSeparada[2]);
        let dataDaConsulta = new Date(ano, mes, dia, horas, minutos);
        if (dataDaConsulta < hoje){
            return "hora agendada já passou";
        }
        if (minutos % 15 != 0){
            return "a consulta deve ocorrer a cada 15 minutos";
        }
        if (horas < 8 || horas >= 19){
            return "a consulta deve começar entre 8h e 19h";
        }
        return false;
    }

    validaHoraFinal(hora, horaInicial){
        let horaSeparada = hora.split("");
        if (horaSeparada.length != 4){
            return "formato de data inválido, digite no formato HHMM";
        }
        let horas = parseInt(horaSeparada[0])*10 + parseInt(horaSeparada[1]);
        let minutos = parseInt(horaSeparada[2])*10 + parseInt(horaSeparada[3]);
        if (minutos % 15 != 0){
            return "a consulta deve ocorrer a cada 15 minutos";
        }
        let horaInicialSeparada = horaInicial.split("");
        let horasInicial = parseInt(horaInicialSeparada[0])*10 + parseInt(horaInicialSeparada[1]);
        let minutosInicial = parseInt(horaInicialSeparada[2])*10 + parseInt(horaInicialSeparada[3]); 
        if (horasInicial == horas && minutosInicial == minutos){
            return "a consulta deve ter pelo menos 15 minutos de duração";
        }
        if (horasInicial > horas || (horasInicial == horas && minutosInicial > minutos)){
            return "a hora final deve ser depois da hora inicial";
        }
        if (horas < 8 || horas > 19 || (horas == 19 && minutos != 0)){
            return "a consulta deve terminar entre 8h e 19h";
        }
        return false;
    }
}