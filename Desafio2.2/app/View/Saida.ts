export default class Saida {
    moedaOrigem: string|null;
    moedaDestino: string|null;
    valorOrigem: string|null;
    valorDestino: string|null;
    taxa: string|null;

    constructor(){}

    setSaida(MO: string|null, MD: string|null, VO: string|null, VD: string|null, T: string|null){
        this.moedaOrigem = MO;
        this.moedaDestino = MD;
        this.valorOrigem = VO;
        this.valorDestino = VD;
        this.taxa = T;
    }

    write(){
        console.log(`\n${this.moedaOrigem} ${this.valorOrigem} => ${this.moedaDestino} ${this.valorDestino}`);
        console.log(`Taxa: ${this.taxa}\n`)
    }
}