import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Pedidos from './pages/Pedidos';
import Inventario from './pages/Inventario';
import Envios from './pages/Envios';
import Usuarios from './pages/Usuarios';
import Login from './pages/Login';

function App() {
  const [logueado, setLogueado] = useState(() => {
    return localStorage.getItem('smartlogix_session') === 'true';
  });
  const [paginaActual, setPaginaActual] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('smartlogix_theme') === 'dark';
  });

  const handleLogin = () => {
    localStorage.setItem('smartlogix_session', 'true');
    setLogueado(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('smartlogix_session');
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

  return (
    <div className="layout">
      <Sidebar paginaActual={paginaActual} setPaginaActual={setPaginaActual} onLogout={handleLogout} />
      <div className="main">
        <div className="topbar">
          <span className="topbar-title">Bienvenida de vuelta, Aracely 👋</span>
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