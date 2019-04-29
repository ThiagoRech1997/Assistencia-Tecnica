"use strict";

const mongoose = require("mongoose");
const Funcionarios = require("./../models/funcionarios");

exports.post = (req, res) => {
  var funcionarios = new Funcionarios();
  var response = {};
  funcionarios.nome = req.body.nome;
  funcionarios.cpf = req.body.cpf;
  funcionarios.telefone = req.body.telefone;
  funcionarios.email = req.body.email;
  funcionarios.usuario = req.body.usuario;
  funcionarios.senha = req.body.senha;
  funcionarios.save(function(err) {
    if (err) {
      response = { error: true, message: "Erro ao Cadastrar" };
    } else {
      response = { error: false, message: "Cadastrado com Sucesso" };
    }
    res.json(response);
  });
};
exports.get = (req, res) => {
  Funcionarios.find({}, "nome cpf telefone email")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
