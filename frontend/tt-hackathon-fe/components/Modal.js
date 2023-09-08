import React from "react";
import styles from "../styles/Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
