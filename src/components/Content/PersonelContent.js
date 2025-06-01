import React from "react";



const PersonelContent = () => (
  <div className="container is-max-widescreen">
    <div className="box" style={{ borderRadius: "20px", padding: "2rem" }}>
      <h2 className="title is-3">Manajemen Personel</h2>
      <p>Halaman manajemen personel akan ditampilkan di sini. Anda bisa mengelola data pengguna, hak akses, dan lainnya.</p>
      {/* Example placeholder content */}
      <div className="mt-5">
        <button className="button is-primary">Tambah Personel Baru</button>
      </div>
    </div>
  </div>
);

export default PersonelContent;