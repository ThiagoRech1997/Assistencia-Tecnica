'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controller/clientes');

router.post('/', controller.post);
router.get('/', function(req, res, next){
    res.status(200).send({
        title: "Esta e uma API em nodeJS",
        version: "0.0.1"
    });
});

module.exports = router;