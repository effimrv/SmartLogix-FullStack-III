import { useState } from 'react';

function Inventario() {
  const [busqueda, setBusqueda] = useState('');

  const productos = [
    { id: '001', nombre: 'Zapatillas Nike', categoria: 'Calzado', stock: 45, precio: '$59.990' },
    { id: '002', nombre: 'Audífonos Sony', categoria: 'Electrónica', stock: 12, precio: '$89.990' },
    { id: '003', nombre: 'Polera Adidas', categoria: 'Ropa', stock: 78, precio: '$24.990' },
    { id: '004', nombre: 'Mochila Kipling', categoria: 'Accesorios', stock: 5, precio: '$69.990' },
    { id: '005', nombre: 'Reloj Casio', categoria: 'Accesorios', stock: 20, precio: '$49.990' },
    { id: '006', nombre: 'Camisa Zara', categoria: 'Ropa', stock: 33, precio: '$34.990' },
  ];

  const getStockClass = (stock) => {
    if (stock <= 5) return 'badge badge-red';
    if (stock <= 20) return 'badge badge-amber';
    return 'badge badge-green';
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Inventario</h2>
        <button className="btn-primary">+ Agregar producto</button>
      </div>

      <input
        type="text"
        className="buscador"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>#{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td><span className={getStockClass(producto.stock)}>{producto.stock} unidades</span></td>
                <td>{producto.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventario;