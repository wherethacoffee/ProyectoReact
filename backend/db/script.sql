CREATE TABLE representante (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL,
  celular TEXT NOT NULL,
  telefono TEXT NOT NULL,
  correo TEXT NOT NULL
);

CREATE TABLE turno (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_representante INT NOT NULL,
  id_municipio INT NOT NULL,
  id_status INT NOT NULL,
  id_asunto INT NOT NULL,
  curp_alumno TEXT NOT NULL,
  FOREIGN KEY (id_representante) REFERENCES representante(id),
  FOREIGN KEY (id_municipio) REFERENCES municipio(id),
  FOREIGN KEY (id_status) REFERENCES `status`(id),
  FOREIGN KEY (id_asunto) REFERENCES asunto(id),
  FOREIGN KEY (curp_alumno) REFERENCES alumno(curp),
  INDEX (curp_alumno(100))  -- Especifica la longitud máxima para la columna curp_alumno
);


CREATE TABLE nivel (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion TEXT NOT NULL,
  nivel_id INT NOT NULL
);

CREATE TABLE asunto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion TEXT NOT NULL
);

CREATE TABLE `status` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion TEXT NOT NULL
);

CREATE TABLE municipio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL,
  estado_id INT NOT NULL,
  FOREIGN KEY (estado_id) REFERENCES estado(id)
);

CREATE TABLE estado (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre TEXT NOT NULL
);

CREATE TABLE alumno (
  curp TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  materno TEXT NOT NULL,
  paterno TEXT NOT NULL
);

CREATE TABLE `admin` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username TEXT NOT NULL,
  `password` TEXT NOT NULL
);


