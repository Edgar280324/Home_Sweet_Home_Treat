module.exports = {

    // ============================================================
    // MOSTRAR CARRITO
    // ============================================================
    mostrarCarrito: (req, res) => {
        const cliente_id = 1;

        req.getConnection((err, conn) => {

            // Obtener lista de postres
            conn.query(`
                SELECT p.postre_id, p.nombre_postre, p.stock, p.ruta_imagen, pr.precio
                FROM Postres p
                JOIN Postre_Precio pr ON pr.postre_id = p.postre_id
            `, (err, productos) => {

                // Obtener carrito del cliente
                conn.query(`
                    SELECT carrito_id FROM Carrito WHERE cliente_id = ?
                `, [cliente_id], (err, carritoData) => {

                    // Si el carrito no existe → crearlo vacío
                    if (carritoData.length === 0) {
                        conn.query(`
                            INSERT INTO Carrito (cliente_id) VALUES(?)
                        `, [cliente_id], () => {
                            return res.render("carrito", {
                                productos,
                                carrito: [],
                                total: 0
                            });
                        });
                        return;
                    }

                    const carrito_id = carritoData[0].carrito_id;

                    // Obtener productos del carrito
                    conn.query(`
                        SELECT 
                            cp.carrito_producto_id,
                            cp.cantidad,
                            cp.precio_final,
                            p.nombre_postre,
                            p.ruta_imagen,
                            (cp.cantidad * cp.precio_final) AS subtotal
                        FROM CarritoProducto cp
                        JOIN Postres p ON p.postre_id = cp.postre_id
                        WHERE cp.carrito_id = ?
                    `, [carrito_id], (err, carrito) => {

                        let total = 0;
                        carrito.forEach(item => total += item.subtotal);

                        res.render("carrito", {
                            productos,
                            carrito,
                            total
                        });
                    });
                });
            });
        });
    },

    // ============================================================
    // AGREGAR AL CARRITO
    // ============================================================
    agregarCarrito: (req, res) => {
        const cliente_id = 1;
        const { postre_id, cantidad } = req.body;

        req.getConnection((err, conn) => {

            // Obtener carrito
            conn.query(`
                SELECT carrito_id FROM Carrito WHERE cliente_id = ?
            `, [cliente_id], (err, data) => {

                const carrito_id = data[0].carrito_id;

                // Obtener precio real del postre
                conn.query(`
                    SELECT precio FROM Postre_Precio WHERE postre_id = ?
                `, [postre_id], (err, precioData) => {

                    const precio = precioData[0].precio;

                    // Insertar en carrito con precio correcto
                    conn.query(`
                        INSERT INTO CarritoProducto 
                            (carrito_id, postre_id, cantidad, precio_final)
                        VALUES (?, ?, ?, ?)
                    `, [carrito_id, postre_id, cantidad, precio]);

                    // Descontar stock
                    conn.query(`
                        UPDATE Postres SET stock = stock - ?
                        WHERE postre_id = ?
                    `, [cantidad, postre_id]);

                    res.redirect("/carrito");
                });
            });
        });
    },

    // ============================================================
    // ELIMINAR ITEM DEL CARRITO
    // ============================================================
    eliminarItem: (req, res) => {
        const id = req.params.id;

        req.getConnection((err, conn) => {

            // Obtener datos para regresar stock
            conn.query(`
                SELECT postre_id, cantidad
                FROM CarritoProducto
                WHERE carrito_producto_id = ?
            `, [id], (err, data) => {

                if (data.length === 0) return res.redirect("/carrito");

                const { postre_id, cantidad } = data[0];

                // Regresar stock
                conn.query(`
                    UPDATE Postres SET stock = stock + ?
                    WHERE postre_id = ?
                `, [cantidad, postre_id]);

                // Eliminar del carrito
                conn.query(`
                    DELETE FROM CarritoProducto
                    WHERE carrito_producto_id = ?
                `, [id]);

                res.redirect("/carrito");
            });
        });
    },

    // ============================================================
    // COMPRAR PRODUCTOS (vacía carrito sin regresar stock)
    // ============================================================
    comprarProductos: (req, res) => {
        const cliente_id = 1;

        req.getConnection((err, conn) => {

            conn.query(`
                SELECT carrito_id FROM Carrito WHERE cliente_id = ?
            `, [cliente_id], (err, data) => {

                const carrito_id = data[0].carrito_id;

                // Vaciar carrito
                conn.query(`
                    DELETE FROM CarritoProducto WHERE carrito_id = ?
                `, [carrito_id], () => {

                    res.redirect("/carrito");
                });
            });
        });
    }

};
