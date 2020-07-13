const express = require('express');
const router = express .Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error }) }
        conn.query (
           'SELECT * FROM ordem_servico',
           (erro, resultado, fields) => {
            if (error) {return res.status(500).send({ error: error }) }
            return res.status(200).send({response: resultado})
           }
        )}
    )});
    router.post('/', (req, res, next) => {
 
         mysql.getConnection((error, conn) => {
             conn.query(
                 'INSERT INTO ordem_servico (motivo, descricao) VALUES (?, ?)'
                 [req.body.motivo, req.body.descricao],
                 (error, resultado, fields) => {
                     conn.release();
    
                     if (error){
                         return res.status(500).send({
                             error: error, 
                             response: null
                         });
                     } res.status(201).send({
                        Mensagem: 'Ordem de serviço cadastrada com sucesso!',
                        ordem_id: resultado.insertId
                     }) 
                 }
             )
         })
        
    } );
    router.get('/:ordem_id', (req, res, next) => {
        mysql.getConnection((error, conn) => {
            if (error) {return res.status(500).send({ error: error }) }
            conn.query (
               'SELECT * FROM ordem_servico WHERE ordem_id = ?;',
               [req.params.usuario_id],
               (erro, resultado, fields) => {
                if (error) {return res.status(500).send({ error: error }) }
                return res.status(200).send({response: resultado})
               }
            )
    
    
        })
    });
    
    module.exports = router;
    