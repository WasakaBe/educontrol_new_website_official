import { logo_cbta } from '../../../assets/images';
import './About.css';

export default function About() {
  return (
    <div className="about-container" id="Acerca">
      <div className="about-logo">
        <img src={logo_cbta} alt="CBTA Logo" />
      </div>
      <div className="about-content">
        <h1>Sobre Nosotros</h1>
        <p>
          El centro de bachillerato tecnológico agropecuario No. 5 inicia sus actividades el 02 de octubre de 1972 en la ciudad de Huejutla de Reyes Hidalgo; se encuentra localizado en al norte de la ciudad, sobre el Boulevard Adolfo López Mateos s/n colonia aviación civil. Limitando al norte con el estado de Veracruz a través del Río los Cantores y la Colonia Silvano Cruz, al sur con la colonia Adolfo López Mateos, al oriente con el Boulevard Adolfo López Mateos y al poniente con el Río los Cantores.
        </p>
        <p>
          El Centro de Bachillerato Tecnológico Agropecuario No.5 desde su fundación inicio ofertando dos especialidades como centro de estudios tecnológico agropecuario, la de técnico agrícola y pecuario, en el año de 1976 se incorpora una nueva especialidades industrias agropecuarias, en 1980 se incorpora las especialidades de técnico cañero, técnico agropecuario especialista en plagas y enfermedades, en horticultura y porcino cultura, industrialización y productos lácteos, en el año de 1984 se inicia el bachillerato incorporado la especialidad de técnico agropecuario, en el año de 1987 inicia la extensión en Huautla, Hgo., liquidándose en el año de 1990.
        </p>
        <p>
          En el año de 1991 se incorporan las especialidades de desarrollo comunitario y técnico en informática agropecuaria, en el año 2000 empieza el sistema automatizado de control escolar que viene a simplificar la captura de datos en el departamento de servicios escolares, en el año 2002 se incorpora la especialidad de administración y contabilidad rural. Y en agosto de 2004 se inicia con el nuevo modelo educativo de Bachilleratos Tecnológicos.
        </p>
      </div>
    </div>
  );
}
