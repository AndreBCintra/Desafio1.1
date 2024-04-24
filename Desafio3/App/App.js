import Controller from './Controller/Controller.js';
import Entrada from './View/entrada.js';
import Listagem from './View/listagem.js';
import Agenda from './Model/Agenda.js';
import ListaDePacientes from './Model/ListaDePacientes.js';
import Validador from './Model/Validador.js';
import Erros from './View/Erros.js'

export default class App {
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