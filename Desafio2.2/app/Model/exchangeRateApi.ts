export default class ExchangeRateApi {
    constructor() {}

    async callApi(moedaOrigem, moedaDestino, valor) {
        let valores = valor.split(",");
        let unidade = valores[0];
        let decimal = valores[1];
        let url = 'https://v6.exchangerate-api.com/v6/9809d7101e7635d4af41ae41/pair/' + moedaOrigem + '/' + moedaDestino + '/' + unidade + "." + decimal;
        console.log(url);
        
        const fetchPromise = fetch(url);
        fetchPromise.then((response) => {
            const jsonPromise = response.json();
            jsonPromise.then((data) => {
                console.log(data["conversion_rate"])
                if (data.success === "error"){
                    console.log(data["error-type"]);
                }
                return data;
            })
        })
    }
}