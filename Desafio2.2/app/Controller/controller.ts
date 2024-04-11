import Entrada from "../View/Entrada";
import Saida from "../View/Saida";
import ExchangeRateApi from "../Model/exchangeRateApi";

export default class Controller {
    entrada: Entrada;
    saida: Saida;
    exchangeRateApi: ExchangeRateApi;
    conversao;
    moedaOrigem: string|null;
    moedaDestino: string|null;
    valorOrigem: string|null;
    valorDestino: string|null;
    taxa: string|null;

    constructor(E: Entrada, S: Saida, API: ExchangeRateApi){
        this.entrada = E;
        this.saida = S;
        this.exchangeRateApi = API;
    }

    initialize(){
        this.entradaInit();
        while(this.moedaOrigem != "Exit"){
            this.callApi();
            this.getValores();
            this.saidaInit();
            this.entradaInit();
        }
    }

    entradaInit(){
        this.moedaOrigem = this.entrada.getMoedaOrigem();
        if (this.moedaOrigem == "Exit"){
            return false;
        }
        this.moedaDestino = this.entrada.getMoedaDestino();
        this.valorOrigem = this.entrada.getValor();
    }

    callApi(){
        this.conversao = this.exchangeRateApi.callApi(this.moedaOrigem, this.moedaDestino, this.valorOrigem);
    }

    getValores(){
        this.valorDestino = this.conversao.conversion_result;
        this.taxa = this.conversao.conversion_rate;
    }

    saidaInit(){
        this.saida.setSaida(this.moedaOrigem, this.moedaDestino, this.valorOrigem, this.valorDestino, this.taxa);
        this.saida.write();
    }
}