const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Listar productos
router.get('/', productosController.listar);

// Guardar producto
router.post('/guardar', productosController.guardar);

// Actualizar producto
router.post('/actualizar', productosController.actualizar);

// Eliminar producto
router.post('/eliminar', productosController.eliminar);

module.exports = router;
