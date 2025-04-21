import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  },

  signup: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  },
};

export default authService; 