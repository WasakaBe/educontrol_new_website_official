import {useState,useContext,useEffect} from 'react'
import {AuthContext} from '../../Auto/Auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AlumnDashboard, CredentialsAlumn, Escolar, Familiar, NavbarDashboard, Personal, ProfileAlumnDashboard } from '../../sections/Alumn';
import { InfoAlumn } from '../../sections/InfoSchool';
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
      {currentPanel === 'infoalumn' && <InfoAlumn/>}
      {currentPanel === 'viewcredentialsalumn' && <CredentialsAlumn/>}
      {currentPanel === 'escolar' && <Escolar/>}
      {currentPanel === 'personal' && <Personal/>}
      {currentPanel === 'familiar' && <Familiar/>}
    </div>
  )
}
