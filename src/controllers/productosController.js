module.exports = {

    listarProductos: (req, res) => {
        req.getConnection((err, conn) => {
            if (err) return res.status(500).send(err);

            const sqlTipos = "SELECT * FROM Tipo_Postre";

            conn.query(sqlTipos, (err, tipos) => {
                if (err) return res.status(500).send(err);

                // Luego obtener productos y precios
                const sqlProductos = `
                    SELECT 
                        p.postre_id,
                        p.nombre_postre,
                        p.tipo_id,
                        p.stock,
                        p.ruta_imagen,
                        p.descripcion,
                        pr.precio
                    FROM Postres p
                    LEFT JOIN Postre_Precio pr ON p.postre_id = pr.postre_id
                `;

                conn.query(sqlProductos, (err, productos) => {
                    if (err) return res.status(500).send(err);

                    // Organizar productos dentro de su categoría
                    tipos.forEach(t => {
                        t.productos = productos.filter(p => p.tipo_id === t.tipo_id);
                    });

                    res.render("productos", {
                        tipos,
                        mensaje: req.query.mensaje || null
                    });
                });
            });
        });
    },

    // -------------------------------------------------------------
    // CREAR PRODUCTO
    // -------------------------------------------------------------
    crearProducto: (req, res) => {
        const { tipo_id, nombre_postre, precio, stock, descripcion } = req.body;

        const rutaImagen = req.file ? req.file.filename : null;

        req.getConnection((err, conn) => {
            if (err) return res.status(500).send(err);

            // Insertar producto
            const sqlProducto = `
                INSERT INTO Postres (nombre_postre, tipo_id, stock, ruta_imagen, descripcion)
                VALUES (?, ?, ?, ?, ?)
            `;

            conn.query(sqlProducto, [nombre_postre, tipo_id, stock, rutaImagen, descripcion], (err, result) => {
                if (err) return res.status(500).send(err);

                const postreId = result.insertId;

                // Insertar precio
                const sqlPrecio = `
                    INSERT INTO Postre_Precio (postre_id, precio)
                    VALUES (?, ?)
                `;

                conn.query(sqlPrecio, [postreId, precio], (err2) => {
                    if (err2) return res.status(500).send(err2);

                    res.redirect(`/productos?mensaje=Producto agregado correctamente`);
                });
            });
        });
    }
};
