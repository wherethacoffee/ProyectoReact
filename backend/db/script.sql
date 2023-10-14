
CREATE DATABASE tickets_turno;

USE tickets_turno;

CREATE TABLE `admin` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL
);

CREATE TABLE representante (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  celular VARCHAR(20) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  correo VARCHAR(255) NOT NULL
);

CREATE TABLE alumno (
  curp VARCHAR(18) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  materno VARCHAR(255) NOT NULL,
  paterno VARCHAR(255) NOT NULL
);

CREATE TABLE `status` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE asunto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE estado (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL
);

CREATE TABLE municipio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  estado_id INT NOT NULL,
  FOREIGN KEY (estado_id) REFERENCES estado(id)
);

CREATE TABLE nivel (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE turno (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_representante INT NOT NULL,
  id_municipio INT NOT NULL,
  id_status INT NOT NULL,
  id_asunto INT NOT NULL,
  curp_alumno VARCHAR(18) NOT NULL,
  FOREIGN KEY (id_representante) REFERENCES representante(id),
  FOREIGN KEY (id_municipio) REFERENCES municipio(id),
  FOREIGN KEY (id_status) REFERENCES `status`(id),
  FOREIGN KEY (id_asunto) REFERENCES asunto(id),
  FOREIGN KEY (curp_alumno) REFERENCES alumno(curp),
  INDEX (curp_alumno(18))  -- Especifica la longitud máxima para la columna curp_alumno
);

CREATE VIEW VistaTurno AS
SELECT
    t.id,
    r.nombre AS representante,
    t.curp_alumno,
    n.descripcion AS nivel,
    m.nombre AS municipio,
    a.descripcion AS asunto,
    s.descripcion AS `status`
FROM turno t
JOIN representante r ON t.id_representante = r.id
JOIN municipio m ON t.id_municipio = m.id
JOIN `status` s ON t.id_status = s.id
JOIN asunto a ON t.id_asunto = a.id
JOIN nivel n ON t.id_nivel = n.id
JOIN alumno al ON t.curp_alumno = al.curp;

