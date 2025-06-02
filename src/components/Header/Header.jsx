  import { useState, useEffect } from "react";
  import {
    Menu, ChevronLeft, Search, Bell, MessageSquare, Eye, Shield
  } from "lucide-react";
  import { getPageTitle, getPageSubtitle } from "../utils/pageMeta"; // Adjust the import path as necessary
  import createAxiosJWT from "../utils/axiosInterceptor"; // Adjust the import path as necessary
  import useRefreshToken from "../utils/useRefreshToken"; // Adjust the import path as necessary
  import { refreshToken } from "../utils/auth"; // Adjust the import path as necessary
  import { useNavigate } from "react-router-dom"; // Adjust the import path as necessary

  const Header = ({ onSidebarToggle, activeMenu, sidebarOpen, onProfileClick }) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const navigate = useNavigate();
    const axiosJWT = createAxiosJWT(token, expire, setToken, setName, setEmail, setRole, setExpire, navigate, refreshToken);
    useRefreshToken(setToken, setName, setEmail, setRole, setExpire);// Initialize axios interceptor with setName
    return (
      <nav className="navbar has-background-white" style={{
        borderBottom: "1px solid #e8e8e8",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 30, // Ensure this is higher than sidebar content but lower than mobile overlay
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255,255,255,0.95)"
      }}>
        <div className="navbar-brand">
          <div className="navbar-item">
            <button
              className="button is-ghost mr-3"
              onClick={onSidebarToggle}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              style={{
                border: "none",
                borderRadius: "12px",
                padding: "0.75rem"
              }}
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h2 className="title has-text-grey-dark is-4 mb-1">{getPageTitle(activeMenu)}</h2>
              <p className="has-text-grey is-size-7">{getPageSubtitle(activeMenu)}</p>
            </div>
          </div>
          {/* Navbar burger for mobile - Bulma standard */}
          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => {
            const target = document.getElementById('navbarBasicExample');
            target.classList.toggle('is-active');
          }}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          {/* <div className="navbar-start">
              Hide on touch for cleaner mobile nav
            <div className="navbar-item is-hidden-touch"> 
              <div className="control has-icons-left">
                <input className="input is-rounded" type="text" placeholder="Cari senjata, personel..." />
                <span className="icon is-left">
                  <Search size={16} />
                </span>
              </div>
            </div>
          </div> */}

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <button className="button is-ghost" style={{ borderRadius: "50%" }} aria-label="Notifications">
                    <Bell size={18} />
                  </button>
                </p>
                <p className="control">
                  <button className="button is-ghost" style={{ borderRadius: "50%" }} aria-label="Messages">
                    <MessageSquare size={18} />
                  </button>
                </p>
                <p className="control">
                  <button className="button is-light is-rounded" onClick={onProfileClick}>
                    <span className="icon">
                      <Eye size={16} />
                    </span>
                    <span>{name}</span>
                  </button>
                </p>
                <p className="control">
                  <span className="tag is-primary is-medium" style={{ borderRadius: "20px" }}>
                    <span className="icon">
                      <Shield size={14} />
                    </span>
                    <span>{role}</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  export default Header;