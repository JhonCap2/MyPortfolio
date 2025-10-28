const API_URL = "http://localhost:5000/api";

// -------------------
// CONTACTS
// -------------------
export const getContacts = async () => {
  const res = await fetch(`${API_URL}/contacts`);
  return res.json();
};

export const addContact = async (contact) => {
  const res = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  return res.json();
};

export const updateContact = async (id, contact) => {
  const res = await fetch(`${API_URL}/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
  return res.json();
};

export const deleteContact = async (id) => {
  const res = await fetch(`${API_URL}/contacts/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

// -------------------
// PROJECTS
// -------------------
export const getProjects = async () => {
  const res = await fetch(`${API_URL}/projects`);
  return res.json();
};

export const addProject = async (project) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
};

export const updateProject = async (id, project) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  return res.json();
};

export const deleteProject = async (id) => {
  const res = await fetch(`${API_URL}/projects/${id}`, { method: "DELETE" });
  return res.json();
};

// -------------------
// EDUCATIONS
// -------------------
export const getEducations = async () => {
  const res = await fetch(`${API_URL}/educations`);
  return res.json();
};

export const addEducation = async (education) => {
  const res = await fetch(`${API_URL}/educations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(education),
  });
  return res.json();
};

export const updateEducation = async (id, education) => {
  const res = await fetch(`${API_URL}/educations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(education),
  });
  return res.json();
};

export const deleteEducation = async (id) => {
  const res = await fetch(`${API_URL}/educations/${id}`, { method: "DELETE" });
  return res.json();
};

// -------------------
// USERS
// -------------------
export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const addUser = async (user) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const updateUser = async (id, user) => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(user),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE", headers });
  return res.json();
};

// -------------------
// AUTHENTICATION
// -------------------
export const registerUser = async (user) => {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const loginUser = async (user) => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};
