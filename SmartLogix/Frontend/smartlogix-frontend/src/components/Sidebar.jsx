function Sidebar({ paginaActual, setPaginaActual }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-text">SmartLogix</div>
        <div className="logo-sub">Panel de gestión</div>
      </div>
      <nav className="sidebar-nav">
        <div
          className={`nav-item ${paginaActual === 'dashboard' ? 'active' : ''}`}
          onClick={() => setPaginaActual('dashboard')}
        >
          Dashboard
        </div>
        <div
          className={`nav-item ${paginaActual === 'pedidos' ? 'active' : ''}`}
          onClick={() => setPaginaActual('pedidos')}
        >
          Pedidos
        </div>
        <div
          className={`nav-item ${paginaActual === 'inventario' ? 'active' : ''}`}
          onClick={() => setPaginaActual('inventario')}
        >
          Inventario
        </div>
        <div
          className={`nav-item ${paginaActual === 'envios' ? 'active' : ''}`}
          onClick={() => setPaginaActual('envios')}
        >
          Envíos
        </div>
        <div
          className={`nav-item ${paginaActual === 'usuarios' ? 'active' : ''}`}
          onClick={() => setPaginaActual('usuarios')}
        >
          Usuarios
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;