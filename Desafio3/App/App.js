const Controller = require('./Controller/Controller.js');
const Entrada = require('./View/entrada.js');
const Listagem = require('./View/listagem.js');
const Agenda = require('./Model/Agenda.js');
const ListaDePacientes = require('./Model/ListaDePacientes.js');
const Validador = require('./Model/Validador.js');
const Erros = require('./View/Erros.js');

class App {
    constructor(){};

    init(){
        let E = new Entrada();
        let L = new Listagem();
        let A = new Agenda();
        let LP = new ListaDePacientes();
        let V = new Validador();
        let Er = new Erros();
        let C = new Controller(E, L, A, LP, V, Er);
        C.initMenuPrincipal();
    }
}

module.exports = App;