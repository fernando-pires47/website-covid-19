module.exports = (app) => {
    const cadastro = require('../controller/cadastro.controller');

    app.post('/api/cadastro', app.urlencodedParser, cadastro.criar);
    app.get('/api/cadastro/:dataref/:cidade/:estado', app.urlencodedParser, cadastro.listar);
}