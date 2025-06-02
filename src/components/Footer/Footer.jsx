import React from "react";
import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="footer" style={{
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    borderTop: "1px solid rgba(255,255,255,0.1)",
    padding: "3rem 1.5rem" // Default Bulma footer padding
    // position: "sticky", // Removed sticky, as main content area will handle scrolling
    // bottom: 0,
    // zIndex: 20
  }}>
    <div className="content">
      <div className="container">
        <div className="columns">
          <div className="column is-4">
            <div className="is-flex is-align-items-center mb-4">
              <div className="has-background-primary-light p-2 mr-3" style={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              }}>
                <Shield size={24} className="has-text-white" />
              </div>
              <div>
                <h4 className="title is-5 has-text-white mb-0">WeaponMS</h4>
                <p className="has-text-grey-light is-size-7">Management System</p>
              </div>
            </div>
            <p className="has-text-grey-light">
              Sistem manajemen gudang senjata yang aman, efisien, dan terpercaya.
            </p>
          </div>
          <div className="column is-4">
            <h5 className="title is-6 has-text-white mb-3">Kontak Support</h5>
            <div className="content has-text-grey-light">
              <p className="mb-2">📧 support@weaponms.com</p>
              <p className="mb-2">📞 +62 274 123-4567</p>
              <p className="mb-2">🕒 24/7 Emergency Support</p>
            </div>
          </div>
          <div className="column is-4">
            <h5 className="title is-6 has-text-white mb-3">Keamanan</h5>
            <div className="content has-text-grey-light">
              <p className="mb-2">🔒 End-to-end Encryption</p>
              <p className="mb-2">🛡️ ISO 27001 Certified</p>
              <p className="mb-2">✅ Military-grade Security</p>
            </div>
          </div>
        </div>
        <hr style={{ backgroundColor: "rgba(255,255,255,0.1)", height: "1px", margin: "2rem 0" }} />
        <div className="has-text-centered">
          <p className="has-text-grey-light">
            © {new Date().getFullYear()} Weapon Management System. All rights reserved.
            <span className="ml-2">🇮🇩 Made in Indonesia</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;