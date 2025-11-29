module.exports = {


    // Listar categorías
    // GET /categorias
 
    listar: (req, res) => {
        req.getConnection((err, conn) => {
            if (err) throw err;

            const sql = `
                SELECT 
                    tipo_id, 
                    nombre_tipo AS categoria, 
                    imagen, 
                    descripcion 
                FROM Tipo_Postre
            `;

            conn.query(sql, (err, data) => {
                if (err) throw err;
                res.render('categorias', { data });
            });
        });
    },

    // ---------------------------------------------
    // Crear nueva categoría
    // POST /categorias
    // ---------------------------------------------
    guardar: (req, res) => {
        const { categoria, imagen, descripcion } = req.body;

        const sql = `
            INSERT INTO Tipo_Postre (nombre_tipo, imagen, descripcion)
            VALUES (?, ?, ?)
        `;

        req.getConnection((err, conn) => {
            if (err) throw err;

            conn.query(sql, [categoria, imagen, descripcion], (err) => {
                if (err) throw err;
                res.redirect('/categorias');
            });
        });
    },

    // ---------------------------------------------
    // Actualizar categoría
    // POST /categorias/actualizar
    // ---------------------------------------------
    actualizar: (req, res) => {
        const { tipo_id, categoria, imagen, descripcion } = req.body;

        const sql = `
            UPDATE Tipo_Postre
            SET nombre_tipo=?, imagen=?, descripcion=?
            WHERE tipo_id=?
        `;

        req.getConnection((err, conn) => {
            if (err) throw err;

            conn.query(sql, [categoria, imagen, descripcion, tipo_id], (err) => {
                if (err) throw err;
                res.redirect('/categorias');
            });
        });
    },

    // ---------------------------------------------
    // Eliminar categoría
    // POST /categorias/eliminar
    // ---------------------------------------------
    eliminar: (req, res) => {
        const { tipo_id } = req.body;

        const sql = `
            DELETE FROM Tipo_Postre
            WHERE tipo_id=?
        `;

        req.getConnection((err, conn) => {
            if (err) throw err;

            conn.query(sql, [tipo_id], (err) => {
                if (err) throw err;
                res.redirect('/categorias');
            });
        });
    }

};
