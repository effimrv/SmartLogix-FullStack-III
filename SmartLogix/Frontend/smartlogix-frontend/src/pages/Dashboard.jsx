function Dashboard() {
  const pedidos = [
    { id: '#001', cliente: 'Aracely Escobar', producto: 'Zapatillas Nike', estado: 'Entregado' },
    { id: '#002', cliente: 'María López', producto: 'Audífonos Sony', estado: 'En tránsito' },
    { id: '#003', cliente: 'Yannella Castilla', producto: 'Polera Adidas', estado: 'Pendiente' },
  ];

  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'Entregado': return 'badge badge-green';
      case 'En tránsito': return 'badge badge-amber';
      case 'Pendiente': return 'badge badge-blue';
      default: return 'badge';
    }
  };

  return (
    <div className="content">
      <div className="cards">
        <div className="card">
          <div className="card-label">Pedidos totales</div>
          <div className="card-value">128</div>
          <div className="card-sub">Este mes</div>
        </div>
        <div className="card">
          <div className="card-label">Productos en stock</div>
          <div className="card-value">342</div>
          <div className="card-sub">Inventario</div>
        </div>
        <div className="card">
          <div className="card-label">Envíos activos</div>
          <div className="card-value">47</div>
          <div className="card-sub">En tránsito</div>
        </div>
        <div className="card">
          <div className="card-label">Usuarios registrados</div>
          <div className="card-value">89</div>
          <div className="card-sub">Total</div>
        </div>
      </div>

      <div className="table-section">
        <div className="table-header">Pedidos recientes</div>
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
            {pedidos.map((pedido) => (
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

export default Dashboard;