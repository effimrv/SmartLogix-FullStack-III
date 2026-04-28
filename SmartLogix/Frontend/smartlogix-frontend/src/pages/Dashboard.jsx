function Dashboard() {
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
    </div>
  );
}

export default Dashboard;