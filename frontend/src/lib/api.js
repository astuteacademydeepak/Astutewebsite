import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API, timeout: 20000 });

export const publicApi = {
  createLead: (data) => api.post("/leads", data).then((r) => r.data),
  createContact: (data) => api.post("/contact", data).then((r) => r.data),
  listEvents: (status) => api.get("/events", { params: status ? { status } : {} }).then((r) => r.data),
  listBlog: (category) => api.get("/blog", { params: category ? { category } : {} }).then((r) => r.data),
  getBlog: (slug) => api.get(`/blog/${slug}`).then((r) => r.data),
  listTestimonials: (role) => api.get("/testimonials", { params: role ? { role } : {} }).then((r) => r.data),
  listFaqs: (category) => api.get("/faqs", { params: category ? { category } : {} }).then((r) => r.data),
  seed: () => api.post("/seed").then((r) => r.data),
};

export const adminApi = {
  login: (email, password) => api.post("/admin/login", { email, password }).then((r) => r.data),
  listLeads: (token) => api.get("/admin/leads", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.data),
  listContacts: (token) => api.get("/admin/contacts", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.data),
};
