export const pageTitles = {
  dashboard: "Dashboard",
  inventori: "Inventori Senjata",
  personel: "Manajemen Personel",
  laporan: "Laporan & Analitik",
  pengaturan: "Pengaturan Sistem"
};

export const pageSubtitles = {
  dashboard: "Sistem Manajemen Gudang Senjata",
  inventori: "Kelola dan Monitor Inventori Senjata",
  personel: "Kelola Data Personel dan Akses",
  laporan: "Analitik dan Pelaporan Komprehensif",
  pengaturan: "Konfigurasi dan Pengaturan Sistem"
};

export const getPageTitle = (menu) => pageTitles[menu] || "Dashboard";
export const getPageSubtitle = (menu) => pageSubtitles[menu] || "Sistem Manajemen Gudang Senjata";

