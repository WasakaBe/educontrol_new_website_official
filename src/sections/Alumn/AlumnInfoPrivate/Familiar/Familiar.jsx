import  { useEffect, useState, useContext } from 'react';
import { apiUrl } from '../../../../constants/Api';
import { AuthContext } from '../../../../Auto/Auth';

export default function Familiar() {
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
      <h1>Información Familiar del  Alumno</h1>
      {alumnoInfo && (
        <div className="alumno-info">
          <h2>Información del Alumno</h2>

          <table>
            <tbody>
              <tr>
                <th>Nombre del Familiar del Alumno:</th>
                <td>{alumnoInfo.nombre_familiar_alumno} {alumnoInfo.app_familiar_alumno} {alumnoInfo.apm_familiar_alumno}</td>
              </tr>
              <tr>
                <th>Relacion del Familiar:</th>
                <td>{alumnoInfo.relacionfamiliar}</td>
              </tr>
           
              <tr>
                <th>Numero telefonico del familiar:</th>
                <td>{alumnoInfo.numero_telefono_familiar_alumno}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
