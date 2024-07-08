import { useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { alumnos_honores } from '../../assets/images';
import './Login.css';
import { apiUrl } from '../../constants/Api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auto/Auth';
import Register from '../Register/Register';
import PasswordReset from '../ForgoutPwd/ForgoutPwd';

// eslint-disable-next-line react/prop-types
export default function Login({ onClose }) {
  const history = useNavigate();
  const { login } = useContext(AuthContext);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showRegister, setShowRegister] = useState(false); // Estado para mostrar la modal de registro
  const [showPasswordReset, setShowPasswordReset] = useState(false); // Estado para mostrar la modal de restablecimiento de contraseña

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        const response = await fetch(`${apiUrl}check-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo_usuario: email }),
        });
        const data = await response.json();
        if (response.status === 200 && data.exists) {
          toast.success('Correo disponible');
          setEmailSubmitted(true);
          setEmailError('');
        } else {
          toast.error('El correo ingresado no se encuentra disponible o no existe');
          setEmailError('El correo ingresado no se encuentra disponible o no existe');
        }
      } catch (error) {
        toast.error('Error al verificar el correo');
      }
    } else {
      setEmailError('Por favor, ingrese un correo electrónico válido.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() === '') {
      toast.error('Por favor, ingrese su contraseña.');
      return;
    }

    if (password.length >= 6) {
      try {
        const response = await fetch(`${apiUrl}login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ correo_usuario: email, pwd_usuario: password }),
        });
        const data = await response.json();
        if (response.status === 200 && data.tbl_users) {
          const user = data.tbl_users;
          const user2 = data.tbl_users.nombre_usuario;

          if (user.pwd_usuario === password) {
            login(user);
            if (user.idRol === 1) {
              toast.success(`Bienvenido administrador ${user.nombre_usuario}`);
              history(`/Administration/${user.nombre_usuario}`, { state: { user2 }});
            } else if (user.idRol === 2) {
              toast.success(`Bienvenido alumno ${user.nombre_usuario}`);
              history(`/Alumn/${user.nombre_usuario}`, { state: { user2 }});
            } else if (user.idRol === 3) {
              toast.success(`Bienvenido docente ${user.nombre_usuario}`);
            } else if (user.idRol === 4) {
              toast.success(`Bienvenido familiar ${user.nombre_usuario}`);
            } else {
              toast.success(`Bienvenido ${user.nombre_usuario}`);
            }
            setPasswordError('');
          } else {
            toast.error('Datos no coinciden');
            setPasswordError('Datos no coinciden');
          }
        } else {
          toast.error('Password erróneo');
          setPasswordError('Password erróneo');
        }
      } catch (error) {
        toast.error('Error al iniciar sesión');
      }
    } else {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
    }
  };

  const handleBackClick = () => {
    setEmailSubmitted(false);
    setPassword('');
    setPasswordError('');
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handlePasswordResetClick = () => {
    setShowPasswordReset(true);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="left-panel">
          <img src={alumnos_honores} alt="Left Panel Image" className="left-panel-img" />
        </div>
        <div className="right-panel">
          <h2>Iniciar Sesión</h2>
          {emailSubmitted ? 
            <form onSubmit={handlePasswordSubmit}>
              <div className="input-container">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? 'error' : password && 'success'}
                  required
                />
                {passwordError && <p className="error-text">{passwordError}</p>}
                <div className='buttons'>
                  <button type="button" className="back-button" onClick={handleBackClick}>Atrás</button>
                  <button type="submit" className="login-button">Acceder</button>
                </div>
                <a href='#' className='crearcuenta' onClick={handlePasswordResetClick}>Olvidaste tu password?</a>
              </div>
            </form>
            : 
            <form onSubmit={handleEmailSubmit}>
              <div className="input-container">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? 'error' : email && 'success'}
                  required
                />
                {emailError && <p className="error-text">{emailError}</p>}
                <button type="submit" className="login-button">Siguiente</button>
              </div>
            </form>}
          <a href='#' className='crearcuenta' onClick={handleRegisterClick}>Crear Cuenta</a>
          <button onClick={onClose} className="close-button">Cerrar</button>
        </div>
      </div>
      {showRegister && <Register onClose={() => setShowRegister(false)} />} {/* Muestra la modal de registro */}
      {showPasswordReset && <PasswordReset onClose={() => setShowPasswordReset(false)} />} {/* Muestra la modal de restablecimiento de contraseña */}
      <ToastContainer />
    </div>
  );
}
