const env = {
    database: 'covid',
    username: 'postgres',    // Configurável por Banco de Dados.
    password: '123456',       // Configurável por Banco de Dados.
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;