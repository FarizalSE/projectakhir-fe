import { useState, useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import createAxiosJWT from "../utils/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "../utils/useRefreshToken";


const EditLaporanModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState(0);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const axiosJWT = createAxiosJWT(token, expire, setToken, setName, setExpire, navigate);
  useRefreshToken(setToken, setName, setExpire);



  const [formData, setFormData] = useState({
    id : '',
    type_transactions : "",
    amount : 0,
    information : "",
    status : "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.put(
        `${API_BASE_URL}/update-transaction/${formData.id}`,
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
            <span>Jenis Transaksi</span>
            <input
              name="type_transactions"
              className="input mb-2"
              type="text"
              placeholder="Jenis Transaksi"
              value={formData.type_transactions || ""}
              onChange={handleChange}
            />
            <span>Jumlah</span>
            <input
              name="amount"
              className="input mb-2"
              type="text"
              placeholder="Jumlah"
              value={formData.amount || ""}
              onChange={handleChange}
            />
            <span>Informasi Transaksi</span>
            <input
              name="information"
              className="input mb-2"
              type="text"
              placeholder="Information"
              value={formData.information || ""}
              onChange={handleChange}
            />
            <span>Status Laporan</span>
            <input
              name="status"
              className="input mb-2"
              type="text"
              placeholder="Status"
              value={formData.status || ""}
              onChange={handleChange}
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

export default EditLaporanModal;
