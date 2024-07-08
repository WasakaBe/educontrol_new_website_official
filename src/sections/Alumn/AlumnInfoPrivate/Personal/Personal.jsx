import  { useEffect, useState, useContext } from 'react';
import { apiUrl } from '../../../../constants/Api';
import { AuthContext } from '../../../../Auto/Auth';

export default function Personal() {
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
      <h1>Información Personal del  Alumno</h1>
      {alumnoInfo && (
        <div className="alumno-info">
          <h2>Información del Alumno</h2>

          <table>
            <tbody>
              <tr>
                <th>Ubicacion de vivienda:</th>
                <td>{alumnoInfo.calle_alumnos} ,{alumnoInfo.comunidad_alumnos} ,{alumnoInfo.municipio_alumnos} ,{alumnoInfo.estado_alumnos} ,{alumnoInfo.pais_alumnos}</td>
              </tr>
              <tr>
                <th>Traslado:</th>
                <td>{alumnoInfo.traslado_alumnos}</td>
              </tr>
              <tr>
                <th>Tipo de Traslado:</th>
                <td>{alumnoInfo.trasladotransporte_alumnos}</td>
              </tr>
              <tr>
                <th>Nombre de la Clinica:</th>
                <td>{alumnoInfo.clinica_alumno}</td>
              </tr>
              <tr>
                <th>Correo del Usuario:</th>
                <td>{alumnoInfo.usuario_alumno}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
