export default class Controller {
    E;
    L;
    A;
    LP;
    V;
    Er;

    constructor(E, L, A, LP, V, Er){
        this.E = E;
        this.L = L;
        this.A = A;
        this.LP = LP;
        this.V = V;
        this.Er = Er;
    }

    initMenuPrincipal(){
        let exit = false;
        while(exit == false){
            this.E.mostrarMenuPrincipal()
            let escolha = this.E.ask("");
            switch(escolha){
                case '1':
                    this.initMenuPaciente();
                    break;
                case '2':
                    this.initAgenda();
                    break;
                default:
                    exit = true;
                    break;
            }
        }
    }

    initMenuPaciente(){
        let exit = false;
        let erroNaListagem = false;
        while(exit == false){
            this.E.mostrarMenuDoCadastroDePacientes();
            let escolha = this.E.ask("");
            switch(escolha){
                case '1':
                    this.cadastrarPaciente();
                    break;
                case '2':
                    this.excluirPaciente();
                    break;
                case '3':
                    erroNaListagem = this.L.listarPacientes(1, this.LP, this.A);
                    if (erroNaListagem){
                        this.Er.printErro(erroNaListagem)
                    }
                    break;
                case '4':
                    erroNaListagem = this.L.listarPacientes(2, this.LP, this.A);
                    if (erroNaListagem){
                        this.Er.printErro(erroNaListagem)
                    }
                    break;
                default:
                    exit = true;
                    break;
            }
        }
    }

    initAgenda(){
        let exit = false;
        let erroNaListagem = false;
        while(exit == false){
            this.E.mostrarAgenda();
            let escolha = this.E.ask("");
            switch(escolha){
                case '1':
                    this.agendarConsulta();
                    break;
                case '2':
                    this.cancelarAgendamento();
                    break;
                case '3':
                    let caso = this.E.ask("Apresentar a agenda T-Toda ou P-Periodo: ");
                    while (caso != "T" && caso != "P"){
                        this.Er.printErro("escolha entre T ou P");
                        caso = this.E.ask("Apresentar a agenda T-Toda ou P-Período: ");
                    }
                    let lista = [];
                    if (this.A.length > 1){
                        this.A.sort();
                    }
                    switch(caso){
                        case 'P':
                            let dataI = this.E.ask("Data inicial: ");
                            let dataIValida = this.V.validaFormatoData(dataI);
                            while (dataIValida){
                                this.Er.printErro(dataIValida);
                                dataI = this.E.ask("Data inicial: ");
                            }
                            let dataF = this.E.ask("Data final: ");
                            let dataFValida = this.V.validaFormatoData(dataF);
                            while (!this.V.validaFormatoData(dataF)){
                                this.Er.printErro(dataFValida);
                                dataF = this.E.ask("Data final: ");
                            }
                            lista = this.A.filtra(dataI, dataF);
                            break;
                        case 'T':
                            lista = this.A.listaDeConsultas;
                            break;
                    }
                    erroNaListagem = this.L.listarAgenda(lista, this.LP);
                    if (erroNaListagem){
                        this.Er.printErro(erroNaListagem)
                    }
                    break;
                default:
                    exit = true;
                    break;
            }
        }
    }

    cadastrarPaciente(){

        let CPF = this.E.ask("CPF: ");
        let CPFNaoValido = this.V.validaCPF(CPF, this.LP);
        while (CPFNaoValido){
            if (CPF == "exit"){return false}
            this.Er.printErro(CPFNaoValido);
            CPF = this.E.ask("CPF: ");
            CPFNaoValido = this.V.validaCPF(CPF, this.LP);
        }

        let nome = this.E.ask("Nome: ");
        let nomeNaoValido = this.V.validaNome(nome);
        while (nomeNaoValido){
            if (nome == "exit"){return false}
            this.Er.printErro(nomeNaoValido);
            nome = this.E.ask("Nome: ");
            nomeNaoValido = this.V.validaNome(nome);
        }

        let dataDeNascimento = this.E.ask("Data de nascimento: ");
        let dataNaoValida = this.V.validaDataNascimento(dataDeNascimento);
        while (dataNaoValida){
            if (dataDeNascimento == "exit"){return false}
            this.Er.printErro(dataNaoValida);
            dataDeNascimento = this.E.ask("Data de nascimento: ");
            dataNaoValida = this.V.validaDataNascimento(dataDeNascimento);
        }

        this.LP.adicionarPaciente(CPF, nome, dataDeNascimento);
        this.L.exibirMensagem("\nPaciente cadastrado com sucesso!\n");
    }

