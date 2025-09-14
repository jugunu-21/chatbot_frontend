import { v4 as uuidv4 } from 'uuid';

export const generateSessionId = () => {
  return uuidv4();
};

export const getStoredSessionId = () => {
  return localStorage.getItem('chatSessionId');
};

export const storeSessionId = (sessionId) => {
  localStorage.setItem('chatSessionId', sessionId);
};

export const clearStoredSessionId = () => {
  localStorage.removeItem('chatSessionId');
};
