const express = require('express');
const router = express .Router();
const mysql = require('../mysql').pool;

router.post('/cadastro', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO usuario (nome, cpf, email, senha, sexo) VALUES (?, ?, ?, ?, ?)'
            [req.body.nome, req.body.cpf, req.body.email, req.body.senha, req.body.sexo],
            (error, resultado, fields) => {
                conn.release();

                if (error){
                    return res.status(500).send({
                        error: error, 
                        response: null
                    });
                } res.status(201).send({
                   Mensagem: 'Cadastro realizado com sucesso!',
                   usuario_id: resultado.insertId
                }) 
            }
        )
    })
} );


router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
    if (error) {return res.status(500).send({ error: error }) }
    conn.query (
       'SELECT * FROM usuario',
       (erro, resultado, fields) => {
        if (error) {return res.status(500).send({ error: error }) }
        return res.status(200).send({response: resultado})
       }
    )}
)});


router.get('/:usuario_id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error }) }
        conn.query (
           'SELECT * FROM usuario WHERE usuario_id = ?;',
           [req.params.usuario_id],
           (erro, resultado, fields) => {
            if (error) {return res.status(500).send({ error: error }) }
            return res.status(200).send({response: resultado})
           }
        )


    })
});

module.exports = router;