'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const schema = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    senha:{
        type: String,
        required: true,
        select: false
    },
    tipo: {
        type: String,
        require: true
    },
    cadatroDat: {
      type: Date,
      default: Date.now
    }
});

schema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
});

module.exports = mongoose.model('users', schema);