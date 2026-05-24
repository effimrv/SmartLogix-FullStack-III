function ConfirmModal({ mensaje, onConfirmar, onCancelar }) {
  return (
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: '400px' }}>
        <div className="modal-header">
          <h3>Confirmar eliminación</h3>
          <button className="modal-close" onClick={onCancelar}>✕</button>
        </div>
        <div className="modal-body" style={{ textAlign: 'center', padding: '24px 16px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🗑️</div>
          <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>{mensaje}</p>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancelar}>Cancelar</button>
          <button
            className="btn-eliminar"
            style={{ padding: '8px 20px', borderRadius: '8px' }}
            onClick={onConfirmar}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
