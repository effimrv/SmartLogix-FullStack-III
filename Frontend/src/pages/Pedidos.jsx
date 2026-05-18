import { useState, useEffect } from 'react';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';

function Pedidos() {
  const [filtro, setFiltro] = useState('Todos');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pedidoEditar, setPedidoEditar] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevo, setNuevo] = useState({
    clienteId: '',
    productoId: '',
    cantidad: '',
    total: '',
    estadoPedido: 'PENDIENTE',
    fechaPedido: new Date().toISOString().split('T')[0]
  });
  const [toast, setToast] = useState(null);
  const [confirmar, setConfirmar] = useState(null);

  const API = '/api/pedidos';
  const mostrarToast = (mensaje, tipo = 'success') => setToast({ mensaje, tipo });

  const cargarTodo = async () => {
    try {
      setCargando(true);
      const [resPedidos, resProductos] = await Promise.all([
        fetch('/api/pedidos'),
        fetch('/api/inventario')
      ]);
      setPedidos(await resPedidos.json());
      setProductos(await resProductos.json());
    } catch {
      console.error('Error al cargar datos');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { void cargarTodo(); }, []);

  const getNombreProducto = (id) => {
    const p = productos.find(p => p.productoId === id);
    return p ? p.nombre : `Producto #${id}`;
  };

  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'ENTREGADO': return 'badge badge-green';
      case 'ENVIADO':   return 'badge badge-amber';
      case 'EN_PROCESO':return 'badge badge-blue';
      case 'CANCELADO': return 'badge badge-red';
      default:          return 'badge badge-blue';
    }
  };

  const pedidosFiltrados = filtro === 'Todos'
    ? pedidos
    : pedidos.filter((p) => p.estadoPedido === filtro);

  const abrirModalNuevo = () => {
    setPedidoEditar(null);
    setNuevo({
      clienteId: '',
      productoId: '',
      cantidad: '',
      total: '',
      estadoPedido: 'PENDIENTE',
      fechaPedido: new Date().toISOString().split('T')[0]
    });
    setMostrarModal(true);
  };

  const abrirModalEditar = (pedido) => {
    setPedidoEditar(pedido);
    setNuevo({
      clienteId: pedido.clienteId,
      productoId: pedido.productoId,
      cantidad: pedido.cantidad,
      total: pedido.total,
      estadoPedido: pedido.estadoPedido,
      fechaPedido: pedido.fechaPedido
    });
    setMostrarModal(true);
  };

  const handleProductoChange = (e) => {
    const productoId = e.target.value;
    const producto = productos.find(p => p.productoId === parseInt(productoId));
    setNuevo({
      ...nuevo,
      productoId,
      total: producto && nuevo.cantidad
        ? (producto.precio * nuevo.cantidad).toString()
        : nuevo.total
    });
  };

  const handleCantidadChange = (e) => {
    const cantidad = e.target.value;
    const producto = productos.find(p => p.productoId === parseInt(nuevo.productoId));
    setNuevo({
      ...nuevo,
      cantidad,
      total: producto && cantidad
        ? (producto.precio * cantidad).toString()
        : nuevo.total
    });
  };

  const guardar = async () => {
    if (!nuevo.clienteId || !nuevo.productoId || !nuevo.cantidad || !nuevo.total) {
    mostrarToast('Por favor completa todos los campos obligatorios', 'error');
    return;
    }
    try {
      const url = pedidoEditar ? `${API}/${pedidoEditar.pedidoId}` : API;
      const method = pedidoEditar ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...nuevo,
          clienteId: parseInt(nuevo.clienteId),
          productoId: parseInt(nuevo.productoId),
          cantidad: parseInt(nuevo.cantidad),
          total: parseFloat(nuevo.total)
        })
      });
      if (!res.ok) throw new Error('Error al guardar');
      setMostrarModal(false);
      mostrarToast(pedidoEditar ? 'Pedido actualizado correctamente' : 'Pedido creado correctamente');
      await cargarTodo();
    } catch {
      mostrarToast('Error al guardar el pedido', 'error');
    }
  };

  const eliminar = (id) => {
    setConfirmar({
      mensaje: '¿Estás segura de eliminar este pedido? Esta acción no se puede deshacer.',
      onConfirmar: async () => {
        setConfirmar(null);
        try {
          await fetch(`${API}/${id}`, { method: 'DELETE' });
          mostrarToast('Pedido eliminado correctamente', 'error');
          await cargarTodo();
        } catch {
          mostrarToast('Error al eliminar el pedido', 'error');
        }
      }
    });
  };

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Pedidos</h2>
        <button className="btn-primary" onClick={abrirModalNuevo}>+ Nuevo pedido</button>
      </div>

      <div className="filtros">
        {['Todos', 'PENDIENTE', 'EN_PROCESO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'].map((f) => (
          <button
            key={f}
            className={`filtro-btn ${filtro === f ? 'active' : ''}`}
            onClick={() => setFiltro(f)}
          >{f}</button>
        ))}
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>ID Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando
              ? <tr><td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>Cargando...</td></tr>
              : pedidosFiltrados.length === 0
                ? <tr><td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No hay pedidos</td></tr>
                : pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.pedidoId}>
                    <td>#PED{String(pedido.pedidoId).padStart(5, '0')}</td>
                    <td>#CLI{String(pedido.clienteId).padStart(5, '0')}</td>
                    <td>{getNombreProducto(pedido.productoId)}</td>
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
            }
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
              <label>ID Cliente</label>
              <input
                type="number"
                min="1"
                placeholder="Ej: 1"
                value={nuevo.clienteId}
                onChange={(e) => setNuevo({ ...nuevo, clienteId: e.target.value })}
              />
              <label>Producto</label>
              <select value={nuevo.productoId} onChange={handleProductoChange}>
                <option value="">Seleccionar producto</option>
                {productos.map(p => (
                  <option key={p.productoId} value={p.productoId}>
                    {p.nombre} - ${p.precio?.toLocaleString()}
                  </option>
                ))}
              </select>
              <label>Cantidad</label>
              <input
                type="number"
                min="1"
                placeholder="Cantidad"
                value={nuevo.cantidad}
                onChange={handleCantidadChange}
              />
              <label>Total</label>
              <input
                type="number"
                placeholder="Total"
                value={nuevo.total}
                onChange={(e) => setNuevo({ ...nuevo, total: e.target.value })}
              />
              <label>Estado</label>
              <select value={nuevo.estadoPedido} onChange={(e) => setNuevo({ ...nuevo, estadoPedido: e.target.value })}>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="EN_PROCESO">EN_PROCESO</option>
                <option value="ENVIADO">ENVIADO</option>
                <option value="ENTREGADO">ENTREGADO</option>
                <option value="CANCELADO">CANCELADO</option>
              </select>
              <label>Fecha</label>
              <input
                type="date"
                value={nuevo.fechaPedido}
                onChange={(e) => setNuevo({ ...nuevo, fechaPedido: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={guardar}>{pedidoEditar ? 'Guardar' : 'Agregar'}</button>
            </div>
          </div>
        </div>
      )}

      {confirmar && (
        <ConfirmModal
          mensaje={confirmar.mensaje}
          onConfirmar={confirmar.onConfirmar}
          onCancelar={() => setConfirmar(null)}
        />
      )}
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Pedidos;
