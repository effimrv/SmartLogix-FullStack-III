CREATE TABLE IF NOT EXISTS usuarios.usuario (
    usuario_id VARCHAR(8)   NOT NULL,
    rut        VARCHAR(15),
    nombre     VARCHAR(150) NOT NULL,
    email      VARCHAR(150) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    rol        VARCHAR(255) NOT NULL,
    estado     VARCHAR(255) NOT NULL,
    CONSTRAINT pk_usuario  PRIMARY KEY (usuario_id),
    CONSTRAINT uq_email    UNIQUE (email)
);
