"use strict";

const Clientes = require("./../models/clientes");

exports.post = (req, res) => {
  var clientes = new Clientes();
  var response = {};
  clientes.nome = req.body.nome;
  clientes.cpf = req.body.cpf;
  clientes.telefone = req.body.telefone;
  clientes.email = req.body.email;
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
exports.getById = (req, res, next) => {
  Clientes.findOne(req.params.id, "nome cpf telefone email")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.put = (req, res, next) => {
  Clientes.findOneAndUpdate(req.params.id, {
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
  Clientes.findOneAndRemove(req.body.id)
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
