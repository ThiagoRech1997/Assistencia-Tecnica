'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    nome:{
        type: String,
        required: true
    },
    cpf:{
        type: String,
        required: true
    },
    telefone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    cadatroDat: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('clientes', schema);