const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const morgan = require('morgan');
const path = require('path');

const clienteRoutes = require('./src/routes/clienteRoutes');
const categoriasRoutes = require('./src/routes/categoriasRoutes');
const productosRoutes = require('./src/routes/productosRoutes');
const MenuRoutes = require('./src/routes/MenuRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const crearCuentaRoutes = require('./src/routes/crearCuentaRoutes');

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
app.use(express.static("public"));

// Conexión MySQL
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'homesweethometreat',
    password: 'Edgar11092022',
    port: 3306,
    database: 'home_sweet_home_treat_bd'
}, 'single'));

// ----------------------
// Rutas
// ----------------------

// Login primero (página inicial)
app.use('/login', loginRoutes);

app.use('/signup', loginRoutes);

app.use('/crearCuenta', crearCuentaRoutes);

app.use('/Menu', MenuRoutes);

// CRUD clientes
app.use('/clientes', clienteRoutes);

// CRUD categorías
app.use('/categorias', categoriasRoutes);

// CRUD productos
app.use('/productos', productosRoutes);

// CRUD productos backend
app.use('/Menu', MenuRoutes);



// Ruta principal → Login
app.get('/', (req, res) => res.redirect('/login'));

// ----------------------
// Iniciar servidor
// ----------------------
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
});
