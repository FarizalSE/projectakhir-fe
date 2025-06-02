import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../utils/constants.js';
import Footer from '../Footer/Footer.jsx';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        console.log("Login sukses:", response.data);
        navigate('/dashboardcontent');
      } else {
        console.log("Email dan password wajib diisi");
      }
    } catch (error) {
      console.error("Login gagal:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <section
      className="hero is-fullheight has-background-light"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e0e5ec 100%)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-desktop is-8-tablet">
              <div className="box" style={{
                borderRadius: "20px",
                padding: "2.5rem",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}>
                <h1 className="title has-text-centered has-text-grey-dark is-3 mb-5">Login ke WeaponMS</h1>
                <form onSubmit={userLogin}>
                  <div className="field">
                    <label className="label" htmlFor="email">Email</label>
                    <div className="control has-icons-left">
                      <input
                        id="email"
                        className="input is-rounded"
                        type="email"
                        placeholder="e.g. alex@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="password">Password</label>
                    <div className="control has-icons-left">
                      <input
                        id="password"
                        className="input is-rounded"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div className="field mt-5">
                    <div className="control">
                      <button type="submit" className="button is-primary is-fullwidth is-rounded">
                        <span className="icon is-left">
                          <i className="fas fa-sign-in-alt"></i>
                        </span>
                        <span>Login</span>
                      </button>
                    </div>
                  </div>

                  <p className="has-text-centered mt-4 is-size-7">
                    Belum punya akun? <a href="/register">Daftar di sini</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default LoginForm;
