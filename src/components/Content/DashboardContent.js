import React from "react";
import {
  Package, Shield, AlertTriangle, Users, Activity, BarChart3, TrendingUp
} from "lucide-react";

const DashboardContent = () => {
  const stats = [
    { icon: Package, title: "1,247", subtitle: "Total Senjata", color: "primary", trend: "+12", trendColor: "success" },
    { icon: Shield, title: "892", subtitle: "Tersedia", color: "success", trend: "+5", trendColor: "success" },
    { icon: AlertTriangle, title: "45", subtitle: "Maintenance", color: "warning", trend: "-3", trendColor: "danger" },
    { icon: Users, title: "23", subtitle: "Pengguna Aktif", color: "info", trend: "+2", trendColor: "success" }
  ];

  return (
    <div className="container is-max-widescreen"> {/* Use is-max-widescreen for better width on large screens */}
      {/* Welcome Banner */}
      <div className="box mb-2" style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        border: "none",
        borderRadius: "20px",
        position: "relative",
        overflow: "hidden",
        padding: "2.5rem" // Added padding
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(25%, -25%)"
        }}></div>
        <div className="content has-text-white" style={{ position: "relative", zIndex: 2 }}>
          <div className="columns is-vcentered">
            <div className="column">
              <h3 className="title is-3 has-text-white mb-3">Selamat Datang! 👋</h3>
              <p className="has-text-white-ter is-size-5 mb-4">
                Monitor dan kelola inventori senjata dengan aman dan efisien
              </p>
              <div className="buttons">
                <button className="button is-white is-rounded">
                  <span className="icon">
                    <Activity size={16} />
                  </span>
                  <span>Lihat Aktivitas</span>
                </button>
                <button className="button is-white is-outlined is-rounded">
                  <span className="icon">
                    <BarChart3 size={16} />
                  </span>
                  <span>Analytics</span>
                </button>
              </div>
            </div>
            <div className="column is-narrow is-hidden-mobile">
              <div className="has-background-white-ter p-5" style={{
                borderRadius: "20px",
                opacity: "0.15",
                transform: "rotate(-10deg)"
              }}>
                <Activity size={64} className="has-text-white"/> {/* Ensure icon has color contrast */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Statistics */}
      <div className="columns is-multiline mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="column is-6-tablet is-3-desktop">
            <div className="box" style={{
              borderRadius: "20px",
              border: "none",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              height: "100%" // Make boxes of same height
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.1)";
              }}>
              <div className="is-flex is-justify-content-space-between is-align-items-start mb-4">
                <div className={`p-3 has-background-${stat.color}-light`} style={{ // Use Bulma color light variants
                  borderRadius: "16px",
                  // opacity: "0.1", // Removed, use light variant for bg
                  // background: `linear-gradient(135deg, var(--bulma-${stat.color}) 0%, var(--bulma-${stat.color}-dark) 100%)` // simplified
                }}>
                  <stat.icon size={28} className={`has-text-${stat.color}`} />
                </div>
                <span className={`tag is-small is-${stat.trendColor}`} style={{ borderRadius: "20px" }}>
                  <TrendingUp size={12} style={{ transform: stat.trendColor === 'danger' ? 'rotate(180deg)' : 'none' }} />
                  <span className="ml-1">{stat.trend}</span>
                </span>
              </div>
              <div>
                <p className="title is-2 mb-2" style={{ fontWeight: "800" }}>{stat.title}</p>
                <p className="subtitle is-6 has-text-grey-dark">{stat.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;