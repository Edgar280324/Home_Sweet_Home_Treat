module.exports = {

    // ---------------------------------------------
    // Registrar usuario (SIGNUP)
    // ---------------------------------------------
    signup: (req, res) => {
        const { nombre, correo, telefono, contrasena } = req.body;

        const sql = `
            INSERT INTO Cliente (nombre, correo, telefono, contrasena)
            VALUES (?, ?, ?, SHA2(?, 256))
        `;

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error de conexión");
            }

            conn.query(sql, [nombre, correo, telefono, contrasena], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error al registrar usuario");
                }

              //  res.redirect('/login');
              res.redirect('/login?success=1');
            });
        });
    },

    // ---------------------------------------------
    // LOGIN
    // ---------------------------------------------
    login: (req, res) => {
        const { telefono, contrasena } = req.body;

        const sql = `
            SELECT * FROM Cliente
            WHERE telefono = ? AND contrasena = SHA2(?, 256)
        `;

        req.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error de conexión");
            }

            conn.query(sql, [telefono, contrasena], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error en la consulta");
                }

               
                if (results.length === 0) {
                    return res.render("login", { 
                        error: "Teléfono o contraseña incorrectos"
                    });
                }

                // ✔ Usuario correcto
               // res.send("Login exitoso. ¡Bienvenido!");
              return res.redirect("/Menu");
            });
        });
    }

};
