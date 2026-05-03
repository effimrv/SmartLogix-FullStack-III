import { useState, useEffect } from 'react';

function Pedidos() {
  const [filtro, setFiltro] = useState('Todos');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pedidoEditar, setPedidoEditar] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevo, setNuevo] = useState({ usuarioId: '', productoId: '', cantidad: '', total: '', estadoPedido: 'PENDIENTE', fechaPedido: new Date().toISOString().split('T')[0] });

  const API = '/api/pedidos';

  const cargarPedidos = async () => {
    try {
      setCargando(true);
      const res = await fetch(API);
      if (!res.ok) throw new Error('Error al cargar');
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarPedidos();
  }, []);

  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'ENTREGADO': return 'badge badge-green';
      case 'ENVIADO': return 'badge badge-amber';
      case 'EN_PROCESO': return 'badge badge-blue';
      case 'CANCELADO': return 'badge badge-red';
      default: return 'badge badge-blue';
    }
  };

  const pedidosFiltrados = filtro === 'Todos'
    ? pedidos
    : pedidos.filter((p) => p.estadoPedido === filtro);

  const abrirModalNuevo = () => {
    setPedidoEditar(null);
    setNuevo({ usuarioId: '', productoId: '', cantidad: '', total: '', estadoPedido: 'PENDIENTE', fechaPedido: new Date().toISOString().split('T')[0] });
    setMostrarModal(true);
  };

  const abrirModalEditar = (pedido) => {
    setPedidoEditar(pedido);
    setNuevo({ usuarioId: pedido.usuarioId, productoId: pedido.productoId, cantidad: pedido.cantidad, total: pedido.total, estadoPedido: pedido.estadoPedido, fechaPedido: pedido.fechaPedido });
    setMostrarModal(true);
  };

  const guardar = async () => {
    if (!nuevo.usuarioId || !nuevo.productoId || !nuevo.cantidad || !nuevo.total) return;
    try {
      const url = pedidoEditar ? `${API}/${pedidoEditar.pedidoId}` : API;
      const method = pedidoEditar ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nuevo, usuarioId: parseInt(nuevo.usuarioId), productoId: parseInt(nuevo.productoId), cantidad: parseInt(nuevo.cantidad), total: parseFloat(nuevo.total) })
      });
      if (!res.ok) throw new Error('Error al guardar');
      setMostrarModal(false);
      await cargarPedidos();
    } catch (error) {
      console.error('Error al guardar pedido:', error);
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm('¿Estás segura de eliminar este pedido?')) return;
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      await cargarPedidos();
    } catch (error) {
      console.error('Error al eliminar pedido:', error);
    }
  };

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Pedidos</h2>
        <button className="btn-primary" onClick={abrirModalNuevo}>+ Nuevo pedido</button>
      </div>

      <div className="filtros">
        {['Todos', 'PENDIENTE', 'EN_PROCESO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'].map((f) => (
          <button key={f} className={`filtro-btn ${filtro === f ? 'active' : ''}`} onClick={() => setFiltro(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario ID</th>
              <th>Producto ID</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>Cargando...</td></tr>
            ) : pedidosFiltrados.length === 0 ? (
              <tr><td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No hay pedidos</td></tr>
            ) : (
              pedidosFiltrados.map((pedido) => (
                <tr key={pedido.pedidoId}>
                  <td>#{pedido.pedidoId}</td>
                  <td>{pedido.usuarioId}</td>
                  <td>{pedido.productoId}</td>
                  <td>{pedido.cantidad}</td>
                  <td>${pedido.total?.toLocaleString()}</td>
                  <td>{pedido.fechaPedido}</td>
                  <td><span className={getBadgeClass(pedido.estadoPedido)}>{pedido.estadoPedido}</span></td>
                  <td style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn-editar" onClick={() => abrirModalEditar(pedido)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => eliminar(pedido.pedidoId)}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{pedidoEditar ? 'Editar pedido' : 'Nuevo pedido'}</h3>
              <button className="modal-close" onClick={() => setMostrarModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <label>ID Usuario</label>
              <input type="number" placeholder="ID del usuario" value={nuevo.usuarioId} onChange={(e) => setNuevo({ ...nuevo, usuarioId: e.target.value })} />
              <label>ID Producto</label>
              <input type="number" placeholder="ID del producto" value={nuevo.productoId} onChange={(e) => setNuevo({ ...nuevo, productoId: e.target.value })} />
              <label>Cantidad</label>
              <input type="number" placeholder="Cantidad" value={nuevo.cantidad} onChange={(e) => setNuevo({ ...nuevo, cantidad: e.target.value })} />
              <label>Total</label>
              <input type="number" placeholder="Total" value={nuevo.total} onChange={(e) => setNuevo({ ...nuevo, total: e.target.value })} />
              <label>Estado</label>
              <select value={nuevo.estadoPedido} onChange={(e) => setNuevo({ ...nuevo, estadoPedido: e.target.value })}>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="EN_PROCESO">EN_PROCESO</option>
                <option value="ENVIADO">ENVIADO</option>
                <option value="ENTREGADO">ENTREGADO</option>
                <option value="CANCELADO">CANCELADO</option>
              </select>
              <label>Fecha</label>
              <input type="date" value={nuevo.fechaPedido} onChange={(e) => setNuevo({ ...nuevo, fechaPedido: e.target.value })} />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={guardar}>{pedidoEditar ? 'Guardar' : 'Agregar'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pedidos;