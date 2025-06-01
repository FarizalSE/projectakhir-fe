import React from "react";
import {
  Shield, Package, Users, FileText, LogOut, X, BarChart3
} from "lucide-react";
import { menuItems } from "../utils/navigationConfig"; // Adjust the import path as necessary

const SidebarContent = ({ activeMenu, onMenuClick }) => (
  <aside className="has-background-dark" style={{
    height: "100vh",
    padding: "1.5rem",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    borderRight: "1px solid rgba(255,255,255,0.1)",
    overflowY: "auto" // Ensure content is scrollable if it overflows
  }}>
    {/* Logo Section */}
    <div className="has-text-centered mb-6 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="has-background-primary-light p-3 mb-3" style={{
        borderRadius: "50%",
        width: "70px",
        height: "70px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <Shield size={32} className="has-text-white" />
      </div>
      <h1 className="title is-5 has-text-white mb-1">WeaponMS</h1>
      <p className="has-text-grey-light is-size-7">Management System</p>
    </div>

    {/* Navigation Menu */}
    {menuItems.map((category, categoryIndex) => (
      <div key={categoryIndex} className="mb-6">
        <p className="menu-label has-text-grey-light mb-3 is-size-7 has-text-weight-bold">
          {category.category}
        </p>
        <ul className="menu-list">
          {category.items.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeMenu === item.id;

            return (
              <li key={item.id} className="mb-2">
                <a
                  href="#!" // Use href for accessibility, prevent default if needed
                  className={`has-text-${isActive ? 'white' : 'grey-light'}`}
                  style={{
                    borderRadius: "12px",
                    padding: "12px 16px",
                    transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)"
                      : "transparent",
                    backdropFilter: isActive ? "blur(10px)" : "none",
                    border: isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                    transform: isActive ? "translateX(4px)" : "translateX(0)",
                    display: 'flex', // Added for better icon alignment
                    alignItems: 'center' // Added for better icon alignment
                  }}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent page jump from href="#!"
                    onMenuClick(item.id);
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      e.currentTarget.style.transform = "translateX(2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }
                  }}
                >
                  <span className="icon-text">
                    <span className="icon">
                      <IconComponent size={18} />
                    </span>
                    <span className="ml-3">{item.label}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    ))}
  </aside>
);

const Sidebar = ({ isOpen, onToggle, activeMenu, onMenuClick }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`is-hidden-touch`}
           style={{
             width: isOpen ? "300px" : "80px",
             transition: "width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
             position: "relative", // Changed from sticky to relative for layout
             zIndex: 10,
             height: "100vh" // Ensure it takes full height
           }}>
        {isOpen ? (
          <SidebarContent activeMenu={activeMenu} onMenuClick={onMenuClick} />
        ) : (
          <aside className="has-background-dark" style={{
            height: "100vh",
            padding: "1.5rem 1rem",
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            display: "flex", // Added for centering
            flexDirection: "column", // Added for centering
            alignItems: "center" // Added for centering
          }}>
            <div className="has-text-centered mb-6">
              <div className="has-background-primary-light p-2" style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              }}>
                <Shield size={24} className="has-text-white" />
              </div>
            </div>
            <ul className="menu-list" style={{ width: "100%"}}>
              {menuItems.reduce((acc, curr) => acc.concat(curr.items), []).map((item) => { // Flatten all items for collapsed view
                const IconComponent = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <li key={item.id} className="mb-3">
                    <a
                      href="#!"
                      className={`has-text-${isActive ? 'white' : 'grey-light'} is-flex is-justify-content-center`}
                      style={{
                        borderRadius: "12px",
                        padding: "12px",
                        background: isActive ? "rgba(102, 126, 234, 0.2)" : "transparent",
                        border: isActive ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent"
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        onMenuClick(item.id);
                      }}
                      title={item.label}
                    >
                      <IconComponent size={20} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="is-hidden-desktop" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
          backdropFilter: "blur(4px)"
        }} onClick={onToggle}>
          <div style={{
            width: "300px",
            height: "100vh",
            position: "relative", // was "fixed", should be relative to the overlay
            boxShadow: "5px 0px 15px rgba(0,0,0,0.2)" // Add some shadow
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 1001 }}>
              <button className="button is-dark is-rounded" onClick={onToggle} aria-label="Close sidebar">
                <X size={20} />
              </button>
            </div>
            <SidebarContent activeMenu={activeMenu} onMenuClick={onMenuClick} />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;