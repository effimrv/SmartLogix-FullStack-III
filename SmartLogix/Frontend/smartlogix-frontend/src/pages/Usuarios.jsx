import { useState } from 'react';

function Usuarios() {
  const [busqueda, setBusqueda] = useState('');

  const usuarios = [
    { id: '001', nombre: 'Aracely Escobar', email: 'aracely@gmail.com', rol: 'Admin', estado: 'Activo' },
    { id: '002', nombre: 'Yannella Castilla', email: 'yannella@gmail.com', rol: 'Admin', estado: 'Activo' },
    { id: '003', nombre: 'María López', email: 'maria@gmail.com', rol: 'Cliente', estado: 'Activo' },
    { id: '004', nombre: 'Pedro Soto', email: 'pedro@gmail.com', rol: 'Cliente', estado: 'Inactivo' },
    { id: '005', nombre: 'Camila Torres', email: 'camila@gmail.com', rol: 'Cliente', estado: 'Activo' },
  ];

  const getRolClass = (rol) => {
    return rol === 'Admin' ? 'badge badge-amber' : 'badge badge-blue';
  };

  const getEstadoClass = (estado) => {
    return estado === 'Activo' ? 'badge badge-green' : 'badge badge-red';
  };

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Usuarios</h2>
        <button className="btn-primary">+ Agregar usuario</button>
      </div>

      <input
        type="text"
        className="buscador"
        placeholder="Buscar por nombre o email..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>#{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td><span className={getRolClass(usuario.rol)}>{usuario.rol}</span></td>
                <td><span className={getEstadoClass(usuario.estado)}>{usuario.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;