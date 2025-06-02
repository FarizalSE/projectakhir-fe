import React, { useEffect, useState } from "react";
import createAxiosJWT from "../utils/axiosInterceptor";
import { API_BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "../utils/useRefreshToken";
import { refreshToken } from "../utils/auth";

const TambahTransaksi = ({ isOpen, onClose, onAdd }) => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [weapons, setWeapons] = useState([]);


  const navigate = useNavigate();

  useRefreshToken(setToken, setName, setEmail, setRole, setUserId, setExpire);
  const axiosJWT = createAxiosJWT(token, expire, setToken, setName, setEmail, setRole, setUserId, setExpire, navigate, refreshToken);

  const initialForm = {
    type_transactions: "",
    amount: 0,
    information: "",
    status: "pending",
    userId: "",
    weaponId: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? (value === "" ? 0 : parseInt(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data yang akan dikirim ke server:", formData);

    // Validasi sederhana
    if (!formData.type_transactions || !formData.amount || !formData.information || !formData.weaponId) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      const response = await axiosJWT.post(`${API_BASE_URL}/add-transaction`, formData);
      onAdd(response.data);
      onClose();
      setFormData(initialForm);
      setError("");
      console.log("Transaksi berhasil ditambahkan:", response.data);
    } catch (err) {
      console.error("Gagal menambah transaksi:", err);
      setError("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const getSenjata = async () => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/weapons`);
      setWeapons(response.data);
    } catch (error) {
      console.log("Gagal mengambil data senjata", error);
    }
  };

  useEffect(() => {
    if (isOpen && userId) {
      setFormData({ ...initialForm, userId });
      setError("");
      getSenjata();
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ borderRadius: "16px" }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Tambah Transaksi</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          {error && <p className="has-text-danger mb-3">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Jenis Transaksi</label>
              <div className="control">
                <input
                  className="input"
                  name="type_transactions"
                  value={formData.type_transactions}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Jumlah Senjata</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Tujuan / Keterangan</label>
              <div className="control">
                <input
                  className="input"
                  name="information"
                  value={formData.information}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Senjata</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    name="weaponId"
                    value={formData.weaponId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Pilih Senjata --</option>
                    {weapons.map((weapon) => (
                      <option key={weapon.id} value={weapon.id}>
                        {weapon.name} - {weapon.serialNum}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Hidden userId */}
            <input type="hidden" name="userId" value={formData.userId} />

            <footer className="modal-card-foot">
              <button type="submit" className="button is-success">
                Simpan
              </button>
              <button type="button" className="button" onClick={onClose}>
                Batal
              </button>
            </footer>
          </form>
        </section>
      </div>
    </div>
  );
};

export default TambahTransaksi;
