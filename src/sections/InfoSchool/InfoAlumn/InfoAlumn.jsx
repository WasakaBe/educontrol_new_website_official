import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { apiUrl } from "../../../constants/Api";
import './InfoAlumn.css';

export default function InfoAlumn() {
  const [alumnos, setAlumnos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [perPage] = useState(10);

  const [grados, setGrados] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [carreras, setCarreras] = useState([]);

  const [searchParams, setSearchParams] = useState({
    nombre: '',
    grado: '',
    grupo: '',
    carrera: '',
    nocontrol: '',
    sexo: '',
    seguroSocial: ''
  });

  const [selectedAlumno, setSelectedAlumno] = useState(null);

  useEffect(() => {
    fetchGrados();
    fetchGrupos();
    fetchCarreras();
    fetchAlumnos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchGrados = async () => {
    try {
      const response = await fetch(`${apiUrl}/grados`);
      const data = await response.json();
      setGrados(data.grados);
    } catch (error) {
      console.error('Error fetching grados:', error);
    }
  };

  const fetchGrupos = async () => {
    try {
      const response = await fetch(`${apiUrl}/grupos`);
      const data = await response.json();
      setGrupos(data.grupos);
    } catch (error) {
      console.error('Error fetching grupos:', error);
    }
  };

  const fetchCarreras = async () => {
    try {
      const response = await fetch(`${apiUrl}/carreras/tecnicas`);
      const data = await response.json();
      setCarreras(data.carreras);
    } catch (error) {
      console.error('Error fetching carreras:', error);
    }
  };

  const fetchAlumnos = async () => {
    try {
      const queryParams = new URLSearchParams(searchParams);
      const response = await fetch(`${apiUrl}/alumnos/search?${queryParams}`);
      const data = await response.json();
      const alumnosData = data.alumnos;
      setAlumnos(alumnosData.slice(currentPage * perPage, (currentPage + 1) * perPage));
      setPageCount(Math.ceil(alumnosData.length / perPage));
    } catch (error) {
      console.error('Error fetching alumnos:', error);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value
    }));
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchAlumnos();
  };

  const handleViewInfo = (alumno) => {
    setSelectedAlumno(alumno);
  };

  const closeModal = () => {
    setSelectedAlumno(null);
  };

  return (
    <div className='container-admin-table-alumns info-docent-container'>
      <h2>Tabla de Alumnos</h2>
      <div className="search-container">
  <input
    type="text"
    name="nombre"
    placeholder="Nombre"
    value={searchParams.nombre}
    onChange={handleSearchChange}
  />
  <select name="grado" value={searchParams.grado} onChange={handleSearchChange}>
    <option value="">Grado</option>
    {grados.map((grado) => (
      <option key={grado.id_grado} value={grado.id_grado}>{grado.nombre_grado}</option>
    ))}
  </select>
  <select name="grupo" value={searchParams.grupo} onChange={handleSearchChange}>
    <option value="">Grupo</option>
    {grupos.map((grupo) => (
      <option key={grupo.id_grupos} value={grupo.id_grupos}>{grupo.nombre_grupos}</option>
    ))}
  </select>
  <select name="carrera" value={searchParams.carrera} onChange={handleSearchChange}>
    <option value="">Carrera</option>
    {carreras.map((carrera) => (
      <option key={carrera.id_carrera_tecnica} value={carrera.id_carrera_tecnica}>{carrera.nombre_carrera_tecnica}</option>
    ))}
  </select>
  <input
    type="text"
    name="nocontrol"
    placeholder="No. Control"
    value={searchParams.nocontrol}
    onChange={handleSearchChange}
  />
  <select name="sexo" value={searchParams.sexo} onChange={handleSearchChange}>
    <option value="">Sexo</option>
    <option value="M">M</option>
    <option value="F">F</option>
  </select>
  <input
    type="text"
    name="seguroSocial"
    placeholder="Seguro Social"
    value={searchParams.seguroSocial}
    onChange={handleSearchChange}
  />
  <button onClick={handleSearch}>Buscar</button>
</div>
                                                                                                                                                                                      <table className="alumn-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Fecha de Nacimiento</th>
            <th>CURP</th>
            <th>No. Control</th>
            <th>Teléfono</th>
            <th>Ver Info</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id_alumnos}>
              <td>{alumno.id_alumnos}</td>
              <td>{alumno.nombre_alumnos}</td>
              <td>{alumno.app_alumnos}</td>
              <td>{alumno.apm_alumnos}</td>
              <td>{alumno.fecha_nacimiento_alumnos}</td>
              <td>{alumno.curp_alumnos}</td>
              <td>{alumno.nocontrol_alumnos}</td>
              <td>{alumno.telefono_alumnos}</td>
              <td>
                <button  className='edit-button' onClick={() => handleViewInfo(alumno)}>Ver Info</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
      {selectedAlumno && (
  <div className="modal-info">
    <div className="modal-content-info">
      <span className="close-info" onClick={closeModal}>&times;</span>
      <h2>Información Detallada del Alumno</h2>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">ID:</span>
          <span className="info-value">{selectedAlumno.id_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Nombre:</span>
          <span className="info-value">{selectedAlumno.nombre_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Apellido Paterno:</span>
          <span className="info-value">{selectedAlumno.app_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Apellido Materno:</span>
          <span className="info-value">{selectedAlumno.apm_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Fecha de Nacimiento:</span>
          <span className="info-value">{selectedAlumno.fecha_nacimiento_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">CURP:</span>
          <span className="info-value">{selectedAlumno.curp_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">No. Control:</span>
          <span className="info-value">{selectedAlumno.nocontrol_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Teléfono:</span>
          <span className="info-value">{selectedAlumno.telefono_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Seguro Social:</span>
          <span className="info-value">{selectedAlumno.seguro_social_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Cuenta Credencial:</span>
          <span className="info-value">{selectedAlumno.cuentacredencial_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Sexo:</span>
          <span className="info-value">{selectedAlumno.sexo}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Correo:</span>
          <span className="info-value">{selectedAlumno.usuario_alumno}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Clínica:</span>
          <span className="info-value">{selectedAlumno.clinica_alumno}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Grado:</span>
          <span className="info-value">{selectedAlumno.grado_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Grupo:</span>
          <span className="info-value">{selectedAlumno.grupo_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Traslado:</span>
          <span className="info-value">{selectedAlumno.traslado_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Transporte:</span>
          <span className="info-value">{selectedAlumno.trasladotransporte_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Carrera Técnica:</span>
          <span className="info-value">{selectedAlumno.carrera_tecnica_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">País:</span>
          <span className="info-value">{selectedAlumno.pais_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Estado:</span>
          <span className="info-value">{selectedAlumno.estado_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Municipio:</span>
          <span className="info-value">{selectedAlumno.municipio_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Comunidad:</span>
          <span className="info-value">{selectedAlumno.comunidad_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Calle:</span>
          <span className="info-value">{selectedAlumno.calle_alumnos}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Proc. Sec.:</span>
          <span className="info-value">{selectedAlumno.proc_sec_alumno}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Nombre Familiar:</span>
          <span className="info-value">{selectedAlumno.nombre_familiar_alumno}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Apellido Paterno Familiar:</span>
          <span className="info-value">{selectedAlumno.app_familiar_alumno}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Apellido Materno Familiar:</span>
          <span className="info-value">{selectedAlumno.apm_familiar_alumno}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Relación Familiar:</span>
          <span className="info-value">{selectedAlumno.relacionfamiliar}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Teléfono Familiar:</span>
          <span className="info-value">{selectedAlumno.numero_telefono_familiar_alumno}</span>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
