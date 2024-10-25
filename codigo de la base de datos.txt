BASE DE DATOS (phpMyAdmin)
 
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL,
  cuenta_soles VARCHAR(255) NOT NULL,
  telefono VARCHAR(255) NOT NULL,
  enlace_referido VARCHAR(255) UNIQUE NOT NULL,  -- Agrega UNIQUE
  nivel ENUM('0', '1') NOT NULL DEFAULT '0',  -- Cambia a ENUM
  recompensa INT NOT NULL DEFAULT 0,
  fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('activo', 'inactivo') NOT NULL DEFAULT 'inactivo',
  nickname VARCHAR(255) NOT NULL,
  contraseña VARCHAR(255) NOT NULL,  -- Considera usar un hash de contraseña
  pregunta_secreta VARCHAR(255) NOT NULL 
);


CREATE TABLE afiliaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  afiliado_id INT NOT NULL,
  fecha_afiliacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  nivel INT NOT NULL, 
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (afiliado_id) REFERENCES usuarios(id)
);

CREATE TABLE niveles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  recompensa INT NOT NULL
);

CREATE TABLE deposit_captures_activacion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,  -- Agrega UNIQUE
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  upload_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES usuarios(id)
);

CREATE TABLE deposit_captures_inversion (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inversion_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  upload_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inversion_id) REFERENCES inversiones(id)
);

CREATE TABLE bitacora (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  accion VARCHAR(255) NOT NULL,
  fecha_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE inversiones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  plan VARCHAR(255) NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  fecha_inicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_fin DATETIME,
  estado ENUM('pendiente', 'confirmado', 'activo') NOT NULL DEFAULT 'pendiente',
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
