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
  dataEmicao: {
    type: Date,
    default: Date.now
  },
  valor: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  cadatroDat: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("servicos", schema);
