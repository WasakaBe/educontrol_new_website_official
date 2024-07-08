import { useState, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import './Register.css'; // Importa el archivo CSS
import { toast } from 'react-toastify';
import { apiUrl } from '../../constants/Api';
import ReCAPTCHA from "react-google-recaptcha";

// eslint-disable-next-line react/prop-types
export default function Register({ onClose }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    nombreError: false,
    nombreSuccess: false,
    app: '',
    appError: false,
    appSuccess: false,
    apm: '',
    apmError: false,
    apmSuccess: false,
    fechaNacimiento: '',
    correo: '',
    correoError: false,
    correoSuccess: false,
    pwd: '',
    pwdError: false,
    pwdSuccess: false,
    telefono: '',
    telefonoError: false,
    telefonoSuccess: false,
    sexo: '',
    preguntaSecreta: '',
    respuestaSecreta: '',
  });
  const [secretQuestions, setSecretQuestions] = useState([]);
  const [sexOptions, setSexOptions] = useState([]);
  const [error, setError] = useState('');
  const [captchaValido, cambiarEstado] = useState(null);
  const captcha = useRef(null);

  useEffect(() => {
    fetchSecretQuestions();
    fetchSexOptions();
  }, []);

  const fetchSecretQuestions = async () => {
    try {
      const response = await fetch(`${apiUrl}/preguntas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setSecretQuestions(data.preguntas);
    } catch (err) {
      toast.error('Error al obtener las preguntas secretas');
    }
  };

  const fetchSexOptions = async () => {
    try {
      const response = await fetch(`${apiUrl}/sexs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setSexOptions(data.sexs);
    } catch (err) {
      toast.error('Error al obtener las opciones de sexo');
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación específica para campos de texto
    const nameRegex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^\d{10}$/;

    if (name === 'nombre' || name === 'app' || name === 'apm') {
      if (nameRegex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          [`${name}Error`]: false, // Sin error
          [`${name}Success`]: true, // Validación exitosa
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          [`${name}Error`]: true, // Error específico del campo
          [`${name}Success`]: false, // No es una validación exitosa
        }));
      }
    } else if (name === 'correo') {
      if (emailRegex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          correoError: false,
          correoSuccess: true,
        }));
        checkEmailAvailability(value);
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          correoError: true,
          correoSuccess: false,
        }));
      }
    } else if (name === 'pwd') {
      if (passwordRegex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          pwdError: false,
          pwdSuccess: true,
        }));
        toast.success('Password fuerte validado');
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          pwdError: true,
          pwdSuccess: false,
        }));
        toast.error('El password es mínimo de 8 dígitos, debe incluir caracteres de texto mayúscula, minúscula, número y especiales');
      }
    } else if (name === 'telefono') {
      if (phoneRegex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          telefonoError: false,
          telefonoSuccess: true,
        }));
        toast.success('Teléfono válido');
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          telefonoError: true,
          telefonoSuccess: false,
        }));
        toast.error('El teléfono debe tener exactamente 10 caracteres numéricos');
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch(`${apiUrl}/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo_usuario: email }),
      });

      const data = await response.json();
      if (data.exists) {
        setFormData((prevData) => ({
          ...prevData,
          correoError: true,
          correoSuccess: false,
        }));
        toast.error('El correo ya existe, use otro correo');
      } else {
        setFormData((prevData) => ({
          ...prevData,
          correoError: false,
          correoSuccess: true,
        }));
        toast.success('Correo validado');
      }
    } catch (err) {
      setFormData((prevData) => ({
        ...prevData,
        correoError: true,
        correoSuccess: false,
      }));
      toast.error('Error al verificar el correo');
    }
  };

  const validateSection1 = () => {
    const { nombre, app, apm, fechaNacimiento } = formData;
    const nameRegex = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/;

    if (!nombre || !nameRegex.test(nombre)) {
      toast.error('El nombre solo puede contener letras y espacios');
      return false;
    }
    if (!app || !nameRegex.test(app)) {
      toast.error('El apellido paterno solo puede contener letras y espacios');
      return false;
    }
    if (!apm || !nameRegex.test(apm)) {
      toast.error('El apellido materno solo puede contener letras y espacios');
      return false;
    }
    if (!fechaNacimiento) {
      toast.error('La fecha de nacimiento es obligatoria');
      return false;
    }

    // Validar fecha de nacimiento para alumnos
    const birthDate = DateTime.fromISO(fechaNacimiento);
    const currentDate = DateTime.now();
    const age = currentDate.diff(birthDate, 'years').years;

    if (role === 'Alumno') {
      if (age < 15 || age > 19) {
        toast.error('La edad debe estar entre 15 y 19 años para alumnos');
        return false;
      }
    } else if ((role === 'Docente' || role === 'Familiar') && (age < 18 || age > 70)) {
      toast.error('La edad debe estar entre 18 y 70 años para docentes y familiares');
      return false;
    }

    setError('');
    return true;
  };

  const validateSection2 = () => {
    const { correo, pwd, preguntaSecreta, respuestaSecreta } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!correo || !emailRegex.test(correo) || formData.correoError) {
      toast.error('Ingrese un correo electrónico válido o no disponible');
      return false;
    }
    if (!pwd || !passwordRegex.test(pwd)) {
      toast.error('El password es mínimo de 8 dígitos, debe incluir caracteres de texto mayúscula, minúscula, número y especiales');
      return false;
    }
    if (!preguntaSecreta || !respuestaSecreta) {
      toast.error('Todos los campos son obligatorios');
      return false;
    }
    setError('');
    return true;
  };

  const validateSection3 = () => {
    const { telefono, sexo } = formData;
    const phoneRegex = /^\d{10}$/;

    if (!telefono || !phoneRegex.test(telefono)) {
      toast.error('El teléfono debe tener exactamente 10 caracteres numéricos');
      return false;
    }
    if (!sexo) {
      toast.error('Todos los campos son obligatorios');
      return false;
    }
    setError('');
    return true;
  };

  const onChangeCaptcha = () => {
    if (captcha.current.getValue()) {
      console.log("No eres un robot");
      cambiarEstado(true);
    } else {
      console.log("Realiza el captcha correctamente");
      cambiarEstado(false);
    }
  };

  const handleNextStep = () => {
    if (step === 2 && validateSection1()) {
      setStep(3);
    } else if (step === 3 && validateSection2()) {
      setStep(4);
    }
  };

  const handlePreviousStep = () => {
    if (step > 2) {
      setStep(step - 1);
    }
  };

  const generateToken = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    const getRandomChar = (source) =>
      source.charAt(Math.floor(Math.random() * source.length));

    return getRandomChar(letters) +
          getRandomChar(letters) +
          getRandomChar(letters) +
          getRandomChar(numbers) +
          getRandomChar(numbers) +
          getRandomChar(numbers) +
          getRandomChar(letters) +
          getRandomChar(numbers);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateSection3() || !captchaValido) {
      toast.error('Por favor, completa todos los campos y realiza correctamente el CAPTCHA.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          nombre_usuario: formData.nombre,
          app_usuario: formData.app,
          apm_usuario: formData.apm,
          fecha_nacimiento_usuario: formData.fechaNacimiento,
          token_usuario: generateToken(),
          correo_usuario: formData.correo,
          pwd_usuario: formData.pwd,
          phone_usuario: formData.telefono,
          idRol: role === 'Alumno' ? 2 : role === 'Docente' ? 3 : 4, // Asumiendo que los roles son 2, 3 y 4
          idSexo: formData.sexo,
          ip_usuario: await fetch('https://api64.ipify.org?format=json')
          .then(response => response.json())
          .then(data => data.ip)
      ,
          idCuentaActivo: 1, // Asumiendo que 1 significa cuenta activa
          idPregunta: formData.preguntaSecreta,
          respuestaPregunta: formData.respuestaSecreta,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        toast.success('Creación del usuario exitosa'); // Cambia el mensaje a "Creación del usuario exitosa"
        onClose(); // Ocultar el modal
      } else {
        toast.error(data.message || 'Error al crear el usuario');
      }
    } catch (err) {
      toast.error('Error al conectar con el servidor');
    }
  };

  return (
    <div className="register-modal-overlay">
      <div className="register-modal-content">
        {step === 1 ? (
          <>
            <h2>Bienvenido</h2>
            <p>Antes de avanzar, seleccione el tipo de rol que usted pertenece</p>
            <div className="role-buttons">
              <button className="role-button" onClick={() => handleRoleSelect('Alumno')}>Alumno</button>
              <button className="role-button" onClick={() => handleRoleSelect('Docente')}>Docente</button>
              <button className="role-button" onClick={() => handleRoleSelect('Familiar')}>Familiar</button>
            </div>
          </>
        ) : (
          <>
            {step === 2 && (
              <>
                <h2>Crear Cuenta - Sección 1</h2>
                <div className="register-section">
                  <div className="register-input-container">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={formData.nombreError ? 'error' : formData.nombreSuccess ? 'success' : ''}
                      required
                    />
                  </div>
                  <div className="register-input-container">
                    <label htmlFor="app">Apellido Paterno</label>
                    <input
                      type="text"
                      id="app"
                      name="app"
                      placeholder="Apellido Paterno"
                      value={formData.app}
                      onChange={handleChange}
                      className={formData.appError ? 'error' : formData.appSuccess ? 'success' : ''}
                      required
                    />
                  </div>
                  <div className="register-input-container">
                    <label htmlFor="apm">Apellido Materno</label>
                    <input
                      type="text"
                      id="apm"
                      name="apm"
                      placeholder="Apellido Materno"
                      value={formData.apm}
                      onChange={handleChange}
                      className={formData.apmError ? 'error' : formData.apmSuccess ? 'success' : ''}
                      required
                    />
                  </div>
                  <div className="register-input-container">
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      placeholder="Fecha de Nacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {error && <p className="register-error-text">{error}</p>}
                  <div className="button-group">
                    <button className="previous-button" onClick={handlePreviousStep}>Anterior</button>
                    <button className="next-button" onClick={handleNextStep}>Siguiente</button>
                  </div>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h2>Crear Cuenta - Sección 2</h2>
                <div className="register-section">
                  <div className="register-input-container">
                    <label htmlFor="correo">Correo</label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      placeholder="Correo"
                      value={formData.correo}
                      onChange={handleChange}
                      className={formData.correoError ? 'error' : formData.correoSuccess ? 'success' : ''}
                      required
                    />
                  </div>
                  <div className="register-input-container">
                    <label htmlFor="pwd">Contraseña</label>
                    <input
                      type="password"
                      id="pwd"
                      name="pwd"
                      placeholder="Contraseña"
                      value={formData.pwd}
                      onChange={handleChange}
                      className={formData.pwdError ? 'error' : formData.pwdSuccess ? 'success' : ''}
                      required
                    />
                  </div>
                  <div className="register-input-container">
                    <label htmlFor="preguntaSecreta">Pregunta Secreta</label>
                    <select
                      id="preguntaSecreta"
                      name="preguntaSecreta"
                      value={formData.preguntaSecreta}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione una pregunta...</option>
                      {secretQuestions.map((pregunta) => (
                        <option key={pregunta.id_preguntas} value={pregunta.id_preguntas}>
                          {pregunta.nombre_preguntas}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="register-input-container">
                    <label htmlFor="respuestaSecreta">Respuesta Secreta</label>
                    <input
                      type="text"
                      id="respuestaSecreta"
                      name="respuestaSecreta"
                      placeholder="Respuesta Secreta"
                      value={formData.respuestaSecreta}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {error && <p className="register-error-text">{error}</p>}
                  <div className="button-group">
                    <button className="previous-button" onClick={handlePreviousStep}>Anterior</button>
                    <button className="next-button" onClick={handleNextStep}>Siguiente</button>
                  </div>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h2>Crear Cuenta - Sección 3</h2>
                <div className="register-section">
                  <div className="register-input-container">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      placeholder="Teléfono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={formData.telefonoError ? 'error' : formData.telefonoSuccess ? 'success' : ''}
                      required
                    />
                  </div>
                  <div className="register-input-container">
                    <label htmlFor="sexo">Sexo</label>
                    <select
                      id="sexo"
                      name="sexo"
                      value={formData.sexo}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione...</option>
                      {sexOptions.map((sexo) => (
                        <option key={sexo.id_sexos} value={sexo.id_sexos}>
                          {sexo.nombre_sexo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="recaptcha">
                    <ReCAPTCHA
                      ref={captcha}
                      sitekey="6LdYfJspAAAAAAxTWQY68WAEX6JTgnysv3NxAMzd"
                      onChange={onChangeCaptcha}
                    />
                  </div>
                  {error && <p className="register-error-text">{error}</p>}
                  <div className="button-group">
                    <button className="previous-button" onClick={handlePreviousStep}>Anterior</button>
                    <button type="submit" onClick={handleRegister} className="register-button">Registrar</button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
        <button onClick={onClose} className="register-close-button">×</button>
      </div>
    </div>
  );
}
