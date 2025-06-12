import './styles/components/Modal.css';

const Modal = ({ children, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close" onClick={onClose}>×</button>
      {children}
    </div>
  </div>
);