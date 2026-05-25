import { useState, useEffect } from 'react';
import './Pedidos.css';
import Toast from '../../components/Toast/Toast';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

function Pedidos() {
  const [filtro, setFiltro] = useState('Todos');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pedidoEditar, setPedidoEditar] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [estadoEditar, setEstadoEditar] = useState('');
  const [fechaEditar, setFechaEditar] = useState('');

  const [toast, setToast] = useState(null);
  const [confirmar, setConfirmar] = useState(null);

  const API = '/api/pedidos';
  const mostrarToast = (mensaje, tipo = 'success') => setToast({ mensaje, tipo });

  const cargarTodo = async () => {
    try {
      setCargando(true);
      const [resPedidos, resProductos, resClientes] = await Promise.all([
        fetch('/api/pedidos'),
        fetch('/api/inventario'),
        fetch('/api/usuarios/rol/CLIENTE')
      ]);
      setPedidos(await resPedidos.json());
      setProductos(await resProductos.json());
      setClientes(await resClientes.json());
    } catch { console.error('Error al cargar datos'); }
    finally { setCargando(false); }
  };

  useEffect(() => { void cargarTodo(); }, []);

  const getCliente = (id) => clientes.find(c => c.usuarioId === id);
  const getNombreCliente = (id) => {
    const c = getCliente(id);
    return c ? c.nombre : `ID ${id}`;
  };

  const getNombreProducto = (id) => {
    const p = productos.find(p => p.productoId === id);
    return p ? p.nombre : `Producto #${id}`;
  };

  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'ENTREGADO':  return 'badge badge-green';
      case 'ENVIADO':    return 'badge badge-amber';
      case 'EN_PROCESO': return 'badge badge-blue';
      case 'CANCELADO':  return 'badge badge-red';
      default:           return 'badge badge-blue';
    }
  };

  const totalUnidades = (detalles) =>
    detalles?.reduce((sum, d) => sum + (d.cantidad || 0), 0) || 0;

  const resumenProductos = (detalles) => {
    if (!detalles || detalles.length === 0) return '—';
    const primero = `${getNombreProducto(detalles[0].productoId)} ×${detalles[0].cantidad}`;
    return detalles.length > 1 ? `${primero} (+${detalles.length - 1} más)` : primero;
  };

  const pedidosFiltrados = filtro === 'Todos'
    ? pedidos
    : pedidos.filter(p => p.estadoPedido === filtro);

  const abrirModalEditar = (pedido) => {
    setPedidoEditar(pedido);
    setEstadoEditar(pedido.estadoPedido);
    setFechaEditar(pedido.fechaPedido);
    setMostrarModal(true);
  };

  const guardar = async () => {
    try {
      const res = await fetch(`${API}/${pedidoEditar.pedidoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estadoPedido: estadoEditar, fechaPedido: fechaEditar })
      });
      if (!res.ok) throw new Error();
      setMostrarModal(false);
      mostrarToast('Pedido actualizado correctamente');
      await cargarTodo();
    } catch { mostrarToast('Error al actualizar el pedido', 'error'); }
  };

  const eliminar = (id) => {
    setConfirmar({
      mensaje: '¿Estás seguro de eliminar este pedido? Esta acción no se puede deshacer.',
      onConfirmar: async () => {
        setConfirmar(null);
        try {
          await fetch(`${API}/${id}`, { method: 'DELETE' });
          mostrarToast('Pedido eliminado', 'error');
          await cargarTodo();
        } catch { mostrarToast('Error al eliminar el pedido', 'error'); }
      }
    });
  };

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Pedidos</h2>
      </div>

      <div className="filtros">
        {['Todos', 'PENDIENTE', 'EN_PROCESO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'].map(f => (
          <button key={f} className={`filtro-btn ${filtro === f ? 'active' : ''}`} onClick={() => setFiltro(f)}>{f}</button>
        ))}
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando
              ? <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Cargando...</td></tr>
              : pedidosFiltrados.length === 0
                ? <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No hay pedidos</td></tr>
                : pedidosFiltrados.map(pedido => (
                  <tr key={pedido.pedidoId}>
                    <td>{pedido.pedidoId}</td>
                    <td>
                      <div>{getNombreCliente(pedido.clienteId)}</div>
                      {getCliente(pedido.clienteId)?.rut && (
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {getCliente(pedido.clienteId).rut}
                        </div>
                      )}
                    </td>
                    <td>
                      <div>{resumenProductos(pedido.detalles)}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {totalUnidades(pedido.detalles)} unid. en total
                      </div>
                    </td>
                    <td>${pedido.total?.toLocaleString('es-CL')}</td>
                    <td>{pedido.fechaPedido}</td>
                    <td><span className={getBadgeClass(pedido.estadoPedido)}>{pedido.estadoPedido}</span></td>
                    <td style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn-editar" onClick={() => abrirModalEditar(pedido)}>Editar</button>
                      <button className="btn-eliminar" onClick={() => eliminar(pedido.pedidoId)}>Eliminar</button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {mostrarModal && pedidoEditar && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3>Editar {pedidoEditar.pedidoId}</h3>
              <button className="modal-close" onClick={() => setMostrarModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '12px', padding: '10px 14px', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '2px' }}>Cliente</div>
                <div style={{ fontWeight: 600 }}>{getNombreCliente(pedidoEditar.clienteId)}</div>
                {getCliente(pedidoEditar.clienteId)?.rut && (
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    RUT {getCliente(pedidoEditar.clienteId).rut}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>Detalle del pedido</div>
                {pedidoEditar.detalles?.map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
                    <span>{getNombreProducto(d.productoId)} × {d.cantidad}</span>
                    <span style={{ fontWeight: 600 }}>${(d.precioUnitario * d.cantidad).toLocaleString('es-CL')}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 0', fontWeight: 700, color: 'var(--primary)' }}>
                  <span>Total</span>
                  <span>${pedidoEditar.total?.toLocaleString('es-CL')}</span>
                </div>
              </div>

              <label>Estado</label>
              <select value={estadoEditar} onChange={e => setEstadoEditar(e.target.value)}>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="EN_PROCESO">EN_PROCESO</option>
                <option value="ENVIADO">ENVIADO</option>
                <option value="ENTREGADO">ENTREGADO</option>
                <option value="CANCELADO">CANCELADO</option>
              </select>
              <label>Fecha</label>
              <input type="date" value={fechaEditar} onChange={e => setFechaEditar(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={guardar}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      {confirmar && <ConfirmModal mensaje={confirmar.mensaje} onConfirmar={confirmar.onConfirmar} onCancelar={() => setConfirmar(null)} />}
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Pedidos;
