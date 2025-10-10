import React, { useState, useEffect } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../api/api";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    created: "",
    updated: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleSubmit = async () => {
    if (editingId) await updateUser(editingId, formData);
    else await addUser(formData);

    setFormData({ name: "", email: "", password: "", created: "", updated: "" });
    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setFormData({ ...user });
  };

  const handleDelete = async (id) => { await deleteUser(id); fetchUsers(); };

  const inputStyle = { padding: "8px", margin: "5px", borderRadius: "4px", border: "1px solid #ccc" };
  const buttonStyle = { padding: "8px 12px", margin: "5px", borderRadius: "4px", border: "none", cursor: "pointer" };
  const addButtonStyle = { ...buttonStyle, backgroundColor: "#4CAF50", color: "#fff" };
  const editButtonStyle = { ...buttonStyle, backgroundColor: "#2196F3", color: "#fff" };
  const deleteButtonStyle = { ...buttonStyle, backgroundColor: "#f44336", color: "#fff" };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Users</h2>

      <div style={{ marginBottom: "20px" }}>
        <input style={inputStyle} placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input style={inputStyle} placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <input style={inputStyle} type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
        <input style={inputStyle} placeholder="Created (YYYY-MM-DD)" value={formData.created} onChange={e => setFormData({ ...formData, created: e.target.value })} />
        <input style={inputStyle} placeholder="Updated (YYYY-MM-DD)" value={formData.updated} onChange={e => setFormData({ ...formData, updated: e.target.value })} />
        <button style={addButtonStyle} onClick={handleSubmit}>{editingId ? "Save Changes" : "Add User"}</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Name</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Email</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Password</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Created</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Updated</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{u.name}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{u.email}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{u.password}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{u.created}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{u.updated}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                <button style={editButtonStyle} onClick={() => handleEdit(u)}>✏️ Edit</button>
                <button style={deleteButtonStyle} onClick={() => handleDelete(u._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
