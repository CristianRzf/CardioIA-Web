import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../assets/CardioIA.png";


function Header() {
  return (
    <header className="header">
      <nav className="nav-container">
        <div className="logo">
          <img src={logo} alt="CardioIA" className="logo-image" />
          <Link to="/" className="logo-text">
            CardioIA
          </Link>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Evaluación
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;