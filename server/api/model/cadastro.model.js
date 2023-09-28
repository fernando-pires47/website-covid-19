module.exports = (conexaoSequelize, Sequelize) => {

    const Usuario = conexaoSequelize.define('cadastro', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email : {
            type: Sequelize.STRING,
            allowNull: false
        },
        cpf: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dataref: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        cidade: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estado: {
            type: Sequelize.STRING,
            allowNull: false
        },
        totcasos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        recuperados: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        mortos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        infocomplement: {
            type: Sequelize.STRING
        }
    }, {
        hooks: {
            beforeCreate: usuario => {
            }
        }
    });

    return Usuario;

}