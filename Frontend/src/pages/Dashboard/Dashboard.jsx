import { useState, useEffect } from 'react';
import './Dashboard.css';
import { apiFetch } from '../../utils/apiFetch';

const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

const formatMonto = (v) =>
  v >= 1000000 ? `$${(v/1000000).toFixed(1)}M`
  : v >= 1000  ? `$${(v/1000).toFixed(0)}k`
  : `$${v.toFixed(0)}`;

function GraficoGanancias({ gananciasPorMes, cargando }) {
  const [tooltipData, setTooltipData] = useState(null);
  if (!gananciasPorMes || gananciasPorMes.length === 0) return null;

  const W=580, H=180, padL=56, padR=16, padT=16, padB=36;
  const chartW = W-padL-padR, chartH = H-padT-padB;
  const maxVal = Math.max(...gananciasPorMes.map(d=>d.total), 1);
  const ticks = 4;

  const puntos = gananciasPorMes.map((d,i) => ({
    x: padL + (i/(gananciasPorMes.length-1||1))*chartW,
    y: padT + chartH - (d.total/maxVal)*chartH,
    total: d.total, mes: d.mes,
  }));

  const pathLine = puntos.map((p,i) => `${i===0?'M':'L'}${p.x},${p.y}`).join(' ');
  const last = puntos[puntos.length-1];
  const first = puntos[0];
  const pathArea = puntos.length > 1
    ? `${pathLine} L${last.x},${padT+chartH} L${first.x},${padT+chartH} Z`
    : '';

  const totalGanancias = gananciasPorMes.reduce((a,b) => a+b.total, 0);
  const mejorMes = gananciasPorMes.reduce((a,b) => b.total>a.total ? b : a, gananciasPorMes[0]);

  return (
    <div className="table-section" style={{marginTop:'20px'}}>
      <div className="table-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
        <span>Ganancias por mes<span className="table-count" style={{marginLeft:'10px'}}>Últimos 6 meses</span></span>
        <div style={{display:'flex',gap:'20px',fontSize:'13px'}}>
          <span style={{color:'var(--text-muted)'}}>Total: <strong style={{color:'var(--primary)'}}>{formatMonto(totalGanancias)}</strong></span>
          <span style={{color:'var(--text-muted)'}}>Mejor mes: <strong style={{color:'#7AA060'}}>{mejorMes.mes} ({formatMonto(mejorMes.total)})</strong></span>
        </div>
      </div>
      <div style={{padding:'12px 8px 4px',position:'relative',overflowX:'auto'}}>
        {cargando ? (
          <div style={{textAlign:'center',padding:'40px',color:'var(--text-muted)',fontSize:'14px'}}>Cargando gráfico...</div>
        ) : (
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{display:'block',maxWidth:W}} onMouseLeave={()=>setTooltipData(null)}>
            <defs>
              <linearGradient id="gradGanancias" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#4A5E3A" stopOpacity="0.30"/>
                <stop offset="100%" stopColor="#4A5E3A" stopOpacity="0.02"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {Array.from({length:ticks+1},(_,i) => {
              const y = padT+(i/ticks)*chartH;
              const val = maxVal*(1-i/ticks);
              return (
                <g key={i}>
                  <line x1={padL} y1={y} x2={W-padR} y2={y} stroke="var(--border)" strokeWidth="0.8" strokeDasharray={i===ticks?'0':'4 4'} opacity="0.8"/>
                  <text x={padL-6} y={y+4} textAnchor="end" fontSize="10" fill="var(--text-muted)">{formatMonto(val)}</text>
                </g>
              );
            })}
            {puntos.length>1 && <path d={pathArea} fill="url(#gradGanancias)"/>}
            {puntos.length>1 && <path d={pathLine} fill="none" stroke="#4A5E3A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)"/>}
            {puntos.map((p,i) => (
              <g key={i}>
                <rect x={p.x-(chartW/(puntos.length*2))} y={padT} width={chartW/puntos.length} height={chartH} fill="transparent" style={{cursor:'pointer'}} onMouseEnter={()=>setTooltipData({x:p.x,y:p.y,mes:p.mes,total:p.total})}/>
                <circle cx={p.x} cy={p.y} r="4.5" fill={tooltipData?.mes===p.mes?'#7AA060':'#4A5E3A'} stroke="white" strokeWidth="2" filter={tooltipData?.mes===p.mes?'url(#glow)':undefined}/>
                <text x={p.x} y={padT+chartH+20} textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontWeight={tooltipData?.mes===p.mes?'600':'400'}>{p.mes}</text>
              </g>
            ))}
            {tooltipData && (()=>{
              const tx = Math.min(Math.max(tooltipData.x-44, 4), W-94);
              const ty = Math.max(tooltipData.y-48, 4);
              return (
                <g>
                  <rect x={tx} y={ty} width="88" height="34" rx="6" fill="#3A4A2C" opacity="0.92"/>
                  <text x={tx+44} y={ty+13} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.7)">{tooltipData.mes}</text>
                  <text x={tx+44} y={ty+27} textAnchor="middle" fontSize="12" fill="white" fontWeight="600">{formatMonto(tooltipData.total)}</text>
                </g>
              );
            })()}
          </svg>
        )}
        {!cargando && gananciasPorMes.every(d=>d.total===0) && (
          <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',color:'var(--text-muted)',pointerEvents:'none'}}>
            Sin datos de ganancias en los últimos 6 meses
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({
    pedidos: 0, productos: 0, envios: 0, usuarios: 0,
    pedidosPendientes: 0, stockBajo: 0,
  });
  const [pedidosRecientes, setPedidosRecientes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [gananciasPorMes, setGananciasPorMes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const getNombreCliente = (id) => {
    const c = clientes.find(c => Number(c.usuarioId) === Number(id));
    return c ? c.nombre : `Cliente #${id}`;
  };

  const calcularGananciasPorMes = (pedidos) => {
    const ahora = new Date();
    const hace6Meses = new Date(ahora.getFullYear(), ahora.getMonth()-5, 1);
    const mapa = {};
    for (let i=0; i<6; i++) {
      const d = new Date(hace6Meses.getFullYear(), hace6Meses.getMonth()+i, 1);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      mapa[key] = { mes: MESES[d.getMonth()], total: 0 };
    }
    pedidos.forEach((p) => {
      if (!p.fechaPedido || !p.total) return;
      const fecha = new Date(p.fechaPedido);
      const key = `${fecha.getFullYear()}-${fecha.getMonth()}`;
      if (mapa[key]) mapa[key].total += p.total;
    });
    return Object.values(mapa);
  };

  useEffect(() => {
    const cargarStats = async () => {
      try {
        const [pedidos, productos, envios, usuarios, clientesData] = await Promise.all([
          apiFetch('/api/pedidos').then(r=>r.json()),
          apiFetch('/api/inventario').then(r=>r.json()),
          apiFetch('/api/envios').then(r=>r.json()),
          apiFetch('/api/usuarios').then(r=>r.json()),
          apiFetch('/api/usuarios/rol/CLIENTE').then(r=>r.json()),
        ]);
        const pendientes = pedidos.filter(p=>p.estadoPedido==='PENDIENTE').length;
        const stockBajo = productos.filter(p=>p.stock<=10).length;
        setStats({ pedidos:pedidos.length, productos:productos.length, envios:envios.length, usuarios:usuarios.length, pedidosPendientes:pendientes, stockBajo });
        setClientes(clientesData);
        setPedidosRecientes(pedidos.slice(-5).reverse());
        setGananciasPorMes(calcularGananciasPorMes(pedidos));
      } catch {
        console.error('Error al cargar stats');
      } finally {
        setCargando(false);
      }
    };
    cargarStats();
    const interval = setInterval(cargarStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const getBadgeClass = (estado) => {
    switch(estado) {
      case 'ENTREGADO':  return 'badge badge-green';
      case 'ENVIADO':    return 'badge badge-amber';
      case 'EN_PROCESO': return 'badge badge-blue';
      case 'CANCELADO':  return 'badge badge-red';
      default:           return 'badge badge-purple';
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
          <rect x="43" y="30" width="22" height="16" rx="2" fill="rgba(255,255,255,0.10)"/>
          <circle cx="14" cy="46" r="4.5" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <circle cx="55" cy="46" r="4.5" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
          <path d="M5 30L13 19h22l8 11" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none"/>
          <rect x="16" y="10" width="14" height="12" rx="2" fill="rgba(184,212,168,0.5)"/>
        </svg>
      </div>

      <div className="cards">
        <div className="card">
          <div className="card-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="4" width="14" height="11" rx="1.5" stroke="#4A5E3A" strokeWidth="1.2"/>
              <path d="M6 8h6M6 11h4" stroke="#4A5E3A" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="card-label">Pedidos</div>
          <div className="card-value">{cargando ? '...' : stats.pedidos}</div>
          <div className="card-sub">{stats.pedidosPendientes} pendientes</div>
        </div>
        <div className="card">
          <div className="card-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="5" width="14" height="10" rx="1.5" stroke="#4A5E3A" strokeWidth="1.2"/>
              <path d="M6 5V4a3 3 0 016 0v1" stroke="#4A5E3A" strokeWidth="1.2"/>
              <circle cx="9" cy="10" r="1.5" fill="#4A5E3A"/>
            </svg>
          </div>
          <div className="card-label">Productos</div>
          <div className="card-value">{cargando ? '...' : stats.productos}</div>
          <div className="card-sub" style={{color: stats.stockBajo>0 ? '#9E2020' : 'var(--text-muted)'}}>
            {stats.stockBajo>0 ? `⚠ ${stats.stockBajo} con stock bajo` : 'Stock OK'}
          </div>
        </div>
        <div className="card">
          <div className="card-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="7" width="11" height="7" rx="1.5" stroke="#4A5E3A" strokeWidth="1.2"/>
              <rect x="12" y="9" width="5" height="5" rx="1" stroke="#4A5E3A" strokeWidth="1.2"/>
              <circle cx="4" cy="14" r="1.2" fill="#4A5E3A"/>
              <circle cx="13" cy="14" r="1.2" fill="#4A5E3A"/>
            </svg>
          </div>
          <div className="card-label">Envíos</div>
          <div className="card-value">{cargando ? '...' : stats.envios}</div>
          <div className="card-sub">Total registrados</div>
        </div>
        <div className="card">
          <div className="card-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="3" stroke="#4A5E3A" strokeWidth="1.2"/>
              <path d="M3 15c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#4A5E3A" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="card-label">Usuarios</div>
          <div className="card-value">{cargando ? '...' : stats.usuarios}</div>
          <div className="card-sub">Registrados</div>
        </div>
      </div>

      <GraficoGanancias gananciasPorMes={gananciasPorMes} cargando={cargando}/>

      <div className="table-section" style={{marginTop:'20px'}}>
        <div className="table-header">
          Pedidos recientes
          <span className="table-count">{pedidosRecientes.length} registros</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Cliente</th><th>Total</th><th>Fecha</th><th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr><td colSpan="5" style={{textAlign:'center',padding:'20px',color:'var(--text-muted)'}}>Cargando...</td></tr>
            ) : pedidosRecientes.length===0 ? (
              <tr><td colSpan="5" style={{textAlign:'center',padding:'20px',color:'var(--text-muted)'}}>No hay pedidos aún</td></tr>
            ) : (
              pedidosRecientes.map((pedido) => (
                <tr key={pedido.pedidoId}>
                  <td style={{fontWeight:600}}>#PED{String(pedido.pedidoId).padStart(5,'0')}</td>
                  <td>{getNombreCliente(pedido.clienteId)}</td>
                  <td style={{fontWeight:600}}>${pedido.total?.toLocaleString('es-CL')}</td>
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
