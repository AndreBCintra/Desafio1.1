const Paciente = require("../Model/Paciente.js");

class ListaDePacientes {
    #pacientes = [];

    constructor(){}

    get length(){
        return this.#pacientes.length;
    }

    verificaPacientePorCpf(cpf){
        for (let i in this.#pacientes){
            if (this.#pacientes[i].cpf == cpf){
                return false;
            }
        }
        return true;
    }

    adicionarPaciente(cpf, nome, data){
        let P = new Paciente(cpf, nome, data);
        this.#pacientes.push(P);
    }

    removerPaciente(cpf){
        for (let i in this.#pacientes){
            if (this.#pacientes[i].cpf == cpf){
                this.#pacientes.splice(i, 1);
                return "Paciente excluido com sucesso!";
            }
        }
        return false;
    }

    getPacientePorPosicao(pos){
        return this.#pacientes[pos];
    }

    getPacientePorCpf(cpf){
        for (let i in this.#pacientes){
            if (this.#pacientes[i].cpf == cpf){
                return this.#pacientes[i];
            }
        }
    }

    sort(caso){
        switch(caso){
            case '1':
                this.#pacientes = this.#pacientes.sort((a, b) => a.cpf - b.cpf);
                break;
            case '2':
                this.#pacientes = this.#pacientes.sort((a, b) => {
                    let aUpper = a.nome.toUpperCase();
                    let bUpper = b.nome.toUpperCase();
                    if (aUpper < bUpper){
                        return -1;
                    }
                    if (aUpper > bUpper){
                        return 1;
                    }
                    return 0;
                });
            break;
        }
    } 
}

module.exports = ListaDePacientes;