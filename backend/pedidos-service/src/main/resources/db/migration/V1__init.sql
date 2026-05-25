CREATE TABLE IF NOT EXISTS pedidos.pedido (
    pedido_id     VARCHAR(8)   NOT NULL,
    cliente_id    VARCHAR(8)   NOT NULL,
    total         FLOAT8       NOT NULL,
    estado_pedido VARCHAR(255) NOT NULL,
    fecha_pedido  DATE         NOT NULL,
    CONSTRAINT pk_pedido PRIMARY KEY (pedido_id)
);

CREATE TABLE IF NOT EXISTS pedidos.detalle_pedido (
    detalle_id      BIGSERIAL    NOT NULL,
    pedido_id       VARCHAR(8)   NOT NULL,
    producto_id     VARCHAR(8)   NOT NULL,
    cantidad        INTEGER      NOT NULL,
    precio_unitario FLOAT8       NOT NULL,
    CONSTRAINT pk_detalle PRIMARY KEY (detalle_id)
);
