import { useState, useEffect, useRef } from 'react';
import './Welcome.css';
import { pecuario_cbta } from '../../../assets/images';
import { apiUrl } from '../../../constants/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Welcome() {
  const welcomeRef = useRef(null);
  const [isMisionModalOpen, setIsMisionModalOpen] = useState(false);
  const [isVisionModalOpen, setIsVisionModalOpen] = useState(false);
  const [misionText, setMisionText] = useState('');
  const [visionText, setVisionText] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          welcomeRef.current.classList.add('visible');
        } else {
          welcomeRef.current.classList.remove('visible');
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (welcomeRef.current) {
      observer.observe(welcomeRef.current);
    }

    return () => {
      if (welcomeRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(welcomeRef.current);
      }
    };
  }, []);

  const fetchMision = async () => {
    try {
      const response = await fetch(`${apiUrl}mision/view`);
      const data = await response.json();
      if (response.ok && data.misiones && data.misiones.length > 0) {
        setMisionText(data.misiones[0].mision_text);
      } else {
        toast.error('Error al obtener la misión');
      }
    } catch (error) {
      toast.error('Error de conexión');
    }
  };

  const fetchVision = async () => {
    try {
      const response = await fetch(`${apiUrl}vision/view`);
      const data = await response.json();
      if (response.ok && data.visiones && data.visiones.length > 0) {
        setVisionText(data.visiones[0].vision_text);
      } else {
        toast.error('Error al obtener la visión');
      }
    } catch (error) {
      toast.error('Error de conexión');
    }
  };

  const handleOpenMisionModal = () => {
    fetchMision();
    setIsMisionModalOpen(true);
  };

  const handleOpenVisionModal = () => {
    fetchVision();
    setIsVisionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsMisionModalOpen(false);
    setIsVisionModalOpen(false);
  };

  return (
    <div ref={welcomeRef} className="welcome-container">
      <div className="welcome-image">
        <img src={pecuario_cbta} alt="Welcome" />
      </div>
      <div className="welcome-text">
        <h1>BIENVENIDO AL C.B.T.A No.5</h1>
        <p>
          Centro de Bachillerato Tecnológico Agropecuario No. 5 inicia sus actividades el 02 de octubre de 1972 en la ciudad de Huejutla de Reyes Hidalgo, se encuentra localizado al norte de la ciudad, sobre el Boulevard Adolfo López Mateos s/n colonia aviación civil. Es un gra privilegio poder forjar a las futuras generaciones desde hace ya aproximadamente 50 años y de esta manera estar contribuyendo a nuestra comunidad, el C.B.T.A. 5 de Huejutla, Hgo. ha formado técnicos de calidad, con un claro compromiso social. ¡Bienvenidos!
        </p>
        <button className="discover-button" onClick={handleOpenMisionModal}>Misión</button>
        <button className="discover-button" onClick={handleOpenVisionModal}>Visión</button>
      </div>

      {isMisionModalOpen && (
        <div className="modal4">
          <div className="modal-content4">
            <h2>Misión</h2>
            <p>{misionText}</p>
            <button className="close-button" onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}

      {isVisionModalOpen && (
        <div className="modal4">
          <div className="modal-content4">
            <h2>Visión</h2>
            <p>{visionText}</p>
            <button className="close-button" onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
