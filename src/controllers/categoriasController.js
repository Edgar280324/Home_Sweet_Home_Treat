module.exports = {

    listar: (req, res) => {
        req.getConnection((err, conn) => {
            if (err) throw err;

            const sql = `
                SELECT 
                    tipo_id, 
                    nombre_tipo AS categoria, 
                    ruta_imagen AS imagen, 
                    descripcion 
                FROM Tipo_Postre
            `;

            conn.query(sql, (err, data) => {
                if (err) throw err;
                res.render('categorias', { data });
            });
        });
    },

    guardar: (req, res) => {
        const { categoria, imagen, descripcion } = req.body;

        const sql = `
            INSERT INTO Tipo_Postre (nombre_tipo, ruta_imagen, descripcion)
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

    actualizar: (req, res) => {
        const { tipo_id, categoria, imagen, descripcion } = req.body;

        const sql = `
            UPDATE Tipo_Postre
            SET nombre_tipo=?, ruta_imagen=?, descripcion=?
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
