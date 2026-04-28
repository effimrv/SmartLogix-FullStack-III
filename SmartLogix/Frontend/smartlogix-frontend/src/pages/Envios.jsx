import { useState } from 'react';

function Envios() {
  const [filtro, setFiltro] = useState('Todos');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [envioEditar, setEnvioEditar] = useState(null);
  const [envios, setEnvios] = useState([
    { id: '#E001', pedido: '#001', cliente: 'Aracely Escobar', direccion: 'Av. Argentina 123, Valparaíso', transportista: 'Chilexpress', estado: 'Entregado' },
    { id: '#E002', pedido: '#002', cliente: 'María López', direccion: 'Calle Serrano 456, Santiago', transportista: 'Starken', estado: 'En tránsito' },
    { id: '#E003', pedido: '#003', cliente: 'Yannella Castilla', direccion: 'Av. España 789, Viña del Mar', transportista: 'Correos Chile', estado: 'Pendiente' },
    { id: '#E004', pedido: '#004', cliente: 'Pedro Soto', direccion: 'Calle Larga 321, Quilpué', transportista: 'Chilexpress', estado: 'En tránsito' },
    { id: '#E005', pedido: '#005', cliente: 'Camila Torres', direccion: 'Av. Colón 654, Concón', transportista: 'Starken', estado: 'Entregado' },
  ]);

  const [nuevo, setNuevo] = useState({ pedido: '', cliente: '', direccion: '', transportista: 'Chilexpress', estado: 'Pendiente' });

  const getBadgeClass = (estado) => {
    switch (estado) {
      case 'Entregado': return 'badge badge-green';
      case 'En tránsito': return 'badge badge-amber';
      case 'Pendiente': return 'badge badge-blue';
      default: return 'badge';
    }
  };

  const enviosFiltrados = filtro === 'Todos'
    ? envios
    : envios.filter((e) => e.estado === filtro);

  const abrirModalNuevo = () => {
    setEnvioEditar(null);
    setNuevo({ pedido: '', cliente: '', direccion: '', transportista: 'Chilexpress', estado: 'Pendiente' });
    setMostrarModal(true);
  };

  const abrirModalEditar = (envio) => {
    setEnvioEditar(envio);
    setNuevo({ pedido: envio.pedido, cliente: envio.cliente, direccion: envio.direccion, transportista: envio.transportista, estado: envio.estado });
    setMostrarModal(true);
  };

  const guardar = () => {
    if (!nuevo.pedido || !nuevo.cliente || !nuevo.direccion) return;
    if (envioEditar) {
      setEnvios(envios.map((e) =>
        e.id === envioEditar.id ? { ...e, ...nuevo } : e
      ));
    } else {
      const id = `#E00${envios.length + 1}`;
      setEnvios([...envios, { id, ...nuevo }]);
    }
    setMostrarModal(false);
  };

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Envíos</h2>
        <button className="btn-primary" onClick={abrirModalNuevo}>+ Nuevo envío</button>
      </div>

      <div className="filtros">
        {['Todos', 'Entregado', 'En tránsito', 'Pendiente'].map((f) => (
          <button
            key={f}
            className={`filtro-btn ${filtro === f ? 'active' : ''}`}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID Envío</th>
              <th>Pedido</th>
              <th>Cliente</th>
              <th>Dirección</th>
              <th>Transportista</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {enviosFiltrados.map((envio) => (
              <tr key={envio.id}>
                <td>{envio.id}</td>
                <td>{envio.pedido}</td>
                <td>{envio.cliente}</td>
                <td>{envio.direccion}</td>
                <td>{envio.transportista}</td>
                <td><span className={getBadgeClass(envio.estado)}>{envio.estado}</span></td>
                <td>
                  <button className="btn-editar" onClick={() => abrirModalEditar(envio)}>Editar</button>
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
              <input
                type="text"
                placeholder="#001"
                value={nuevo.pedido}
                onChange={(e) => setNuevo({ ...nuevo, pedido: e.target.value })}
              />
              <label>Cliente</label>
              <input
                type="text"
                placeholder="Nombre del cliente"
                value={nuevo.cliente}
                onChange={(e) => setNuevo({ ...nuevo, cliente: e.target.value })}
              />
              <label>Dirección</label>
              <input
                type="text"
                placeholder="Dirección de entrega"
                value={nuevo.direccion}
                onChange={(e) => setNuevo({ ...nuevo, direccion: e.target.value })}
              />
              <label>Transportista</label>
              <select
                value={nuevo.transportista}
                onChange={(e) => setNuevo({ ...nuevo, transportista: e.target.value })}
              >
                <option>Chilexpress</option>
                <option>Starken</option>
                <option>Correos Chile</option>
                <option>Blue Express</option>
              </select>
              <label>Estado</label>
              <select
                value={nuevo.estado}
                onChange={(e) => setNuevo({ ...nuevo, estado: e.target.value })}
              >
                <option>Pendiente</option>
                <option>En tránsito</option>
                <option>Entregado</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={guardar}>{envioEditar ? 'Guardar' : 'Agregar'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Envios;