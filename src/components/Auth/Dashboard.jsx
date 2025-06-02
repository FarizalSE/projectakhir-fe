import React, { useState, useEffect } from "react";
import { useLocation, useNavigate , useParams} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { routeMap } from "../utils/navigationConfig";
import ProfileModal from "../Modal/ProfilModal";
import { jwtDecode } from "jwt-decode";

const Dashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const {userId} = useParams();
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [expire, setExpire] = useState("");
  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  //getuserbyid
  const getUserById = async (userId) => {
    try {
      const response = await axiosJWT.get(`${API_BASE_URL}/users/${userId}`,
        {
          headers : {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("User data fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  }

  useEffect(() => {
    getUserById(userId);
  }, [userId]);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const logout = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/logout`);
      console.log("Logout successful");
      navigate("/"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout gagal, silakan coba lagi.");
    }
  };

  const handleMenuClick = (menuId) => {
    if (menuId === "keluar") {
      logout();
      return;
    }

    const path = routeMap[menuId];
    if (path) navigate(path);

    if (window.innerWidth < 1024 && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  // Menentukan menu aktif berdasarkan pathname
  const activeMenu = location.pathname.split("/")[1].replace("content", "") || "dashboard";


  // Membuat instance axios khusus untuk JWT
  const axiosJWT = axios.create();

  // Interceptor akan dijalankan SETIAP KALI membuat request dengan axiosJWT
  // Fungsinya buat ngecek + memperbarui access token sebelum request dikirim
  axiosJWT.interceptors.request.use(
    async (config) => {
      try {
        // Ambil waktu sekarang, simpan dalam variabel "currentDate"
        const currentDate = new Date();

        // Bandingkan waktu expire token dengan waktu sekarang
        if (expire * 1000 < currentDate.getTime()) {
          // Kalo access token expire, Request token baru ke endpoint /token
          const response = await axios.get(`${API_BASE_URL}/token`);

          // Update header Authorization dengan access token baru
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;

          // Update token di state
          setToken(response.data.accessToken);

          // Decode token baru untuk mendapatkan informasi user
          const decoded = jwtDecode(response.data.accessToken);

          setName(decoded.name); // <- Update state dengan data user dari token
          setRole(decoded.role); // <- Update state dengan role user dari token
          setExpire(decoded.exp); // <- Set waktu expire baru
        }
        return config;
      } catch (err) {
        // Kalo misal ada error, langsung balik ke halaman login
        setToken("");
        navigate("/");
      }
    },
    (error) => {
      // Kalo misal ada error, langsung balik ke halaman login
      setToken("");
      navigate("/");
    }
  );

  return (
    <div className="has-background-grey-lighter" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="is-flex" style={{ flexGrow: 1, minHeight: 0 }}>
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          activeMenu={activeMenu}
          onMenuClick={handleMenuClick}
        />
        <div className="is-flex-grow-1" style={{ display: "flex", flexDirection: "column", overflow: "100vh" }}>
          <Header 
            onSidebarToggle={toggleSidebar}
            activeMenu={activeMenu}
            sidebarOpen={sidebarOpen}
            onProfileClick={() => setShowProfileModal(true)}
          />
          <ProfileModal
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            

            
          />
          <main className="section is-flex-grow-1" style={{ padding: "2rem", overflowY: "auto", background: "linear-gradient(135deg, #f5f7fa 0%, #e0e5ec 100%)" }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
