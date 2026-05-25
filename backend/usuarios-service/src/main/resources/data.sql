INSERT INTO usuarios.usuario (usuario_id, rut, nombre, email, password, rol, estado)
VALUES
  ('US100001', '14.567.890-K', 'Aracely Escobar',   'admin@smartlogix.com',    '1234', 'ADMIN',    'ACTIVO'),
  ('US100002', '13.456.789-5', 'Yannella Castilla', 'yannella@smartlogix.com', '1234', 'ADMIN',    'ACTIVO'),
  ('US100003', '10.234.567-9', 'María López',       'maria@smartlogix.com',    '1234', 'EMPLEADO', 'ACTIVO'),
  ('US100004', '8.765.432-4',  'Carlos Pérez',      'carlos@smartlogix.com',   '1234', 'EMPLEADO', 'ACTIVO'),
  ('US100005', '12.456.789-3', 'Juan Soto',         'juan@cliente.com',        '1234', 'CLIENTE',  'ACTIVO'),
  ('US100006', '15.234.567-8', 'Valentina Mora',    'valentina@cliente.com',   '1234', 'CLIENTE',  'ACTIVO'),
  ('US100007', '11.789.456-2', 'Diego Fuentes',     'diego@cliente.com',       '1234', 'CLIENTE',  'ACTIVO'),
  ('US100008', '9.876.543-1',  'Camila Torres',     'camila@cliente.com',      '1234', 'CLIENTE',  'ACTIVO')
ON CONFLICT (email) DO NOTHING;
