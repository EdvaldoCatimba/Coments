const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers');


// Rota para criar um novo usuário
router.get('/create', UserController.createUser);
router.get('/ver', UserController.getAllUsers);
router.post('/create', UserController.createUserPost);



module.exports = router;