import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants";
import { Edit, Trash2, Add } from "lucide-react";
import EditSenjataModal from "../Modal/EditSenjataModal";
import createAxiosJWT from "../utils/axiosInterceptor";
import { refreshToken } from "../utils/auth";
import useRefreshToken from "../utils/useRefreshToken";
import TambahSenjataModal from "../Modal/TambahSenjataModal";

const InventoriContent = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [senjata, setSenjata] = useState([]);
  const [showSenjataModal, setShowSenjataModal] = useState(false);
  const [showAddSenjataModal, setShowAddSenjataModal] = useState(false);
  const [selectedSenjata, setSelectedSenjata] = useState(null);
  const navigate = useNavigate();
  useRefreshToken(setToken, setName, setEmail, setRole, setUserId, setExpire);
  const axiosJWT = createAxiosJWT(token, expire, setToken, setName, setEmail, setRole, setUserId, setExpire, navigate, refreshToken);
  // Ambil data senjata dari server
  const getSenjata = async () => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/weapons`);
      setSenjata(response.data);
    } catch (error) {
      console.error("Gagal mengambil data senjata:", error);
    }
  };

  const getWeaponsById = async (id) => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/weapons/${id}`);
      return response.data;
    } catch (error) {
      console.error("Gagal mengambil data senjata:", error);
      throw error;
    }
  };

  const deleteSenjata = async (id) => {
    try {
      await axiosJWT.delete(`${API_BASE_URL}/delete-weapons/${id}`);
    } catch (error) {
      console.log("Gagal menghapus senjata:", error);
    }
  }


  // Ambil token dan data user saat komponen pertama kali dimuat
  useEffect(() => {
    if (token && expire) {
      getSenjata();
      getWeaponsById();
      const axiosJWT = createAxiosJWT(token, expire, setToken, setName, setEmail, setRole, setExpire, navigate, refreshToken);
    }
  }, [token, expire]);

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
              <th>Nama Senjata</th>
              <th>Jenis</th>
              <th>Nomor Seri</th>
              <th>Kondisi</th>
              <th>Lokasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {senjata.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.serialNum}</td>
                <td>{item.condition}</td>
                <td>{item.location}</td>
                <td>
                  <button
                    className="button is-small is-success mr-2"
                    title="Edit"
                    onClick={async () => {
                      try {
                        const weaponData = await getWeaponsById(item.id);
                        setSelectedSenjata(weaponData);
                        setShowSenjataModal(true);
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
                    onClick={async () => {
                      if (window.confirm("Apakah Anda yakin ingin menghapus senjata ini?")) {
                        await deleteSenjata(item.id);
                        getSenjata(); // Refresh data senjata setelah penghapusan
                      }
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Modal Edit */}
        {selectedSenjata && (
          <EditSenjataModal
            isOpen={showSenjataModal}
            onClose={() => setShowSenjataModal(false)}
            onSave={() => {
              setShowSenjataModal(false);
              getSenjata(); // Refresh data senjata setelah modal ditutup
            }}
            initialData={selectedSenjata}
          />
        )}

        {/* Modal Tambah Senjata */}
        <TambahSenjataModal
          isOpen={showAddSenjataModal}
          onClose={() => setShowAddSenjataModal(false)}
          onSave={() => {
            setShowAddSenjataModal(false);
            getSenjata(); // Refresh data senjata setelah modal ditutup
          }}
          onAdd={(newWeapon) => {
            setSenjata((prev) => [...prev, newWeapon]);
            getSenjata(); // Refresh data senjata setelah modal ditutup
          }
          }
        />

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

export default InventoriContent;
