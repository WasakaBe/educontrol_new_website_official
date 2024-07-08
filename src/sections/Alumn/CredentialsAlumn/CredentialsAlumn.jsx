import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../Auto/Auth';
import { apiUrl } from '../../../constants/Api';
import './CredentialsAlumn.css';

export default function CredentialsAlumn() {
  const { user } = useContext(AuthContext);  // Obtener el usuario del contexto de autenticación
  const [userInfo, setUserInfo] = useState(null);
  const [alumnoInfo, setAlumnoInfo] = useState(null);

  useEffect(() => {
    const fetchUserAndAlumnoData = async () => {
      try {
        const response = await fetch(`${apiUrl}/user/info/${user.id_usuario}`);
        const data = await response.json();
        if (response.ok) {
          setUserInfo(data.user);
          if (data.alumno) {
            setAlumnoInfo(data.alumno);
          }
        } else {
          console.error('Error al obtener los datos del usuario y alumno:', data.message);
        }
      } catch (error) {
        console.error('Error al conectar con la API:', error);
      }
    };

    if (user && user.id_usuario) {
      fetchUserAndAlumnoData();
    }
  }, [user]);

  if (!userInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="credentials-alumn-container">
      <h1>Datos del Usuario</h1>
      <div className="user-info">
        <p><strong>ID:</strong> {userInfo.id_usuario}</p>
        <p><strong>Nombre:</strong> {userInfo.nombre_usuario}</p>
        <p><strong>Apellido Paterno:</strong> {userInfo.app_usuario}</p>
        <p><strong>Apellido Materno:</strong> {userInfo.apm_usuario}</p>
        <p><strong>Fecha de Nacimiento:</strong> {userInfo.fecha_nacimiento_usuario}</p>
        <p><strong>Correo:</strong> {userInfo.correo_usuario}</p>
        <p><strong>Teléfono:</strong> {userInfo.phone_usuario}</p>
        <p><strong>Sexo:</strong> {userInfo.idSexo}</p>
      </div>

      {alumnoInfo && (
        <div>
          <h1>Datos del Alumno</h1>
          <div className="alumno-info">
            <p><strong>ID:</strong> {alumnoInfo.id_alumnos}</p>
            <p><strong>Nombre:</strong> {alumnoInfo.nombre_alumnos}</p>
            <p><strong>Apellido Paterno:</strong> {alumnoInfo.app_alumnos}</p>
            <p><strong>Apellido Materno:</strong> {alumnoInfo.apm_alumnos}</p>
            <p><strong>Fecha de Nacimiento:</strong> {alumnoInfo.fecha_nacimiento_alumnos}</p>
            <p><strong>CURP:</strong> {alumnoInfo.curp_alumnos}</p>
            <p><strong>Número de Control:</strong> {alumnoInfo.nocontrol_alumnos}</p>
            <p><strong>Teléfono:</strong> {alumnoInfo.telefono_alumnos}</p>
            <p><strong>Seguro Social:</strong> {alumnoInfo.seguro_social_alumnos}</p>
            <p><strong>Correo:</strong> {alumnoInfo.usuario_alumno}</p>
            <p><strong>Sexo:</strong> {alumnoInfo.sexo}</p>
            <p><strong>Grado:</strong> {alumnoInfo.grado_alumnos}</p>
            <p><strong>Grupo:</strong> {alumnoInfo.grupo_alumnos}</p>
            <p><strong>Carrera Técnica:</strong> {alumnoInfo.carrera_tecnica_alumnos}</p>
            <p><strong>Pais:</strong> {alumnoInfo.pais_alumnos}</p>
            <p><strong>Estado:</strong> {alumnoInfo.estado_alumnos}</p>
            <p><strong>Municipio:</strong> {alumnoInfo.municipio_alumnos}</p>
            <p><strong>Comunidad:</strong> {alumnoInfo.comunidad_alumnos}</p>
            <p><strong>Calle:</strong> {alumnoInfo.calle_alumnos}</p>
            <p><strong>Proceso Secundario:</strong> {alumnoInfo.proc_sec_alumno}</p>
            <h2>Datos Familiares</h2>
            <p><strong>Nombre del Familiar:</strong> {alumnoInfo.nombre_familiar_alumno}</p>
            <p><strong>Apellido Paterno del Familiar:</strong> {alumnoInfo.app_familiar_alumno}</p>
            <p><strong>Apellido Materno del Familiar:</strong> {alumnoInfo.apm_familiar_alumno}</p>
            <p><strong>Relación Familiar:</strong> {alumnoInfo.relacionfamiliar}</p>
            <p><strong>Teléfono del Familiar:</strong> {alumnoInfo.numero_telefono_familiar_alumno}</p>
          </div>
        </div>
      )}
    </div>
  );
}
