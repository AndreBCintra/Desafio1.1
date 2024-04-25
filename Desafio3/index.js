const App = require('./App/App');

let app = new App();
app.init();

(async () => {

    const database = require('./db');
    const Paciente = require('./Paciente');
    await database.sync();

})();