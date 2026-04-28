function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-text">SmartLogix</div>
        <div className="logo-sub">Panel de gestión</div>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-item active">Dashboard</div>
        <div className="nav-item">Pedidos</div>
        <div className="nav-item">Inventario</div>
        <div className="nav-item">Envíos</div>
        <div className="nav-item">Usuarios</div>
      </nav>
    </div>
  );
}

export default Sidebar;