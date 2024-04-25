const Sequelize = require('sequelize');
const sequelize = new Sequelize('nomeDoBanco', 'usuario', 'senha', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;