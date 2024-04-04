const fs = require('fs');

class Leitor {
    #data;

    constructor(){    }

    get data(){
        return this.#data;
    }

    ler(){
        var data;
        const args = process.argv.slice(2);
        try {
            data = fs.readFileSync(args[0], 'utf8');
        } catch (err) {
            console.error(err);
            return false;
        }
        this.#data = JSON.parse(data);
    }
}

class Validador {
    constructor(){    }

    validaCliente(cliente){
        let erro = new Erros()
        let erroNome = this.#validaNome(cliente);
        if (erroNome){
            erro.addErro("nome", erroNome);
        }
        let erroCpf = this.#validaCpf(cliente);
        if (erroCpf){
            erro.addErro("CPF", erroCpf);
        }
        let erroDtNasc = this.#validaDtNascimento(cliente);
        if (erroDtNasc){
            erro.addErro("dt_nascimento", erroDtNasc);
        }
        let erroRendaMensal = this.#validaRendaMensal(cliente);
        if (erroRendaMensal){
            erro.addErro("renda_mensal", erroRendaMensal);
        }
        let erroEstadoCivil = this.#validaEstadoCivil(cliente);
        if (erroEstadoCivil){
            erro.addErro("estado_civil", erroEstadoCivil);
        }
        return erro;
    }

    #validaNome(c){
        let nome = c.nome;
        if (nome == ""){
            return "campo obrigatório ausente";
        }
        if (nome.length < 5 || nome.length > 60){
            return "Tamanho do nome inválido";
        }
        return false;
    }

    #validaCpf(c){
        let cpf = c.cpf;
        if (cpf == ""){
            return "campo obrigatório ausente"
        }
        if (cpf.length != 11){
            return "CPF com mais ou menos de 11 dígitos"
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

    idade(dia, mes, ano){
        let hoje = new Date();
        let idade = hoje.getFullYear() - ano;
        let m = hoje.getMonth() - mes;
        if (m < 0 || (m == 0 && hoje.getDate() < dia)){
            idade --
        }
        return idade;
    }

    #validaDtNascimento(c){
        let dataNasc = c.dt_nascimento;
        if (dataNasc == ""){
            return "campo obrigatório ausente";
        }
        let dataSeparada = dataNasc.split("");
        if (dataSeparada.length != 8){
            return "Data de nascimento deve ser no formato DDMMAAAA";
        }
        let data = {
            dia: parseInt(dataSeparada[0] * 10) + parseInt(dataSeparada[1]),
            mes: parseInt(dataSeparada[2] * 10) + parseInt(dataSeparada[3]),
            ano: parseInt(dataSeparada[4] * 1000) + parseInt(dataSeparada[5] * 100) + parseInt(dataSeparada[6] * 10) + parseInt(dataSeparada[7])
        }
        let dia = data.dia;
        let mes = data.mes;
        let ano = data.ano;
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
        let idade = this.idade(dia, mes, ano);
        if (idade < 18){
            return "o cliente precisa ter pelo menos 18 anos";
        }
        return false;
    }

    #validaRendaMensal(c){
        let renda = c.renda_mensal;
        let rendaSplitada = renda.split(",");
        if (rendaSplitada.length != 2 && renda != ""){
            return "a renda deve ter duas casas decimais e virgula decimal"
        }
        return false;
    }

    #validaEstadoCivil(c){
        let estado_civil = c.estado_civil;
        if (estado_civil == "C" || estado_civil == "c" || estado_civil == "D" || estado_civil == "d" || estado_civil == "S" || estado_civil == "s" || estado_civil == "V" || estado_civil == "v" || estado_civil == ""){
            return false;
        }
        else{
            return "estado civil deve ser 'C'(casado), 'D'(divorciado), 'S'(solteiro) ou 'V'(viúvo)"
        }
    }
}

class ClienteConcatenadoComErro {
    cliente;
    erro;

    constructor(cliente, erro){
        this.cliente = cliente;
        this.erro = erro;
    }
}

class Gerador {
    constructor(){    }

    escrever(ListaDeClientes, ListaDeErros){
        let mensagem = [];
        for (let i = 0; i < ListaDeClientes.size; i++){
            let ccce = new ClienteConcatenadoComErro(ListaDeClientes.clienteNaPos(i), ListaDeErros.erroNaPos(i));
            mensagem.push(ccce);
        }
        let jsonFinal = JSON.stringify(mensagem, null, 2);
        fs.writeFile('./saida.json', jsonFinal, err => {
            if (err) {
                console.error(err);
            }
            else {
                console.log("Arquivo criado com sucesso");
            }
        })
    }
}

class ListaDeClientes {
    #clientes = [];

    constructor(data){
        for (let i in data){
            var c = new Cliente(data[i]["nome"], data[i]["cpf"], data[i]["dt_nascimento"], data[i]["renda_mensal"], data[i]["estado_civil"]);
            this.#clientes.push(c);
        }
    }

    get size(){
        return this.#clientes.length;
    }
    clienteNaPos(i){
        return this.#clientes[i];
    }
}

class Erros {
    constructor(){    }

    addErro(label, mensagemDeErro){
        if (label == "nome"){
            this.nome = mensagemDeErro;
        }
        if (label == "CPF"){
            this.cpf = mensagemDeErro;
        }
        if (label == "dt_nascimento"){
            this.dt_nascimento = mensagemDeErro;
        }
        if (label == "renda_mensal"){
            this.renda_mensal = mensagemDeErro;
        }
        if (label == "estado_civil"){
            this.estado_civil = mensagemDeErro;
        }
    }
}

class ListaDeErros {
    #lista = [];
    constructor(){  }

    add(erro){
        this.#lista.push(erro);
    }
    erroNaPos(i){
        return this.#lista[i];
    }
    getLista(){
        return this.#lista;
    }
}

class LinhaDeProducao {
    #g;
    #v;
    #l;
    #listaClientes;
    #listaErros;

    constructor(){
        this.#g = new Gerador();
        this.#v = new Validador();
        this.#l = new Leitor();
    }

    start(){
        this.#l.ler();
        let data = this.#l.data;
        this.#listaClientes = new ListaDeClientes(data);
        this.#listaErros = new ListaDeErros();
        for (let i = 0; i < this.#listaClientes.size; i++){
            let erro = this.#v.validaCliente(this.#listaClientes.clienteNaPos(i));
            this.#listaErros.add(erro);
        }
        this.#g.escrever(this.#listaClientes, this.#listaErros);
    }
}

class Cliente {
    #nome;
    #cpf;
    #dt_nascimento;
    #renda_mensal;
    #estado_civil;

    getNome(){             return this.#nome;          }
    getCpf(){              return this.#cpf;           }
    getDt_nascimento(){    return this.#dt_nascimento;  }
    getRenda_mensal(){     return this.#renda_mensal;  }
    getEstado_civil(){     return this.#estado_civil;  }

    constructor(nome, cpf, dt_nascimento, renda_mensal, estado_civil){
        this.nome = nome;
        this.cpf = cpf;
        this.dt_nascimento = dt_nascimento;
        this.renda_mensal = renda_mensal;
        this.estado_civil = estado_civil;
    }
}

var linhaDeProducao = new LinhaDeProducao();
linhaDeProducao.start();