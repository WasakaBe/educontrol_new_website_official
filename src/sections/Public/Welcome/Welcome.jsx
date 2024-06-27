import  { useEffect, useRef } from 'react';
import './Welcome.css';
import { pecuario_cbta } from '../../../assets/images';

export default function Welcome() {
  const welcomeRef = useRef(null);

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
    <div ref={welcomeRef} className="welcome-container">
      <div className="welcome-image">
        <img src={pecuario_cbta} alt="Welcome" />
      </div>
      <div className="welcome-text">
        <h1>BIENVENIDO AL C.B.T.A No.5</h1>
        <p>
          UniCamp has established a reputation for excellence in business and management education, 
          providing high quality, industry responsive programs relevant to the national and global marketplaces.
        </p>
        <p>
          Studying business at UniCamp is a great way to enhance your career. In todays competitive environment, 
          professionals need the skills to adapt to an ever-changing business world. At UniCamp, we give our students 
          the skills that enable them to deal with real-world business issues.
        </p>
        <button className="discover-button">Ver más →</button>
      </div>
    </div>
  );
}
