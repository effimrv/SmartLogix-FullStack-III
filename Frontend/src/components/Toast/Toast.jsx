import { useEffect } from 'react';

function Toast({ mensaje, tipo = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colores = {
    success: { bg: '#EAF3DE', color: '#3B6D11', border: '#C0DD97' },
    error: { bg: '#FCEBEB', color: '#A32D2D', border: '#F7C1C1' },
    warning: { bg: '#FAEEDA', color: '#854F0B', border: '#FAC775' },
    info: { bg: '#E6F1FB', color: '#185FA5', border: '#B5D4F4' },
  };

  const iconos = { success: '✓', error: '✕', warning: '!', info: 'i' };
  const estilo = colores[tipo];

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px',
      background: estilo.bg, color: estilo.color,
      border: `0.5px solid ${estilo.border}`, borderRadius: '10px',
      padding: '12px 16px', display: 'flex', alignItems: 'center',
      gap: '10px', fontSize: '13px', fontWeight: '500',
      zIndex: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      minWidth: '250px', maxWidth: '360px',
    }}>
      <span style={{
        width: '20px', height: '20px', borderRadius: '50%',
        background: estilo.color, color: estilo.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '11px', fontWeight: '700', flexShrink: 0,
      }}>
        {iconos[tipo]}
      </span>
      <span style={{ flex: 1 }}>{mensaje}</span>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: estilo.color, fontSize: '14px', opacity: 0.6, padding: '0 2px',
      }}>✕</button>
    </div>
  );
}

export default Toast;
