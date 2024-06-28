import { logo_cbta } from '../../../assets/images';
import  { useContext } from 'react'
import { AuthContext } from '../../../Auto/Auth';
import {useNavigate} from 'react-router-dom'
import './NavbarDashboard.css';
// eslint-disable-next-line react/prop-types
export default function NavbarDashboard({ onButtonClick }) {
  const history = useNavigate();
  const {isAuthenticated,logout} = useContext(AuthContext)
  if (!isAuthenticated) {
    return <div>No has iniciado sesión</div>;
  }
  const cerrarSesion = () => {
   logout();
   history('/');
 };
  return (
    <div className="navbar-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo_cbta} alt="CRM Logo" className="logo" />
          <h3>EDU CONTROL</h3>
        </div>
        <ul className="menu">
          <li className="menu-item" onClick={() => onButtonClick('dashboard')}>
            <span>Dashboard</span>
          </li>
          <li className="menu">
            <span className="menu-item" onClick={() => onButtonClick('profiledashboardadmin')}>Perfil</span>
          </li>
          <li className="menu-item dropdown">
            <span className="dropdown-toggle">Credenciales Escolares</span>
            <ul className="dropdown-menu2">
              <li className="dropdown-item2"onClick={() => onButtonClick('createcredential')}><a href="#">Crear</a></li>
              <li className="dropdown-item2"onClick={() => onButtonClick('viewcredential')}><a href="#">Visualizar</a></li>
              <li className="dropdown-item2"><a href="#">Diseños de las Credenciales</a></li>
            </ul>
          </li>
          <li className="menu-item dropdown">
            <span className="dropdown-toggle">Horario Escolares</span>
            <ul className="dropdown-menu2">
              <li className="dropdown-item2" onClick={() => onButtonClick('createschedule')}><a href="#">Asignar</a></li>
              <li className="dropdown-item2" onClick={() => onButtonClick('viewschedule')}><a href="#">Visualizar</a></li>
            </ul>
          </li>
          <li className="menu-item dropdown">
            <span className="dropdown-toggle">Informacion Escolares</span>
            <ul className="dropdown-menu2">
              <li className="dropdown-item2"onClick={() => onButtonClick('infoalumn')}><a href="#">Alumnos</a></li>
              <li className="dropdown-item2"onClick={() => onButtonClick('infodocent')}><a href="#">Docentes</a></li>
              <li className="dropdown-item2"><a href="#">Becas</a></li>
              <li className="dropdown-item2"><a href="#">Inscripcion</a></li>
            </ul>
          </li>
          <li className="menu-item dropdown">
            <span className="dropdown-toggle">Diseño del sitio web</span>
            <ul className="dropdown-menu2">
              <li className="dropdown-item2"><a href="#">Carrusel</a></li>
              <li className="dropdown-item2"><a href="#">Bienvenida</a></li>
              <li className="dropdown-item2"><a href="#"onClick={() => onButtonClick('misionyvision')}>Mision y Vision</a></li>
              <li className="dropdown-item2"><a href="#">Actividades escolares</a></li>
              <li className="dropdown-item2"><a href="#">Actividades culturales</a></li>
              <li className="dropdown-item2"><a href="#">Sobre Nosotros</a></li>
              <li className="dropdown-item2"><a href="#">Carreras Tecnicas</a></li>
            </ul>
          </li>
          <li className="menu-item">
            <span>Mensajes</span>
          </li>
          <li className="menu-item">
            <span>Configuracion</span>
          </li>
          <li className="menu-item">
            <span>Ayuda</span>
          </li>
          <li className="menu-item" onClick={cerrarSesion}>
            <span>Cerrar Sesion</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
