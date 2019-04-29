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
