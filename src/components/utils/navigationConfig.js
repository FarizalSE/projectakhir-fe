import {
    Package, Users, FileText, LogOut, BarChart3
} from "lucide-react";

export const menuItems = [
  {
    category: "NAVIGASI UTAMA",
    items: [
      { id: "dashboard", label: "Dashboard", icon: BarChart3 },
      { id: "inventori", label: "Inventori", icon: Package },
      { id: "admin", label: "Laporan Petugas", icon: Users },
      { id: "laporan", label: "Laporan", icon: FileText },
    ]
  },
  {
    category: "SISTEM",
    items: [
      { id: "keluar", label: "Keluar", icon: LogOut },
    ]
  }
];

// Untuk routing
export const routeMap = {
  dashboard: "/dashboardcontent",
  inventori: "/inventoricontent",
  admin: "/personilcontent",
  laporan: "/laporancontent",
  pengaturan: "/pengaturancontent"
};

export const flatMenuItems = menuItems.flatMap(cat => cat.items);

