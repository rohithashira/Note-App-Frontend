import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const notesService = {
  getNotes: async (token) => {
    const response = await axios.get(`${API_URL}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  createNote: async (token, data) => {
    const response = await axios.post(`${API_URL}/notes`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateNote: async (token, id, data) => {
    const response = await axios.put(`${API_URL}/notes/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deleteNote: async (token, id) => {
    await axios.delete(`${API_URL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default notesService; 