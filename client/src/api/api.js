

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
  return res.json();
};

export const addContact = async (contact) => {
  const res = await fetch("/api/contacts", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(contact),
  });
  if (res.status === 204) {
    return null; // O un objeto vacío {} si lo prefieres
  }
  return res.json();
};

export const updateContact = async (id, contact) => {
  const res = await fetch(`/api/contacts/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(contact),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

export const deleteContact = async (id) => {
  const res = await fetch(`/api/contacts/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

// -------------------
// PROJECTS
// -------------------
export const getProjects = async () => {
  const res = await fetch("/api/projects", { headers: getHeaders() });
  return res.json();
};

export const addProject = async (project) => {
  const res = await fetch("/api/projects", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(project),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

export const updateProject = async (id, project) => {
  const res = await fetch(`/api/projects/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(project),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`/api/projects/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

// -------------------
// EDUCATIONS
// -------------------
export const getEducations = async () => {
  const res = await fetch("/api/educations", { headers: getHeaders() });
  return res.json();
};

export const addEducation = async (education) => {
  const res = await fetch("/api/educations", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(education),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

export const updateEducation = async (id, education) => {
  const res = await fetch(`/api/educations/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(education),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

export const deleteEducation = async (id) => {
  const res = await fetch(`/api/educations/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

// -------------------
// USERS
// -------------------
export const getUsers = async () => {
  const res = await fetch("/api/users", { headers: getHeaders() });
  return res.json();
};

export const addUser = async (user) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (res.status === 204) {
    return null;
  }
  return res.json();
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
  return res.json();
};
