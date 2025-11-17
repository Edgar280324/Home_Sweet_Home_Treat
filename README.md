
1. Instalar los paquetes para habilitar el servidor local desde la consola

Codigo empleado:

npm install express morgan mysql express-myconnection

2. Insertar la base de datos en MYsql Monitor 


\R \d>
\. ruta_del_sql

3. Errores comunes de la base de datos. 

Si eliminamos la base de datos, el usuario que hayamos creado no se eliminara, y esto provocara que al insertar una nueva BD con el mismo usuario que creamos arrojara error. Para ello eliminaremos el usuario con lo siguiente:

SELECT user, host FROM mysql.user; >> Verificando el usuario que creamos
DROP USER 'homesweethometreat'@'localhost'; 
FLUSH PRIVILEGES;

4. Ejecutando el servidor local a traves de node.js

Verificar el codigo correctamente en app.js. Una vez realizado lo anterior ingresar en consola

node app.js 

Si arroja error, las razones son el usuario o contraseña o nombre de la BD que estan ingresados incorrectamente. 

NOTA: ctrl-C para detener el servidor
5. Uso del .gitignore 