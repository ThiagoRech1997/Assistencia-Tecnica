"use strict";

const mongoose = require("mongoose");
const Servicos = require("./../models/servicos");

exports.post = (req, res) => {
  var servicos = new Servicos();
  var response = {};
  servicos.descricao = req.body.descricao;
  servicos.itens.descricao = req.body.itens.descricao;
  servicos.itens.quantidade = req.body.itens.quantidade;
  servicos.itens.valor = req.body.itens.valor;
  servicos.cliente = req.body.cliente;
  servicos.funcionario = req.body.funcionario;
  servicos.dataEmicao = req.body.dataEmicao;
  servicos.valor = req.body.valor;
  servicos.status = req.body.status;
  servicos.save(function(err) {
    if (err) {
      response = { error: true, message: "Erro ao Cadastrar" };
    } else {
      response = { error: false, message: "Cadastrado com Sucesso" };
    }
    res.json(response);
  });
};
exports.get = (req, res) => {
  Servicos.find({})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.getById = (req, res) => {
  Servicos.findOne(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.put = (req, res, next) => {
  Servicos.findOneAndUpdate(req.params.id, {
    $set: {
      descricao: req.body.descricao,
      itens: {
        descricao: req.body.itens.descricao,
        quantidade: req.body.quantidade,
        valor: req.body.valor
      },
      cliente: req.body.cliente,
      funcionario: req.body.funcionario,
      valor: req.body.valor,
      status: req.body.status
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
