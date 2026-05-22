INSERT INTO usuarios.usuario (nombre, email, password, rol, estado)
VALUES
  ('Aracely Escobar',   'admin@smartlogix.com',      '1234', 'ADMIN',    'ACTIVO'),
  ('Yannella Castilla', 'yannella@smartlogix.com',   '1234', 'ADMIN',    'ACTIVO'),
  ('María López',       'maria@smartlogix.com',       '1234', 'EMPLEADO', 'ACTIVO'),
  ('Carlos Pérez',      'carlos@smartlogix.com',      '1234', 'EMPLEADO', 'ACTIVO'),
  ('Juan Soto',         'juan@cliente.com',           '1234', 'CLIENTE',  'ACTIVO'),
  ('Valentina Mora',    'valentina@cliente.com',      '1234', 'CLIENTE',  'ACTIVO'),
  ('Diego Fuentes',     'diego@cliente.com',          '1234', 'CLIENTE',  'ACTIVO'),
  ('Camila Torres',     'camila@cliente.com',         '1234', 'CLIENTE',  'ACTIVO')
ON CONFLICT (email) DO NOTHING;
