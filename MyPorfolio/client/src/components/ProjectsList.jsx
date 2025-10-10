import React, { useState, useEffect } from "react";
import { getProjects, addProject, updateProject, deleteProject } from "../api/api";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => { setProjects(await getProjects()); };

  const handleSubmit = async () => {
    if (editingId) await updateProject(editingId, formData);
    else await addProject(formData);

    setFormData({ title: "", firstname: "", lastname: "", email: "", completion: "", description: "" });
    setEditingId(null);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      firstname: project.firstname,
      lastname: project.lastname,
      email: project.email,
      completion: project.completion ? project.completion.slice(0,10) : "",
      description: project.description
    });
  };

  const handleDelete = async (id) => { await deleteProject(id); fetchProjects(); };

  const inputStyle = { padding: "8px", margin: "5px", borderRadius: "4px", border: "1px solid #ccc" };
  const buttonStyle = { padding: "8px 12px", margin: "5px", borderRadius: "4px", border: "none", cursor: "pointer" };
  const addButtonStyle = { ...buttonStyle, backgroundColor: "#4CAF50", color: "#fff" };
  const editButtonStyle = { ...buttonStyle, backgroundColor: "#2196F3", color: "#fff" };
  const deleteButtonStyle = { ...buttonStyle, backgroundColor: "#f44336", color: "#fff" };

  return (
    <div style={{ maxWidth: "900px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Projects</h2>
      <div style={{ marginBottom: "20px" }}>
        <input style={inputStyle} placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        <input style={inputStyle} placeholder="First Name" value={formData.firstname} onChange={e => setFormData({ ...formData, firstname: e.target.value })} />
        <input style={inputStyle} placeholder="Last Name" value={formData.lastname} onChange={e => setFormData({ ...formData, lastname: e.target.value })} />
        <input style={inputStyle} placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <input style={inputStyle} type="date" placeholder="Completion Date" value={formData.completion} onChange={e => setFormData({ ...formData, completion: e.target.value })} />
        <input style={inputStyle} placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
        <button style={addButtonStyle} onClick={handleSubmit}>{editingId ? "Save Changes" : "Add Project"}</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Title</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>First Name</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Last Name</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Email</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Completion</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Description</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p._id}>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{p.title}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{p.firstname}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{p.lastname}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{p.email}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{p.completion ? p.completion.slice(0,10) : ""}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{p.description}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                <button style={editButtonStyle} onClick={() => handleEdit(p)}>✏️ Edit</button>
                <button style={deleteButtonStyle} onClick={() => handleDelete(p._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsList;
