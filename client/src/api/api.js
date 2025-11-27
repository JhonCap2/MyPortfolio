

// -------------------
// Helper for headers with token
// -------------------
const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

// -------------------
// CONTACTS
// -------------------
export const getContacts = async () => {
  const res = await fetch("/api/contacts", { headers: getHeaders() });
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return []; // Devuelve un array vacío si no hay JSON
};

export const addContact = async (contact) => {
  const res = await fetch("/api/contacts", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(contact),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

export const updateContact = async (id, contact) => {
  const res = await fetch(`/api/contacts/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(contact),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

export const deleteContact = async (id) => {
  const res = await fetch(`/api/contacts/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

// -------------------
// PROJECTS
// -------------------
export const getProjects = async () => {
  const res = await fetch("/api/projects", { headers: getHeaders() });
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return []; // Devuelve un array vacío si no hay JSON
};

export const addProject = async (project) => {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(project),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

export const updateProject = async (id, project) => {
  const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(project),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

export const deleteProject = async (id) => {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

// -------------------
// EDUCATIONS
// -------------------
export const getEducations = async () => {
  const res = await fetch("/api/educations", { headers: getHeaders() });
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return []; // Devuelve un array vacío si no hay JSON
};

export const addEducation = async (education) => {
  const res = await fetch("/api/educations", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(education),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

export const updateEducation = async (id, education) => {
  const res = await fetch(`/api/educations/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(education),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

export const deleteEducation = async (id) => {
  const res = await fetch(`/api/educations/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

// -------------------
// USERS
// -------------------
export const getUsers = async () => {
  const res = await fetch("/api/users", { headers: getHeaders() });
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return []; // Devuelve un array vacío si no hay JSON
};

export const addUser = async (user) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

export const updateUser = async (id, user) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

export const deleteUser = async (id) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 204) {
    return {};
  }
  const contentType = res.headers.get("content-type");
  if (res.ok && contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {};
};

// -------------------
// AUTHENTICATION
// -------------------
export const registerUser = async (userData) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    // Handle potential non-JSON error responses
    try {
      const errorData = await res.json();
      throw new Error(errorData.message || "Registration failed");
    } catch (e) {
      throw new Error(res.statusText || "Registration failed");
    }
  }
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {}; // Devolver un objeto vacío para evitar errores de 'null'
};

export const loginUser = async (credentials) => {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    // Handle potential non-JSON error responses
    try {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    } catch (e) {
      throw new Error(res.statusText || "Login failed");
    }
  }
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {}; // Devolver un objeto vacío para evitar errores de 'null'
};

export const getProfile = async () => {
  const res = await fetch("/api/auth/profile", {
    headers: getHeaders(),
  });
  if (!res.ok) {
    // Handle potential non-JSON error responses
    try {
      const errorData = await res.json();
      throw new Error(errorData.message || "Invalid token or session expired");
    } catch (e) {
      throw new Error(res.statusText || "Invalid token or session expired");
    }
  }
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return {}; // Devuelve un objeto vacío si no hay JSON
};
