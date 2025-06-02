import React, { useState } from 'react';
import { Shield, Lock, Users, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const WeaponManagementLanding = () => {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/90 backdrop-blur border-b border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">SecureArms Management</h1>
            </div>
            <div className="space-x-4">
              <button 
                onClick={() => openModal('login')}
                className="px-6 py-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => openModal('register')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Shield className="h-20 w-20 text-blue-400 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-white mb-6">
              Sistem Manajemen Senjata
              <span className="block text-blue-400 mt-2">Profesional & Aman</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Platform terpercaya untuk manajemen inventori senjata api dengan standar keamanan tinggi, 
              tracking real-time, dan compliance penuh terhadap regulasi.
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mt-12">
            <button 
              onClick={() => openModal('register')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Mulai Sekarang
            </button>
            <button 
              onClick={() => openModal('demo')}
              className="px-8 py-4 border-2 border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white rounded-lg font-semibold text-lg transition-all"
            >
              Lihat Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-slate-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Fitur Utama</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <Lock className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Keamanan Tinggi</h3>
              <p className="text-slate-400">Enkripsi end-to-end dan autentikasi multi-faktor untuk melindungi data sensitif.</p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <FileText className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Tracking Lengkap</h3>
              <p className="text-slate-400">Pelacakan real-time lokasi, status, dan riwayat penggunaan setiap senjata.</p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <Users className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Manajemen User</h3>
              <p className="text-slate-400">Kontrol akses berlevel dengan permission management yang fleksibel.</p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
              <CheckCircle className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">Compliance</h3>
              <p className="text-slate-400">Memenuhi standar regulasi internasional dan audit trail lengkap.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="bg-amber-900/20 border border-amber-600/30 rounded-xl p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4">Keamanan & Compliance</h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Sistem ini dirancang khusus untuk institusi resmi dengan izin pengelolaan senjata api. 
              Semua aktivitas dilog dan diaudit sesuai dengan regulasi keamanan nasional.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 px-6 border-t border-slate-700">
        <div className="container mx-auto text-center text-slate-400">
          <p>&copy; 2025 SecureArms Management System. Sistem Keamanan Profesional.</p>
        </div>
      </footer>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full border border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {activeModal === 'login' ? 'Login' : activeModal === 'register' ? 'Register' : 'Demo Request'}
              </h2>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            {activeModal === 'login' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-2">Email/Username</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Masukkan email atau username"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Password</label>
                  <input 
                    type="password" 
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Masukkan password"
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Login
                </button>
              </div>
            )}
            
            {activeModal === 'register' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Masukkan email"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Institusi/Organisasi</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Nama institusi"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2">Password</label>
                  <input 
                    type="password" 
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Buat password"
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  Daftar
                </button>
              </div>
            )}
            
            {activeModal === 'demo' && (
              <div className="text-center">
                <p className="text-slate-300 mb-6">
                  Untuk demo sistem, silakan hubungi tim kami untuk verifikasi kebutuhan institusi Anda.
                </p>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors">
                    Hubungi Sales
                  </button>
                  <button 
                    onClick={closeModal}
                    className="w-full border border-slate-600 text-slate-300 py-3 rounded-lg font-semibold hover:border-slate-500 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeaponManagementLanding;