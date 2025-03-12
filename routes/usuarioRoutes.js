const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const authService = require('../service/authService');

router.get("/", authService, usuarioController.getUsers);
router.post('/',authService, usuarioController.addUser);
router.put('/:id',authService, usuarioController.updateUser); //le decimos que recibe parametro
router.post("/ChangeStatus/:id",authService, usuarioController.changeUserStatus);

module.exports = router;