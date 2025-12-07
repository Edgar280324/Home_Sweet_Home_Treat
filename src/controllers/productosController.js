module.exports = {

    listar: (req, res) => {
        req.getConnection((err, conn) => {
            if (err) throw err;

            const sql = `
                SELECT 
                    p.postre_id,
                    p.nombre_postre,
                    p.ruta_imagen,
                    p.stock,
                    p.descripcion,
                    t.nombre_tipo,
                    t.tipo_id,
                    pr.precio
                FROM Postres p
                INNER JOIN Tipo_Postre t ON p.tipo_id = t.tipo_id
                LEFT JOIN Postre_Precio pr ON p.postre_id = pr.postre_id
                ORDER BY p.postre_id ASC
            `;

            conn.query(sql, (err, data) => {
                if (err) throw err;

                // Enviar categorías
                conn.query(`SELECT tipo_id, nombre_tipo FROM Tipo_Postre`, (err, categorias) => {
                    if (err) throw err;
                    res.render("productos", { data, categorias });
                });
            });
        });
    },

    // -----------------------------------------------------
    // GUARDAR PRODUCTO + PRECIO
    // -----------------------------------------------------
    guardar: (req, res) => {
        const { nombre_postre, tipo_id, ruta_imagen, stock, descripcion, precio } = req.body;

        const sqlPostre = `
            INSERT INTO Postres (nombre_postre, tipo_id, ruta_imagen, stock, descripcion)
            VALUES (?, ?, ?, ?, ?)
        `;

        req.getConnection((err, conn) => {
            if (err) throw err;

            conn.query(sqlPostre, [nombre_postre, tipo_id, ruta_imagen, stock, descripcion], (err, result) => {
                if (err) throw err;

                const nuevoID = result.insertId;

                const sqlPrecio = `
                    INSERT INTO Postre_Precio (postre_id, precio)
                    VALUES (?, ?)
                `;

                conn.query(sqlPrecio, [nuevoID, precio], (err) => {
                    if (err) throw err;
                    res.redirect('/productos');
                });
            });
        });
    },

    // -----------------------------------------------------
    // ACTUALIZAR PRODUCTO + PRECIO
    // -----------------------------------------------------
    actualizar: (req, res) => {
        const { postre_id, nombre_postre, tipo_id, ruta_imagen, stock, descripcion, precio } = req.body;

        const sqlPostre = `
            UPDATE Postres
            SET nombre_postre=?, tipo_id=?, ruta_imagen=?, stock=?, descripcion=?
            WHERE postre_id=?
        `;

        req.getConnection((err, conn) => {
            if (err) throw err;

            conn.query(sqlPostre,
                [nombre_postre, tipo_id, ruta_imagen, stock, descripcion, postre_id],
                (err) => {
                    if (err) throw err;

                    const sqlPrecio = `
                        UPDATE Postre_Precio
                        SET precio=?
                        WHERE postre_id=?
                    `;

                    conn.query(sqlPrecio, [precio, postre_id], (err) => {
                        if (err) throw err;
                        res.redirect('/productos');
                    });
                }
            );
        });
    },

    eliminar: (req, res) => {
        const { postre_id } = req.body;

        const sql = `DELETE FROM Postres WHERE postre_id=?`;

        req.getConnection((err, conn) => {
            if (err) throw err;

            conn.query(sql, [postre_id], (err) => {
                if (err) throw err;
                res.redirect('/productos');
            });
        });
    }

};


