import './Modal.css';
// eslint-disable-next-line react/prop-types
export default function Modal({ show, onClose, title, children }) {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay4" onClick={onClose}>
      <div className="modal-4" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header4">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button-2">X</button>
        </div>
        <div className="modal-body4">
          {children}
        </div>
      </div>
    </div>
  );
}
