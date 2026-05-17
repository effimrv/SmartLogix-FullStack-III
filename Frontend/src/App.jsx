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

  const handleLogin = () => {
    localStorage.setItem('smartlogix_session', 'true');
    setLogueado(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('smartlogix_session');
    setLogueado(false);
  };

  const hoy = new Date().toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

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
          <span className="topbar-badge">Hoy: {hoy}</span>
        </div>
        {renderPagina()}
      </div>
    </div>
  );
}

export default App;