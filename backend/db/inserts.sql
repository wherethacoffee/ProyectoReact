INSERT INTO admin (username, `password`) VALUES
('admin1', 'password1'),
('admin2', 'password2');

INSERT INTO representante (nombre, celular, telefono, correo) VALUES
('Representante 1', '1234567890', '9876543210', 'representante1@example.com'),
('Representante 2', '9876543210', '1234567890', 'representante2@example.com');

INSERT INTO alumno (curp, nombre, materno, paterno) VALUES
('CURP12345678901234', 'Alumno 1', 'Materno1', 'Paterno1'),
('CURP56789012345678', 'Alumno 2', 'Materno2', 'Paterno2');

INSERT INTO `status` (descripcion) VALUES
('Pendiente'),
('Realizado');

INSERT INTO asunto (descripcion) VALUES
('Documentos'),
('Informacion');

INSERT INTO estado (nombre) VALUES
('Aguascalientes'),
('Baja California'),
('Baja California Sur'),
('Campeche'),
('Chiapas'),
('Chihuahua'),
('Coahuila'),
('Colima'),
('Durango'),
('Guanajuato'),
('Guerrero'),
('Hidalgo'),
('Jalisco'),
('México'),
('Michoacán'),
('Morelos'),
('Nayarit'),
('Nuevo León'),
('Oaxaca'),
('Puebla'),
('Querétaro'),
('Quintana Roo'),
('San Luis Potosí'),
('Sinaloa'),
('Sonora'),
('Tabasco'),
('Tamaulipas'),
('Tlaxcala'),
('Veracruz'),
('Yucatán'),
('Zacatecas');

INSERT INTO municipio (nombre, estado_id) VALUES
('Saltillo', 7),
('Monterrey', 18);

INSERT INTO nivel (descripcion) VALUES
('Primaria'),
('Secundaria');

INSERT INTO turno (id_representante, id_municipio, id_status, id_asunto, curp_alumno) VALUES
(1, 1, 1, 1, 'CURP12345678901234'),
(2, 2, 2, 2, 'CURP56789012345678');
