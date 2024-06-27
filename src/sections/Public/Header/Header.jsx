import  { useState } from 'react';
import { panel_uno_cbta, panel_uno_cbta_2, panel_uno_cbta_3 } from "../../../assets/images";
import './Header.css';

export default function Header() {
  const [index, setIndex] = useState(0);
  const images = [panel_uno_cbta, panel_uno_cbta_2, panel_uno_cbta_3];

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((image, idx) => (
          <img key={idx} src={image} alt={`panel ${idx + 1}`} className="carousel-item" />
        ))}
      </div>
      <button className="carousel-button prev" onClick={handlePrev}>❮</button>
      <button className="carousel-button next" onClick={handleNext}>❯</button>
    </div>
  );
}
