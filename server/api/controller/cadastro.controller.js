const db = require('../config/db.config.js');
const moment = require('moment');
const Cadastro = db.cadastro;
const Listar = db.listar;

exports.criar = (req, res) => {
    console.log(req)
    Cadastro.create(req.body).then(cadastro => {
        res.send(cadastro);
    },error =>{
        res.statusCode = 500;
        res.send(error);
    });
}

exports.listar = (req, res) => {
    Listar(req.params).then(resp => {
        for(let v of resp){
            moment.locale('UDP')
            let dd = new Date(v.dataref);
            dd.setDate(dd.getDate() + 1);
            v.daterefstring = moment(dd).format('DD/MM/yyyy');
        }

        res.send(resp);
    },error =>{
        res.statusCode = 500;
        res.send(error);
    });
}