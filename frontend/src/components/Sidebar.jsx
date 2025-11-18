import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoHome,
  IoLogOut,
  IoInformationCircle,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import "../style/sidebar.css";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const access = user?.access;

  const [isBUMenuOpen, setIsBUMenuOpen] = useState(false);
  const [isSUMenuOpen, setIsSUMenuOpen] = useState(false);
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);

  const Logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isAdministrator = user?.role === "administrator";
  const isAdminBU = user?.role === "adminBU" && access?.businessUnit;
  const isAdminSU = user?.role === "adminSU" && access?.subUnit;
  const isAdminBranch = user?.role === "adminBranch" && access?.branch;

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
      <aside className="menu">
        <p className="menu-label">{isSidebarOpen && "General"}</p>
        <ul className="menu-list">
          <li>
            <NavLink to="/dashboard">
              <IoHome />
              {isSidebarOpen && <span>&nbsp;Dashboard</span>}
            </NavLink>
          </li>
        </ul>

        {isAdministrator && ( //// list open menu sensor Bisnis unit
          <>
            <p className="menu-label">{isSidebarOpen && "Business Unit"}</p>
            <ul className="menu-list">
              <li
                className={`nav-item has-treeview ${
                  isBUMenuOpen ? "menu-is-opening menu-open" : ""
                }`}
              >
                <button
                  onClick={() => {
                    // Jika sidebar tertutup, buka dulu baru expand menu
                    if (!isSidebarOpen) {
                      setIsSidebarOpen(true);
                      setTimeout(() => setIsBUMenuOpen(true), 200); // delay agar animasi halus
                    } else {
                      setIsBUMenuOpen(!isBUMenuOpen);
                    }
                  }}
                  className={`nav-link is-flex is-align-items-center menu-button
                  ${!isSidebarOpen ? "is-justify-content-center" : ""}
                  ${isBUMenuOpen ? "is-active" : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  <IoInformationCircle />

                  {isSidebarOpen && (
                    <span className="ml-2">Sensors Bisnis Unit</span>
                  )}

                  {isSidebarOpen && (
                    <span className="icon is-small ml-auto">
                      {isBUMenuOpen ? "▾" : "▸"}
                    </span>
                  )}
                </button>

                <ul
                  style={{
                    display: isSidebarOpen && isBUMenuOpen ? "block" : "none",
                  }}
                >
                  <li>
                    <NavLink to="/sensors/bu/cemindo" className="nav-link">
                      {isSidebarOpen && <span>&nbsp;&nbsp;&nbsp;Cemindo</span>}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/sensors/bu/plantation" className="nav-link">
                      {isSidebarOpen && (
                        <span>&nbsp;&nbsp;&nbsp;Plantation</span>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/sensors/bu/downstream" className="nav-link">
                      {isSidebarOpen && (
                        <span>&nbsp;&nbsp;&nbsp;Downsteam</span>
                      )}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/sensors/bu/property" className="nav-link">
                      {isSidebarOpen && <span>&nbsp;&nbsp;&nbsp;Property</span>}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        )}

        {(isAdministrator || isAdminBU) && (
          <>
            <p className="menu-label">{isSidebarOpen && "Admin"}</p>
            <ul className="menu-list">
              <li>
                <NavLink to="/users">
                  <IoPerson />
                  {isSidebarOpen && <span>&nbsp;Users</span>}
                </NavLink>
              </li>
              <li>
                <NavLink to="/sensors/add">
                  <IoInformationCircle />
                  {isSidebarOpen && <span>&nbsp;Sensors</span>}
                </NavLink>
              </li>
            </ul>
          </>
        )}

        {isAdminSU && (
          <>
            <p className="menu-label">{isSidebarOpen && "Sub Unit"}</p>
            <ul className="menu-list">
              <li
                className={`nav-item has-treeview ${
                  isSUMenuOpen ? "menu-is-opening menu-open" : ""
                }`}
              >
                <div
                  onClick={() => setIsSUMenuOpen(!isSUMenuOpen)}
                  className="nav-link is-flex is-align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <IoInformationCircle />
                  {isSidebarOpen && (
                    <span className="ml-2">
                      Sensors {access?.subUnit || "SU"}
                    </span>
                  )}
                  {isSidebarOpen && (
                    <span className="icon is-small ml-auto">
                      {isSUMenuOpen ? "▾" : "▸"}
                    </span>
                  )}
                </div>
                <ul style={{ display: isSUMenuOpen ? "block" : "none" }}>
                  <li>
                    <NavLink to="/sensors/su" className="nav-link">
                      {isSidebarOpen && (
                        <span>&nbsp;&nbsp;&nbsp;List SU Sensor</span>
                      )}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        )}

        {isAdminBranch && (
          <>
            <p className="menu-label">{isSidebarOpen && "Branch"}</p>
            <ul className="menu-list">
              <li
                className={`nav-item has-treeview ${
                  isBranchMenuOpen ? "menu-is-opening menu-open" : ""
                }`}
              >
                <div
                  onClick={() => setIsBranchMenuOpen(!isBranchMenuOpen)}
                  className="nav-link is-flex is-align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <IoInformationCircle />
                  {isSidebarOpen && (
                    <span className="ml-2">
                      Sensors {access?.branch || "Branch"}
                    </span>
                  )}
                  {isSidebarOpen && (
                    <span className="icon is-small ml-auto">
                      {isBranchMenuOpen ? "▾" : "▸"}
                    </span>
                  )}
                </div>
                <ul style={{ display: isBranchMenuOpen ? "block" : "none" }}>
                  <li>
                    <NavLink to="/sensors/branch" className="nav-link">
                      {isSidebarOpen && (
                        <span>&nbsp;&nbsp;&nbsp;List Branch Sensor</span>
                      )}
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        )}

        <p className="menu-label">{isSidebarOpen && "Settings"}</p>
        
        <ul className="menu-list">
          <li>
            <NavLink to="/Geography">
              <MapOutlinedIcon />
              {isSidebarOpen && <span>&nbsp;Geography</span>}
            </NavLink>
          </li>
        </ul>
        
        <ul className="menu-list">
          <li>
            <NavLink to="/kalender">
              <CalendarTodayOutlinedIcon />
              {isSidebarOpen && <span>&nbsp;Kalender</span>}
            </NavLink>
          </li>
        </ul>
        <ul className="menu-list">
          <li>
            <button onClick={Logout} className="button is-white">
              <IoLogOut />
              {isSidebarOpen && <span>&nbsp;Log Out</span>}
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
