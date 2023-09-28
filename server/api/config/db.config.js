const env = require('./env');
const Sequelize = require('sequelize');
const cadastroModel = require('../model/cadastro.model');
const listModel = require('../model/listar.model');

const conexaoSequelize = new Sequelize(env.database, env.username,
env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
    logging: env.logging,
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

// ORM
db.Sequelize = Sequelize;

// Conexão BD
db.conexaoSequelize = conexaoSequelize;

db.cadastro = cadastroModel(db.conexaoSequelize, db.Sequelize);

db.listar = (params) =>{
    return listModel(db.conexaoSequelize,db.Sequelize,params);
};

module.exports = db;