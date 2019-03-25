'use strict';

const Clientes = require('./../models/clientes');

exports.post = (req, res) => {
    var clientes = new Clientes();
    var response = {};
    clientes.nome = req.body.nome;
    clientes.cpf = req.body.cpf;
    clientes.telefone = req.body.telefone;
    clientes.email = req.body.email;
    clientes.usuario = req.body.usuario;
    clientes.senha = req.body.senha;
    clientes.save(function(err){
        if(err){
            response = {"error": true, "message" : "Erro ao Cadastrar"};
        }else{
            response = {"error": false, "message" : "Cadastrado com Sucesso"}
        }
        res.json(response);
    });
};