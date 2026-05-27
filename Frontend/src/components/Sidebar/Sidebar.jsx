import './Sidebar.css';

function Sidebar({ paginaActual, setPaginaActual, onLogout, usuario }) {
  const iniciales = usuario?.nombre
    ? usuario.nombre.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase()
    : 'U';
  const rol = usuario?.rol === 'ADMIN' ? 'Administrador' : usuario?.rol === 'EMPLEADO' ? 'Empleado' : 'Usuario';
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1" y="8" width="10" height="6" rx="1.5" fill="white"/>
            <rect x="11" y="10" width="6" height="4" rx="1" fill="rgba(255,255,255,0.6)"/>
            <circle cx="4" cy="14" r="1.5" fill="#3A4A2C" stroke="white" strokeWidth="0.8"/>
            <circle cx="13" cy="14" r="1.5" fill="#3A4A2C" stroke="white" strokeWidth="0.8"/>
            <path d="M1 8L4 4h6l2 4" stroke="white" strokeWidth="0.8" fill="none"/>
          </svg>
        </div>
        <div>
          <div className="logo-text">SmartLogix</div>
          <div className="logo-sub">Panel de gestión</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">Principal</div>
        <div
          className={`nav-item ${paginaActual === 'dashboard' ? 'active' : ''}`}
          onClick={() => setPaginaActual('dashboard')}
        >
          <div className="nav-dot">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="0.5" y="0.5" width="3" height="3" rx="0.5" fill="currentColor"/>
              <rect x="4.5" y="0.5" width="3" height="3" rx="0.5" fill="currentColor"/>
              <rect x="0.5" y="4.5" width="3" height="3" rx="0.5" fill="currentColor"/>
              <rect x="4.5" y="4.5" width="3" height="3" rx="0.5" fill="currentColor"/>
            </svg>
          </div>
          Dashboard
        </div>
        <div
          className={`nav-item ${paginaActual === 'pedidos' ? 'active' : ''}`}
          onClick={() => setPaginaActual('pedidos')}
        >
          <div className="nav-dot">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="0.5" y="0.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1"/>
              <path d="M2 3.5h4M2 5.5h2.5" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round"/>
            </svg>
          </div>
          Pedidos
        </div>

        <div className="nav-section">Gestión</div>
        <div
          className={`nav-item ${paginaActual === 'inventario' ? 'active' : ''}`}
          onClick={() => setPaginaActual('inventario')}
        >
          <div className="nav-dot">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="0.5" y="2" width="7" height="5.5" rx="0.8" stroke="currentColor" strokeWidth="1"/>
              <path d="M2.5 2V1.5a1.5 1.5 0 013 0V2" stroke="currentColor" strokeWidth="0.8"/>
            </svg>
          </div>
          Inventario
        </div>
        <div
          className={`nav-item ${paginaActual === 'envios' ? 'active' : ''}`}
          onClick={() => setPaginaActual('envios')}
        >
          <div className="nav-dot">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="0.5" y="3" width="5" height="3.5" rx="0.8" stroke="currentColor" strokeWidth="1"/>
              <rect x="5.5" y="4" width="2" height="2.5" rx="0.5" stroke="currentColor" strokeWidth="0.8"/>
              <circle cx="2" cy="6.5" r="0.8" fill="currentColor"/>
              <circle cx="6" cy="6.5" r="0.8" fill="currentColor"/>
            </svg>
          </div>
          Envíos
        </div>
        <div
          className={`nav-item ${paginaActual === 'usuarios' ? 'active' : ''}`}
          onClick={() => setPaginaActual('usuarios')}
        >
          <div className="nav-dot">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1"/>
              <path d="M1 7c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          Usuarios
        </div>
      </nav>

      <div className="sidebar-bottom">
        <div className="user-card">
          <div className="avatar">{iniciales}</div>
          <div style={{ flex: 1 }}>
            <div className="user-name">{usuario?.nombre ?? 'Usuario'}</div>
            <div className="user-role">{rol}</div>
          </div>
          <button onClick={onLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>⏻</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
