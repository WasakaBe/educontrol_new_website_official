import { useEffect, useRef, useState } from 'react';
import { logo_administracion, logo_agricola, logo_agropecuario, logo_alimentos, logo_contabilidad, logo_desarrollo,logo_ofimatica, logo_programacion } from '../../../assets/images';
import { Modal } from '../../../components';
export default function Carreras() {
  const hexRefs = useRef([]);
  const [modalVisible, setModalVisible] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    hexRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      hexRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);


  const hexagons = [
    { src: logo_administracion, alt: 'logo de administracion', className: 'hex-animation-1' , modalContent: 'Información sobre Basketball' },
    { src: logo_agricola, alt: 'logo de agricola', className: 'hex-animation-2' , modalContent: 'Información sobre Basketball'},
    { src: logo_agropecuario, alt: 'logo de agropecuario', className: 'hex-animation-3' , modalContent: 'Información sobre Basketball'},
    { src: logo_alimentos, alt: 'logo de alimentos', className: 'hex-animation-4' , modalContent: 'Información sobre Basketball'},
    { src: logo_contabilidad, alt: 'logo de contabilidad', className: 'hex-animation-5', modalContent: 'Información sobre Basketball' },
    { src: logo_desarrollo, alt: 'logo de desarrollo comunitario', className: 'hex-animation-6', modalContent: 'Información sobre Basketball' },
    { src: logo_ofimatica, alt: 'logo de ofimatica', className: 'hex-animation-7' , modalContent: 'Información sobre Basketball'},
    { src: logo_programacion, alt: 'logo de programacion', className: 'hex-animation-8', modalContent: 'Información sobre Basketball' },
  ];

  return (
    <div className="cultural-container">
      <div className="cultural-header">
        <h1>Carreras Tecnicas</h1>
        <p>La institución educativa ofrece las carreras tecnicas</p>
      </div>
      <div className="hex-grid">
        {hexagons.map((hex, index) => (
          <div
            key={index}
            className={`hex ${hex.className}`}
            ref={(el) => (hexRefs.current[index] = el)}
            onClick={() => setModalVisible(index)}
          >
            <div className="hex-inner">
              <div className="hex-content">
                <img src={hex.src} alt={hex.alt} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {hexagons.map((hex, index) => (
        <Modal
          key={index}
          show={modalVisible === index}
          onClose={() => setModalVisible(null)}
          title={hex.alt}
        >
          <p>{hex.modalContent}</p>
        </Modal>
      ))}
    </div>
  );
}
