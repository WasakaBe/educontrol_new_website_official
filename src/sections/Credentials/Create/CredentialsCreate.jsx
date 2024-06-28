import { useState } from 'react';
import './CredentialsCreate.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from '../../../constants/Api';
import { logo_cbta, logo_programacion, logoeducacion, mujer } from '../../../assets/images';
import CredentialsView from '../View/CredentialsView';
export default function CredentialsCreate() {
  const [noControl, setNoControl] = useState('');
  const [alumno, setAlumno] = useState(null);
  const [currentPanel, setCurrentPanel] = useState('create');
  const handleInputChange = (e) => {
    setNoControl(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}alumnos/nocontrol/${noControl}`);
      if (response.ok) {
        const data = await response.json();
        setAlumno(data);
        toast.success('Alumno encontrado');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Error al buscar el alumno');
        setAlumno(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error al buscar el alumno');
      setAlumno(null);
    }
  };

  if (currentPanel === 'viewcredential') {
   return <CredentialsView/>;
 }

  const handleCreate = async () => {
   try {
     const response = await fetch(`${apiUrl}credenciales_escolares/insert`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         nombre_credencial_escolar: alumno.nombre_alumnos,
         app_credencial_escolar: alumno.app_alumnos,
         apm_credencial_escolar: alumno.apm_alumnos,
         carrera_credencial_escolar: alumno.carrera_tecnica_alumnos,
         grupo_credencial_escolar: alumno.grupo_alumnos,
         curp_credencial_escolar: alumno.curp_alumnos,
         nocontrol_credencial_escolar: alumno.nocontrol_alumnos,
         segsocial_credencial_escolar: alumno.seguro_social_alumnos,
         idalumnocrede: alumno.id_alumnos
       }),
     });
     if (response.ok) {
       toast.success('Credencial creada exitosamente');
       setCurrentPanel('viewcredential');
     } else {
       const errorData = await response.json();
       toast.error(errorData.error || 'Error al crear la credencial');
     }
   } catch (error) {
     console.error('Error creating credential:', error);
     toast.error('Error al crear la credencial');
   }
 };

 const handleCancel = () => {
  setAlumno(null);
  setNoControl('');
};

  return (
   <div className='container-credential-create'>
        <div className="credentials-create-container">
      <h2>Crear Credencial Escolar</h2>
      <form onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="noControl">Número de Control</label>
          <input
            type="text"
            id="noControl"
            value={noControl}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="search-button">Buscar</button>
      </form>
    </div>
    
    {alumno && (
<div style={{display:'block'}}>
<div className='card-credential2'>
      <div className='card-section-logo2'>
        <img src={logoeducacion} alt='Logo SEP' className='img1' />
        <img src={logo_cbta} alt='Logo CBTA' className='img2' />
      </div>
      <div className='back-fondo2'>
        <div className='card-section-dates-alumn2'>
          <img src={mujer} alt='Foto del alumno' />
          <div className='card-subsection-dates-alumn2'>
            <span>{`${alumno.nombre_alumnos} ${alumno.app_alumnos} ${alumno.apm_alumnos}`}</span>
            <img src={logo_programacion} alt='Logo de la carrera del alumno' />
          </div>
        </div>
        <div className='card-subsection-dates-alumn-bottom2'>
          <h2>{alumno.carrera_tecnica_alumnos}</h2>
          <div className='sub-group1'>
            <span>GRUPO:</span>
            <h3>{alumno.grupo_alumnos}</h3>
          </div>
          <div className='sub-group2'>
            <span>CURP:</span>
            <h3>{alumno.curp_alumnos}</h3>
          </div>
          <div className='sub-group2'>
            <span>NO DE CONTROL:</span>
            <h3>{alumno.nocontrol_alumnos}</h3>
          </div>
          <div className='sub-group2'>
            <span>SEGURO SOCIAL:</span>
            <h3>{alumno.seguro_social_alumnos}</h3>
          </div>
        </div>
      </div>
    </div>
    <div className='credential-buttons'>
        <button className='save-button' onClick={handleCreate}>Crear</button>
        <button className='cancel-button' onClick={handleCancel}>Cancelar</button>
      </div>

</div>
      )}

<ToastContainer />
   </div>
  );
}
