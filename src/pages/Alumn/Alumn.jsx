import {useState,useContext,useEffect} from 'react'
import {AuthContext} from '../../Auto/Auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AlumnDashboard, NavbarDashboard, ProfileAlumnDashboard } from '../../sections/Alumn';
export default function Alumn() {
  const [currentPanel, setCurrentPanel] = useState('dashboardalumn');
  const { isAuthenticated, user } = useContext(AuthContext);
  const history = useNavigate();
  const handleButtonClick = (panel) => {
    setCurrentPanel(panel);
  };
  useEffect(() => {
    // Verificar si el usuario está autenticado y tiene el rol de administrador
    if (!isAuthenticated || user?.idRol !== 2) {
      history('/');
      toast.error('No tienes permisos de alumno.');
    }
  }, [isAuthenticated, user, history]);

  return (
    <div style={{ display: 'flex'}}>
      <NavbarDashboard onButtonClick={handleButtonClick} />
      {currentPanel === 'dashboardalumn' && <AlumnDashboard/>}
      {currentPanel === 'profiledashboardalumn' && <ProfileAlumnDashboard/>}
    </div>
  )
}
