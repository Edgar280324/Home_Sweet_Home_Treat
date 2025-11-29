const express = require("express");
const router = express.Router();

// GET /productos
router.get("/", (req, res) => {
    res.render("Menu"); // Renderiza productos.ejs
});

module.exports = router;