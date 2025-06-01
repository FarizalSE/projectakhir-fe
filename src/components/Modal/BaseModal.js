import React from 'react';

const BaseModal = ({
  isOpen,
  onClose,
  title = '',
  children,
  footer = null,
  size = 'default', // 'small', 'default', 'large'
  closeOnBackdrop = true
}) => {
  if (!isOpen) return null;

  const sizeClass = {
    small: 'modal-card is-small',
    default: 'modal-card',
    large: 'modal-card is-large'
  }[size];

  return (
    <div className="modal is-active">
      {closeOnBackdrop && (
        <div className="modal-background" onClick={onClose}></div>
      )}
      <div className={sizeClass}>
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>

        <section className="modal-card-body">
          {children}
        </section>

        {footer && (
          <footer className="modal-card-foot">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

export default BaseModal;
