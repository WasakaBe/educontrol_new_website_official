import { useState, useEffect } from 'react';
import './InfoAlumn.css';
import { apiUrl } from '../../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InfoAlumn() {
  const [alumnos, setAlumnos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchControl, setSearchControl] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const response = await fetch(`${apiUrl}alumnos`);
      const data = await response.json();
      setAlumnos(data.alumnos);
    } catch (error) {
      toast.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchControl === '') {
      fetchAlumnos();
      return;
    }
    try {
      const response = await fetch(`${apiUrl}alumnos/nocontrol/${searchControl}`);
      const data = await response.json();
      if (response.ok) {
        setAlumnos([data]);
      } else {
        toast.error(data.error || 'Alumno no encontrado');
        setAlumnos([]);
      }
    } catch (error) {
      toast.error('Error al buscar el alumno:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = alumnos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(alumnos.length / itemsPerPage);

  return (
    <div className="info-alumn-container">
      <h2>Información de Alumnos</h2>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Ingrese número de control"
          value={searchControl}
          onChange={(e) => setSearchControl(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <table className="alumnos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>CURP</th>
            <th>No. Control</th>
            <th>Teléfono</th>
            <th>Sexo</th>
            <th>Correo</th>
            <th>Clinica</th>
            <th>Grado</th>
            <th>Grupo</th>
            <th>Traslado</th>
            <th>Transporte</th>
            <th>Carrera Técnica</th>
            <th>País</th>
            <th>Estado</th>
            <th>Municipio</th>
            <th>Comunidad</th>
            <th>Calle</th>
            <th>Familiar</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(alumno => (
            <tr key={alumno.id_alumnos}>
              <td>{alumno.id_alumnos}</td>
              <td>{alumno.nombre_alumnos}</td>
              <td>{alumno.app_alumnos}</td>
              <td>{alumno.apm_alumnos}</td>
              <td>{alumno.curp_alumnos}</td>
              <td>{alumno.nocontrol_alumnos}</td>
              <td>{alumno.telefono_alumnos}</td>
              <td>{alumno.sexo}</td>
              <td>{alumno.usuario_alumno}</td>
              <td>{alumno.clinica_alumno}</td>
              <td>{alumno.grado_alumnos}</td>
              <td>{alumno.grupo_alumnos}</td>
              <td>{alumno.traslado_alumnos}</td>
              <td>{alumno.trasladotransporte_alumnos}</td>
              <td>{alumno.carrera_tecnica_alumnos}</td>
              <td>{alumno.pais_alumnos}</td>
              <td>{alumno.estado_alumnos}</td>
              <td>{alumno.municipio_alumnos}</td>
              <td>{alumno.comunidad_alumnos}</td>
              <td>{alumno.calle_alumnos}</td>
              <td>{alumno.nombre_familiar_alumno} {alumno.app_familiar_alumno} {alumno.apm_familiar_alumno} ({alumno.relacionfamiliar})</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
