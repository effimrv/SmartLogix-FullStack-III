import { useState, useEffect } from 'react';

function Dashboard() {
  const [stats, setStats] = useState({
    pedidos: 0,
    productos: 0,
    envios: 0,
    usuarios: 0
  });

  const cargarStats = async () => {
    try {
      const [pedidos, productos, envios, usuarios] = await Promise.all([
        fetch('/api/pedidos').then(r => r.json()),
        fetch('/api/inventario').then(r => r.json()),
        fetch('/api/envios').then(r => r.json()),
        fetch('/api/usuarios').then(r => r.json()),
      ]);
      setStats({
        pedidos: pedidos.length,
        productos: productos.length,
        envios: envios.length,
        usuarios: usuarios.length
      });
    } catch {
      console.error('Error al cargar stats');
    }
  };

  useEffect(() => {
    void cargarStats();
  }, []);

  return (
    <div className="content">
      <div className="banner">
        <div className="banner-text">
          <h3>Gestión logística inteligente</h3>
          <p>Administra pedidos, inventario y envíos desde un solo lugar</p>
        </div>
        <svg width="90" height="55" viewBox="0 0 90 55" fill="none">
          <rect x="5" y="22" width="38" height="24" rx="3" fill="rgba(255,255,255,0.15)"/>
          <rect x="43" y="30" width="22" height="16" rx="2" fill="rgba(255,255,255,0.1)"/>
          <circle cx="14" cy="46" r="4.5" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <circle cx="55" cy="46" r="4.5" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <path d="M5 30L13 19h22l8 11" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none"/>
          <rect x="16" y="10" width="14" height="12" rx="2" fill="rgba(173,116,195,0.5)"/>
          <path d="M16 15h14M23 10v12" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
          <circle cx="75" cy="15" r="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          <path d="M71 15h8M75 11v8" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        </svg>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="11" rx="1.5" stroke="#522566" strokeWidth="1.2"/>
              <path d="M6 8h6M6 11h4" stroke="#522566" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="card-label">Pedidos</div>
          <div className="card-value">{stats.pedidos}</div>
          <div className="card-sub">Total registrados</div>
        </div>
        <div className="card">
          <div className="card-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="5" width="14" height="10" rx="1.5" stroke="#7A3A8E" strokeWidth="1.2"/>
              <path d="M6 5V4a3 3 0 016 0v1" stroke="#7A3A8E" strokeWidth="1.2"/>
              <circle cx="9" cy="10" r="1.5" fill="#7A3A8E"/>
            </svg>
          </div>
          <div className="card-label">Productos</div>
          <div className="card-value">{stats.productos}</div>
          <div className="card-sub">En inventario</div>
        </div>
        <div className="card">
          <div className="card-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="7" width="11" height="7" rx="1.5" stroke="#AD74C3" strokeWidth="1.2"/>
              <rect x="12" y="9" width="5" height="5" rx="1" stroke="#AD74C3" strokeWidth="1.2"/>
              <circle cx="4" cy="14" r="1.2" fill="#AD74C3"/>
              <circle cx="13" cy="14" r="1.2" fill="#AD74C3"/>
            </svg>
          </div>
          <div className="card-label">Envíos</div>
          <div className="card-value">{stats.envios}</div>
          <div className="card-sub">Total registrados</div>
        </div>
        <div className="card">
          <div className="card-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="3" stroke="#522566" strokeWidth="1.2"/>
              <path d="M3 15c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#522566" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="card-label">Usuarios</div>
          <div className="card-value">{stats.usuarios}</div>
          <div className="card-sub">Registrados</div>
        </div>
      </div>

      <div className="table-section">
        <div className="table-header">
          Resumen del sistema
          <span className="table-count">4 módulos</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Módulo</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pedidos</td>
              <td>{stats.pedidos}</td>
              <td><span className="badge badge-green">Activo</span></td>
            </tr>
            <tr>
              <td>Inventario</td>
              <td>{stats.productos}</td>
              <td><span className="badge badge-green">Activo</span></td>
            </tr>
            <tr>
              <td>Envíos</td>
              <td>{stats.envios}</td>
              <td><span className="badge badge-green">Activo</span></td>
            </tr>
            <tr>
              <td>Usuarios</td>
              <td>{stats.usuarios}</td>
              <td><span className="badge badge-green">Activo</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;