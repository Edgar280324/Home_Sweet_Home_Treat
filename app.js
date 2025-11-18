const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const morgan = require('morgan');
const path = require('path');
const clienteRoutes = require('./src/routes/clienteRoutes');

const app = express();

// Configuración
app.set('port', 8085);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

// Conexión a MySQL
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'homesweethometreat',
    password: 'Edgar11092022',
    port: 3306,
    database: 'home_sweet_home_treat_bd'
}, 'single'));

// Rutas
app.use('/clientes', clienteRoutes);

// Ruta principal
app.get('/', (req, res) => res.redirect('/clientes'));

// Levantar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
});