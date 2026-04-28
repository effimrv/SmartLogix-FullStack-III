import { useState } from 'react';

function Envios() {
  const [filtro, setFiltro] = useState('Todos');

  const envios = [
    { id: '#E001', pedido: '#001', cliente: 'Aracely Escobar', direccion: 'Av. Argentina 123, Valparaíso', transportista: 'Chilexpress', estado: 'Entregado' },
    { id: '#E002', pedido: '#002', cliente: 'María López', direccion: 'Calle Serrano 456, Santiago', transportista: 'Starken', estado: 'En tránsito' },
    { id: '#E003', pedido: '#003', cliente: 'Yannella Castilla', direccion: 'Av. España 789, Viña del Mar', transportista: 'Correos Chile', estado: 'Pendiente' },
    { id: '#E004', pedido: '#004', cliente: 'Pedro Soto', direccion: 'Calle Larga 321, Quilpué', transportista: 'Chilexpress', estado: 'En tránsito' },
    { id: '#E005', pedido: '#005', cliente: 'Camila Torres', direccion: 'Av. Colón 654, Concón', transportista: 'Starken', estado: 'Entregado' },
  ];

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

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Envíos</h2>
        <button className="btn-primary">+ Nuevo envío</button>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Envios;