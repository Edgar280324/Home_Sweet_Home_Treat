const express = require('express');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const morgan = require('morgan'); 


const app = express();

// Middlewares
app.use(morgan('dev'));

app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'homesweethometreat',
    password: 'Edgar11092022',
    port: 3306,
    database: 'home_sweet_home_treat_bd'
}, 'single')); // 'single' es recomendable para conexiones únicas

// Rutas
app.get('/', (req, res) => res.send('Bienvenido a Home sweet home treat'));

// Levantar el servidor
const PORT = 8085;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

