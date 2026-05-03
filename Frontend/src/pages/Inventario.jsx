import { useState, useEffect } from 'react';

function Inventario() {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevo, setNuevo] = useState({ nombre: '', categoria: '', stock: '', precio: '' });

  const API = '/api/inventario';

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const res = await fetch(API);
      if (!res.ok) throw new Error('Error al cargar');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

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

  const guardar = async () => {
    if (!nuevo.nombre || !nuevo.categoria || !nuevo.stock || !nuevo.precio) return;
    try {
      const url = productoEditar ? `${API}/${productoEditar.productoId}` : API;
      const method = productoEditar ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nuevo, stock: parseInt(nuevo.stock), precio: parseFloat(nuevo.precio) })
      });
      if (!res.ok) throw new Error('Error al guardar');
      setMostrarModal(false);
      setNuevo({ nombre: '', categoria: '', stock: '', precio: '' });
      await cargarProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Estás segura de eliminar este producto?')) return;
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      await cargarProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
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
            {cargando ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Cargando...</td></tr>
            ) : productosFiltrados.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No hay productos</td></tr>
            ) : (
              productosFiltrados.map((producto) => (
                <tr key={producto.productoId}>
                  <td>#{producto.productoId}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.categoria}</td>
                  <td><span className={getStockClass(producto.stock)}>{producto.stock} unidades</span></td>
                  <td>${producto.precio?.toLocaleString()}</td>
                  <td style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn-editar" onClick={() => abrirModalEditar(producto)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => eliminar(producto.productoId)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
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
              <input type="text" placeholder="Nombre del producto" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
              <label>Categoría</label>
              <select value={nuevo.categoria} onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}>
                <option value="">Seleccionar...</option>
                <option>Calzado</option>
                <option>Electrónica</option>
                <option>Ropa</option>
                <option>Accesorios</option>
              </select>
              <label>Stock</label>
              <input type="number" placeholder="Cantidad" value={nuevo.stock} onChange={(e) => setNuevo({ ...nuevo, stock: e.target.value })} />
              <label>Precio</label>
              <input type="number" placeholder="00000" value={nuevo.precio} onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })} />
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