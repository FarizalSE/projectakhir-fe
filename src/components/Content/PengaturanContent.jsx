import React from "react";

const PengaturanContent = () => (
  <div className="container is-max-widescreen">
    <div className="box" style={{ borderRadius: "20px", padding: "2rem" }}>
      <h2 className="title is-3">Pengaturan Sistem</h2>
      <p>Halaman pengaturan sistem akan ditampilkan di sini. Konfigurasikan preferensi aplikasi, integrasi, dan lainnya.</p>
        {/* Example placeholder content */}
      <div className="mt-5">
        <label className="checkbox">
          <input type="checkbox" />
          Aktifkan Notifikasi Email
        </label>
      </div>
    </div>
  </div>
);

export default PengaturanContent;