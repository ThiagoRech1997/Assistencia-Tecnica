"use strict";

const express = require("express");
const router = express.Router();
const controller = require("./../controller/servicos");
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);
router.post("/", controller.post);
router.get("/", controller.get);
router.get("/:id", controller.getById);
router.put("/:id", controller.put);
router.put("/atualiza/:id", controller.atualiza);
router.delete("/:id", controller.delete);

module.exports = router;
