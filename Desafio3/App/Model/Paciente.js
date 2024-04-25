class Paciente {
    cpf;
    nome;
    data;

    constructor(cpf, nome, data){
        this.cpf = cpf;
        this.nome = nome;
        this.data = data;
    }

    idade(){
        let dataSeparada = this.data.split("/");
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
}

module.exports = Paciente;