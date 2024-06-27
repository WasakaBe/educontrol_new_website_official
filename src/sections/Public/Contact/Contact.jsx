import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const MAPURL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.098299591696!2d-98.4068462247401!3d21.148485980530932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d726fcf9f14585%3A0x897e90570d60ad67!2sCBTa%20No.%205!5e0!3m2!1ses!2smx!4v1704246777334!5m2!1ses!2smx';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [messageValid, setMessageValid] = useState(true);
  

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    // Allow only letters and accented characters
    const isValid = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(inputValue);

    setName(inputValue);
    setNameValid(isValid);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // You can add more sophisticated email validation here
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
  };

  const handleMessageChange = (e) => {
    const inputValue = e.target.value;
    // Allow only 450 words
    const isValid = inputValue.trim().split(/\s+/).length <= 450;

    setMessage(inputValue);
    setMessageValid(isValid);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form submission logic here
    // You can check if all inputs are valid before submitting
    if (nameValid && emailValid && messageValid) {
      // Submit the form
      console.log('Form submitted:', { name, email, message });
    } else {
      console.log('Form not submitted. Please check your inputs.');
    }
  };

  return (
    <div className="container-contatc" id="Contact">
      <h1 className="contact-title">Contactanos</h1>
      <div className="dates-contacts">
        <iframe title="Google Map" src={MAPURL} />
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className={`input-container ${nameValid ? 'valid' : 'invalid'}`}>
            <input
              className="contact-input"
              type="text"
              placeholder=" "
              value={name}
              onChange={handleNameChange}
              required
            />
            <label className="contact-label">Nombre</label>
          </div>
          <div className={`input-container ${emailValid ? 'valid' : 'invalid'}`}>
            <input
              className="contact-input"
              type="email"
              placeholder=" "
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label className="contact-label">Correo</label>
          </div>
          <div className={`input-container ${messageValid ? 'valid' : 'invalid'}`}>
            <textarea
              className="contact-input"
              rows="5"
              placeholder=" "
              value={message}
              onChange={handleMessageChange}
              required
            />
            <label className="contact-label">Mensaje</label>
            
          </div>
          <button className="contact-btn" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
