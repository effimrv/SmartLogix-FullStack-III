import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Pedidos from './pages/Pedidos';
import Inventario from './pages/Inventario';
import Envios from './pages/Envios';
import Usuarios from './pages/Usuarios';

function App() {
  const [paginaActual, setPaginaActual] = useState('dashboard');

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

  return (
    <div className="layout">
      <Sidebar paginaActual={paginaActual} setPaginaActual={setPaginaActual} />
      <div className="main">
        <div className="topbar">
          <span className="topbar-title">SmartLogix</span>
          <span className="topbar-user">Bienvenida, Aracely</span>
        </div>
        {renderPagina()}
      </div>
    </div>
  );
}

export default App;