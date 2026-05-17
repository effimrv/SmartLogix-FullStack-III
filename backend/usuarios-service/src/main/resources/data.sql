INSERT INTO usuarios.usuario (nombre, email, password, rol, estado)
SELECT * FROM (VALUES
  ('Aracely Escobar', 'admin@smartlogix.com', '1234', 'ADMIN', 'ACTIVO'),
  ('Yannella Castilla', 'yannella@smartlogix.com', '1234', 'ADMIN', 'ACTIVO'),
  ('María López', 'maria@smartlogix.com', '1234', 'EMPLEADO', 'ACTIVO'),
  ('Carlos Pérez', 'carlos@smartlogix.com', '1234', 'EMPLEADO', 'ACTIVO')
) AS v(nombre, email, password, rol, estado)
WHERE NOT EXISTS (SELECT 1 FROM usuarios.usuario);
