import React, { useState, useEffect } from "react";
import {
  getProjects, addProject, updateProject, deleteProject,
  getContacts, addContact, updateContact, deleteContact,
  getUsers, addUser, updateUser, deleteUser,
  getEducations, addEducation, updateEducation, deleteEducation //, updateUserRole
} from "../api/api";
import "./ProjectsList.css";

const config = {
  projects: {
    api: { get: getProjects, add: addProject, update: updateProject, delete: deleteProject },
    fields: ["title", "firstname", "lastname", "email", { name: "completion", type: "date" }, { name: "description", type: "textarea" }],
    headers: ["Title", "First Name", "Last Name", "Email", "Completion", "Description"]
  },
  contacts: {
    api: { get: getContacts, add: addContact, update: updateContact, delete: deleteContact },
    fields: ["firstname", "lastname", "email"],
    headers: ["First Name", "Last Name", "Email"]
  },
  users: {
    api: { get: getUsers, add: addUser, update: updateUser, delete: deleteUser },
    fields: ["name", "email", { name: "password", type: "password" }, { name: "role", type: "select", options: ["user", "admin"] }],
    headers: ["Name", "Email", "Role"],
  },
  educations: {
    api: { get: getEducations, add: addEducation, update: updateEducation, delete: deleteEducation },
    fields: ["title", "firstname", "lastname", "email", { name: "completion", type: "date" }, { name: "description", type: "textarea" }],
    headers: ["Title", "First Name", "Last Name", "Email", "Completion", "Description"]
  }
};

const ProjectsList = ({ user }) => {
  const isAdmin = user && user.role === 'admin';
  
  const [currentType, setCurrentType] = useState("projects");
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Puedes ajustar este número

  const currentConfig = config[currentType];

  useEffect(() => {
    fetchItems();
  }, [currentType]);

  const showMessage = (msg, type = 'success') => {
    if (type === 'success') {
      setMessage(msg);
      setError(null);
    } else {
      setError(msg);
      setMessage(null);
    }
    setTimeout(() => {
      setMessage(null);
      setError(null);
    }, 3000);
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await currentConfig.api.get();
      setItems(data);
    } catch (err) {
      showMessage("Error fetching data.", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const { add, update } = currentConfig.api;
    try {
      editingId ? await update(editingId, formData) : await add(formData);
      showMessage(`${currentType.slice(0,-1)} saved successfully!`);
      setFormData({});
      setEditingId(null);
      fetchItems();
    } catch (err) {
      showMessage("Error saving item.", 'error');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    switch(currentType){
      case "projects":
      case "educations": {
        const completionDate = item.completion ? item.completion.slice(0, 10) : "";
        setFormData({ ...item, completion: completionDate });
        return;
      }
      default: setFormData({ ...item });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await currentConfig.api.delete(id);
      showMessage(`${currentType.slice(0,-1)} deleted successfully!`);
      fetchItems();
    } catch (err) {
      showMessage("Error deleting item.", 'error');
    }
  };

  const renderForm = () => {
    switch(currentType){
      case "projects":
      case "educations":
        return currentConfig.fields.map(field => {
          const fieldName = typeof field === 'string' ? field : field.name;
          const fieldType = typeof field === 'object' ? field.type : 'text';
          const placeholder = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

          if (fieldType === 'textarea') {
            return <textarea key={fieldName} placeholder={placeholder} value={formData[fieldName] || ""} onChange={e => setFormData({...formData, [fieldName]: e.target.value})} />;
          }
          return <input key={fieldName} type={fieldType} placeholder={placeholder} value={formData[fieldName] || ""} onChange={e => setFormData({...formData, [fieldName]: e.target.value})} />;
        });
      default:
        return currentConfig.fields.map(fieldName => {
          const field = typeof fieldName === 'string' ? { name: fieldName, type: 'text' } : fieldName;
          const placeholder = field.name.charAt(0).toUpperCase() + field.name.slice(1);
          // No mostrar el campo de contraseña si estamos editando
          if (editingId && field.type === 'password') {
            return null;
          }
          // Si el campo es de tipo 'select', renderizamos un dropdown
          if (field.type === 'select') {
            return (
              <select key={field.name} value={formData[field.name] || ''} onChange={e => setFormData({...formData, [field.name]: e.target.value})}>
                <option value="" disabled>{placeholder}</option>
                {field.options.map(option => <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>)}
              </select>
            );
          }
          // Ocultar el campo de rol si no estamos editando un usuario
          if (!editingId && field.name === 'role') {
            return null;
          }
          return <input key={field.name} type={field.type} placeholder={placeholder} value={formData[field.name] || ""} onChange={e => setFormData({...formData, [field.name]: e.target.value})} />;
        });
    }
  };

  const getHeaders = () => currentConfig.headers;

  const renderCell = (item, key) => {
    const fieldNameMap = {
      "Title": "title",
      "First Name": "firstname",
      "Last Name": "lastname",
      "Email": "email",
      "Completion": "completion",
      "Description": "description",
      "Name": "name",
      "Role": "role"
    };
    const fieldName = fieldNameMap[key];

    let value = item[fieldName] || "";
    if (fieldName === "completion" && value) {
      return value.slice(0, 10);
    }
    return value;
  };

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTypeChange = (type) => {
    setCurrentType(type);
    setFormData({});
    setEditingId(null);
    setCurrentPage(1); // Resetear a la primera página
  };

  return (
    <div className="dashboard-container">
      <div className="type-buttons">
        {Object.keys(config).map(t => (
          // Condición: Si la pestaña es 'users', solo mostrarla si el usuario es admin.
          (t !== 'users' || isAdmin) && (
            <button
              key={t}
              className={`button ${currentType===t?'active':''}`}
              onClick={() => handleTypeChange(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          )
        ))}
      </div>

      {message && <div className="message success">{message}</div>}
      {error && <div className="message error">{error}</div>}

      {isAdmin && (
        <div className="card">
          {renderForm()}
          <button className={`button ${editingId ? "edit" : "add"}`} onClick={handleSubmit}>
            {editingId ? "Save Changes" : "Add"}
          </button>
        </div>
      )}

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <table className="projects-table">
          <thead>
            <tr>
              {getHeaders().map(h => <th key={h}>{h}</th>)}
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentItems.map(item => (
              <tr key={item._id}>
                {getHeaders().map(h => <td key={h} data-label={h}>{renderCell(item, h)}</td>)}
                {isAdmin && (
                  <td>
                    <button className="button edit" onClick={() => handleEdit(item)}>✏️</button>
                    <button className="button delete" onClick={() => handleDelete(item._id)}>🗑</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-item ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>
      )}

    </div>
  );
};

export default ProjectsList;
