import React from 'react';
import '../assets/css/ImageModal.css';

function ImageModal({ image, alt, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={image} alt={alt} />
      </div>
    </div>
  );
}

export default ImageModal; 