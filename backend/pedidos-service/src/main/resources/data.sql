INSERT INTO pedidos.pedido (cliente_id, total, estado_pedido, fecha_pedido)
SELECT v.cliente_id, v.total, v.estado_pedido, v.fecha_pedido FROM (VALUES
  (5::bigint,  139970.0::float8, 'ENTREGADO'::varchar,  '2026-04-01'::date),
  (6::bigint,   69980.0,         'ENTREGADO',            '2026-04-03'::date),
  (7::bigint,  104980.0,         'ENTREGADO',            '2026-04-05'::date),
  (8::bigint,  119990.0,         'ENVIADO',              '2026-04-08'::date),
  (5::bigint,   70970.0,         'ENVIADO',              '2026-04-10'::date),
  (6::bigint,   79990.0,         'EN_PROCESO',           '2026-04-12'::date),
  (7::bigint,  139970.0,         'EN_PROCESO',           '2026-04-15'::date),
  (8::bigint,   89990.0,         'PENDIENTE',            '2026-04-18'::date),
  (5::bigint,   89980.0,         'PENDIENTE',            '2026-04-20'::date),
  (6::bigint,   28990.0,         'CANCELADO',            '2026-04-22'::date)
) AS v(cliente_id, total, estado_pedido, fecha_pedido)
WHERE NOT EXISTS (SELECT 1 FROM pedidos.pedido);

INSERT INTO pedidos.detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario)
SELECT v.pedido_id, v.producto_id, v.cantidad, v.precio_unitario FROM (VALUES
  -- Pedido 1: Juan Soto — Producto 1 + Producto 2
  (1::bigint, 1::bigint, 1::int, 89990.0::float8),
  (1::bigint, 2::bigint, 2::int, 24990.0),
  -- Pedido 2: Valentina Mora — Producto 5
  (2::bigint, 5::bigint, 2::int, 34990.0),
  -- Pedido 3: Diego Fuentes — Producto 3 + Producto 7
  (3::bigint, 3::bigint, 1::int, 54990.0),
  (3::bigint, 7::bigint, 1::int, 49990.0),
  -- Pedido 4: Camila Torres — Producto 9
  (4::bigint, 9::bigint, 1::int, 119990.0),
  -- Pedido 5: Juan Soto — Producto 6 + Producto 8
  (5::bigint, 6::bigint, 2::int, 28990.0),
  (5::bigint, 8::bigint, 1::int, 12990.0),
  -- Pedido 6: Valentina Mora — Producto 4
  (6::bigint, 4::bigint, 1::int, 79990.0),
  -- Pedido 7: Diego Fuentes — Producto 10 + Producto 2
  (7::bigint, 10::bigint, 1::int, 89990.0),
  (7::bigint,  2::bigint, 2::int, 24990.0),
  -- Pedido 8: Camila Torres — Producto 1
  (8::bigint, 1::bigint, 1::int, 89990.0),
  -- Pedido 9: Juan Soto — Producto 3 + Producto 5
  (9::bigint, 3::bigint, 1::int, 54990.0),
  (9::bigint, 5::bigint, 1::int, 34990.0),
  -- Pedido 10: Valentina Mora — Producto 6
  (10::bigint, 6::bigint, 1::int, 28990.0)
) AS v(pedido_id, producto_id, cantidad, precio_unitario)
WHERE NOT EXISTS (SELECT 1 FROM pedidos.detalle_pedido);
