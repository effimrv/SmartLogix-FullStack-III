import { useState } from 'react';

function Usuarios() {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [usuarios, setUsuarios] = useState([
    { id: '001', nombre: 'Aracely Escobar', email: 'aracely@gmail.com', rol: 'Admin', estado: 'Activo' },
    { id: '002', nombre: 'Yannella Castilla', email: 'yannella@gmail.com', rol: 'Admin', estado: 'Activo' },
    { id: '003', nombre: 'María López', email: 'maria@gmail.com', rol: 'Cliente', estado: 'Activo' },
    { id: '004', nombre: 'Pedro Soto', email: 'pedro@gmail.com', rol: 'Cliente', estado: 'Inactivo' },
    { id: '005', nombre: 'Camila Torres', email: 'camila@gmail.com', rol: 'Cliente', estado: 'Activo' },
  ]);

  const [nuevo, setNuevo] = useState({ nombre: '', email: '', rol: 'Cliente', estado: 'Activo' });

  const getRolClass = (rol) => rol === 'Admin' ? 'badge badge-amber' : 'badge badge-blue';
  const getEstadoClass = (estado) => estado === 'Activo' ? 'badge badge-green' : 'badge badge-red';

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirModalNuevo = () => {
    setUsuarioEditar(null);
    setNuevo({ nombre: '', email: '', rol: 'Cliente', estado: 'Activo' });
    setMostrarModal(true);
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setNuevo({ nombre: usuario.nombre, email: usuario.email, rol: usuario.rol, estado: usuario.estado });
    setMostrarModal(true);
  };

  const guardar = () => {
    if (!nuevo.nombre || !nuevo.email) return;
    if (usuarioEditar) {
      setUsuarios(usuarios.map((u) =>
        u.id === usuarioEditar.id ? { ...u, ...nuevo } : u
      ));
    } else {
      const id = String(usuarios.length + 1).padStart(3, '0');
      setUsuarios([...usuarios, { id, ...nuevo }]);
    }
    setMostrarModal(false);
  };

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Usuarios</h2>
        <button className="btn-primary" onClick={abrirModalNuevo}>+ Agregar usuario</button>
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
              <th>Acciones</th>
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
                <td>
                  <button className="btn-editar" onClick={() => abrirModalEditar(usuario)}>Editar</button>
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
              <h3>{usuarioEditar ? 'Editar usuario' : 'Agregar usuario'}</h3>
              <button className="modal-close" onClick={() => setMostrarModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nuevo.nombre}
                onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={nuevo.email}
                onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
              />
              <label>Rol</label>
              <select
                value={nuevo.rol}
                onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value })}
              >
                <option>Cliente</option>
                <option>Admin</option>
              </select>
              <label>Estado</label>
              <select
                value={nuevo.estado}
                onChange={(e) => setNuevo({ ...nuevo, estado: e.target.value })}
              >
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={guardar}>{usuarioEditar ? 'Guardar' : 'Agregar'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios;