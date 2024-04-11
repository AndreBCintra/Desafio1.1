import Entrada from "./View/Entrada";
import Saida from "./View/Saida";
import ExchangeRateApi from "./Model/exchangeRateApi";
import Controller from "./Controller/controller";

export default class App {
    constructor(){}

    initialize(){
        const E = new Entrada();
        const S = new Saida();
        const API = new ExchangeRateApi();
        const C = new Controller(E, S, API);
        C.initialize();
    }
}