import { useState, useEffect } from 'react';
import './Usuarios.css';
import Toast from '../../components/Toast/Toast';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

function Usuarios() {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nuevo, setNuevo] = useState({ nombre: '', email: '', password: '', rol: 'EMPLEADO', estado: 'ACTIVO' });
  const [toast, setToast] = useState(null);
  const [confirmar, setConfirmar] = useState(null);

  const API = '/api/usuarios';
  const mostrarToast = (mensaje, tipo = 'success') => setToast({ mensaje, tipo });

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      const res = await fetch(API);
      if (!res.ok) throw new Error('Error al cargar');
      setUsuarios(await res.json());
    } catch { console.error('Error al cargar usuarios'); }
    finally { setCargando(false); }
  };

  useEffect(() => { void cargarUsuarios(); }, []);

  const getRolClass = (rol) => rol === 'ADMIN' ? 'badge badge-amber' : 'badge badge-blue';
  const getEstadoClass = (estado) => estado === 'ACTIVO' ? 'badge badge-green' : 'badge badge-red';

  const usuariosFiltrados = usuarios
    .filter((u) => u.rol !== 'CLIENTE')
    .filter((u) =>
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase())
    );

  const abrirModalNuevo = () => {
    setUsuarioEditar(null);
    setNuevo({ nombre: '', email: '', password: '', rol: 'EMPLEADO', estado: 'ACTIVO' });
    setMostrarModal(true);
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setNuevo({ nombre: usuario.nombre, email: usuario.email, password: '', rol: usuario.rol, estado: usuario.estado });
    setMostrarModal(true);
  };

  const guardar = async () => {
    if (!nuevo.nombre || !nuevo.email) {
      mostrarToast('Por favor completa todos los campos obligatorios', 'error');
      return;
    }
    if (!usuarioEditar && !nuevo.password) {
      mostrarToast('La contraseña es obligatoria', 'error');
      return;
    }
    if (!usuarioEditar && nuevo.password.length < 4) {
      mostrarToast('La contraseña debe tener al menos 4 caracteres', 'error');
      return;
    }
    try {
      const url = usuarioEditar ? `${API}/${usuarioEditar.usuarioId}` : API;
      const method = usuarioEditar ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nuevo) });
      if (!res.ok) throw new Error('Error al guardar');
      setMostrarModal(false);
      setNuevo({ nombre: '', email: '', password: '', rol: 'EMPLEADO', estado: 'ACTIVO' });
      mostrarToast(usuarioEditar ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
      await cargarUsuarios();
    } catch { mostrarToast('Error al guardar el usuario', 'error'); }
  };

  const eliminar = (id, nombre) => {
    setConfirmar({
      mensaje: `¿Estás segura de eliminar a "${nombre}"? Esta acción no se puede deshacer.`,
      onConfirmar: async () => {
        setConfirmar(null);
        try {
          await fetch(`${API}/${id}`, { method: 'DELETE' });
          mostrarToast('Usuario eliminado correctamente', 'error');
          await cargarUsuarios();
        } catch { mostrarToast('Error al eliminar el usuario', 'error'); }
      }
    });
  };

  return (
    <div className="content">
      <div className="page-header">
        <h2 className="page-title">Usuarios</h2>
        <button className="btn-primary" onClick={abrirModalNuevo}>+ Agregar usuario</button>
      </div>
      <input type="text" className="buscador" placeholder="Buscar por nombre o email..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
      <div className="table-section">
        <table>
          <thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {cargando ? <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Cargando...</td></tr>
            : usuariosFiltrados.length === 0 ? <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No hay usuarios</td></tr>
            : usuariosFiltrados.map((usuario) => (
              <tr key={usuario.usuarioId}>
                <td>#USR{String(usuario.usuarioId).padStart(5, '0')}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td><span className={getRolClass(usuario.rol)}>{usuario.rol}</span></td>
                <td><span className={getEstadoClass(usuario.estado)}>{usuario.estado}</span></td>
                <td style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn-editar" onClick={() => abrirModalEditar(usuario)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminar(usuario.usuarioId, usuario.nombre)}>Eliminar</button>
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
              <input type="text" placeholder="Nombre completo" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
              <label>Email</label>
              <input type="email" placeholder="correo@ejemplo.com" value={nuevo.email} onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })} />
              {!usuarioEditar && (<><label>Contraseña</label><input type="password" placeholder="••••••••" value={nuevo.password} onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })} /></>)}
              <label>Rol</label>
              <select value={nuevo.rol} onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value })}>
                <option value="EMPLEADO">EMPLEADO</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <label>Estado</label>
              <select value={nuevo.estado} onChange={(e) => setNuevo({ ...nuevo, estado: e.target.value })}>
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
              </select>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={guardar}>{usuarioEditar ? 'Guardar' : 'Agregar'}</button>
            </div>
          </div>
        </div>
      )}
      {confirmar && <ConfirmModal mensaje={confirmar.mensaje} onConfirmar={confirmar.onConfirmar} onCancelar={() => setConfirmar(null)} />}
      {toast && <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />}
    </div>
  );
}

export default Usuarios;
