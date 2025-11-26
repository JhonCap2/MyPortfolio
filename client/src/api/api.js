

const API_URL = import.meta.env.VITE_API_URL || "/api";

// NOTE: By using a relative path like "/api", we are leveraging
// the "proxy" configuration in the frontend's package.json.
// This redirects API calls to the backend server during development,
// eliminating the need for environment variables for the base URL.

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
  const res = await fetch(`${API_URL}/contacts`, { headers: getHeaders() });
  return res.json();
};

export const addContact = async (contact) => {
  const res = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(contact),
  });
  return res.json();
};

export const updateContact = async (id, contact) => {
  const res = await fetch(`${API_URL}/contacts/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(contact),
  });
  return res.json();
};

export const deleteContact = async (id) => {
  const res = await fetch(`${API_URL}/contacts/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
};

// -------------------
// PROJECTS
// -------------------
export const getProjects = async () => {
  const res = await fetch(`${API_URL}/projects`, { headers: getHeaders() });
  return res.json();
};

export const addProject = async (project) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(project),
  });
  return res.json();
};

export const updateProject = async (id, project) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(project),
  });
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
};

// -------------------
// EDUCATIONS
// -------------------
export const getEducations = async () => {
  const res = await fetch(`${API_URL}/educations`, { headers: getHeaders() });
  return res.json();
};

export const addEducation = async (education) => {
  const res = await fetch(`${API_URL}/educations`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(education),
  });
  return res.json();
};

export const updateEducation = async (id, education) => {
  const res = await fetch(`${API_URL}/educations/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(education),
  });
  return res.json();
};

export const deleteEducation = async (id) => {
  const res = await fetch(`${API_URL}/educations/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
};

// -------------------
// USERS
// -------------------
export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`, { headers: getHeaders() });
  return res.json();
};

export const addUser = async (user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  return res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
};

// -------------------
// AUTHENTICATION
// -------------------
export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
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
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/signin`, {
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
  return res.json();
};

export const getProfile = async () => {
  const res = await fetch(`${API_URL}/auth/profile`, {
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
