import React, { useEffect, useState } from "react";
import createAxiosJWT from "../utils/axiosInterceptor";
import { API_BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "../utils/useRefreshToken";

const AddSenjata = ({ isOpen, onClose, onAdd }) => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState(0);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const axiosJWT = createAxiosJWT(token, expire, setToken, setName, setExpire, navigate);
  useRefreshToken(setToken, setName, setExpire);

  const initialForm = {
    name: "",
    type: "",
    serialNum: "",
    condition: "",
    location: "",
    stok: 0,
  };

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "stok" ? (value === "" ? 0 : parseInt(value)) : value
  }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Data yang akan dikirim ke server:", formData);
    console.log("Tombol Simpan diklik");

    // Simple validation
    if (!formData.name || !formData.type || !formData.serialNum) {
      setError("Nama, jenis, dan nomor seri wajib diisi.");
      return;
    }

    try {
      const response = await axiosJWT.post(`${API_BASE_URL}/add-weapons`, formData);
      onAdd(response.data);
      onClose();
      setFormData(initialForm);
      setError("");
      console.log("Senjata berhasil ditambahkan:", response.data);
    } catch (err) {
      console.log(err?.response?.data);   
      console.error("Gagal menambah senjata:", err);
      console.log(err.response);
      setError("Terjadi kesalahan saat menyimpan data.");
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(initialForm);
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ borderRadius: "16px" }}>
        <header className="modal-card-head">
          <p className="modal-card-title">Tambah Senjata</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          {error && <p className="has-text-danger mb-3">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nama</label>
              <div className="control">
                <input className="input" name="name" value={formData.name} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label className="label">Jenis</label>
              <div className="control">
                <input className="input" name="type" value={formData.type} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label className="label">Nomor Seri</label>
              <div className="control">
                <input className="input" name="serialNum" value={formData.serialNum} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label className="label">Kondisi</label>
              <div className="control">
                <input className="input" name="condition" value={formData.condition} onChange={handleChange} />
              </div>
            </div>

            <div className="field">
              <label className="label">Lokasi</label>
              <div className="control">
                <input className="input" name="location" value={formData.location} onChange={handleChange} />
              </div>
            </div>

            <div className="field">
              <label className="label">Stok</label>
              <div className="control">
                <input type="number" className="input" name="stok" value={formData.stok} onChange={handleChange} />
              </div>
            </div>

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

export default AddSenjata;
