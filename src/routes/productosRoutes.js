const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Para manejar imágenes
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "src/public/imagenes");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// -------------------------------------------------------------
// Mostrar categorías con productos
// -------------------------------------------------------------
router.get('/', productosController.listarProductos);

// -------------------------------------------------------------
// Agregar producto a una categoría
// -------------------------------------------------------------
router.post('/', upload.single('imagen'), productosController.crearProducto);

module.exports = router;

