import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <div className="topbar">
          <span className="topbar-title">Dashboard</span>
          <span className="topbar-user">Bienvenida, Aracely</span>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;