const express = require('express');
const app = express();

const rotaUsuario = require ('./routes/usuario');
const rotaOrdem_servico = require ('./routes/ordem_servico');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    //res.header('Access-Control-Allow-Origin', 'http://157.230.237.196/teste/system/');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Authorization');

    if(req.method=="OPTIONS") {
        res.header('Access-Controlo-Allow-Methods', ' PUT, POST')
        return res.status(200).send({})
    }

    next();
})

app.use('/usuario', rotaUsuario);
app.use('/ordem_servico', rotaOrdem_servico);

app.use((req, rest, next) => {
    const erro = new Error ('Não Encontrado');
    erro.status = 404;
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {mensagem: error.message
        }
    })

});

module.exports = app;