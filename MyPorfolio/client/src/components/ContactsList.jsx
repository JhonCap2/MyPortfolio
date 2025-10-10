import React, { useState, useEffect } from "react";
import { getContacts, addContact, updateContact, deleteContact } from "../api/api";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => { setContacts(await getContacts()); };

  const handleSubmit = async () => {
    if (editingId) await updateContact(editingId, formData);
    else await addContact(formData);

    setFormData({ firstname: "", lastname: "", email: "" });
    setEditingId(null);
    fetchContacts();
  };

  const handleEdit = (contact) => { setEditingId(contact._id); setFormData({ ...contact }); };
  const handleDelete = async (id) => { await deleteContact(id); fetchContacts(); };

  const inputStyle = { padding: "8px", margin: "5px", borderRadius: "4px", border: "1px solid #ccc" };
  const buttonStyle = { padding: "8px 12px", margin: "5px", borderRadius: "4px", border: "none", cursor: "pointer" };
  const addButtonStyle = { ...buttonStyle, backgroundColor: "#4CAF50", color: "#fff" };
  const editButtonStyle = { ...buttonStyle, backgroundColor: "#2196F3", color: "#fff" };
  const deleteButtonStyle = { ...buttonStyle, backgroundColor: "#f44336", color: "#fff" };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Contacts</h2>
      <div style={{ marginBottom: "20px" }}>
        <input style={inputStyle} placeholder="First Name" value={formData.firstname} onChange={e => setFormData({ ...formData, firstname: e.target.value })} />
        <input style={inputStyle} placeholder="Last Name" value={formData.lastname} onChange={e => setFormData({ ...formData, lastname: e.target.value })} />
        <input style={inputStyle} placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <button style={addButtonStyle} onClick={handleSubmit}>{editingId ? "Save Changes" : "Add Contact"}</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>First Name</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Last Name</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Email</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c._id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{c.firstname}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{c.lastname}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{c.email}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                <button style={editButtonStyle} onClick={() => handleEdit(c)}>✏️ Edit</button>
                <button style={deleteButtonStyle} onClick={() => handleDelete(c._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsList;
