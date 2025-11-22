import React, { useState, useEffect } from 'react';
import { getUsers, updateUser } from '../api/api';
import './UsersList.css'; // Crearemos un CSS simple para la tabla

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (err) {
        setError('Failed to fetch users. You might not have admin rights.');
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      // Llamamos a la API para actualizar el rol del usuario
      const updatedUser = await updateUser(userId, { role: newRole });
      
      // Actualizamos el estado local para que el cambio se vea al instante
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: updatedUser.role } : user
      ));
    } catch (err) {
      setError(`Failed to update role for user ${userId}`);
      console.error("Failed to update role:", err);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="users-list-container">
      <h2>User Management</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {/* Este es el menú desplegable para cambiar el rol */}
                <select 
                  value={user.role} 
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="role-select"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}