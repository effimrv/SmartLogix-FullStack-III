INSERT INTO envios.envio (pedido_id, transportista, direccion_destino, ciudad, region, estado_envio, fecha_estimada)
SELECT * FROM (VALUES
  (1::bigint, 'Chilexpress', 'Av. Argentina 123', 'Valparaíso', 'Valparaíso', 'ENTREGADO', '2026-04-05'::date),
  (2::bigint, 'Starken', 'Calle Larga 456', 'Viña del Mar', 'Valparaíso', 'ENTREGADO', '2026-04-07'::date),
  (3::bigint, 'Correos Chile', 'Av. Libertad 789', 'Santiago', 'Metropolitana', 'ENTREGADO', '2026-04-09'::date),
  (4::bigint, 'Chilexpress', 'Los Aromos 321', 'Concepción', 'Biobío', 'EN_CAMINO', '2026-04-12'::date),
  (5::bigint, 'Starken', 'Av. Colón 654', 'La Serena', 'Coquimbo', 'EN_CAMINO', '2026-04-14'::date),
  (6::bigint, 'Correos Chile', 'Pasaje Las Flores 12', 'Temuco', 'Araucanía', 'PREPARANDO', '2026-04-16'::date),
  (7::bigint, 'Chilexpress', 'Av. España 999', 'Antofagasta', 'Antofagasta', 'PREPARANDO', '2026-04-18'::date)
) AS v(pedido_id, transportista, direccion_destino, ciudad, region, estado_envio, fecha_estimada)
WHERE NOT EXISTS (SELECT 1 FROM envios.envio);
