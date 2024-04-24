import promptSync from 'prompt-sync';

const prompt = promptSync();

export default class Entrada {
    constructor(){}

    mostrarMenuPrincipal(){
        console.log("\nMenu principal");
        console.log("1-Cadastro de pacientes");
        console.log("2-Agenda");
        console.log("3-Fim");
    }

    mostrarMenuDoCadastroDePacientes(){
        console.log("\nMenu do Cadastro de Pacientes");
        console.log("1-Cadastrar novo paciente");
        console.log("2-Excluir paciente");
        console.log("3-Listar pacientes (ordenado por CPF)");
        console.log("4-Listar pacientes (ordenado por nome)");
        console.log("5-Voltar p/ menu principal");
    }

    mostrarAgenda(){
        console.log("\nAgenda");
        console.log("1-Agenda consulta");
        console.log("2-Cancelar agendamento");
        console.log("3-Listar agenda");
        console.log("4-Voltar p/ menu principal");
    }

    ask(pedido){
        let resposta = prompt(pedido);
        return resposta;
    }
}