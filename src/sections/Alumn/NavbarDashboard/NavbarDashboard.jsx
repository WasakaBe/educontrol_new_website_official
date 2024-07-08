import { logo_cbta } from '../../../assets/images';
import  { useContext } from 'react'
import { AuthContext } from '../../../Auto/Auth';
import {useNavigate} from 'react-router-dom'
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
          <li className="menu-item" onClick={() => onButtonClick('dashboardalumn')}>
            <span>Dashboard</span>
          </li>
          <li className="menu-item dropdown">
            <span className="dropdown-toggle">Informacion</span>
            <ul className="dropdown-menu2">
            <li className="menu">
            <span className="menu-item" onClick={() => onButtonClick('profiledashboardalumn')}>Perfil</span>
          </li>
              <li className="dropdown-item2"onClick={() => onButtonClick('escolar')}><a href="#">Escolar</a></li>
              <li className="dropdown-item2"onClick={() => onButtonClick('personal')}><a href="#">Personal</a></li>
              <li className="dropdown-item2"onClick={() => onButtonClick('familiar')}><a href="#">Familiar</a></li>
            </ul>
          </li>
          <li className="menu-item dropdown">
            <span className="dropdown-toggle">Credencial</span>
            <ul className="dropdown-menu2">
              <li className="dropdown-item2"onClick={() => onButtonClick('viewcredentialsalumn')}><a href="#">Virtual</a></li>
              <li className="dropdown-item2"onClick={() => onButtonClick('createcredential')}><a href="#">Solicitar</a></li>
            </ul>
          </li>
          <li className="menu-item">
            <span>Horario de Clases</span>
          </li>
          <li className="menu-item">
            <span>Notificacion</span>
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
