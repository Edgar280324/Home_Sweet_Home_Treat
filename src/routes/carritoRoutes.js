const express = require("express");
const router = express.Router();
const carritoController = require("../controllers/carritoController");

// Mostrar carrito
router.get("/", carritoController.mostrarCarrito);

// Comprar productos (vaciar carrito)
router.get("/vaciar", carritoController.comprarProductos);

// Agregar producto
router.post("/agregar", carritoController.agregarCarrito);

// Eliminar producto
router.get("/eliminar/:id", carritoController.eliminarItem);

module.exports = router;
