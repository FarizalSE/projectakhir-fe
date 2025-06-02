import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { API_BASE_URL } from "../utils/constants";


const EditSenjataModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState(0);
  const [name, setName] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "",
    serialNum: "",
    condition: "",
    location: "",
    stok: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Buat axios instance dengan interceptor dan pakai useMemo supaya tidak terus bertambah
  const axiosJWT = useMemo(() => {
    const instance = axios.create({ withCredentials: true });

    instance.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get(`${API_BASE_URL}/token`, {
            withCredentials: true,
          });
          const newAccessToken = response.data.accessToken;
          setToken(newAccessToken);
          const decoded = jwtDecode(newAccessToken);
          setName(decoded.name);
          setExpire(decoded.exp);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return instance;
  }, [token, expire]);

  // Ambil token pertama kali saat modal dibuka supaya interceptor punya token valid
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await axios.get(`${API_BASE_URL}/token`, {
          withCredentials: true,
        });
        const accessToken = response.data.accessToken;
        setToken(accessToken);
        const decoded = jwtDecode(accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      } catch (error) {
        console.error("Gagal mengambil token:", error);
      }
    }
    if (isOpen) {
      fetchToken();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.put(
        `${API_BASE_URL}/update-weapons/${formData.id}`,
        formData
      );
      console.log("Update response:", response.data);
      onSave(response.data); // Kirim data terbaru ke parent
      onClose(); // Tutup modal
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Senjata</p>
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>
        <section className="modal-card-body">
          <form onSubmit={updateData}>
            <input
              name="name"
              className="input mb-2"
              type="text"
              placeholder="Nama Senjata"
              value={formData.name || ""}
              onChange={handleChange}
            />
            <input
              name="type"
              className="input mb-2"
              type="text"
              placeholder="Jenis"
              value={formData.type || ""}
              onChange={handleChange}
            />
            <input
              name="serialNum"
              className="input mb-2"
              type="text"
              placeholder="Nomor Seri"
              value={formData.serialNum || ""}
              onChange={handleChange}
            />
            <input
              name="condition"
              className="input mb-2"
              type="text"
              placeholder="Kondisi"
              value={formData.condition || ""}
              onChange={handleChange}
            />
            <input
              name="location"
              className="input mb-2"
              type="text"
              placeholder="Lokasi"
              value={formData.location || ""}
              onChange={handleChange}
            />
            <input
              name="stok"
              className="input mb-2"
              type="number"
              placeholder="Stok"
              value={formData.stok || ""}
              onChange={handleChange}
              min={0}
            />
            <footer className="modal-card-foot" style={{ paddingLeft: 0 }}>
              <button className="button is-success" type="submit">
                Simpan
              </button>
              <button className="button" type="button" onClick={onClose}>
                Tutup
              </button>
            </footer>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditSenjataModal;
