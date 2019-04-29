"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  descricao: {
    type: String,
    required: true
  },
  itens: {
    descricao: {
      type: String,
      required: true
    },
    quantidade: {
      type: Number,
      required: true
    },
    valor: {
      type: Number,
      required: true
    }
  },
  cliente: {
    type: String,
    required: true
  },
  funcionario: {
    type: String,
    required: true
  },
  aprovacao: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("orcamentos", schema);
