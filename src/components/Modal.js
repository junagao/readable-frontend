import React from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss';

const Modal = ({
  content, actions, onDismiss,
}) => ReactDOM.createPortal(
  <div onClick={onDismiss} role="presentation" className="modal-overlay">
    <div
      onClick={(e) => e.stopPropagation()}
      role="presentation"
      className="modal-content"
    >
      <div className="content">{content}</div>
      <div className="actions">{actions}</div>
    </div>
  </div>,
  document.getElementById('modal'),
);

export default Modal;
