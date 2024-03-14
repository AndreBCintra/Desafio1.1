class ListaPacientes{
    #pacientes = [];

    constructor(){}

    addPaciente(paciente){
        if (!this.verificaPacientePorCpf(paciente.cpf)){
            console.log("\nErro: CPF já cadastrado\n");
            return false;
        }
        this.#pacientes.push(paciente);
        return true;
    }

    remPaciente(cpf){
        if (this.verificaPacientePorCpf(cpf)){
            console.log("\nErro: paciente não cadastrado");
            return false;
        }
        for (let i in this.#pacientes){
            if (this.#pacientes[i].cpf == cpf){
                this.#pacientes.splice(i, 1);
                return true;
            }
        }
        return false;
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
                    console.log(aUpper)
                    console.log(bUpper)
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

    getPacientePorPosicao(i){
        return this.#pacientes[i]
    }

    getPaciente(cpf){
        for (let i in this.#pacientes){
            if (this.#pacientes[i].cpf == cpf){
                return this.#pacientes[i];
            }
        }
    }
}

module.exports = ListaPacientes