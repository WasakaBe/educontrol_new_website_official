import { useState, useEffect } from 'react';
import './SchedulesCreate.css';
import { apiUrl } from '../../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SchedulesCreate() {
  const [asignaturas, setAsignaturas] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [grados, setGrados] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [carreras, setCarreras] = useState([]);

  const [asignatura, setAsignatura] = useState('');
  const [docente, setDocente] = useState('');
  const [grado, setGrado] = useState('');
  const [grupo, setGrupo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [ciclo, setCiclo] = useState('');
  const [scheduleDays, setScheduleDays] = useState([]);
  
  useEffect(() => {
    fetch(`${apiUrl}asignaturas`)
      .then(response => response.json())
      .then(data => setAsignaturas(data.asignaturas))
      .catch(error => toast.error("Error fetching asignaturas:", error));
      
    fetch(`${apiUrl}docentes`)
      .then(response => response.json())
      .then(data => setDocentes(data.docentes))
      .catch(error => toast.error("Error fetching docentes:", error));

    fetch(`${apiUrl}grados`)
      .then(response => response.json())
      .then(data => setGrados(data.grados))
      .catch(error => toast.error("Error fetching grados:", error));

    fetch(`${apiUrl}grupos`)
      .then(response => response.json())
      .then(data => setGrupos(data.grupos))
      .catch(error => toast.error("Error fetching grupos:", error));

    fetch(`${apiUrl}carreras/tecnicas`)
      .then(response => response.json())
      .then(data => setCarreras(data.carreras))
      .catch(error => toast.error("Error fetching carreras:", error));
  }, []);

  const handleScheduleDayChange = (index, field, value) => {
    const convertTimeToDecimal = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours + minutes / 60;
    };

    const startLimit = convertTimeToDecimal('07:00');
    const endLimit = convertTimeToDecimal('16:00');

    if (field === 'startTime' || field === 'endTime') {
      const timeDecimal = convertTimeToDecimal(value);
      if (timeDecimal < startLimit || timeDecimal > endLimit) {
        toast.error('La hora debe estar entre las 7:00 AM y las 4:00 PM.');
        return;
      }
    }

    const newScheduleDays = [...scheduleDays];
    newScheduleDays[index][field] = value;
    setScheduleDays(newScheduleDays);
  };

  const handleAddScheduleDay = () => {
    const newScheduleDay = { day: '', startTime: '', endTime: '' };
    setScheduleDays([...scheduleDays, newScheduleDay]);
  };

  const handleRemoveScheduleDay = (index) => {
    const newScheduleDays = [...scheduleDays];
    newScheduleDays.splice(index, 1);
    setScheduleDays(newScheduleDays);
  };

  const handleInsertHorario = async (event) => {
    event.preventDefault();

    if (scheduleDays.length === 0) {
      toast.warning('Te falto agregar los días y horas de clases.');
      return;
    }

    // Fetch existing schedules for conflict checking
    const existingSchedulesResponse = await fetch(`${apiUrl}horarios_escolares/views`);
    const existingSchedules = await existingSchedulesResponse.json();

    const conflict = scheduleDays.some(newDay => {
      return existingSchedules.some(existingSchedule => {
        if (
          existingSchedule.id_grado === parseInt(grado) &&
          existingSchedule.id_grupo === parseInt(grupo) &&
          existingSchedule.id_carrera_tecnica === parseInt(carrera) &&
          existingSchedule.ciclo_escolar === ciclo &&
          existingSchedule.dias_horarios.some(existingDay =>
            existingDay.day === newDay.day &&
            existingDay.startTime === newDay.startTime &&
            existingDay.endTime === newDay.endTime
          )
        ) {
          return true;
        }
        return false;
      });
    });

    if (conflict) {
      toast.error('Error al crear el horario: Conflicto de horario: otro horario ocupa este slot.');
      return;
    }

    const datosRegistro = {
      id_asignatura: parseInt(asignatura),
      id_docente: parseInt(docente),
      id_grado: parseInt(grado),
      id_grupo: parseInt(grupo),
      id_carrera_tecnica: parseInt(carrera),
      ciclo_escolar: ciclo,
      scheduleDays: scheduleDays.map(day => ({
        day: day.day,
        startTime: day.startTime,
        endTime: day.endTime
      }))
    };

    try {
      const response = await fetch(`${apiUrl}horarios_escolares/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosRegistro)
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(`Error al crear el horario: ${data.message || 'Conflicto o error del servidor'}`);
        return;
      }

      toast.success('Nuevo horario creado exitosamente!');
    } catch (error) {
      toast.error(`Error de conexión: ${error.message}`);
    }
  };

  return (
    <div className="schedule-create-container">
      <h2>Crear Horario Escolar</h2>
      <form onSubmit={handleInsertHorario} className="schedule-form">
        <div className="form-group">
          <label>Asignatura</label>
          <select value={asignatura} onChange={(e) => setAsignatura(e.target.value)}>
            {asignaturas.map(asignatura => (
              <option key={asignatura.id_asignatura} value={asignatura.id_asignatura}>
                {asignatura.nombre_asignatura}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Docente</label>
          <select value={docente} onChange={(e) => setDocente(e.target.value)}>
            {docentes.map(docente => (
              <option key={docente.id_docentes} value={docente.id_docentes}>
                {docente.nombre_docentes} {docente.app_docentes} {docente.apm_docentes}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Grado</label>
          <select value={grado} onChange={(e) => setGrado(e.target.value)}>
            {grados.map(grado => (
              <option key={grado.id_grado} value={grado.id_grado}>
                {grado.nombre_grado}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Grupo</label>
          <select value={grupo} onChange={(e) => setGrupo(e.target.value)}>
            {grupos.map(grupo => (
              <option key={grupo.id_grupos} value={grupo.id_grupos}>
                {grupo.nombre_grupos}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Carrera Técnica</label>
          <select value={carrera} onChange={(e) => setCarrera(e.target.value)}>
            {carreras.map(carrera => (
              <option key={carrera.id_carrera_tecnica} value={carrera.id_carrera_tecnica}>
                {carrera.nombre_carrera_tecnica}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Ciclo Escolar</label>
          <input placeholder="Ciclo Escolar" value={ciclo} onChange={(e) => setCiclo(e.target.value)} name="cicloEscolar" required />
        </div>
        {scheduleDays.map((schedule, index) => (
          <div key={index} className="schedule-day">
            <select value={schedule.day} onChange={e => handleScheduleDayChange(index, 'day', e.target.value)}>
              <option value="">Seleccione el día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
            </select>
            <input type="time" value={schedule.startTime} onChange={e => handleScheduleDayChange(index, 'startTime', e.target.value)} />
            <input type="time" value={schedule.endTime} onChange={e => handleScheduleDayChange(index, 'endTime', e.target.value)} />
            <button type="button" onClick={() => handleRemoveScheduleDay(index)}>Eliminar</button>
          </div>
        ))}
        <button type="button" className="add-button" onClick={handleAddScheduleDay}>Agregar Día y Horario</button>
        <button type="submit" className="submit-button">Crear Horario</button>
      </form>
      <ToastContainer />
    </div>
  );
}
