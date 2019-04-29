"use strict";

const mongoose = require("mongoose");
const Clientes = require("./../models/clientes");

exports.post = (req, res) => {
  var clientes = new Clientes();
  var response = {};
  clientes.nome = req.body.nome;
  clientes.cpf = req.body.cpf;
  clientes.telefone = req.body.telefone;
  clientes.email = req.body.email;
  clientes.usuario = req.body.usuario;
  clientes.senha = req.body.senha;
  clientes.save(function(err) {
    if (err) {
      response = { error: true, message: "Erro ao Cadastrar" };
    } else {
      response = { error: false, message: "Cadastrado com Sucesso" };
    }
    res.json(response);
  });
};
exports.get = (req, res, next) => {
  Clientes.find({}, "nome cpf telefone email")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
