const express = require("express");
const router = express.Router();

// GET /productos
router.get("/", (req, res) => {
    res.render("productos"); // Renderiza productos.ejs
});

module.exports = router;
