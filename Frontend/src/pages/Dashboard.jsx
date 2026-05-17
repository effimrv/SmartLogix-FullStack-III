import { useState, useEffect } from 'react';

function Dashboard() {
  const [stats, setStats] = useState({
    pedidos: 0,
    productos: 0,
    envios: 0,
    usuarios: 0,
    pedidosPendientes: 0,
    stockBajo: 0,
  });
  const [pedidosRecientes, setPedidosRecientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarStats = async () => {
    try {
      const [pedidos, productos, envios, usuarios] = await Promise.all([
        fetch('/api/pedidos').then(r => r.json()),
        fetch('/api/inventario').then(r => r.json()),
        fetch('/api/envios').then(r => r.json()),
        fetch('/api/usuarios').then(r => r.json()),
      ]);

      const pendientes = pedidos.filter(p => p.estadoPedido === 'PENDIENTE').length;
      const stockBajo = productos.filter(p => p.stock <= 10).length;
      const recientes = pedidos.slice(-5).reverse();

      setStats({
        pedidos: pedidos.length,
        productos: productos.length,
        envios: envios.length,
        usuarios: usuarios.length,
        pedidosPendientes: pendientes,
        stockBajo: stockBajo,
      });
      setPedidosRecientes(recientes);
    } catch {
      console.error('Error al cargar stats');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarStats();
    const interval = setInterval(() => {
      void cargarStats();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'ENTREGADO': return 'badge badge-green';
      case 'ENVIADO': return 'badge badge-amber';
      case 'EN_PROCESO': return 'badge badge-blue';
      case 'CANCELADO': return 'badge badge-red';
      default: return 'badge badge-purple';
    }
  };

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
          <div className="card-value">{cargando ? '...' : stats.pedidos}</div>
          <div className="card-sub">{stats.pedidosPendientes} pendientes</div>
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
          <div className="card-value">{cargando ? '...' : stats.productos}</div>
          <div className="card-sub" style={{ color: stats.stockBajo > 0 ? '#A32D2D' : '#AD74C3' }}>
            {stats.stockBajo > 0 ? `⚠️ ${stats.stockBajo} con stock bajo` : 'Stock OK'}
          </div>
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
          <div className="card-value">{cargando ? '...' : stats.envios}</div>
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
          <div className="card-value">{cargando ? '...' : stats.usuarios}</div>
          <div className="card-sub">Registrados</div>
        </div>
      </div>

      <div className="table-section">
        <div className="table-header">
          Pedidos recientes
          <span className="table-count">{pedidosRecientes.length} registros</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>Cargando...</td></tr>
            ) : pedidosRecientes.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No hay pedidos aún</td></tr>
            ) : (
              pedidosRecientes.map((pedido) => (
                <tr key={pedido.pedidoId}>
                  <td>#PED{String(pedido.pedidoId).padStart(5, '0')}</td>
                  <td>{pedido.usuarioId}</td>
                  <td>${pedido.total?.toLocaleString()}</td>
                  <td>{pedido.fechaPedido}</td>
                  <td><span className={getBadgeClass(pedido.estadoPedido)}>{pedido.estadoPedido}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;