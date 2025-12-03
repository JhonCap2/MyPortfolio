import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

// We assume you have a CSS file for styles.
// import './Profile.css';

const Profile = () => {
  // State to store the image file selected by the user.
  const { user } = useAuth(); // Obtenemos el usuario del contexto
  const [selectedFile, setSelectedFile] = useState(null);
  // State to preview the image before uploading.
  const [preview, setPreview] = useState(user?.profileImageUrl || 'https://via.placeholder.com/150');

  // Handles the change in the 'file' type input.
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Creates a temporary URL for the image preview.
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handles the form submission to upload the image.
  const handleImageUpload = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select an image first.');
      return;
    }

    // Here would go the logic to upload the image to the server.
    // You will need an endpoint in your backend that accepts the image.
    // For example: POST /api/users/upload-profile-image

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    console.log('Subiendo imagen...');
    // Ejemplo de cómo podrías hacer la petición fetch:
    /*
    try {
      const response = await fetch('/api/users/upload-profile-image', {
        method: 'POST',
        body: formData,
        // Don't forget to include the authentication token if necessary.
        // headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Profile picture updated!');
        // Optional: update the user state in the app.
      } else {
        alert('Error uploading image.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('A network error occurred.');
    }
    */
    alert('Image upload functionality not implemented in the backend.');
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <img src={preview} alt="Perfil" className="profile-image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
        <h3>{user?.name || 'Username'}</h3>
        <p><strong>Email:</strong> {user?.email || 'email@example.com'}</p>
        <p><strong>Role:</strong> {user?.role || 'user'}</p>
      </div>
      <form onSubmit={handleImageUpload} className="upload-form">
        <label htmlFor="file-upload">Change profile picture:</label>
        <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Save Image</button>
      </form>
    </div>
  );
};

export default Profile;