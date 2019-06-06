"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./../models/users");
const authConfig = require('../config/auth.json');

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86408,
  });
}

exports.post = (req, res) => {
  var users = new Users();
  var response = {};
  users.nome = req.body.nome;
  users.email = req.body.email;
  users.senha = req.body.senha;
  users.tipo = req.body.tipo;
  users.save(function(err) {
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
  const users = await Users.findOne({ email }).select('+senha');

  if(!users){
    return res.status(400).send({ error: 'Usuario nao encontrado' });
  }
  if(!await bcrypt.compare(senha, users.senha)){
    return res.status(400).send({ error: 'Senha Invalida' });
  }

  users.senha = undefined;

  res.send({
    nome: users.nome,
    email, 
    token: generateToken({ id: users.id }),
    tipo: users.tipo,
  });
};

exports.get = (req, res, next) => {
  Users.find({}, "nome email")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.getById = (req, res, next) => {
    Users.findOne(req.params.id, "nome email")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
exports.put = (req, res, next) => {
    Users.findOneAndUpdate(req.params.id, {
    $set: {
      nome: req.body.nome,
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
    Users.findOneAndRemove(req.body.id)
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
