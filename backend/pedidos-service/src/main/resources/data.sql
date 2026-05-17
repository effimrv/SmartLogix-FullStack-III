INSERT INTO pedidos.pedido (cliente_id, producto_id, cantidad, total, estado_pedido, fecha_pedido)
SELECT * FROM (VALUES
  (1::bigint, 1::bigint, 1, 89990.0, 'ENTREGADO', '2026-04-01'::date),
  (2::bigint, 5::bigint, 2, 69980.0, 'ENTREGADO', '2026-04-03'::date),
  (3::bigint, 2::bigint, 3, 74970.0, 'ENTREGADO', '2026-04-05'::date),
  (4::bigint, 9::bigint, 1, 119990.0, 'ENVIADO',   '2026-04-08'::date),
  (5::bigint, 3::bigint, 1, 54990.0, 'ENVIADO',   '2026-04-10'::date),
  (6::bigint, 6::bigint, 2, 57980.0, 'EN_PROCESO', '2026-04-12'::date),
  (7::bigint, 7::bigint, 1, 49990.0, 'EN_PROCESO', '2026-04-15'::date),
  (8::bigint, 4::bigint, 1, 79990.0, 'PENDIENTE',  '2026-04-18'::date),
  (9::bigint, 8::bigint, 3, 38970.0, 'PENDIENTE',  '2026-04-20'::date),
  (10::bigint, 10::bigint,1, 89990.0, 'PENDIENTE',  '2026-04-22'::date),
  (11::bigint, 1::bigint, 2, 179980.0,'ENTREGADO',  '2026-04-25'::date),
  (12::bigint, 2::bigint, 1, 24990.0, 'ENVIADO',    '2026-04-27'::date),
  (13::bigint, 5::bigint, 1, 34990.0, 'EN_PROCESO', '2026-04-28'::date),
  (14::bigint, 6::bigint, 3, 86970.0, 'PENDIENTE',  '2026-04-29'::date),
  (15::bigint, 9::bigint, 1, 119990.0,'PENDIENTE',  '2026-04-30'::date)
) AS v(cliente_id, producto_id, cantidad, total, estado_pedido, fecha_pedido)
WHERE NOT EXISTS (SELECT 1 FROM pedidos.pedido);