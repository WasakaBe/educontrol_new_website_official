// Navbar.js
import  { useState } from 'react';
import { logo_cbta } from '../../../assets/images';
import './Navbar.css';
import Login from '../../../forms/Login/Login';

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo">
            <img src={logo_cbta} alt="Logo" className="navbar-logo-img" />
            <span>EduControl</span>
          </a>
          <button className="navbar-toggler" onClick={() => document.querySelector('.navbar-menu').classList.toggle('active')}>
            ☰
          </button>
          <ul className="navbar-menu">
            <li className="navbar-item"><a href="#">Inicio</a></li>
            <li className="navbar-item"><a href="#Acerca">Acerca</a></li>
            <li className="navbar-item dropdown">
              <a href="#" className="dropdown-toggle">Servicios</a>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><a href="#Inscripcion">Inscripción</a></li>
                <li className="dropdown-item"><a href="#">Reinscripción</a></li>
                <li className="dropdown-item dropdown-submenu">
                  <a href="#">Escolares</a>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item"><a href="#">Becas</a></li>
                    <li className="dropdown-item"><a href="#">Titulación</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="navbar-item"><a href="#Contact">Contacto</a></li>
            <li className="navbar-item">
              <a href="#" onClick={() => setShowLoginModal(true)}>Iniciar Sesión</a>
            </li>
          </ul>
        </div>
      </nav>
      {showLoginModal && <Login onClose={() => setShowLoginModal(false)} />}
    </>
  );
}
