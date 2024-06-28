import { useState, useEffect } from 'react';
import { apiUrl } from "../../../../constants/Api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MisionVision.css';

export default function MisionVision() {
  const [misiones, setMisiones] = useState([]);
  const [visiones, setVisiones] = useState([]);
  const [currentPageMision, setCurrentPageMision] = useState(1);
  const [currentPageVision, setCurrentPageVision] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchMisiones();
    fetchVisiones();
  }, []);

  const fetchMisiones = () => {
    fetch(`${apiUrl}/mision/view`)
      .then(response => response.json())
      .then(data => setMisiones(data.misiones))
      .catch(error => console.error('Error fetching misiones:', error));
  };

  const fetchVisiones = () => {
    fetch(`${apiUrl}/vision/view`)
      .then(response => response.json())
      .then(data => setVisiones(data.visiones))
      .catch(error => console.error('Error fetching visiones:', error));
  };

  const handleMisionPageChange = (pageNumber) => {
    setCurrentPageMision(pageNumber);
  };

  const handleVisionPageChange = (pageNumber) => {
    setCurrentPageVision(pageNumber);
  };

  const handleEditMision = (id_mision) => {
    const newText = prompt('Ingrese el nuevo texto de la misión:');
    if (newText) {
      fetch(`${apiUrl}/mision/update/${id_mision}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mision_text: newText }),
      })
        .then(response => response.json())
        .then(() => {
          toast.success('Misión actualizada exitosamente!');
          fetchMisiones(); // Refresh the list
        })
        .catch(error => {
          console.error('Error updating mision:', error);
          toast.error('Error al actualizar la misión');
        });
    }
  };

  const handleDeleteMision = (id_mision) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta misión?')) {
      fetch(`${apiUrl}/mision/delete/${id_mision}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(() => {
          toast.success('Misión eliminada exitosamente!');
          fetchMisiones(); // Refresh the list
        })
        .catch(error => {
          console.error('Error deleting mision:', error);
          toast.error('Error al eliminar la misión');
        });
    }
  };

  const handleEditVision = (id_vision) => {
    const newText = prompt('Ingrese el nuevo texto de la visión:');
    if (newText) {
      fetch(`${apiUrl}/vision/update/${id_vision}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vision_text: newText }),
      })
        .then(response => response.json())
        .then(() => {
          toast.success('Visión actualizada exitosamente!');
          fetchVisiones(); // Refresh the list
        })
        .catch(error => {
          console.error('Error updating vision:', error);
          toast.error('Error al actualizar la visión');
        });
    }
  };

  const handleDeleteVision = (id_vision) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta visión?')) {
      fetch(`${apiUrl}/vision/delete/${id_vision}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(() => {
          toast.success('Visión eliminada exitosamente!');
          fetchVisiones(); // Refresh the list
        })
        .catch(error => {
          console.error('Error deleting vision:', error);
          toast.error('Error al eliminar la visión');
        });
    }
  };

  // Calcular los elementos actuales a mostrar por página
  const indexOfLastMision = currentPageMision * itemsPerPage;
  const indexOfFirstMision = indexOfLastMision - itemsPerPage;
  const currentMisiones = misiones.slice(indexOfFirstMision, indexOfLastMision);

  const indexOfLastVision = currentPageVision * itemsPerPage;
  const indexOfFirstVision = indexOfLastVision - itemsPerPage;
  const currentVisiones = visiones.slice(indexOfFirstVision, indexOfLastVision);

  // Calcular el número de páginas
  const totalPagesMision = Math.ceil(misiones.length / itemsPerPage);
  const totalPagesVision = Math.ceil(visiones.length / itemsPerPage);

  return (
    <div className="mision-vision-container">
      <h2>Misión y Visión</h2>

      <div className="table-container">
        <h3>Misiones</h3>
        <table className="mision-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Texto de la Misión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentMisiones.map(mision => (
              <tr key={mision.id_mision}>
                <td>{mision.id_mision}</td>
                <td>{mision.mision_text}</td>
                <td>
                  <button className='edit-button' onClick={() => handleEditMision(mision.id_mision)}>Editar</button>
                  <button className='cancel-button'onClick={() => handleDeleteMision(mision.id_mision)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPagesMision }, (_, index) => (
            <button
              key={index + 1}
              className={`page-button ${currentPageMision === index + 1 ? 'active' : ''}`}
              onClick={() => handleMisionPageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="table-container">
        <h3>Visiones</h3>
        <table className="vision-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Texto de la Visión</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentVisiones.map(vision => (
              <tr key={vision.id_vision}>
                <td>{vision.id_vision}</td>
                <td>{vision.vision_text}</td>
                <td>
                  <button className='edit-button' onClick={() => handleEditVision(vision.id_vision)}>Editar</button>
                  <button className='cancel-button'onClick={() => handleDeleteVision(vision.id_vision)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPagesVision }, (_, index) => (
            <button
              key={index + 1}
              className={`page-button ${currentPageVision === index + 1 ? 'active' : ''}`}
              onClick={() => handleVisionPageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
