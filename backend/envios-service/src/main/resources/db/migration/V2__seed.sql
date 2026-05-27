INSERT INTO envios.envio (envio_id, pedido_id, transportista, direccion_destino, ciudad, region, estado_envio, fecha_estimada) VALUES
  ('EN400001', 'PE300001', 'Chilexpress',   'Av. Argentina 123',    'Valparaíso',  'Valparaíso',    'ENTREGADO',  '2026-04-05'),
  ('EN400002', 'PE300002', 'Starken',       'Calle Larga 456',      'Viña del Mar','Valparaíso',    'ENTREGADO',  '2026-04-07'),
  ('EN400003', 'PE300003', 'Correos Chile', 'Av. Libertad 789',     'Santiago',    'Metropolitana', 'ENTREGADO',  '2026-04-09'),
  ('EN400004', 'PE300004', 'Chilexpress',   'Los Aromos 321',       'Concepción',  'Biobío',        'EN_CAMINO',  '2026-04-12'),
  ('EN400005', 'PE300005', 'Starken',       'Av. Colón 654',        'La Serena',   'Coquimbo',      'EN_CAMINO',  '2026-04-14'),
  ('EN400006', 'PE300006', 'Correos Chile', 'Pasaje Las Flores 12', 'Temuco',      'Araucanía',     'PREPARANDO', '2026-04-16'),
  ('EN400007', 'PE300007', 'Chilexpress',   'Av. España 999',       'Antofagasta', 'Antofagasta',   'PREPARANDO', '2026-04-18')
ON CONFLICT (envio_id) DO NOTHING;
