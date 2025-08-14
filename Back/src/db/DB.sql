CREATE DATABASE futbol_equipos;
USE futbol_equipos;

CREATE TABLE equipos(
    id_equipo INT  PRIMARY KEY AUTO_INCREMENT,
    nombre_equipo VARCHAR(100)
);   
-- Insert = POST
INSERT INTO equipos (nombre_equipo) VALUES
    ("Alemania"),
    ("Holanda"),
    ("Suecia"),
    ("Francia"),
    ("Noruega");
    
-- Select = GET
SELECT * FROM equipos;