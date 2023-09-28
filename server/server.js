const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const cadastroRoute = require('./api/route/cadastro.route');

app.use(cors());
app.use(bodyParser.json());

const http = require('http');
const db = require('./api/config/db.config.js');

this.http = http.createServer(app);

db.conexaoSequelize.sync({ force: false }).then(() => {
    console.log('Tabelas sendo sincronizadas!!!');
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.urlencodedParser = urlencodedParser;

cadastroRoute(app);

app.listen(3000, () => {
    console.log('Servidor executando!');
});