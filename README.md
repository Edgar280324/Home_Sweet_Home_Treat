1. Insertar la base de datos. 

\R \d>
\. ruta_del_sql

Nota: Si eliminamos la base de datos, el usuario que hayamos creado no se eliminara, y esto provocara que al insertar una nueva BD con el mismo usuario que creamos arrojara error. Para ello eliminaremos el usuario con lo siguiente:

SELECT user, host FROM mysql.user; //Aqui verificamos el nombre del usuario creado
DROP USER 'homesweethometreat'@'localhost'; 
FLUSH PRIVILEGES;

2. Instalar los siguientes paquetes para utilizar el sitio web, 

---> Instalar todo en uno:

npm install express morgan mysql express-myconnection body-parser cors ejs multer
npm install nodemon --save-dev

---> Instalar por separado:

npm install express morgan mysql express-myconnection
npm install body-parser cors
npm install nodemon --save-dev
npm install ejs
npm install multer

Una vez instalados ejecute app.js para usar el programa. 

NOTA: ctrl-C para detener el sitio web. 

3. Acceder al sitio web

---> LOGIN. 
Como es nuevo usuario de clic en "crear nueva cuenta" donde se le pedira lo siguiente:
--Nombre completo
--Correo Electronico
--Telefono (10 digitos)
--Contraseña

Una vez finalizado en automatico lo redigira al login de acceso e ingrese sus credenciales

4. Uso del sitio Web

    4.1 Dashboard. 
-
    ---> Tabla Clientes
    De clic en la opción clientes. 
    Usted podra Crear nuevos clientes, editar, eliminar y leer.

    --->Tabla Categorias. 
    Aparecerán automáticamente tres categorías. Si no coloco la consulta completa de la BD, no se mostrará ninguna categoria. 

    Podra realizar CRUD en la tabla categoria, sin embargo, al ingresar una imagen debe ser en los siguientes formatos. 

    ->pastel1.jpg hasta pastel5.jpg
    ->cupcake1.jpg hasta cupcake5.jpg
    ->tarta1.jpg hasta tarta5.jpg

    --->Tabla productos
    Podra realizar CRUD en la tabla productos, sin embargo, al ingresar una imagen debe ser en los siguientes formatos. 
    
    ->pastel1.jpg hasta pastel5.jpg
    ->cupcake1.jpg hasta cupcake5.jpg
    ->tarta1.jpg hasta tarta5.jpg

    --->Carrito

    -> Explore la lista de productos y haga clic en "Agregar al carrito" para añadirlos. Luego, haga clic en el carrito, que se encuentra en la parte superior central, para ver los productos seleccionados.
    -> De clic en comprar productos, en automatico el carrito se vaciara. 

    --->Salir

    ->Al presionar "Salir", todas las pestañas abiertas se cerrarán y volverá a la pantalla de login.

5. NOTA IMPORTANTE:

Se empleo el SHA2, el cual realiza un encriptado de la contraseña de 64 caracteres. 
Para consultarlo, dirijase a MYSQL COMAND LINE CLIENT

Coloque lo siguiente:

USE home_sweet_home_treat_bd;
SELECT * FROM cliente; 

    ¡Excelente vacaciones, Inge! La verdad me resultó muy útil trabajar con Express y Node programar en esta herramienta es mucho más sencillo y rápido que usar WarmServer.



