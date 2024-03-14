class Consulta{
    #cpf;
    #data;
    #horaInicial;
    #horaFinal;

    constructor(){}

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

    setCpf(cpf){
        this.#cpf = cpf;
    }

    #verificaData(data){
        let hoje = new Date();
        let dataSeparada = data.split("/");
        let dataNova = new Date(dataSeparada[2], dataSeparada[1] - 1, dataSeparada[0]);
        if (dataNova >= hoje){
            console.log("Erro: data agendada já passou");
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
        let horaSeparada = hora.split("");
        if (horaSeparada.length != 4){
            console.log("Erro: formato de data inválido, digite no formato HHMM");
            return false;
        }
        let horas = parseInt(horaSeparada[0])*10 + parseInt(horaSeparada[1]);
        let minutos = parseInt(horaSeparada[2])*10 + parseInt(horaSeparada[3]);
        if (minutos % 15 != 0){
            console.log("Erro: a consulta deve ocorrer a cada 15 minutos");
            return false;
        }
        if (horas < 8 || horas >= 19){
            console.log("Erro: a consulta deve começar entre 8h e 19h");
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
            console.log("Erro: formato de data inválido, digite no formato HHMM");
            return false;
        }
        let horas = parseInt(horaSeparada[0])*10 + parseInt(horaSeparada[1]);
        let minutos = parseInt(horaSeparada[2])*10 + parseInt(horaSeparada[3]);
        if (minutos % 15 != 0){
            console.log("Erro: a consulta deve ocorrer a cada 15 minutos");
            return false;
        }
        let horaInicialSeparada = this.#horaInicial.split("");
        let horasInicial = parseInt(horaInicialSeparada[0])*10 + parseInt(horaInicialSeparada[1]);
        let minutosInicial = parseInt(horaInicialSeparada[2])*10 + parseInt(horaInicialSeparada[3]); 
        if (horasInicial == horas && minutosInicial == minutos){
            console.log("Erro: a consulta deve ter pelo menos 15 minutos de duração");
            return false;
        }
        if (horasInicial > horas || (horasInicial == horas && minutosInicial > minutos)){
            console.log("Erro: a hora final deve ser depois da hora inicial");
            return false;
        }
        if (horas < 8 || horas > 19 || (horas == 19 && minutos != 0)){
            console.log("Erro: a consulta deve terminar entre 8h e 19h");
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