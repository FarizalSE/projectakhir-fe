import {useState, useEffect} from 'react';
import BaseModal from './BaseModal';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../utils/auth';
import createAxiosJWT from '../utils/axiosInterceptor';
import useRefreshToken from '../utils/useRefreshToken';

const ProfileModal = ({ isOpen, onClose, user }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [expire, setExpire] = useState("");
  const [token, setToken] = useState("");
  const [akun, setAkun] = useState([]);

  const navigate = useNavigate;
  useRefreshToken(setToken, setName, setEmail, setRole, setUserId, setExpire);
  const axiosJWT = createAxiosJWT(token, expire, setToken, setName, setEmail, setRole, setUserId, setExpire, navigate, refreshToken);

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
      <p><strong>Nama:</strong>{name}</p>
      <p><strong>Email:</strong>{email}</p>
      <p><strong>Role:</strong>{role}</p>
      {/* Tambahkan konten lain di sini */}
    </BaseModal>
  );
};

export default ProfileModal;
