import { useState, useEffect } from 'react';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';

function Envios() {
  const [filtro, setFiltro] = useState('Todos');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [envioEditar, setEnvioEditar] = useState(null);
  const [envios, setEnvios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevo, setNuevo] = useState({ pedidoId: '', transportista: 'Chilexpress', direccionDestino: '', ciudad: '', region: '', estadoEnvio: 'PREPARANDO', fechaEstimada: '' });
  const [toast, setToast] = useState(null);
  const [confirmar, setConfirmar] = useState(null);

  const API = '/api/envios';
  const mostrarToast = (mensaje, tipo = 'success') => setToast({ mensaje, tipo });

  const calcularFechaLlegada = (fechaEnvio, transportista) => {
    const dias = { 'Chilexpress': 2, 'Starken': 3, 'Correos Chile': 5, 'Blue Express': 2 };
    const fecha = new Date(fechaEnvio);
    fecha.setDate(fecha.getDate() + (dias[transportista] || 3));
    return fecha.toISOString().split('T')[0];
  };

  const cargarEnvios = async () => {
    try {
      setCargando(true);
      const res = await fetch(API);
      if (!res.ok) throw new Error('Error al cargar');
      setEnvios(await res.json());
    } catch { console.error('Error al cargar envíos'); }
    finally { setCargando(false); }
  };

  useEffect(() => { void cargarEnvios(); }, []);

  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'ENTREGADO': return 'badge badge-green';
      case 'EN_CAMINO': return 'badge badge-amber';
      case 'FALLIDO': return 'badge badge-red';
      default: return 'badge badge-blue';
    }
  };

  const enviosFiltrados = filtro === 'Todos' ? envios : envios.filter((e) => e.estadoEnvio === filtro);

  const abrirModalNuevo = () => {
    setEnvioEditar(null);
    setNuevo({ pedidoId: '', transportista: 'Chilexpress', direccionDestino: '', ciudad: '', region: '', estadoEnvio: 'PREPARANDO', fechaEstimada: '' });
    setMostrarModal(true);
  };

  const abrirModalEditar = (envio) => {
    setEnvioEditar(envio);
    setNuevo({ pedidoId: envio.pedidoId, transportista: envio.transportista, direccionDestino: envio.direccionDestino, ciudad: envio.ciudad, region: envio.region, estadoEnvio: envio.estadoEnvio, fechaEstimada: envio.fechaEstimada });
    setMostrarModal(true);
  };

  const guardar = async () => {
    if (!nuevo.pedidoId || !nuevo.direccionDestino || !nuevo.fechaEstimada) return;
    try {
      const url = envioEditar ? `${API}/${envioEditar.envioId}` : API;
      const method = envioEditar ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...nuevo, pedidoId: parseInt(nuevo.pedidoId) }) });
      if (!res.ok) throw new Error('Error al guardar');
      setMostrarModal(false);
      mostrarToast(envioEditar ? 'Envío actualizado correctamente' : 'Envío creado correctamente');
      await cargarEnvios();
    } catch { mostrarToast('Error al guardar el envío', 'error'); }
  };

  const eliminar = (id) => {
    setConfirmar({
      mensaje: '¿Estás segura de eliminar este envío? Esta acción no se puede deshacer.',
      onConfirmar: async () => {
        setConfirmar(null);
        try {
          await fetch(`${API}/${id}`, { method: 'DELETE' });
          mostrarToast('Envío eliminado correctamente', 'error');
          await cargarEnvios();
        } catch { mostrarToast('Error al eliminar el envío', 'error'); }
      }
    });
  };

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Envíos</h2>
        <button className="btn-primary" onClick={abrirModalNuevo}>+ Nuevo envío</button>
      </div>
      <div className="filtros">
        {['Todos', 'PREPARANDO', 'EN_CAMINO', 'ENTREGADO', 'FALLIDO'].map((f) => (
          <button key={f} className={`filtro-btn ${filtro === f ? 'active' : ''}`} onClick={() => setFiltro(f)}>{f}</button>
        ))}
      </div>
      <div className="table-section">
        <table>
          <thead><tr><th>ID</th><th>Pedido ID</th><th>Transportista</th><th>Dirección</th><th>Ciudad</th><th>Fecha estimada</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {cargando ? <tr><td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>Cargando...</td></tr>
            : enviosFiltrados.length === 0 ? <tr><td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No hay envíos</td></tr>
            : enviosFiltrados.map((envio) => (
              <tr key={envio.envioId}>
                <td>#{envio.envioId}</td>
                <td>{envio.pedidoId}</td>
                <td>{envio.transportista}</td>
                <td>{envio.direccionDestino}</td>
                <td>{envio.ciudad}</td>
                <td>{envio.fechaEstimada}</td>
                <td><span className={getBadgeClass(envio.estadoEnvio)}>{envio.estadoEnvio}</span></td>
                <td style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn-editar" onClick={() => abrirModalEditar(envio)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminar(envio.envioId)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{envioEditar ? 'Editar envío' : 'Nuevo envío'}</h3>
              <button className="modal-close" onClick={() => setMostrarModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <label>ID Pedido</label>
              <input type="number" placeholder="ID del pedido" value={nuevo.pedidoId} onChange={(e) => setNuevo({ ...nuevo, pedidoId: e.target.value })} />
              <label>Transportista</label>
              <select value={nuevo.transportista} onChange={(e) => setNuevo({ ...nuevo, transportista: e.target.value })}>
                <option>Chilexpress</option>
                <option>Starken</option>
                <option>Correos Chile</option>
                <option>Blue Express</option>
              </select>
              <label>Dirección destino</label>
              <input type="text" placeholder="Dirección de entrega" value={nuevo.direccionDestino} onChange={(e) => setNuevo({ ...nuevo, direccionDestino: e.target.value })} />
              <label>Ciudad</label>
              <input type="text" placeholder="Ciudad" value={nuevo.ciudad} onChange={(e) => setNuevo({ ...nuevo, ciudad: e.target.value })} />
              <label>Región</label>
              <input type="text" placeholder="Región" value={nuevo.region} onChange={(e) => setNuevo({ ...nuevo, region: e.target.value })} />
              <label>Fecha estimada</label>
              <input type="date" value={nuevo.fechaEstimada} onChange={(e) => setNuevo({ ...nuevo, fechaEstimada: e.target.value })} />
              {nuevo.fechaEstimada && (
                <label style={{ fontSize: '11px', color: '#888' }}>Llegada estimada: {calcularFechaLlegada(nuevo.fechaEstimada, nuevo.transportista)}</label>
              )}
              <label>Estado</label>
              <select value={nuevo.estadoEnvio} onChange={(e) => setNuevo({ ...nuevo, estadoEnvio: e.target.value })}>
                <option value="PREPARANDO">PREPARANDO</option>
                <option value="EN_CAMINO">EN_CAMINO</option>
                <option value="ENTREGADO">ENTREGADO</option>
                <option value="FALLIDO">FALLIDO</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={guardar}>{envioEditar ? 'Guardar' : 'Agregar'}</button>
            </div>
          </div>
        </div>
      )}
      {confirmar && <ConfirmModal mensaje={confirmar.mensaje} onConfirmar={confirmar.onConfirmar} onCancelar={() => setConfirmar(null)} />}
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Envios;
