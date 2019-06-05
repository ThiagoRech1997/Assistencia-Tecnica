"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Clientes = require("./../models/clientes");
const authConfig = require('../config/auth.json');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86408,
  });
}

exports.post = (req, res) => {
  var clientes = new Clientes();
  var response = {};
  clientes.nome = req.body.nome;
  clientes.cpf = req.body.cpf;
  clientes.telefone = req.body.telefone;
  clientes.email = req.body.email;
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
exports.autenticacao = async (req, res, next) => {
  const { email, senha } = req.body;
  const clientes = await Clientes.findOne({ email }).select('+senha');

  if(!clientes){
    return res.status(400).send({ error: 'Usuario nao encontrado' });
  }
  if(!await bcrypt.compare(senha, clientes.senha)){
    return res.status(400).send({ error: 'Senha Invalida' });
  }

  clientes.senha = undefined;

  res.send({ 
    email, 
    token: generateToken({ id: clientes.id }),
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
