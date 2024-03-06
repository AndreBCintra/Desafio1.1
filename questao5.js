class Cliente {
    
    nome;
    cpf;
    dataNasc;
    renda;
    estadoCivil;
    dependentes;

    constructor(){

    }

    setNome(nome){
        if (nome.length < 5) {
            console.log("Pelo menos 5 caracteres")
            return false;
        }
        this.nome = nome;
        return true;
    }

    setCPF(cpf){
        if (cpf.length != 11) {
            console.log("Digite um cpf válido no formato 99999999999");
            return false;
        }
        if (isNaN(cpf)){
            console.log("Digite um valor numérico");
            return false;
        }
        cpf = cpf.split("");
        cpf.splice(3, 0 ,".");
        cpf.splice(7, 0 ,".");
        cpf.splice(11, 0 ,"-");
        cpf = cpf.join("");
        this.cpf = cpf;
        return true;
    }

    #bissexto(ano){
        if (ano % 4 == 0){
            if (ano % 100 == 0){
                if (ano % 400 == 0){
                    return true;
                }
                else{   return false;   }
            }
            else{   return true;  }
        }
        else{   return false;    }
    }

    #idade(dia, mes, ano){
        let hoje = new Date();
        let diferencaAnos = hoje.getFullYear() - ano;
        if ( new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) < new Date(hoje.getFullYear(), mes, dia)){
            diferencaAnos--;
        }
        return diferencaAnos;
    }

    setDataNasc(dataNasc){
        let data = dataNasc.split("/");
        if (data.length != 3){
            console.log("Digite uma data válida no formato DD/MM/AAAA");
            return false;
        }
        try{
            let dia = data[0];
            let mes = data[1];
            let ano = data[2];
            if (dia < 0){
                console.log("Digite um ano válido");
                return false;
            }
            if (mes <= 0 || mes >= 13 ){
                console.log("Digite um mês válido")
                return false;
            }
            let diaCheck = true;
            if (mes == 2){
                if (!this.#bissexto(ano)){
                    if (dia > 28){
                        diaCheck = false;
                    }
                }
                else{   
                    if (dia > 29){
                        diaCheck = false;
                    }
                }
            }
            else if (mes == 4 || mes == 6 || mes == 9 || mes == 11){
                if (dia > 30){
                    diaCheck = false;
                }
            }
            else{
                if (dia > 31){
                    diaCheck = false;
                }
            }
            if (!diaCheck){
                console.log("Digite um dia válido");
                return false;
            }
            if (this.#idade(dia, mes, ano) < 18){
                console.log("O cliente precisa ter pelo menos 18 anos");
                return false;
            }
            this.dataNasc = dataNasc;
            return true;
        }
        catch(err){
            console.log("Digite uma data válida no formato DD/MM/AAAA")
            return false;
        }
    }

    setRenda(valor){
        let valorSeparado = valor.split(",");
        if (valorSeparado.length != 2){
            console.log("Digite um valor numerico no formato XX,XX");
            return false;
        }
        let unidade = 0;
        let decimais = 0;
        try {
            unidade = parseInt(valorSeparado[0]);
            decimais = parseInt(valorSeparado[1]);
        }
        catch(err){
            console.log("Digite apenas números");
            return false;
        }
        this.renda = (unidade + (decimais / 100)).toFixed(2);
        return true;
    }

    setEstadoCivil(estadoCivil){
        switch(estadoCivil){
            case 'C':
            case 'c':
                this.estadoCivil = "Casado";
                return true;
            case 'S':
            case 's':
                this.estadoCivil = "Solteiro";
                return true;
            case 'V':
            case 'v':
                this.estadoCivil = "Viúvo";
                return true;
            case 'D':
            case 'd':
                this.estadoCivil = "Divorciado";
                return true;
            default:
                console.log("Digite uma entrada entre 'C', 'S', 'V' ou 'D'\nC - Casado\nS - Solteiro\nV - Viúvo\nD - Divorciado");
                return false;
        }
    }

    setDependentes(dependentes){
        if (dependentes > 10 || dependentes < 0) {
            console.log("Número de dependentes inválido");
            return false;
        }
        else {
            this.dependentes = dependentes;
            return true;
        }
    }

    imprime(){
        console.log("Nome:               " + this.nome + "\n" +
                    "CPF:                " + this.cpf + "\n" +
                    "Data de nascimento: " + this.dataNasc + "\n" +
                    "Renda mensal:       " + this.renda + "\n" +
                    "Estado civil:       " + this.estadoCivil + "\n" +
                    "Dependentes:        " + this.dependentes);
    }
}

let c1 = new Cliente();

const prompt = require('prompt-sync') ();

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