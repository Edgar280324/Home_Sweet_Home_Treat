
1. Instalar los paquetes para habilitar el servidor local desde la consola y para usar el sitio web

Codigo empleado:

npm install express morgan mysql express-myconnection

npm install body-parser cors

npm install nodemon --save-dev

npm install ejs

npm install multer

2. Insertar imagenes

Donde se requiera ingresar imagenes se tiene que colocar con el siguiente formato:

nombre_de_la_imagen.jpg
Hay una lista de imagenes con una cantidad unica:

pastel1.jpg hasta pastel5.jpg
cupcake1.jpg hasta cupcake5.jpg
tarta1.jpg hasta tarta5.jpg


3. Insertar la base de datos en MYsql Monitor 


\R \d>
\. ruta_del_sql

4. Tabla categorias. 

¿Como insertar imagenes al agregar una categoria?
-- Inserte el nombre de la imagen.jpg.
La lista de imagenes que se encuentran son: 


5. Errores comunes de la base de datos. 

Si eliminamos la base de datos, el usuario que hayamos creado no se eliminara, y esto provocara que al insertar una nueva BD con el mismo usuario que creamos arrojara error. Para ello eliminaremos el usuario con lo siguiente:

SELECT user, host FROM mysql.user;

DROP USER 'homesweethometreat'@'localhost'; 

FLUSH PRIVILEGES;

6. Ejecutando el servidor local a traves de node.js

Verificar el codigo correctamente en app.js. Una vez realizado lo anterior ingresar en consola

node app.js 

Si arroja error, las razones son el usuario o contraseña o nombre de la BD que estan ingresados incorrectamente. 

NOTA: ctrl-C para detener el servidor



