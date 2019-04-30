"use strict";

const mongoose = require("mongoose");
const Orcamentos = require("./../models/orcamentos");

exports.post = (req, res) => {
  var orcamentos = new Orcamentos();
  var response = {};
  orcamentos.descricao = req.body.descricao;
  orcamentos.itens.descricao = req.body.itens.descricao;
  orcamentos.itens.quantidade = req.body.itens.quantidade;
  orcamentos.itens.valor = req.body.itens.valor;
  orcamentos.cliente = req.body.cliente;
  orcamentos.funcionario = req.body.funcionario;
  orcamentos.aprovacao = req.body.aprovacao;
  orcamentos.save(function(err) {
    if (err) {
      response = { error: true, message: "Erro ao Cadastrar" };
    } else {
      response = { error: false, message: "Cadastrado com Sucesso" };
    }
    res.json(response);
  });
};
exports.get = (req, res) => {
  Orcamentos.find({})
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.getById = (req, res) => {
  Orcamentos.findById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
