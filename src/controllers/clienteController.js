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
            conn.query('INSERT INTO Cliente SET ?', cliente, (err) => {
                if (err) throw err;
                res.redirect('/clientes');
            });
        });
    },

    actualizar: (req, res) => {
        const { cliente_id, nombre, correo, telefono, contrasena } = req.body;
        
        let sql, values;

        if (contrasena === "" || contrasena === undefined) {
            sql = 'UPDATE Cliente SET nombre=?, correo=?, telefono=? WHERE cliente_id=?';
            values = [nombre, correo, telefono, cliente_id];
        } else {
            sql = 'UPDATE Cliente SET nombre=?, correo=?, telefono=?, contrasena=? WHERE cliente_id=?';
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
            conn.query('DELETE FROM Cliente WHERE cliente_id=?', [cliente_id], (err) => {
                if (err) throw err;
                res.redirect('/clientes');
            });
        });
    }

};
