import { AdminDashboard, MisionVision, NavbarDashboard, ProfileAdminDashboard } from "../../sections/Admin";
import {useState,useContext,useEffect} from 'react'
import {AuthContext} from '../../Auto/Auth'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CredentialsCreate, CredentialsView } from "../../sections/Credentials";
import { SchedulesCreate, SchedulesView } from "../../sections/Schedules";
import { InfoAlumn, InfoDocent } from "../../sections/InfoSchool";
export default function Admin() {
  const [currentPanel, setCurrentPanel] = useState('dashboard');
  const { isAuthenticated, user } = useContext(AuthContext);
  const history = useNavigate();
  const handleButtonClick = (panel) => {
    setCurrentPanel(panel);
  };
  useEffect(() => {
    // Verificar si el usuario está autenticado y tiene el rol de administrador
    if (!isAuthenticated || user?.idRol !== 1) {
      history('/');
      toast.error('No tienes permisos de administrador.');
    }
  }, [isAuthenticated, user, history]);

  return (
    <div style={{ display: 'flex'}}>
      <NavbarDashboard onButtonClick={handleButtonClick} />
        {currentPanel === 'dashboard' && <AdminDashboard/>}
        {currentPanel === 'profiledashboardadmin' && <ProfileAdminDashboard/>}
        {currentPanel === 'viewcredential' && <CredentialsView/>}
        {currentPanel === 'createcredential' && <CredentialsCreate/>}
        {currentPanel === 'viewschedule' && <SchedulesView/>}
        {currentPanel === 'createschedule' && <SchedulesCreate/>}
        {currentPanel === 'infoalumn' && <InfoAlumn/>}
        {currentPanel === 'infodocent' && <InfoDocent/>}
        {currentPanel === 'misionyvision' && <MisionVision/>}
        
    </div>
  )
}
