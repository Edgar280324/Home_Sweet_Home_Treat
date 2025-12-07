module.exports = { 

    listar: (req, res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT cliente_id, nombre, correo, telefono FROM Cliente', (err, data) => {
                if (err) throw err;
                res.render('clientes', { data });
            });
        });
    },

    guardar: (req, res) => {
        const cliente = req.body;

        req.getConnection((err, conn) => {
            const sql = `
                INSERT INTO Cliente (nombre, correo, telefono, contrasena)
                VALUES (?, ?, ?, SHA2(?, 256))
            `;

            conn.query(
                sql,
                [cliente.nombre, cliente.correo, cliente.telefono, cliente.contrasena],
                (err) => {
                    if (err) throw err;
                    res.redirect('/clientes');
                }
            );
        });
    },

    actualizar: (req, res) => {
        const { cliente_id, nombre, correo, telefono, contrasena } = req.body;
        
        let sql, values;

        // Si NO envió nueva contraseña → no modificar la actual
        if (!contrasena || contrasena === "") {
            sql = 'UPDATE Cliente SET nombre=?, correo=?, telefono=? WHERE cliente_id=?';
            values = [nombre, correo, telefono, cliente_id];
        } 
        else {
            // Si envió contraseña → encriptarla con SHA2
            sql = 'UPDATE Cliente SET nombre=?, correo=?, telefono=?, contrasena=SHA2(?, 256) WHERE cliente_id=?';
            values = [nombre, correo, telefono, contrasena, cliente_id];
        }

        req.getConnection((err, conn) => {
            conn.query(sql, values, (err) => {
                if (err) throw err;
                res.redirect('/clientes');
            });
        });
    },

    eliminar: (req, res) => {
        const { cliente_id } = req.body;

        req.getConnection((err, conn) => {
            conn.query(
                'DELETE FROM Cliente WHERE cliente_id=?', 
                [cliente_id], 
                (err) => {
                    if (err) throw err;
                    res.redirect('/clientes');
                }
            );
        });
    }

};

