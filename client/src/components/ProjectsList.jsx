import React, { useState, useEffect } from "react";
import {
  getProjects, addProject, updateProject, deleteProject,
  getContacts, addContact, updateContact, deleteContact,
  getUsers, addUser, updateUser, deleteUser,
  getEducations, addEducation, updateEducation, deleteEducation
} from "../api/api";
import "./ProjectsList.css";

const ProjectsList = () => {
  const [currentType, setCurrentType] = useState("projects");
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [currentType]);

  const fetchItems = async () => {
    try {
      switch (currentType) {
        case "projects": setItems(await getProjects()); break;
        case "contacts": setItems(await getContacts()); break;
        case "users": setItems(await getUsers()); break;
        case "educations": setItems(await getEducations()); break;
        default: break;
      }
    } catch {
      setError("Error fetching data.");
    }
  };

  const handleSubmit = async () => {
    try {
      switch (currentType) {
        case "projects":
          editingId ? await updateProject(editingId, formData) : await addProject(formData);
          break;
        case "contacts":
          editingId ? await updateContact(editingId, formData) : await addContact(formData);
          break;
        case "users":
          editingId ? await updateUser(editingId, formData) : await addUser(formData);
          break;
        case "educations":
          editingId ? await updateEducation(editingId, formData) : await addEducation(formData);
          break;
        default: break;
      }
      setMessage(`${currentType.slice(0,-1)} saved successfully!`);
      setFormData({});
      setEditingId(null);
      fetchItems();
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setError("Error saving item.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    switch(currentType){
      case "projects":
      case "educations":
        setFormData({
          title: item.title || "",
          firstname: item.firstname || "",
          lastname: item.lastname || "",
          email: item.email || "",
          completion: item.completion ? item.completion.slice(0,10) : "",
          description: item.description || ""
        });
        break;
      case "contacts":
        setFormData({
          firstname: item.firstname || "",
          lastname: item.lastname || "",
          email: item.email || ""
        });
        break;
      case "users":
        setFormData({
          name: item.name || "",
          email: item.email || ""
        });
        break;
      default: break;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      switch (currentType) {
        case "projects": await deleteProject(id); break;
        case "contacts": await deleteContact(id); break;
        case "users": await deleteUser(id); break;
        case "educations": await deleteEducation(id); break;
        default: break;
      }
      setMessage(`${currentType.slice(0,-1)} deleted successfully!`);
      fetchItems();
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setError("Error deleting item.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const renderForm = () => {
    switch(currentType){
      case "projects":
      case "educations":
        return <>
          <input placeholder="Title" value={formData.title || ""} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input placeholder="First Name" value={formData.firstname || ""} onChange={e => setFormData({...formData, firstname: e.target.value})} />
          <input placeholder="Last Name" value={formData.lastname || ""} onChange={e => setFormData({...formData, lastname: e.target.value})} />
          <input placeholder="Email" value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="date" value={formData.completion || ""} onChange={e => setFormData({...formData, completion: e.target.value})} />
          <textarea placeholder="Description" value={formData.description || ""} onChange={e => setFormData({...formData, description: e.target.value})} />
        </>;
      case "contacts":
        return <>
          <input placeholder="First Name" value={formData.firstname || ""} onChange={e => setFormData({...formData, firstname: e.target.value})} />
          <input placeholder="Last Name" value={formData.lastname || ""} onChange={e => setFormData({...formData, lastname: e.target.value})} />
          <input placeholder="Email" value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} />
        </>;
      case "users":
        return <>
          <input placeholder="Name" value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input placeholder="Email" value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} />
        </>;
      default: return null;
    }
  };

  const getHeaders = () => {
    switch(currentType){
      case "projects":
      case "educations":
        return ["Title","First Name","Last Name","Email","Completion","Description"];
      case "contacts":
        return ["First Name","Last Name","Email"];
      case "users":
        return ["Name","Email"];
      default: return [];
    }
  };

  const renderCell = (item, key) => {
    switch(currentType){
      case "projects":
      case "educations":
        if(key==="Title") return item.title || "";
        if(key==="First Name") return item.firstname || "";
        if(key==="Last Name") return item.lastname || "";
        if(key==="Email") return item.email || "";
        if(key==="Completion") return item.completion ? item.completion.slice(0,10) : "";
        if(key==="Description") return item.description || "";
        break;
      case "contacts":
        if(key==="First Name") return item.firstname || "";
        if(key==="Last Name") return item.lastname || "";
        if(key==="Email") return item.email || "";
        break;
      case "users":
        if(key==="Name") return item.name || "";
        if(key==="Email") return item.email || "";
        break;
      default: return "";
    }
  };

  return (
    <div className="dashboard-container">
      <div className="type-buttons">
        {["projects","contacts","users","educations"].map(t => (
          <button
            key={t}
            className={`button ${currentType===t?'active':''}`}
            onClick={() => { setCurrentType(t); setFormData({}); setEditingId(null); }}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}

      <div className="card">
        {renderForm()}
        <button className={`button ${editingId ? "edit" : "add"}`} onClick={handleSubmit}>
          {editingId ? "Save Changes" : "Add"}
        </button>
      </div>

      <table className="projects-table">
        <thead>
          <tr>
            {getHeaders().map(h => <th key={h}>{h}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              {getHeaders().map(h => <td key={h}>{renderCell(item, h)}</td>)}
              <td>
                <button className="button edit" onClick={() => handleEdit(item)}>✏️</button>
                <button className="button delete" onClick={() => handleDelete(item._id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsList;
