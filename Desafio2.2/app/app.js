"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entrada_1 = require("./View/Entrada");
var Saida_1 = require("./View/Saida");
var exchangeRateApi_1 = require("./Model/exchangeRateApi");
var controller_1 = require("./Controller/controller");
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.initialize = function () {
        var E = new Entrada_1.default();
        var S = new Saida_1.default();
        var API = new exchangeRateApi_1.default();
        var C = new controller_1.default(E, S, API);
        C.initialize();
    };
    return App;
}());
exports.default = App;
