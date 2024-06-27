import './AdminDashboard.css';
import { useLocation } from 'react-router-dom';

export default function AdminDashboard() {
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div className='admin-container-dashboard'>
       <h2>Dashboard Administrador</h2>
       <div className='admin-subcontainer-dashboard'>
          <h3>Bienvenido {username}</h3>
       </div>
    </div>
  );
}
