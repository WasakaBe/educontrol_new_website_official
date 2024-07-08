import { useEffect, useState, useContext } from 'react';
import './Escolar.css';
import { apiUrl } from '../../../../constants/Api';
import { AuthContext } from '../../../../Auto/Auth';

export default function Escolar() {
  const [alumnoInfo, setAlumnoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayData, setDisplayData] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = user.id_usuario; // Obtener el ID del usuario autenticado del contexto
        const response = await fetch(`${apiUrl}/user/info/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener la información del usuario');
        }
        const data = await response.json();
        if (data.alumno) {
          setAlumnoInfo(data.alumno);
        }
        setLoading(false);
        setTimeout(() => {
          setDisplayData(true);
        }, 4000); // Mostrar los datos después de 12 segundos
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!displayData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="escolar-container">
      <h1>Información Escolar del Alumno</h1>
   
      {alumnoInfo && (
        <div className="alumno-info">
          <h2>Información del Alumno</h2>
          <table>
            <tbody>
              <tr>
                <th>Nombre:</th>
                <td>{alumnoInfo.nombre_alumnos} {alumnoInfo.app_alumnos} {alumnoInfo.apm_alumnos}</td>
              </tr>
              <tr>
                <th>Fecha de Nacimiento:</th>
                <td>{alumnoInfo.fecha_nacimiento_alumnos}</td>
              </tr>
              <tr>
                <th>CURP:</th>
                <td>{alumnoInfo.curp_alumnos}</td>
              </tr>
              <tr>
                <th>No. de Control:</th>
                <td>{alumnoInfo.nocontrol_alumnos}</td>
              </tr>
              <tr>
                <th>Seguro Social:</th>
                <td>{alumnoInfo.seguro_social_alumnos}</td>
              </tr>
              <tr>
                <th>Cuenta Credencial Fisico:</th>
                <td>{alumnoInfo.cuentacredencial_alumnos}</td>
              </tr>
              <tr>
                <th>Sexo:</th>
                <td>{alumnoInfo.sexo}</td>
              </tr>
              <tr>
                <th>Grado:</th>
                <td>{alumnoInfo.grado_alumnos}</td>
              </tr>
              <tr>
                <th>Grupo:</th>
                <td>{alumnoInfo.grupo_alumnos}</td>
              </tr>
              <tr>
                <th>Carrera Técnica:</th>
                <td>{alumnoInfo.carrera_tecnica_alumnos}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
