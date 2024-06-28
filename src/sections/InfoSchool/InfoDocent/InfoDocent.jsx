import  { useState, useEffect } from 'react';
import './InfoDocent.css';
import { apiUrl } from '../../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InfoDocent() {
  const [docentes, setDocentes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(`${apiUrl}docentes`)
      .then(response => response.json())
      .then(data => setDocentes(data.docentes))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      toast.warning('Por favor ingrese un número de control o CURP para buscar');
      return;
    }

    fetch(`${apiUrl}docentes/nocontrol/${searchTerm}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Docente no encontrado');
        }
      })
      .then(data => setDocentes([data]))
      .catch(error => {
        console.error('Error fetching data:', error);
        toast.error('Docente no encontrado');
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = docentes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(docentes.length / itemsPerPage);

  return (
    <div className='info-docent-container'>
      <h2>Información de Docentes</h2>
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ingrese número de control o CURP"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <table className="docents-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Fecha de Nacimiento</th>
            <th>Número de Control</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Clínica</th>
            <th>Sexo</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(docente => (
            <tr key={docente.id_docentes}>
              <td>{docente.id_docentes}</td>
              <td>{docente.nombre_docentes}</td>
              <td>{docente.app_docentes}</td>
              <td>{docente.apm_docentes}</td>
              <td>{docente.fecha_nacimiento_docentes}</td>
              <td>{docente.noconttrol_docentes}</td>
              <td>{docente.telefono_docentes}</td>
              <td>{docente.usuario_docente}</td>
              <td>{docente.clinica_docente}</td>
              <td>{docente.sexo_docente}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
