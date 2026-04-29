import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    if (email === 'admin@smartlogix.com' && password === '1234') {
      onLogin();
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <h1>SmartLogix</h1>
          <p>Panel de gestión logística</p>
        </div>
        <div className="login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="login-error">{error}</p>}
          <button className="btn-login" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;