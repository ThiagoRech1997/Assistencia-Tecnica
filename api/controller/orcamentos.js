"use strict";

const Orcamentos = require("./../models/orcamentos");

exports.post = (req, res) => {
  var orcamentos = new Orcamentos();
  var response = {};
  orcamentos.descricao = req.body.descricao;
  orcamentos.itens.descricao = req.body.itens.descricao;
  orcamentos.itens.quantidade = req.body.itens.quantidade;
  orcamentos.itens.valor = req.body.itens.valor;
  orcamentos.cliente.nome = req.body.cliente.nome;
  orcamentos.cliente.email = req.body.cliente.email;
  orcamentos.funcionario.nome = req.body.funcionario.nome;
  orcamentos.funcionario.email = req.body.funcionario.email;
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
  Orcamentos.findOne(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.put = (req, res, next) => {
  Orcamentos.findOneAndUpdate(req.params.id, {
    $set: {
      descricao: req.body.descricao,
      itens: {
        descricao: req.body.itens.descricao,
        quantidade: req.body.quantidade,
        valor: req.body.valor
      },
      cliente: {
        nome: req.body.cliente.nome,
        email: req.body.cliente.email,
      },
      funcionario: {
        nome: req.body.funcionario.nome,
        email: req.body.funcionario.email,
      },
      aprovacao: req.body.aprovacao
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
exports.aprovacao = (req, res, next) => {
  Orcamentos.findOneAndUpdate(req.params.id, {
    $set: {
      aprovacao: req.body.aprovacao
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
  Orcamentos.findOneAndRemove(req.body.id)
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
