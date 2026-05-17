INSERT INTO inventario.producto (nombre, descripcion, categoria, precio, stock)
SELECT * FROM (VALUES
  ('Zapatillas Nike Air Max', 'Zapatillas deportivas premium', 'Calzado', 89990.0, 45),
  ('Polera Adidas Oversized', 'Polera oversize unisex', 'Ropa', 24990.0, 60),
  ('Jeans Levi''s 501', 'Jeans clásico tiro alto', 'Ropa', 54990.0, 30),
  ('Chaqueta Zara Cuero', 'Chaqueta de cuero sintético', 'Ropa', 79990.0, 20),
  ('Base MAC Studio Fix', 'Base de maquillaje larga duración', 'Maquillaje', 34990.0, 50),
  ('Labial Charlotte Tilbury', 'Labial mate de larga duración', 'Maquillaje', 28990.0, 40),
  ('Paleta Sombras Urban Decay', 'Paleta 12 colores neutros', 'Maquillaje', 49990.0, 25),
  ('Collar Dorado TodoModa', 'Collar minimalista dorado', 'Accesorios', 12990.0, 80),
  ('Cartera Michael Kors', 'Cartera mediana cuero café', 'Accesorios', 119990.0, 15),
  ('Gafas Ray-Ban Wayfarer', 'Lentes de sol clásicos', 'Accesorios', 89990.0, 20)
) AS v(nombre, descripcion, categoria, precio, stock)
WHERE NOT EXISTS (SELECT 1 FROM inventario.producto);
