const Consulta = require('./Consulta');

class ListaConsultas{
    #consultas = [];

    constructor(){}

    get listaDeConsultas(){
        return this.#consultas;
    }

    verificaConsultaNoCpf(cpf){
        for (let i = 0; i < this.#consultas.length; i++){
            if (this.#consultas[i].cpf == cpf && this.#consultas[i].futura){
                this.#consultas[i].atualizaEstado();
                if (this.#consultas.futura){
                    console.log("\nErro: paciente já está agendado\n");
                    return false;
                }
            }
        }
        return true;
    }

    #verificaHorarioDisponivel(C){
        for (let i = 0; i < this.#consultas.length; i++){
            if (this.#consultas[i].data == C.data){
                if (!(C.horaF < this.#consultas[i].horaI || C.horaI > this.#consultas[i].horaF)){
                    console.log("\nErro: já existe uma consulta agendada nesse horário\n");
                    return false;
                }
            }
        }
        return true;
    }

    addConsulta(Consulta){
        if (this.verificaConsultaNoCpf(Consulta.cpf) && this.#verificaHorarioDisponivel(Consulta)){
            this.#consultas.push(Consulta);
            console.log("\nAgendamento realizado com sucesso!\n");
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
                    console.log("\nErro: agendamento não encontrado\n");
                    return false;
                }
            }
        }
        return false;
    }

    cancelarAgendamento(cpf, data, horaI){
        let i = this.#verificaAgendamento(cpf, data, horaI);
        if (i){
            this.#consultas.splice(i-1, 1); // Como o metodo verificaAgendamento retorna i+1 eu retiro o termo i-1
            return true;
        }
        return false;
    }

    excluiPaciente(cpf){
        for (let i = 0; i < this.#consultas.length; i++){
            if (this.#consultas[i].cpf == cpf){
                this.#consultas.splice(i, 1);
                i--;
            }
        }
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

    getConsultaNaPosicaoI(i){
        return this.#consultas[i];
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

module.exports = ListaConsultas