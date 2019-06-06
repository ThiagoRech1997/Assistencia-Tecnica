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
exports.getById = (req, res) => {
  Funcionarios.findOne(req.params.id, "nome cpf telefone email")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.put = (req, res, next) => {
  Funcionarios.findOneAndUpdate(req.params.id, {
    $set: {
      nome: req.body.nome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      email: req.body.email
    }
  })
    .then(x => {
      res.status(201).send({
        message: "Atualizado com sucesso"
      });
    })
    .catch(e => {
      res.status(400).send({
        message: "Falha ao atualizar",
        data: e
      });
    });
};
exports.delete = (req, res, next) => {
  Funcionarios.findOneAndRemove(req.body.id)
    .then(x => {
      res.status(200).send({
        message: "Removido com sucesso"
      });
    })
    .catch(e => {
      res.status(400).send({
        message: "Falha ao remover",
        data: e
      });
    });
};
