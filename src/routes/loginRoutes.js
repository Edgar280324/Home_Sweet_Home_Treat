const express = require("express");
const router = express.Router();
const loginController = require('../controllers/loginController');
// Mostrar el formulario de login
router.get("/", (req, res) => {
   res.render("login", { 
      error: null,
      success: req.query.success ? "Datos guardados satisfactoriamente" : null
   });
});




// Procesar login
router.post("/login", loginController.login);

// Procesar signup
router.post("/signup", loginController.signup);

module.exports = router;



