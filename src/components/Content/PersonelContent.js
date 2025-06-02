import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import { Edit, Trash2, Add } from "lucide-react";
import createAxiosJWT from "../utils/axiosInterceptor";
import { refreshToken } from "../utils/auth";
import useRefreshToken from "../utils/useRefreshToken";
import EditLaporanModal from "../Modal/EditLaporanModal";
import TambahTransaksi from "../Modal/TambahTransaksiModal";

const PersonelContent = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [name, setName] = useState("");
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
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
      const response = await axiosJWT.get(`${API_BASE_URL}/transactions`);
      setTransaction(response.data);
    } catch (error) {
      console.error("Gagal mengambil data senjata:", error);
    }
  };

  const getTransactionById = async (id) => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/transaction/${id}`);
      return response.data;
    } catch (error) {
      console.error("Gagal mengambil data transaksi:", error);
      throw error;
    }
  }


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
              <th>Nomor Seri</th>
              <th>Type</th>
              <th>Jumlah</th>
              <th>Tujuan</th>
              <th>Gudang</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map((item) => (
              <tr key={item.id}>
                <td>{item.weapon?.serialNum}</td>
                <td>{item.type_transactions}</td>
                <td>{item.amount}</td>
                <td>{item.information}</td>
                <td>{item.weapon?.location}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="button is-small is-success mr-2"
                    title="Edit"
                    onClick={ async () => {
                    try {
                      const transactionData = await getTransactionById(item.id);
                      console.log("selected transaction :", transactionData);
                      setSelectedTransaction(transactionData);
                      setShowTransactionModal(true);
                    } catch (error) {
                      console.error("Gagal mengambil data senjata untuk edit:", error);
                      navigate("/");
                    }
                  }}
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
        <EditLaporanModal
          isOpen={showTransactionModal}
          onClose={() => setShowTransactionModal(false)}
          onSave={() => {
            setShowTransactionModal(false);
          }}
          initialData={selectedTransaction}
        />
        </div>
        <TambahTransaksi
                  isOpen={showAddTransactionModal}
                  onClose={() => setShowAddTransactionModal(false)}
                  onSave={() => {
                    setShowAddTransactionModal(false);
                    getTransactionById(); // Refresh data senjata setelah modal ditutup
                  }}
                  onAdd={(newTransaction) => {
                    setTransaction((prev) => [...prev, newTransaction]);
                    getTransactionById(); // Refresh data senjata setelah modal ditutup
                  }
                  }
          />
      </div>
      <button className="button btn-success" onClick={() => setShowAddTransactionModal(true)}>
        Tambah Senjata
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
      </button>
    </div>
  );
};

export default PersonelContent;
