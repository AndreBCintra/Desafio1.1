const Sequelize = require('sequelize');
const database = require('./db');

const Paciente = database.define('paciente', {
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = Paciente;