    excluirPaciente(){

        let CPF = this.E.ask("CPF: ");
        if (CPF == "exit"){return false}
        let remocaoNaoValida = this.V.validaRemocao(CPF, this.LP, this.A);
        if (remocaoNaoValida){
            this.Er.printErro(remocaoNaoValida);
            return false
        }

        this.LP.removerPaciente(CPF);
        this.A.removerPaciente(CPF);
        this.L.exibirMensagem("\nPaciente excluido com sucesso!\n");
    }

    agendarConsulta(){

        let CPF = this.E.ask("CPF: ");
        let CPFCadastrado = this.V.verificaSeCPFCadastrado(CPF, this.LP);
        let CPFJaComConsulta = this.V.verificaConsultaMarcada(CPF, this.A);

        while (CPFCadastrado || CPFJaComConsulta){
            if (CPF == "exit"){return false;}
            if (CPFCadastrado){
                this.Er.printErro(CPFCadastrado);
            }
            if (CPFJaComConsulta){
                this.Er.printErro(CPFJaComConsulta);
            }
            CPF = this.E.ask("CPF: ");
            CPFCadastrado = this.V.verificaSeCPFCadastrado(CPF, this.LP);
            CPFJaComConsulta = this.V.verificaConsultaMarcada(CPF, this.A);
        }

        let data = this.E.ask("Data: ");
        let dataValida = this.V.validaData(data);
        while (dataValida){
            if (data == "exit"){return false;}
            this.Er.printErro(dataValida);
            data = this.E.ask("Data: ");
            dataValida = this.V.validaData(data);
        }

        let horaInicial = this.E.ask("Hora inicial: ");
        let horaInicialValida = this.V.validaHoraInicial(data, horaInicial);
        while (horaInicialValida){
            if (horaInicial == "exit"){return false;}
            this.Er.printErro(horaInicialValida);
            horaInicial = this.E.ask("Hora inicial: ");
            horaInicialValida = this.V.validaHoraInicial(data, horaInicial);
        }

        let horaFinal = this.E.ask("Hora final: ");
        let horaFinalValida = this.V.validaHoraFinal(horaFinal, horaInicial);
        while (horaFinalValida){
            if (horaFinal == "exit"){return false;}
            this.Er.printErro(horaFinalValida);
            horaFinal = this.E.ask("Hora final: ");
            horaFinalValida = this.V.validaHoraFinal(horaFinal, horaInicial);
        }

        this.A.adicionarConsulta()
        this.L.exibirMensagem("\nConsulta agendada com sucesso!\n")
    }

    cancelarAgendamento(){
        let CPF = this.E.ask("CPF: ");
        let CPFCadastrado = this.V.verificaSeCPFCadastrado(CPF, this.LP);
        while (CPFCadastrado){
            if (CPF == "exit"){return false;}
            this.Er.printErro(CPFCadastrado);
            CPF = this.E.ask("CPF: ");
            CPFCadastrado = this.V.verificaSeCPFCadastrado(CPF, this.LP);
        }

        let data = this.E.ask("Data: ");
        let dataValida = this.V.validaFormatoData(data);
        while (dataValida){
            if (data == "exit"){return false;}
            this.Er.printErro(dataValida);
            data = this.E.ask("Data: ");
            dataValida = this.V.validaFormatoData(data);
        }

        let horaInicial = this.E.ask("Hora inicial: ");
        let horaValida = this.V.validaFormatoHora(horaInicial);
        while (horaValida){
            if (horaInicial == "exit"){return false}
            this.Er.printErro(horaValida);
            horaInicial = this.E.ask("Hora inicial: ");
            horaValida = this.V.validaFormatoHora(horaInicial);
        }

        let sucesso = this.A.cancelarConsulta(CPF, data, horaInicial);
        if (sucesso){
            this.L.exibirMensagem("\nAgendamento cancelado com sucesso!\n");
        }
        else {
            this.Er.printErro("agendamento não encontrado");
        }
    }
}