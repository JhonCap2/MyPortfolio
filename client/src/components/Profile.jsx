import React, { useState } from 'react';

// Asumimos que tienes un archivo CSS para los estilos.
// import './Profile.css';

const Profile = ({ user }) => {
  // Estado para almacenar el archivo de imagen seleccionado por el usuario.
  const [selectedFile, setSelectedFile] = useState(null);
  // Estado para previsualizar la imagen antes de subirla.
  const [preview, setPreview] = useState(user?.profileImageUrl || 'https://via.placeholder.com/150');

  // Maneja el cambio en el input de tipo 'file'.
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Crea una URL temporal para la previsualización de la imagen.
      setPreview(URL.createObjectURL(file));
    }
  };

  // Maneja el envío del formulario para subir la imagen.
  const handleImageUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Por favor, selecciona una imagen primero.');
      return;
    }

    // Aquí iría la lógica para subir la imagen al servidor.
    // Necesitarás un endpoint en tu backend que acepte la imagen.
    // Por ejemplo: POST /api/users/upload-profile-image

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    console.log('Subiendo imagen...');
    // Ejemplo de cómo podrías hacer la petición fetch:
    /*
    try {
      const response = await fetch('/api/users/upload-profile-image', {
        method: 'POST',
        body: formData,
        // No olvides incluir el token de autenticación si es necesario.
        // headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('¡Imagen de perfil actualizada!');
        // Opcional: actualizar el estado del usuario en la app.
      } else {
        alert('Error al subir la imagen.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error en la red.');
    }
    */
    alert('Funcionalidad de subida de imagen no implementada en el backend.');
  };

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      <div className="profile-details">
        <img src={preview} alt="Perfil" className="profile-image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        <h3>{user?.name || 'Nombre de Usuario'}</h3>
        <p><strong>Email:</strong> {user?.email || 'email@example.com'}</p>
        <p><strong>Rol:</strong> {user?.role || 'user'}</p>
      </div>
      <form onSubmit={handleImageUpload} className="upload-form">
        <label htmlFor="file-upload">Cambiar foto de perfil:</label>
        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Guardar Imagen</button>
      </form>
    </div>
  );
};

export default Profile;