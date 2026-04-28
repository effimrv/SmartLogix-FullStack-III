import { useState } from 'react';

function Pedidos() {
  const [filtro, setFiltro] = useState('Todos');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pedidos, setPedidos] = useState([
    { id: '#001', cliente: 'Aracely Escobar', producto: 'Zapatillas Nike', estado: 'Entregado' },
    { id: '#002', cliente: 'María López', producto: 'Audífonos Sony', estado: 'En tránsito' },
    { id: '#003', cliente: 'Yannella Castilla', producto: 'Polera Adidas', estado: 'Pendiente' },
    { id: '#004', cliente: 'Pedro Soto', producto: 'Mochila Kipling', estado: 'En tránsito' },
    { id: '#005', cliente: 'Camila Torres', producto: 'Reloj Casio', estado: 'Entregado' },
  ]);

  const [nuevo, setNuevo] = useState({ cliente: '', producto: '', estado: 'Pendiente' });

  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'Entregado': return 'badge badge-green';
      case 'En tránsito': return 'badge badge-amber';
      case 'Pendiente': return 'badge badge-blue';
      default: return 'badge';
    }
  };

  const pedidosFiltrados = filtro === 'Todos'
    ? pedidos
    : pedidos.filter((p) => p.estado === filtro);

  const agregarPedido = () => {
    if (!nuevo.cliente || !nuevo.producto) return;
    const id = `#00${pedidos.length + 1}`;
    setPedidos([...pedidos, { id, ...nuevo }]);
    setNuevo({ cliente: '', producto: '', estado: 'Pendiente' });
    setMostrarModal(false);
  };

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Pedidos</h2>
        <button className="btn-primary" onClick={() => setMostrarModal(true)}>+ Nuevo pedido</button>
      </div>

      <div className="filtros">
        {['Todos', 'Entregado', 'En tránsito', 'Pendiente'].map((f) => (
          <button
            key={f}
            className={`filtro-btn ${filtro === f ? 'active' : ''}`}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidosFiltrados.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.producto}</td>
                <td><span className={getBadgeClass(pedido.estado)}>{pedido.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Nuevo pedido</h3>
              <button className="modal-close" onClick={() => setMostrarModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <label>Cliente</label>
              <input
                type="text"
                placeholder="Nombre del cliente"
                value={nuevo.cliente}
                onChange={(e) => setNuevo({ ...nuevo, cliente: e.target.value })}
              />
              <label>Producto</label>
              <input
                type="text"
                placeholder="Nombre del producto"
                value={nuevo.producto}
                onChange={(e) => setNuevo({ ...nuevo, producto: e.target.value })}
              />
              <label>Estado</label>
              <select
                value={nuevo.estado}
                onChange={(e) => setNuevo({ ...nuevo, estado: e.target.value })}
              >
                <option>Pendiente</option>
                <option>En tránsito</option>
                <option>Entregado</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={agregarPedido}>Agregar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pedidos;