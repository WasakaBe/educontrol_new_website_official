import { useState, useEffect } from 'react';
import './CredentialsView.css';
import { apiUrl } from '../../../constants/Api';
import { logo_cbta, logo_programacion, logoeducacion, mujer } from '../../../assets/images';
import { ToastContainer } from 'react-toastify';
export default function CredentialsView() {
  const [credenciales, setCredenciales] = useState([]);
  const [filteredCredenciales, setFilteredCredenciales] = useState([]);
  const [selectedCredencial, setSelectedCredencial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(`${apiUrl}/credenciales_escolares`)
      .then(response => response.json())
      .then(data => {
        setCredenciales(data.credenciales_escolares);
        setFilteredCredenciales(data.credenciales_escolares);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleView = (cred) => {
    setSelectedCredencial(cred);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCredencial(null);
  };

  const handleSearch = (e) => {
    const {value} = e.target;
    setSearchValue(value);
    const filtered = credenciales.filter(cred => 
      cred.nocontrol_credencial_escolar.toString().includes(value)
    );
    setFilteredCredenciales(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCredenciales.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCredenciales.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='container-credential-views'>
      <div className="table-container">
        <h2>Visualización de Credenciales Escolares</h2>
        <input 
          type="text" 
          placeholder="Buscar por No. de Control" 
          value={searchValue} 
          onChange={handleSearch} 
          className="search-input"
        />
        <table className="credentials-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Carrera</th>
              <th>Grupo</th>
              <th>CURP</th>
              <th>No. Control</th>
              <th>Seguro Social</th>
              <th>ID Alumno</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(cred => (
              <tr key={cred.id_credencial_escolar}>
                <td>{cred.id_credencial_escolar}</td>
                <td>{cred.nombre_credencial_escolar}</td>
                <td>{cred.app_credencial_escolar}</td>
                <td>{cred.apm_credencial_escolar}</td>
                <td>{cred.carrera_credencial_escolar}</td>
                <td>{cred.grupo_credencial_escolar}</td>
                <td>{cred.curp_credencial_escolar}</td>
                <td>{cred.nocontrol_credencial_escolar}</td>
                <td>{cred.segsocial_credencial_escolar}</td>
                <td>{cred.idalumnocrede}</td>
                <td>
                  <button className='view-button' onClick={() => handleView(cred)}>Visualizar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {pageNumbers.map(number => (
            <button 
              key={number} 
              onClick={() => setCurrentPage(number)} 
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
        </div>
        {isModalOpen && (
          <div className="modal-credential">
            <div className="modal-content-credential">
              <div>
                <div className='card-credential'>
                  <div className='card-section-logo'>
                    <img src={logoeducacion} alt='Logo SEP' className='img1' />
                    <img src={logo_cbta} alt='Logo CBTA' className='img2' />
                  </div>
                  <div className='back-fondo'>
                    <div className='card-section-dates-alumn'>
                      <img src={mujer} alt='Foto del alumno' />
                      <div className='card-subsection-dates-alumn'>
                        <span>{`${selectedCredencial.nombre_credencial_escolar} ${selectedCredencial.app_credencial_escolar} ${selectedCredencial.apm_credencial_escolar}`}</span>
                        <img src={logo_programacion} alt='Logo de la carrera del alumno' />
                      </div>
                    </div>
                    <div className='card-subsection-dates-alumn-bottom'>
                      <h2>{selectedCredencial.carrera_credencial_escolar}</h2>
                      <div className='sub-group'>
                        <span>GRUPO:</span>
                        <h3>{selectedCredencial.grupo_credencial_escolar}</h3>
                      </div>
                      <div className='sub-group2'>
                        <span>CURP:</span>
                        <h3>{selectedCredencial.curp_credencial_escolar}</h3>
                      </div>
                      <div className='sub-group2'>
                        <span>NO DE CONTROL:</span>
                        <h3>{selectedCredencial.nocontrol_credencial_escolar}</h3>
                      </div>
                      <div className='sub-group2'>
                        <span>SEGURO SOCIAL:</span>
                        <h3>{selectedCredencial.segsocial_credencial_escolar}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="close-button2" onClick={closeModal}>&times;</span>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
