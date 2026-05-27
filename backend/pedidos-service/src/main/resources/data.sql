INSERT INTO pedidos.pedido (pedido_id, cliente_id, total, estado_pedido, fecha_pedido)
SELECT v.pedido_id, v.cliente_id, v.total, v.estado_pedido, v.fecha_pedido FROM (VALUES
  ('PE300001', 'US100005', 139970.0::float8, 'ENTREGADO'::varchar,  '2026-04-01'::date),
  ('PE300002', 'US100006',  69980.0,         'ENTREGADO',           '2026-04-03'::date),
  ('PE300003', 'US100007', 104980.0,         'ENTREGADO',           '2026-04-05'::date),
  ('PE300004', 'US100008', 119990.0,         'ENVIADO',             '2026-04-08'::date),
  ('PE300005', 'US100005',  70970.0,         'ENVIADO',             '2026-04-10'::date),
  ('PE300006', 'US100006',  79990.0,         'EN_PROCESO',          '2026-04-12'::date),
  ('PE300007', 'US100007', 139970.0,         'EN_PROCESO',          '2026-04-15'::date),
  ('PE300008', 'US100008',  89990.0,         'PENDIENTE',           '2026-04-18'::date),
  ('PE300009', 'US100005',  89980.0,         'PENDIENTE',           '2026-04-20'::date),
  ('PE300010', 'US100006',  28990.0,         'CANCELADO',           '2026-04-22'::date)
) AS v(pedido_id, cliente_id, total, estado_pedido, fecha_pedido)
WHERE NOT EXISTS (SELECT 1 FROM pedidos.pedido);

INSERT INTO pedidos.detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario)
SELECT v.pedido_id, v.producto_id, v.cantidad, v.precio_unitario FROM (VALUES
  -- PE300001: Juan Soto — Producto 1 + Producto 2
  ('PE300001', 'PR200001', 1::int, 89990.0::float8),
  ('PE300001', 'PR200002', 2::int, 24990.0),
  -- PE300002: Valentina Mora — Producto 5
  ('PE300002', 'PR200005', 2::int, 34990.0),
  -- PE300003: Diego Fuentes — Producto 3 + Producto 7
  ('PE300003', 'PR200003', 1::int, 54990.0),
  ('PE300003', 'PR200007', 1::int, 49990.0),
  -- PE300004: Camila Torres — Producto 9
  ('PE300004', 'PR200009', 1::int, 119990.0),
  -- PE300005: Juan Soto — Producto 6 + Producto 8
  ('PE300005', 'PR200006', 2::int, 28990.0),
  ('PE300005', 'PR200008', 1::int, 12990.0),
  -- PE300006: Valentina Mora — Producto 4
  ('PE300006', 'PR200004', 1::int, 79990.0),
  -- PE300007: Diego Fuentes — Producto 10 + Producto 2
  ('PE300007', 'PR200010', 1::int, 89990.0),
  ('PE300007', 'PR200002', 2::int, 24990.0),
  -- PE300008: Camila Torres — Producto 1
  ('PE300008', 'PR200001', 1::int, 89990.0),
  -- PE300009: Juan Soto — Producto 3 + Producto 5
  ('PE300009', 'PR200003', 1::int, 54990.0),
  ('PE300009', 'PR200005', 1::int, 34990.0),
  -- PE300010: Valentina Mora — Producto 6
  ('PE300010', 'PR200006', 1::int, 28990.0)
) AS v(pedido_id, producto_id, cantidad, precio_unitario)
WHERE NOT EXISTS (SELECT 1 FROM pedidos.detalle_pedido);
