const API = import.meta.env.VITE_API_URL || '/api';

const getToken = () => localStorage.getItem('shc_token');

export const api = {
  async get(path, useAuth = false) {
    const res = await fetch(API + path, { headers: useAuth ? { Authorization: `Bearer ${getToken()}` } : {} });
    if (!res.ok) throw new Error('Fetch failed');
    return res.json();
  },
  async post(path, body, useAuth = false) {
    const res = await fetch(API + path, {
      method: 'POST',
      headers: { ...(useAuth ? { Authorization: `Bearer ${getToken()}` } : {}), 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  },
  async put(path, body) {
    const res = await fetch(API + path, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return res.json();
  },
  async del(path) {
    const res = await fetch(API + path, { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } });
    return res.json();
  },
  async upload(path, formData) {
    const res = await fetch(API + path, { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');
    return data;
  }
};