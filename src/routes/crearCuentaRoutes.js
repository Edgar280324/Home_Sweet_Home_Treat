const express = require("express");
const router = express.Router();

// GET /crearCuenta
router.get("/", (req, res) => {
    res.render("crearCuenta"); 
});

module.exports = router;