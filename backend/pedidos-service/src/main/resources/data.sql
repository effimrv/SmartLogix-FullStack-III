INSERT INTO pedidos.pedido (usuario_id, producto_id, cantidad, total, estado_pedido, fecha_pedido)
SELECT * FROM (VALUES
  (3::bigint, 1::bigint, 1, 89990.0, 'ENTREGADO', '2026-04-01'::date),
  (3::bigint, 5::bigint, 2, 69980.0, 'ENTREGADO', '2026-04-03'::date),
  (4::bigint, 2::bigint, 3, 74970.0, 'ENTREGADO', '2026-04-05'::date),
  (3::bigint, 9::bigint, 1, 119990.0, 'ENVIADO', '2026-04-08'::date),
  (4::bigint, 3::bigint, 1, 54990.0, 'ENVIADO', '2026-04-10'::date),
  (3::bigint, 6::bigint, 2, 57980.0, 'EN_PROCESO', '2026-04-12'::date),
  (4::bigint, 7::bigint, 1, 49990.0, 'EN_PROCESO', '2026-04-15'::date),
  (3::bigint, 4::bigint, 1, 79990.0, 'PENDIENTE', '2026-04-18'::date),
  (4::bigint, 8::bigint, 3, 38970.0, 'PENDIENTE', '2026-04-20'::date),
  (3::bigint, 10::bigint, 1, 89990.0, 'PENDIENTE', '2026-04-22'::date),
  (4::bigint, 1::bigint, 2, 179980.0, 'ENTREGADO', '2026-04-25'::date),
  (3::bigint, 2::bigint, 1, 24990.0, 'ENVIADO', '2026-04-27'::date),
  (4::bigint, 5::bigint, 1, 34990.0, 'EN_PROCESO', '2026-04-28'::date),
  (3::bigint, 6::bigint, 3, 86970.0, 'PENDIENTE', '2026-04-29'::date),
  (4::bigint, 9::bigint, 1, 119990.0, 'PENDIENTE', '2026-04-30'::date)
) AS v(usuario_id, producto_id, cantidad, total, estado_pedido, fecha_pedido)
WHERE NOT EXISTS (SELECT 1 FROM pedidos.pedido);
