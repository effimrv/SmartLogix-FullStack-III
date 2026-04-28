import { useState } from 'react';

function Inventario() {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [productos, setProductos] = useState([
    { id: '001', nombre: 'Zapatillas Nike', categoria: 'Calzado', stock: 45, precio: '$59.990' },
    { id: '002', nombre: 'Audífonos Sony', categoria: 'Electrónica', stock: 12, precio: '$89.990' },
    { id: '003', nombre: 'Polera Adidas', categoria: 'Ropa', stock: 78, precio: '$24.990' },
    { id: '004', nombre: 'Mochila Kipling', categoria: 'Accesorios', stock: 5, precio: '$69.990' },
    { id: '005', nombre: 'Reloj Casio', categoria: 'Accesorios', stock: 20, precio: '$49.990' },
    { id: '006', nombre: 'Camisa Zara', categoria: 'Ropa', stock: 33, precio: '$34.990' },
  ]);

  const [nuevo, setNuevo] = useState({ nombre: '', categoria: '', stock: '', precio: '' });

  const getStockClass = (stock) => {
    if (stock <= 5) return 'badge badge-red';
    if (stock <= 20) return 'badge badge-amber';
    return 'badge badge-green';
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirModalNuevo = () => {
    setProductoEditar(null);
    setNuevo({ nombre: '', categoria: '', stock: '', precio: '' });
    setMostrarModal(true);
  };

  const abrirModalEditar = (producto) => {
    setProductoEditar(producto);
    setNuevo({ nombre: producto.nombre, categoria: producto.categoria, stock: producto.stock, precio: producto.precio });
    setMostrarModal(true);
  };

  const guardar = () => {
    if (!nuevo.nombre || !nuevo.categoria || !nuevo.stock || !nuevo.precio) return;
    if (productoEditar) {
      setProductos(productos.map((p) =>
        p.id === productoEditar.id ? { ...p, ...nuevo, stock: parseInt(nuevo.stock) } : p
      ));
    } else {
      const id = String(productos.length + 1).padStart(3, '0');
      setProductos([...productos, { id, ...nuevo, stock: parseInt(nuevo.stock) }]);
    }
    setMostrarModal(false);
  };

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Inventario</h2>
        <button className="btn-primary" onClick={abrirModalNuevo}>+ Agregar producto</button>
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
              <th>Acciones</th>
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
                <td>
                  <button className="btn-editar" onClick={() => abrirModalEditar(producto)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{productoEditar ? 'Editar producto' : 'Agregar producto'}</h3>
              <button className="modal-close" onClick={() => setMostrarModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Nombre del producto"
                value={nuevo.nombre}
                onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
              />
              <label>Categoría</label>
              <select
                value={nuevo.categoria}
                onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
              >
                <option value="">Seleccionar...</option>
                <option>Calzado</option>
                <option>Electrónica</option>
                <option>Ropa</option>
                <option>Accesorios</option>
              </select>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Cantidad"
                value={nuevo.stock}
                onChange={(e) => setNuevo({ ...nuevo, stock: e.target.value })}
              />
              <label>Precio</label>
              <input
                type="text"
                placeholder="$00.000"
                value={nuevo.precio}
                onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={guardar}>{productoEditar ? 'Guardar' : 'Agregar'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventario;