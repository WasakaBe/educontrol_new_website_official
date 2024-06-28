import { useState, useEffect } from 'react';
import './SchedulesView.css';
import { apiUrl } from '../../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SchedulesView() {
  const [horarios, setHorarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddAlumnoModalOpen, setIsAddAlumnoModalOpen] = useState(false);
  const [currentAlumnoPage, setCurrentAlumnoPage] = useState(1);
  const [noControl, setNoControl] = useState('');
  const itemsPerPage = 4;  // Cambiado a 4
  const alumnosPerPage = 6;

  useEffect(() => {
    fetch(`${apiUrl}horarios_escolares/views`)
      .then(response => response.json())
      .then(data => setHorarios(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAlumnoPageChange = (pageNumber) => {
    setCurrentAlumnoPage(pageNumber);
  };

  const handleViewAlumnos = async (horarioId) => {
    try {
      const response = await fetch(`${apiUrl}horario_alumnos/${horarioId}`);
      if (response.ok) {
        const data = await response.json();
        setAlumnos(data);
        setSelectedHorario(horarioId);
        setIsModalOpen(true);
      } else {
        const errorData = await response.json();
        console.error('Error fetching alumnos:', errorData.message);
      }
    } catch (error) {
      console.error('Error fetching alumnos:', error);
    }
  };

  const handleAddAlumno = async () => {
    try {
      const response = await fetch(`${apiUrl}alumnos/nocontrol/${noControl}`);
      
      if (response.ok) {
        const data = await response.json();
        const alumnoId = data.id_alumnos;

        const addResponse = await fetch(`${apiUrl}horarios_alumnos/insert`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_horario: selectedHorario,
            id_alumno: alumnoId,
            fecha_inscripcion: new Date().toISOString()
          })
        });

        if (addResponse.ok) {
          toast.success('Alumno agregado exitosamente');
          setIsAddAlumnoModalOpen(false);
          handleViewAlumnos(selectedHorario); // Refresh the list of students
        } else {
          const addError = await addResponse.json();
          toast.error(addError.message || 'Error al agregar el alumno');
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Error al buscar el alumno');
      }
    } catch (error) {
      console.error('Error adding alumno:', error);
      toast.error('Error al agregar el alumno');
    }
  };

  const handleDeleteHorario = async (horarioId) => {
    try {
      const response = await fetch(`${apiUrl}horarios_escolares/delete/${horarioId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        toast.success('Horario eliminado exitosamente');
        setHorarios(horarios.filter(horario => horario.id_horario !== horarioId));
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al eliminar el horario');
      }
    } catch (error) {
      console.error('Error deleting horario:', error);
      toast.error('Error al eliminar el horario');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHorario(null);
    setAlumnos([]);
  };

  const closeAddAlumnoModal = () => {
    setIsAddAlumnoModalOpen(false);
    setNoControl('');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = horarios.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(horarios.length / itemsPerPage);

  const indexOfLastAlumno = currentAlumnoPage * alumnosPerPage;
  const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
  const currentAlumnos = alumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);
  const totalAlumnoPages = Math.ceil(alumnos.length / alumnosPerPage);

  return (
    <div className="schedules-view-container">
      <h2>Horarios Escolares</h2>
      <table className="schedules-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Asignatura</th>
            <th>Docente</th>
            <th>Grado</th>
            <th>Grupo</th>
            <th>Carrera Técnica</th>
            <th>Ciclo Escolar</th>
            <th>Días y Horarios</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(horario => (
            <tr key={horario.id_horario}>
              <td>{horario.id_horario}</td>
              <td>{horario.asignatura}</td>
              <td>{horario.docente}</td>
              <td>{horario.grado}</td>
              <td>{horario.grupo}</td>
              <td>{horario.carrera_tecnica}</td>
              <td>{horario.ciclo_escolar}</td>
              <td>
                {horario.dias_horarios.map((dia, index) => (
                  <div key={index}>
                    <span>{dia.day}: </span>
                    <span>{dia.startTime} - {dia.endTime}</span>
                  </div>
                ))}
              </td>
              <td>
                <button className='edit-button' onClick={() => handleViewAlumnos(horario.id_horario)}>Ver Alumnos</button>
                <button className='cancel-button' onClick={() => handleDeleteHorario(horario.id_horario)}>Eliminar</button>
              </td>
              
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

      {isModalOpen && (
        <div className="modal2">
          <div className="modal-content2">
            <h2>Alumnos en la clase</h2>
            {alumnos.length > 0 ? (
              <table className="alumnos-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAlumnos.map(alumno => (
                    <tr key={alumno.id_alumno}>
                      <td>{alumno.id_alumno}</td>
                      <td>{alumno.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No se encontraron alumnos para este horario.</p>
            )}
            <div className="pagination">
              {Array.from({ length: totalAlumnoPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`page-button ${currentAlumnoPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handleAlumnoPageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button className="add-button" onClick={() => setIsAddAlumnoModalOpen(true)}>Agregar Alumno</button>
            <button className="close-button" onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}

      {isAddAlumnoModalOpen && (
        <div className="modal2">
          <div className="modal-content2">
            <h2>Agregar Alumno</h2>
            <label>Ingrese el número de control del alumno</label>
            <br></br>
            <label>No debe dejar espacios</label>
            <br></br>
            <input
              type="text"
              value={noControl}
              onChange={(e) => setNoControl(e.target.value)}
            />
            <br></br>
            <button className="add-button" onClick={handleAddAlumno}>Agregar</button>
            <button className="close-button" onClick={closeAddAlumnoModal}>Cancelar</button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
