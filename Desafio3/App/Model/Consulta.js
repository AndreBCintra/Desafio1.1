class Consulta {
    #cpf;
    #data;
    #horaFinal;
    #horaInicial;
    #futura;

    constructor(cpf, data, HI, HF){
        this.#cpf = cpf;
        this.#data = data;
        this.#horaInicial = HI;
        this.#horaFinal = HF;
        this.#futura = true;
    }

    get cpf(){
        return this.#cpf;
    }
    get data(){
        return this.#data;
    }
    get horaI(){
        return this.#horaInicial;
    }
    get horaF(){
        return this.#horaFinal
    }
    get futura(){
        return this.#futura;
    }

    atualizaEstado(){
        let hoje = new Date();
        let dataSeparada = this.#data.split("/");
        let horaSeparada = this.#horaFinal.split("");
        let horas = parseInt(horaSeparada[0])*10 + parseInt(horaSeparada[1]);
        let minutos = parseInt(horaSeparada[2])*10 + parseInt(horaSeparada[3]);
        let data = new Date(dataSeparada[2], dataSeparada[1]-1, dataSeparada[0], horas, minutos);
        if (data < hoje){
            this.#futura = false;
        }
    }
}

module.exports = Consulta;