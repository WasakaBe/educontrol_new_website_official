import { useState, useContext } from 'react';
import './ProfileAdminDashboard.css';
import { AuthContext } from '../../../Auto/Auth';
import { apiUrl } from '../../../constants/Api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfileAdminDashboard() {
  const { user, login } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre_usuario: user?.nombre_usuario || '',
    app_usuario: user?.app_usuario || '',
    apm_usuario: user?.apm_usuario || '',
    phone_usuario: user?.phone_usuario || '',
    correo_usuario: user?.correo_usuario || '',
    pwd_usuario: user?.pwd_usuario || ''
  });

  const getInitials = (name) => {
    if (!name) {
      return '';
    }
    const namesArray = name.trim().split(' ');
    if (namesArray.length === 1) {
      return namesArray[0].charAt(0).toUpperCase();
    }
    return namesArray[0].charAt(0).toUpperCase() + namesArray[1].charAt(0).toUpperCase();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!formData.pwd_usuario) {
        toast.error('La contraseña no puede estar vacía');
        return;
      }
  
      const response = await fetch(`${apiUrl}update2-user/${user.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const updatedUser = { ...user, ...formData };
        login(updatedUser);
        setIsEditing(false);
        toast.success('Datos de usuario actualizados exitosamente');
      } else {
        const result = await response.json();
        toast.error(result.message || 'Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      toast.error('Error al actualizar los datos');
    }
  };

  const toggleEditMode = () => {
    if (!isEditing) {
      toast.success('Modo de edición activado');
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      nombre_usuario: user?.nombre_usuario || '',
      app_usuario: user?.app_usuario || '',
      apm_usuario: user?.apm_usuario || '',
      phone_usuario: user?.phone_usuario || '',
      correo_usuario: user?.correo_usuario || '',
      pwd_usuario: user?.pwd_usuario || ''
    });
  };

  return (
    <div className='profile-container'>
      <div className='profile-card'>
        <div className='profile-header'>
          {user?.photo_url ? (
            <img src={user.photo_url} alt='Profile' className='profile-picture' />
          ) : (
            <div className='profile-initials'>
              {getInitials(user?.nombre_usuario || '')}
            </div>
          )}
        </div>
        <div className='profile-body'>
          <h2>Mi Perfil</h2>
          <form className='profile-form'>
            <div className='form-group'>
              <label>Nombre</label>
              <input
                type='text'
                name='nombre_usuario'
                value={formData.nombre_usuario}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className='form-group'>
              <label>Apellido Paterno</label>
              <input
                type='text'
                name='app_usuario'
                value={formData.app_usuario}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className='form-group'>
              <label>Apellido Materno</label>
              <input
                type='text'
                name='apm_usuario'
                value={formData.apm_usuario}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className='form-group'>
              <label>Teléfono</label>
              <input
                type='text'
                name='phone_usuario'
                value={formData.phone_usuario}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className='form-group'>
              <label>Correo</label>
              <input
                type='text'
                name='correo_usuario'
                value={formData.correo_usuario}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
            <div className='form-group'>
              <label>Contraseña</label>
              <input
                type='password'
                name='pwd_usuario'
                value={formData.pwd_usuario}
                onChange={handleChange}
                placeholder='Nueva contraseña'
                readOnly={!isEditing}
              />
            </div>
          </form>
          <div className='profile-footer'>
            {isEditing ? (
              <>
                <button className='save-button' onClick={handleSave}>
                  Guardar
                </button>
                <button className='cancel-button' onClick={handleCancel}>
                  Cancelar
                </button>
              </>
            ) : (
              <button className='edit-button' onClick={toggleEditMode}>
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
