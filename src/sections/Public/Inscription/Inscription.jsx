import  { useEffect, useRef } from 'react';
import { alumnos_honores } from '../../../assets/images';
import { useNavigate } from 'react-router-dom';
export default function Inscription() {
  const welcomeRef = useRef(null);
  const history = useNavigate();
  const BtnInscripcion = () => {
    history('/Formulario/Inscription')
  }
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

  return (
    <div ref={welcomeRef} className="welcome-container" id='Inscripcion'>
        <div className="welcome-image">
        <img src={alumnos_honores} alt="Welcome" />
      </div>
      <div className="welcome-text">
        <h1>REQUISITOS PARA LA INSCRIPCION</h1>
        <p>
        El primer paso para entrar a nuestra institución es solicitar una ficha de nuevo ingreso:
        </p>
        <p><li>  Copia del acta de Nacimiento. </li></p>
        <p><li>  Copia de la CURP (Actualizada). </li></p>
        <p><li>  Constancia de estudios con promedio. </li></p>
        <p><li>  2 fotografías tamaño infantil. </li></p>
        <p><li>  Copia del INE (TUTOR). </li></p>
        <p><li>  Comprobante de domicilio. </li></p>
        <p><li>  Cubrir el costo de la ficha. </li></p>
        <p><li>  Presentarse el interesado con el tutor. </li></p>
     
        <h1>Periodo:</h1>
        <p>
        La expedición de fichas se llevará a cabo a partir del 13 de febrero al 16 junio del presente año.
        </p>

        <button onClick={BtnInscripcion} className="discover-button">Ver más →</button>
      </div>
    </div>
  );
}
