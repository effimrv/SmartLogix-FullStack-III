-- Contraseñas hasheadas con BCrypt (todas corresponden a "1234")
INSERT INTO usuarios.usuario (usuario_id, rut, nombre, email, password, rol, estado) VALUES
  ('US100001', '21.557.833-K', 'Aracely Escobar',   'aracely@smartlogix.com', '$2a$10$CrcTfiHvJtlSH8MaeSa48OfeiEw0/WsIA3uX65Ny6EIaoII8/ffLW', 'ADMIN',    'ACTIVO'),
  ('US100002', '20.456.789-5', 'Yannella Castilla', 'yannella@smartlogix.com', '$2a$10$TdSwbLQ9J2qOKEmK/T7jhOvKV3vC6hEJ/Sey1JAV4XznTKYVm2UeG', 'ADMIN',    'ACTIVO'),
  ('US100003', '10.234.567-9', 'María López',       'maria@smartlogix.com',    '$2a$10$ylhc.5vVaG55yWRh2PG5z.IU1fRpPQQqpMDzsEcQE/YqaAdA3kSF.', 'EMPLEADO', 'ACTIVO'),
  ('US100004', '8.765.432-4',  'Carlos Pérez',      'carlos@smartlogix.com',   '$2a$10$1Uyf.s4YuRAu5SnqxlbGsOuLP.3uRAxxnNtrVnQMbYmPDUQocNCXu', 'EMPLEADO', 'ACTIVO'),
  ('US100005', '12.456.789-3', 'Juan Soto',         'juan@cliente.com',        '$2a$10$YCznwAETZ5YeTxgjbvK3q.NhsMdL9rMsbj0vn3adNPGEnrKA0L/4a', 'CLIENTE',  'ACTIVO'),
  ('US100006', '15.234.567-8', 'Valentina Mora',    'valentina@cliente.com',   '$2a$10$AJm12RWM.tmrcRIe2CCzR.3MhDupNISPL7cJsu3jq5I4r845xGUAO', 'CLIENTE',  'ACTIVO'),
  ('US100007', '11.789.456-2', 'Diego Fuentes',     'diego@cliente.com',       '$2a$10$1FFUiyR6Gn841g1X4l35fuOYzzz6MkeQZSPdA6gB6kXfO2S/2pvrS', 'CLIENTE',  'ACTIVO'),
  ('US100008', '9.876.543-1',  'Camila Torres',     'camila@cliente.com',      '$2a$10$pT53Isqdcow9hPfGfEzRGec2pI6DD7cYskC/3IbISD1W/iQEvybJm', 'CLIENTE',  'ACTIVO')
ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password;
