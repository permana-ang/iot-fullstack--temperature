import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import logo from "../logo.png";
import "../style/sidebar.css";

const Navbar = () => {
  const isDark = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar is-fixed-top has-shadow mb-4" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item" style={{ marginLeft: "25px" }}>
            <img src={logo} width="142" height="28" alt="logo" />
          </NavLink>

          <a
            href="!#"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            {/* Tombol Toggle Tema */}
            <div className="navbar-item">
              <button
                className="button is-small is-primary"
                onClick={() => dispatch(toggleTheme())}
              >
                {isDark ? "☀ Light" : "🌙 Dark"}
              </button>
            </div>

            {/* Tombol Logout */}
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-light">Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
