import Consulta from "./Consulta.js";

export default class Agenda {
    #consultas = [];

    constructor(){}

    get length(){
        return this.#consultas.length;
    }
    get listaDeConsultas(){
        return this.#consultas;
    }

    adicionarConsulta(cpf, data, horaInicial, horaFinal){
        let C = new Consulta(cpf, data, horaInicial, horaFinal);
        this.#consultas.push(C);
    }

    removerPaciente(cpf){
        for (let i = 0; i < this.#consultas.length; i++){
            if (this.#consultas[i].cpf == cpf){
                this.#consultas.splice(i, 1);
                i--;
            }
        }
    }

    cancelarConsulta(cpf, data, hora){
        let i = this.#verificaAgendamento(cpf, data, hora);
        if (i){
            this.#consultas.splice(i-1, 1); // Como o metodo verificaAgendamento retorna i+1 eu retiro o termo i-1
            return true;
        }
        return false;
    }

    #verificaAgendamento(cpf, data, horaI){
        for (let i in this.#consultas){
            this.#consultas[i].atualizaEstado();
            if (this.#consultas[i].cpf == cpf && this.#consultas[i].futura){
                if (this.#consultas[i].data == data && this.#consultas[i].horaI == horaI){
                    return i+1; // O retorno é i+1 pra na verificação dar true mesmo caso o indice seja 0
                }
                else{
                    return false;
                }
            }
        }
        return false;
    }

    encontraConsultaValida(cpf){
        for (let i in this.#consultas){
            if (this.#consultas[i].cpf == cpf){
                this.#consultas[i].atualizaEstado();
                if (this.#consultas[i].futura){
                    return i+1;
                }
            }
        }
        return false;
    }

    sort(){
        this.#consultas.sort((a, b) => {
            let dataASeparada = a.data.split("/");
            let dataBSeparada = b.data.split("/");
            let horaASeparada = a.horaI.split("");
            let horaBSeparada = b.horaI.split("");
            let diaA = dataASeparada[0];
            let diaB = dataBSeparada[0];
            let mesA = dataASeparada[1];
            let mesB = dataBSeparada[1];
            let anoA = dataASeparada[2];
            let anoB = dataBSeparada[2];
            let horaA = parseInt(horaASeparada[0])*10 + parseInt(horaASeparada[1]);
            let horaB = parseInt(horaBSeparada[0])*10 + parseInt(horaBSeparada[1]);
            let minutoA = parseInt(horaASeparada[2])*10 + parseInt(horaASeparada[3]);
            let minutoB = parseInt(horaBSeparada[2])*10 + parseInt(horaBSeparada[3]);
            let dataA = new Date(anoA, mesA, diaA, horaA, minutoA);
            let dataB = new Date(anoB, mesB, diaB, horaB, minutoB);
            if (dataA < dataB){
                return -1;
            }
            else if (dataA > dataB){
                return 1;
            }
        });
    }

    filtra(dataI, dataF){
        return this.#consultas.filter((p) => {
            if (p.data >= dataI && p.data <= dataF){
                return true;
            }
            else{   return false;   }
        });
    }
}