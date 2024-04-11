"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Controller = /** @class */ (function () {
    function Controller(E, S, API) {
        this.entrada = E;
        this.saida = S;
        this.exchangeRateApi = API;
    }
    Controller.prototype.initialize = function () {
        this.entradaInit();
        while (this.moedaOrigem != "Exit") {
            this.callApi();
            this.getValores();
            this.saidaInit();
            this.entradaInit();
        }
    };
    Controller.prototype.entradaInit = function () {
        this.moedaOrigem = this.entrada.getMoedaOrigem();
        if (this.moedaOrigem == "Exit") {
            return false;
        }
        this.moedaDestino = this.entrada.getMoedaDestino();
        this.valorOrigem = this.entrada.getValor();
    };
    Controller.prototype.callApi = function () {
        this.conversao = this.exchangeRateApi.callApi(this.moedaOrigem, this.moedaDestino, this.valorOrigem);
    };
    Controller.prototype.getValores = function () {
        this.valorDestino = this.conversao.conversion_result;
        this.taxa = this.conversao.conversion_rate;
    };
    Controller.prototype.saidaInit = function () {
        this.saida.setSaida(this.moedaOrigem, this.moedaDestino, this.valorOrigem, this.valorDestino, this.taxa);
        this.saida.write();
    };
    return Controller;
}());
exports.default = Controller;
