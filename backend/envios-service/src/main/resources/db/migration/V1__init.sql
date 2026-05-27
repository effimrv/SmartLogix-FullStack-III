CREATE TABLE IF NOT EXISTS envios.envio (
    envio_id          VARCHAR(8)   NOT NULL,
    pedido_id         VARCHAR(8)   NOT NULL,
    transportista     VARCHAR(100) NOT NULL,
    direccion_destino VARCHAR(255) NOT NULL,
    ciudad            VARCHAR(100),
    region            VARCHAR(100),
    estado_envio      VARCHAR(255) NOT NULL,
    fecha_estimada    DATE,
    CONSTRAINT pk_envio PRIMARY KEY (envio_id)
);
