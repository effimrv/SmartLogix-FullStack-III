import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Pedidos from './pages/Pedidos/Pedidos';
import Inventario from './pages/Inventario/Inventario';
import Envios from './pages/Envios/Envios';
import Usuarios from './pages/Usuarios/Usuarios';
import Login from './pages/Login/Login';
import Tienda from './pages/Tienda/Tienda';

function App() {
  const [logueado, setLogueado] = useState(() => {
    return localStorage.getItem('smartlogix_session') === 'true';
  });
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const stored = localStorage.getItem('smartlogix_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [paginaActual, setPaginaActual] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('smartlogix_theme') === 'dark';
  });

  const handleLogin = (user) => {
    localStorage.setItem('smartlogix_session', 'true');
    localStorage.setItem('smartlogix_user', JSON.stringify(user));
    setUsuarioActual(user);
    setLogueado(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('smartlogix_session');
    localStorage.removeItem('smartlogix_user');
    setUsuarioActual(null);
    setLogueado(false);
  };

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    localStorage.setItem('smartlogix_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const hoy = new Date().toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  if (darkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  const renderPagina = () => {
    switch (paginaActual) {
      case 'dashboard': return <Dashboard />;
      case 'pedidos': return <Pedidos />;
      case 'inventario': return <Inventario />;
      case 'envios': return <Envios />;
      case 'usuarios': return <Usuarios />;
      default: return <Dashboard />;
    }
  };

  if (!logueado) {
    return <Login onLogin={handleLogin} />;
  }

  if (usuarioActual?.rol === 'CLIENTE') {
    return <Tienda usuario={usuarioActual} onLogout={handleLogout} />;
  }

  return (
    <div className="layout">
      <Sidebar paginaActual={paginaActual} setPaginaActual={setPaginaActual} onLogout={handleLogout} usuario={usuarioActual} />
      <div className="main">
        <div className="topbar">
          <span className="topbar-title">Bienvenido/a, {usuarioActual?.nombre ?? 'Usuario'} 👋</span>
          <div className="topbar-right">
            <span className="topbar-badge">Hoy: {hoy}</span>
            <button className="theme-btn" onClick={toggleTheme}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        {renderPagina()}
      </div>
    </div>
  );
}

export default App;
