const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.post('/guardar', clienteController.guardar);
router.post('/actualizar', clienteController.actualizar);
router.post('/eliminar', clienteController.eliminar);

module.exports = router;
