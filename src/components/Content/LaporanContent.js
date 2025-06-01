import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import { Edit, Trash2, Add } from "lucide-react";
import EditSenjataModal from "../Modal/EditSenjataModal";
import createAxiosJWT from "../utils/axiosInterceptor";
import { refreshToken } from "../utils/auth";
import useRefreshToken from "../utils/useRefreshToken";
import TambahSenjataModal from "../Modal/TambahSenjataModal";

const LaporanContent = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [name, setName] = useState("");
  const [showSenjataModal, setShowSenjataModal] = useState(false);
  const [showAddSenjataModal, setShowAddSenjataModal] = useState(false);
  const [selectedSenjata, setSelectedSenjata] = useState(null);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();
  const axiosJWT = createAxiosJWT(token, expire, setToken, setName, setEmail, setRole, setUserId, setExpire, navigate, refreshToken);
  useRefreshToken(setToken, setName, setEmail, setRole, setUserId, setExpire);

  // Ambil data senjata dari server
  const getDetailTransaksibyUserID = async () => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/transactions/${userId}`);
      setTransaction(response.data);
    } catch (error) {
      console.error("Gagal mengambil data senjata:", error);
    }
  };


  // Ambil token dan data user saat komponen pertama kali dimuat
  useEffect(() => {
    if (token) {
      getDetailTransaksibyUserID();
    }
  }, [token]);

  return (
    <div className="container is-max-widescreen">
      <div className="box" style={{ borderRadius: "20px", padding: "2rem" }}>
        <div style={{
      maxHeight: "500px",
      overflowY: "auto",
      borderRadius: "10px",
    }}>
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Nama Petugas {userId}</th>
              <th>Jenis Transaksi</th>
              <th>Nomor Seri</th>
              <th>Kondisi</th>
              <th>Lokasi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((item) => (
              <tr key={item.id}>
                <td>{item.user?.name}</td>
                <td>{item.type_transactions}</td>
                <td>{item.weapon?.serialNum}</td>
                <td>{item.weapon?.condition}</td>
                <td>{item.weapon?.location}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="button is-small is-success mr-2"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                  className="button is-small is-danger"
                  title="hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>
      <button className="button btn-success" onClick={() => setShowAddSenjataModal(true)}>
        Tambah Senjata
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
      </button>
    </div>
  );
};

export default LaporanContent;
