CREATE TABLE IF NOT EXISTS inventario.producto (
    producto_id  VARCHAR(8)   NOT NULL,
    nombre       VARCHAR(150) NOT NULL,
    descripcion  VARCHAR(255),
    categoria    VARCHAR(100) NOT NULL,
    precio       FLOAT8       NOT NULL,
    stock        INTEGER      NOT NULL,
    CONSTRAINT pk_producto PRIMARY KEY (producto_id)
);
