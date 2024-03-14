class Paciente {

    #cpf;
    #nome;
    #dataNasc;

    constructor(){}

    get cpf(){
        return this.#cpf;
    }

    get nome(){
        return this.#nome;
    }

    get dataNasc(){
        return this.#dataNasc;
    }

    #validaCPF(cpf){
        if (cpf.length != 11){
            console.log("\nErro: CPF com mais ou menos de 11 dígitos\n");
            return false;
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
            console.log("\nErro: CPF inválido\n");
            return false;
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
            console.log("\nErro: CPF com dígito J inválido\n");
            return false;
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
            console.log("\nErro: CPF com dígito K inválido\n");
            return false;
        }
        return true;
    }

    #validaNome(nome){
        if (nome.length < 5){
            console.log("\nErro: nome deve ter pelo menos 5 digitos\n");
            return false;
        }
        return true;
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

    #validaDataNasc(dataNasc){
        let dataSeparada = dataNasc.split("/");
        if (dataSeparada.length != 3){
            console.log("\nErro: Data de nascimento deve ser no formato DD/MM/AAAA\n");
            return false;
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
            console.log("\nErro: mês inválido\n");
            return false;
        }
        if (dia < 1 || dia > diaPorMes[mes]){
            console.log("\nErro: dia inválido\n");
            return false;
        }
        let idade = this.idade(dataNasc);
        if (idade < 13){
            console.log("\nErro: o paciente precisa ter pelo menos 13 anos\n");
            return false;
        }
        return true;
    }

    setCpf(cpf){
        if (this.#validaCPF(cpf)){
            this.#cpf = cpf;
            return true;
        }
        return false;
    }

    setNome(nome){
        if (this.#validaNome(nome)){
            this.#nome = nome;
            return true;
        }
        return false;
    }

    setDataNasc(dataNasc){
        if (this.#validaDataNasc(dataNasc)){
            this.#dataNasc = dataNasc;
            return true;
        }
        return false;
    }
}

module.exports = Paciente;