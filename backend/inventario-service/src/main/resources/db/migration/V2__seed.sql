INSERT INTO inventario.producto (producto_id, nombre, descripcion, categoria, precio, stock) VALUES
  ('PR200001', 'Zapatillas Nike Air Max',    'Zapatillas deportivas premium',      'Calzado',    89990.0, 45),
  ('PR200002', 'Polera Adidas Oversized',    'Polera oversize unisex',             'Ropa',       24990.0, 60),
  ('PR200003', 'Jeans Levi''s 501',          'Jeans clásico tiro alto',            'Ropa',       54990.0, 30),
  ('PR200004', 'Chaqueta Zara Cuero',        'Chaqueta de cuero sintético',        'Ropa',       79990.0, 20),
  ('PR200005', 'Base MAC Studio Fix',        'Base de maquillaje larga duración',  'Maquillaje', 34990.0, 50),
  ('PR200006', 'Labial Charlotte Tilbury',   'Labial mate de larga duración',      'Maquillaje', 28990.0, 40),
  ('PR200007', 'Paleta Sombras Urban Decay', 'Paleta 12 colores neutros',          'Maquillaje', 49990.0, 25),
  ('PR200008', 'Collar Dorado TodoModa',     'Collar minimalista dorado',          'Accesorios', 12990.0, 80),
  ('PR200009', 'Cartera Michael Kors',       'Cartera mediana cuero café',         'Accesorios',119990.0, 15),
  ('PR200010', 'Gafas Ray-Ban Wayfarer',     'Lentes de sol clásicos',             'Accesorios', 89990.0, 20)
ON CONFLICT (producto_id) DO NOTHING;
