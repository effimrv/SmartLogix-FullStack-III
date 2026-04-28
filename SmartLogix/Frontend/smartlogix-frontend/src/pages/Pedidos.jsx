import { useState } from 'react';

function Pedidos() {
  const [filtro, setFiltro] = useState('Todos');

  const pedidos = [
    { id: '#001', cliente: 'Aracely Escobar', producto: 'Zapatillas Nike', estado: 'Entregado' },
    { id: '#002', cliente: 'María López', producto: 'Audífonos Sony', estado: 'En tránsito' },
    { id: '#003', cliente: 'Yannella Castilla', producto: 'Polera Adidas', estado: 'Pendiente' },
    { id: '#004', cliente: 'Pedro Soto', producto: 'Mochila Kipling', estado: 'En tránsito' },
    { id: '#005', cliente: 'Camila Torres', producto: 'Reloj Casio', estado: 'Entregado' },
  ];

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

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Pedidos</h2>
        <button className="btn-primary">+ Nuevo pedido</button>
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
    </div>
  );
}

export default Pedidos;