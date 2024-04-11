"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt = require('prompt-sync')();
var Entrada = /** @class */ (function () {
    function Entrada() {
    }
    Entrada.prototype.getMoedaOrigem = function () {
        this.moedaOrigem = prompt("Moeda origem: ");
        if (this.moedaOrigem == "") {
            console.log("Exiting");
            return "Exit";
        }
        while (!this.verificaMoedaOrigem()) {
            this.moedaOrigem = prompt("Moeda origem: ");
        }
        return this.moedaOrigem;
    };
    Entrada.prototype.verificaMoedaOrigem = function () {
        if (this.moedaOrigem != null && this.moedaOrigem.length != 3) {
            return false;
        }
        return true;
    };
    Entrada.prototype.getMoedaDestino = function () {
        this.moedaDestino = prompt("Moeda destino: ");
        while (!this.verificaMoedaDestino()) {
            this.moedaDestino = prompt("Moeda destino: ");
        }
        return this.moedaDestino;
    };
    Entrada.prototype.verificaMoedaDestino = function () {
        if (this.moedaDestino == this.moedaOrigem) {
            console.log("\nErro: moeda destino igual a moeda origem\n");
            return false;
        }
        if (this.moedaDestino != null && this.moedaDestino.length != 3) {
            console.log("\nErro: número de caracteres inválido\n");
            return false;
        }
        return true;
    };
    Entrada.prototype.getValor = function () {
        this.valor = prompt("Valor: ");
        while (!this.verificaValor()) {
            this.valor = prompt("Valor: ");
        }
        return this.valor;
    };
    Entrada.prototype.verificaValor = function () {
        if (this.valor == null) {
            console.log("\nErro: o valor não pode ser nulo\n");
            return false;
        }
        if (parseFloat(this.valor) <= 0) {
            console.log("\nErro: valor precisa ser maior que 0\n");
            return false;
        }
        return true;
    };
    return Entrada;
}());
exports.default = Entrada;
