import { AdminDashboard, NavbarDashboard } from "../../sections/Admin";
import {useState} from 'react'
export default function Admin() {
  const [currentPanel, setCurrentPanel] = useState('dashboard');
  const handleButtonClick = (panel) => {
    setCurrentPanel(panel);
  };
  return (
    <div style={{ display: 'flex'}}>
      <NavbarDashboard onButtonClick={handleButtonClick} />
        {currentPanel === 'dashboard' && <AdminDashboard/>}
    </div>
  )
}
