import { useEffect, useRef, useState } from 'react';
import { logo_basquetboll, logo_chess, logo_correr, logo_danza, logo_dibujar, logo_futbol, logo_musica, logo_voleibol } from '../../../assets/images';
import { Modal } from '../../../components';
import './Cultural.css';

export default function Cultural() {
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
    { src: logo_basquetboll, alt: 'Basketball', className: 'hex-animation-1', modalContent: 'Información sobre Basketball' },
    { src: logo_danza, alt: 'Dance', className: 'hex-animation-2', modalContent: 'Información sobre Dance' },
    { src: logo_voleibol, alt: 'Volleyball', className: 'hex-animation-3', modalContent: 'Información sobre Volleyball' },
    { src: logo_musica, alt: 'Music', className: 'hex-animation-4', modalContent: 'Información sobre Music' },
    { src: logo_correr, alt: 'Running', className: 'hex-animation-5', modalContent: 'Información sobre Running' },
    { src: logo_futbol, alt: 'Soccer', className: 'hex-animation-6', modalContent: 'Información sobre Soccer' },
    { src: logo_dibujar, alt: 'Writing', className: 'hex-animation-7', modalContent: 'Información sobre Writing' },
    { src: logo_chess, alt: 'Chess', className: 'hex-animation-8', modalContent: 'Información sobre Chess' },
  ];

  return (
    <div className="cultural-container">
      <div className="cultural-header">
        <h1>Actividades Culturales</h1>
        <p>La institución educativa ofrece las siguientes Actividades Culturales</p>
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
