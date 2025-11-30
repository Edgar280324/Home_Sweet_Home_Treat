
CREATE DATABASE home_sweet_home_treat_bd;
USE home_sweet_home_treat_bd;


CREATE USER 'homesweethometreat'@'localhost' IDENTIFIED BY 'Edgar11092022';
GRANT ALL PRIVILEGES ON home_sweet_home_treat_bd.* TO 'homesweethometreat'@'localhost';
FLUSH PRIVILEGES;
ALTER USER 'homesweethometreat'@'localhost'
IDENTIFIED WITH mysql_native_password BY 'Edgar11092022';
FLUSH PRIVILEGES;


CREATE TABLE Cliente (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE,
    telefono CHAR(10),
    contrasena CHAR(64) NOT NULL
);


CREATE TABLE Carrito (
    carrito_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT UNIQUE,
    fecha_creacion DATETIME DEFAULT NOW(),
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Tipo_Postre (
    tipo_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NULL,
    ruta_imagen VARCHAR(255) NULL
);

CREATE TABLE Postres (
    postre_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_postre VARCHAR(100) NOT NULL,
    tipo_id INT NOT NULL,
    stock INT DEFAULT 0,
    imagen LONGBLOB,       
    ruta_imagen VARCHAR(255), 
    descripcion TEXT,
    FOREIGN KEY (tipo_id) REFERENCES Tipo_Postre(tipo_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Postre_Precio (
    precio_id INT AUTO_INCREMENT PRIMARY KEY,
    postre_id INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (postre_id) REFERENCES Postres(postre_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE CarritoProducto (
    carrito_producto_id INT AUTO_INCREMENT PRIMARY KEY,
    carrito_id INT NOT NULL,
    postre_id INT NOT NULL,
    cantidad INT DEFAULT 1,
    personalizacion TEXT,
    precio_final DECIMAL(10,2),
    FOREIGN KEY (carrito_id) REFERENCES Carrito(carrito_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (postre_id) REFERENCES Postres(postre_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Ventas (
    venta_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    fecha DATETIME DEFAULT NOW(),
    total DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE Detalle_Venta (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    postre_id INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES Ventas(venta_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (postre_id) REFERENCES Postres(postre_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO Tipo_Postre (tipo_id, nombre_tipo, descripcion, ruta_imagen)
VALUES
(1, 'Pasteles', 'Delicados y tradicionales postres elaborados con finas capas y sabores auténticos.', 'pastel2.jpg'),
(2, 'Cupcakes', 'Pequeños y elegantes pastelillos decorados con estilo y sabor exquisito.', 'cupcake1.jpg'),
(3, 'Tartas', 'Postres refinados con bases crujientes y rellenos suaves que deleitan el paladar.', 'tarta1.jpg');

