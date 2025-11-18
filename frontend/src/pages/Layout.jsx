// Layout.jsx

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { IoMenu, IoClose } from "react-icons/io5";
import "../style/layout.css";
import "../style/sidebar.css";
import "../style/dashboardpage.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Ambil status tema dari Redux
  const isDarkTheme = useSelector((state) => state.theme.darkMode);

  // Set atribut `data-theme` ke <html> saat tema berubah
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar />

      <div className={`layout-container ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        {/* Tombol toggle di luar Sidebar tapi tetap sejajar */}
        <div className="sidebar-toggle-wrapper">
          <button className="sidebar-toggle-button ml-1" onClick={toggleSidebar}>
            {isSidebarOpen ? <IoClose size={20} /> : <IoMenu size={20} />}
          </button>
        </div>

        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="main-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
