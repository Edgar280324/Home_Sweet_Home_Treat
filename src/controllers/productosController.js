module.exports = {

    // ---------------------------------------------
    // LISTAR PRODUCTOS
    // GET /productos
    // ---------------------------------------------
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
                    t.nombre_tipo AS categoria,
                    t.tipo_id
                FROM Postres p
                INNER JOIN Tipo_Postre t ON p.tipo_id = t.tipo_id
                ORDER BY p.postre_id ASC
            `;

            conn.query(sql, (err, data) => {
                if (err) throw err;

                // Enviamos también las categorías para el modal "Agregar"
                conn.query(`SELECT tipo_id, nombre_tipo FROM Tipo_Postre`, (err, categorias) => {
                    if (err) throw err;
                    res.render("productos", { data, categorias });
                });
            });
        });
    },

    // ---------------------------------------------
    // GUARDAR NUEVO PRODUCTO
    // POST /productos/guardar
    // ---------------------------------------------
    guardar: (req, res) => {
        const { nombre_postre, tipo_id, ruta_imagen, stock, descripcion } = req.body;

        const sql = `
            INSERT INTO Postres (nombre_postre, tipo_id, ruta_imagen, stock, descripcion)
            VALUES (?, ?, ?, ?, ?)
        `;

        req.getConnection((err, conn) => {
            if (err) throw err;

            conn.query(sql, [nombre_postre, tipo_id, ruta_imagen, stock, descripcion], (err) => {
                if (err) throw err;
                res.redirect('/productos');
            });
        });
    },

    // ---------------------------------------------
    // ACTUALIZAR PRODUCTO
    // POST /productos/actualizar
    // ---------------------------------------------
    actualizar: (req, res) => {
        const { postre_id, nombre_postre, tipo_id, ruta_imagen, stock, descripcion } = req.body;

        const sql = `
            UPDATE Postres
            SET nombre_postre=?, tipo_id=?, ruta_imagen=?, stock=?, descripcion=?
            WHERE postre_id=?
        `;

        req.getConnection((err, conn) => {
            if (err) throw err;

            conn.query(
                sql,
                [nombre_postre, tipo_id, ruta_imagen, stock, descripcion, postre_id],
                (err) => {
                    if (err) throw err;
                    res.redirect('/productos');
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

