"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Saida = /** @class */ (function () {
    function Saida() {
    }
    Saida.prototype.setSaida = function (MO, MD, VO, VD, T) {
        this.moedaOrigem = MO;
        this.moedaDestino = MD;
        this.valorOrigem = VO;
        this.valorDestino = VD;
        this.taxa = T;
    };
    Saida.prototype.write = function () {
        console.log("\n".concat(this.moedaOrigem, " ").concat(this.valorOrigem, " => ").concat(this.moedaDestino, " ").concat(this.valorDestino));
        console.log("Taxa: ".concat(this.taxa, "\n"));
    };
    return Saida;
}());
exports.default = Saida;
