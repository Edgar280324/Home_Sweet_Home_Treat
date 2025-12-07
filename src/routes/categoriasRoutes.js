// categorias.routes.js
const express = require("express");
const router = express.Router();
const categorias = require('../controllers/categoriasController');

// Mostrar listado de categorías
router.get("/", categorias.listar);

// Crear nueva categoría
router.post("/guardar", categorias.guardar);

// Actualizar categoría
router.post("/actualizar", categorias.actualizar);

// Eliminar categoría
router.post("/eliminar", categorias.eliminar);

module.exports = router;

