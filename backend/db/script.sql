CREATE TABLE representante(
  id INT NOT NULL,
  nombre TEXT,
  celular TEXT,
  telefono TEXT,
  correo TEXT,
  PRIMARY KEY(id)
);

CREATE TABLE turno(
  id INT NOT NULL,
  id_representante INT NOT NULL,
  id_municipio INT NOT NULL,
  id_status INT NOT NULL,
  id_asunto INT NOT NULL,
  curp_alumno TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE nivel(
  id INT NOT NULL,
  descripcion TEXT,
  nivel_id INT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE asunto(id INT NOT NULL, descripcion TEXT, PRIMARY KEY(id));

CREATE TABLE `status`(id INT NOT NULL, descripcion TEXT, PRIMARY KEY(id));

CREATE TABLE municipio(
  id INT NOT NULL,
  nombre TEXT,
  estado_id INT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE estado(id INT NOT NULL, nombre TEXT, PRIMARY KEY(id));

CREATE TABLE alumno(
  curp TEXT NOT NULL,
  nombre TEXT,
  materno TEXT,
  paterno TEXT,
  PRIMARY KEY(curp)
);

CREATE TABLE `admin`(
  id INT NOT NULL,
  username TEXT,
  `password` TEXT,
  PRIMARY KEY(id)
);

ALTER TABLE turno
  ADD CONSTRAINT representante_turno
    FOREIGN KEY (id_representante) REFERENCES representante (id);

ALTER TABLE municipio
  ADD CONSTRAINT estado_municipio FOREIGN KEY (estado_id) REFERENCES estado (id)
  ;

ALTER TABLE turno
  ADD CONSTRAINT municipio_turno
    FOREIGN KEY (id_municipio) REFERENCES municipio (id);

ALTER TABLE turno
  ADD CONSTRAINT nivel_representante_id
    FOREIGN KEY (id_representante) REFERENCES nivel (id);

ALTER TABLE turno
  ADD CONSTRAINT status_turno FOREIGN KEY (id_status) REFERENCES `status` (id);

ALTER TABLE turno
  ADD CONSTRAINT id_turno FOREIGN KEY (id_asunto) REFERENCES asunto (id);

ALTER TABLE turno
  ADD CONSTRAINT curp_turno FOREIGN KEY (curp_alumno) REFERENCES alumno (curp);