class Consulta{
    #cpf;
    #data;
    #horaInicial;
    #horaFinal;
    #futura;

    constructor(){
        this.#futura = true;
    }

    get futura(){
        return this.#futura;
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
        return this.#horaFinal;
    }

    atualizaEstado(){
        let hoje = new Date();
        let dataSeparada = this.#data.split("/");
        let horaSeparada = this.#horaFinal.split("");
        let horas = parseInt(horaSeparada[0])*10 + parseInt(horaSeparada[1]);
        let minutos = parseInt(horaSeparada[2])*10 + parseInt(horaSeparada[3]);
        let data = new Date(dataSeparada[2], dataSeparada[1], dataSeparada[0], horas, minutos);
        if (data < hoje){
            console.log("eita");
            this.#futura = false;
        }
    }

    setCpf(cpf){
        this.#cpf = cpf;
    }

    #verificaData(data){
        let hoje = new Date();
        let dataSeparada = data.split("/");
        let dataNova = new Date(dataSeparada[2], dataSeparada[1] - 1, dataSeparada[0]);
        let dataHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDay());
        if (dataNova < dataHoje){
            console.log("\nErro: data agendada já passou\n");
            return false;
        }
        return true;
    }

    setData(data){
        if (this.#verificaData(data)){
            this.#data = data;
            return true;
        }
        return false;
    }

    #verificaHoraInicial(hora){
        let hoje = new Date();
        let horaSeparada = hora.split("");
        let dataSeparada = this.#data.split("/");
        if (horaSeparada.length != 4){
            console.log("\nErro: formato de data inválido, digite no formato HHMM\n");
            return false;
        }
        let horas = parseInt(horaSeparada[0])*10 + parseInt(horaSeparada[1]);
        let minutos = parseInt(horaSeparada[2])*10 + parseInt(horaSeparada[3]);
        let dia = parseInt(dataSeparada[0]);
        let mes = parseInt(dataSeparada[1]-1);
        let ano = parseInt(dataSeparada[2]);
        let dataDaConsulta = new Date(ano, mes, dia, horas, minutos);
        if (dataDaConsulta < hoje){
            console.log("\nErro: hora agendada já passou\n");
            return false;
        }
        if (minutos % 15 != 0){
            console.log("\nErro: a consulta deve ocorrer a cada 15 minutos\n");
            return false;
        }
        if (horas < 8 || horas >= 19){
            console.log("\nErro: a consulta deve começar entre 8h e 19h\n");
            return false;
        }
        return true;
    }

    setHoraInicial(hora){
        if (this.#verificaHoraInicial(hora)){
            this.#horaInicial = hora;
            return true;
        }
        return false;
    }

    #verificaHoraFinal(hora){
        let horaSeparada = hora.split("");
        if (horaSeparada.length != 4){
            console.log("\nErro: formato de data inválido, digite no formato HHMM\n");
            return false;
        }
        let horas = parseInt(horaSeparada[0])*10 + parseInt(horaSeparada[1]);
        let minutos = parseInt(horaSeparada[2])*10 + parseInt(horaSeparada[3]);
        if (minutos % 15 != 0){
            console.log("\nErro: a consulta deve ocorrer a cada 15 minutos\n");
            return false;
        }
        let horaInicialSeparada = this.#horaInicial.split("");
        let horasInicial = parseInt(horaInicialSeparada[0])*10 + parseInt(horaInicialSeparada[1]);
        let minutosInicial = parseInt(horaInicialSeparada[2])*10 + parseInt(horaInicialSeparada[3]); 
        if (horasInicial == horas && minutosInicial == minutos){
            console.log("\nErro: a consulta deve ter pelo menos 15 minutos de duração\n");
            return false;
        }
        if (horasInicial > horas || (horasInicial == horas && minutosInicial > minutos)){
            console.log("\nErro: a hora final deve ser depois da hora inicial\n");
            return false;
        }
        if (horas < 8 || horas > 19 || (horas == 19 && minutos != 0)){
            console.log("\nErro: a consulta deve terminar entre 8h e 19h\n");
            return false;
        }
        return true;
    }

    setHoraFinal(hora){
        if (this.#verificaHoraFinal(hora)){
            this.#horaFinal = hora;
            return true;
        }
        return false;
    }
}

module.exports = Consulta;