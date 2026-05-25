import { useState, useEffect } from 'react';
import './Tienda.css';
import Toast from '../../components/Toast/Toast';
import { apiFetch } from '../../utils/apiFetch';

function Tienda({ usuario, onLogout }) {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState({});
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);
  const [toast, setToast] = useState(null);

  const mostrarToast = (mensaje, tipo = 'success') => setToast({ mensaje, tipo });

  useEffect(() => {
    apiFetch('/api/inventario')
      .then(r => r.json())
      .then(data => { setProductos(data); setCargando(false); })
      .catch(() => setCargando(false));
  }, []);

  const cambiarCantidad = (productoId, delta) => {
    setCarrito(prev => {
      const actual = prev[productoId] || 0;
      const nuevo = Math.max(0, actual + delta);
      if (nuevo === 0) {
        const resto = { ...prev };
        delete resto[productoId];
        return resto;
      }
      return { ...prev, [productoId]: nuevo };
    });
  };

  const totalItems = Object.values(carrito).reduce((a, b) => a + b, 0);
  const totalPrecio = productos.reduce((sum, p) => {
    return sum + (carrito[p.productoId] || 0) * p.precio;
  }, 0);

  const realizarPedido = async () => {
    const detalles = Object.entries(carrito).map(([productoId, cantidad]) => {
      const prod = productos.find(p => String(p.productoId) === productoId);
      return { productoId, cantidad, precioUnitario: prod.precio };
    });

    setProcesando(true);
    try {
      const res = await apiFetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteId: usuario.usuarioId,
          fechaPedido: new Date().toISOString().split('T')[0],
          detalles
        })
      });
      if (!res.ok) throw new Error();
      const pedido = await res.json();
      setCarrito({});
      setPedidoConfirmado(pedido);
    } catch {
      mostrarToast('Error al procesar el pedido. Verifica el stock disponible.', 'error');
    } finally {
      setProcesando(false);
    }
  };

  if (pedidoConfirmado) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', background: '#E8F5E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '28px' }}>✓</div>
          <h2 style={{ margin: '0 0 8px', color: 'var(--text-primary)' }}>¡Pedido confirmado!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 20px' }}>
            Tu pedido <strong style={{ color: 'var(--primary)' }}>#PED{String(pedidoConfirmado.pedidoId).padStart(5, '0')}</strong> fue registrado correctamente.
          </p>
          <div style={{ background: 'var(--bg-primary)', borderRadius: '10px', padding: '14px 16px', marginBottom: '24px', textAlign: 'left' }}>
            {pedidoConfirmado.detalles?.map((d, i) => {
              const prod = productos.find(p => p.productoId === d.productoId);
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', borderBottom: i < pedidoConfirmado.detalles.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{prod?.nombre ?? `Producto #${d.productoId}`} × {d.cantidad}</span>
                  <span style={{ fontWeight: 600 }}>${(d.precioUnitario * d.cantidad).toLocaleString('es-CL')}</span>
                </div>
              );
            })}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--primary)', paddingTop: '8px', marginTop: '4px' }}>
              <span>Total</span>
              <span>${pedidoConfirmado.total?.toLocaleString('es-CL')}</span>
            </div>
          </div>
          <button
            onClick={() => setPedidoConfirmado(null)}
            style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 28px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', width: '100%' }}
          >
            Seguir comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ background: 'var(--topbar-bg)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="8" width="10" height="6" rx="1.5" fill="white"/>
              <rect x="11" y="10" width="6" height="4" rx="1" fill="rgba(255,255,255,0.6)"/>
              <circle cx="4" cy="14" r="1.5" fill="#3A4A2C" stroke="white" strokeWidth="0.8"/>
              <circle cx="13" cy="14" r="1.5" fill="#3A4A2C" stroke="white" strokeWidth="0.8"/>
              <path d="M1 8L4 4h6l2 4" stroke="white" strokeWidth="0.8" fill="none"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '15px' }}>SmartLogix</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>· Tienda</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Hola, <strong>{usuario.nombre}</strong></span>
          <button
            onClick={onLogout}
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)' }}
          >
            Salir
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px 120px' }}>
        <h2 style={{ margin: '0 0 4px', color: 'var(--text-primary)', fontSize: '20px' }}>Catálogo</h2>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 28px', fontSize: '13px' }}>
          Selecciona los productos y cantidades que deseas pedir
        </p>

        {cargando ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontSize: '14px' }}>Cargando productos...</div>
        ) : productos.filter(p => p.stock > 0).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', fontSize: '14px' }}>No hay productos disponibles en este momento.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
            {productos.filter(p => p.stock > 0).map(prod => {
              const qty = carrito[prod.productoId] || 0;
              return (
                <div
                  key={prod.productoId}
                  style={{
                    background: 'var(--bg-card)',
                    border: `1.5px solid ${qty > 0 ? 'var(--primary)' : 'var(--border)'}`,
                    borderRadius: '12px', padding: '16px',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    boxShadow: qty > 0 ? '0 2px 12px rgba(74,94,58,0.12)' : 'none'
                  }}
                >
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px', marginBottom: '4px', lineHeight: '1.3' }}>{prod.nombre}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    {prod.stock <= 5
                      ? <span style={{ color: '#9E2020' }}>Solo {prod.stock} en stock</span>
                      : `Stock: ${prod.stock}`
                    }
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '17px', marginBottom: '14px' }}>
                    ${prod.precio.toLocaleString('es-CL')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => cambiarCantidad(prod.productoId, -1)}
                      disabled={qty === 0}
                      style={{
                        width: '28px', height: '28px', border: '1px solid var(--border)', borderRadius: '6px',
                        background: 'var(--bg-primary)', cursor: qty === 0 ? 'not-allowed' : 'pointer',
                        opacity: qty === 0 ? 0.35 : 1, fontWeight: 700, fontSize: '16px',
                        color: 'var(--text-secondary)', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >−</button>
                    <span style={{
                      minWidth: '28px', textAlign: 'center',
                      fontWeight: qty > 0 ? 700 : 400,
                      color: qty > 0 ? 'var(--primary)' : 'var(--text-muted)',
                      fontSize: '15px'
                    }}>{qty}</span>
                    <button
                      onClick={() => cambiarCantidad(prod.productoId, 1)}
                      disabled={qty >= prod.stock}
                      style={{
                        width: '28px', height: '28px', border: '1px solid var(--border)', borderRadius: '6px',
                        background: 'var(--bg-primary)', cursor: qty >= prod.stock ? 'not-allowed' : 'pointer',
                        opacity: qty >= prod.stock ? 0.35 : 1, fontWeight: 700, fontSize: '16px',
                        color: 'var(--text-secondary)', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                    >+</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {totalItems > 0 && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--bg-card)', border: '1.5px solid var(--primary)',
          borderRadius: '14px', padding: '14px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '32px', boxShadow: '0 8px 32px rgba(74,94,58,0.18)',
          minWidth: '340px', maxWidth: '560px', width: '90%', zIndex: 20
        }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {totalItems} producto{totalItems !== 1 ? 's' : ''} seleccionado{totalItems !== 1 ? 's' : ''}
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.2 }}>
              ${totalPrecio.toLocaleString('es-CL')}
            </div>
          </div>
          <button
            onClick={realizarPedido}
            disabled={procesando}
            style={{
              background: 'var(--primary)', color: 'white', border: 'none',
              borderRadius: '8px', padding: '10px 22px', fontWeight: 600,
              fontSize: '14px', cursor: procesando ? 'not-allowed' : 'pointer',
              opacity: procesando ? 0.7 : 1, whiteSpace: 'nowrap'
            }}
          >
            {procesando ? 'Procesando...' : 'Realizar pedido'}
          </button>
        </div>
      )}

      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Tienda;
