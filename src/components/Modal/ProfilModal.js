import React from 'react';
import BaseModal from './BaseModal';

const ProfileModal = ({ isOpen, onClose, user }) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Profil Pengguna"
      footer={
        <button className="button is-primary" onClick={onClose}>
          Tutup
        </button>
      }
    >
      <p><strong>Nama:</strong>scjkc</p>
      <p><strong>Email:</strong>csjcsa</p>
      {/* Tambahkan konten lain di sini */}
    </BaseModal>
  );
};

export default ProfileModal;
