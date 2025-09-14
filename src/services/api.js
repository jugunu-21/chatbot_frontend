import axios from 'axios';

// Configure base URL - update this to match your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://chatbot-backend-yrvu.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }
    
    if (error.response) {
      throw new Error(error.response.data.message || 'Server error occurred');
    }
    
    if (error.request) {
      throw new Error('Unable to connect to server. Please check your connection.');
    }
    
    throw new Error('An unexpected error occurred');
  }
);

export const sendMessage = async (sessionId, message) => {
  try {
    const response = await api.post('/chat', {
      sessionId,
      message,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSessionHistory = async (sessionId) => {
  try {
    const response = await api.get(`/history/${sessionId}`);
    return response.data.messages || [];
  } catch (error) {
    if (error.response?.status === 404) {
      return []; // No history found, return empty array
    }
    throw error;
  }
};

export const clearSession = async (sessionId) => {
  try {
    const response = await api.delete(`/history/${sessionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Health check endpoint
export const checkApiHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw error;
  }
};
