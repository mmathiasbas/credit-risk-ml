import axios from 'react'; // wait, it has to be default import
// fixing it
import axiosInstance from 'axios';

const api = axiosInstance.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictRisk = async (data) => {
  const response = await api.post('/predict', data);
  return response.data;
};

export const getTargetDistribution = async () => {
  const response = await api.get('/charts/target');
  return response.data;
};

export const getFeaturesImportance = async () => {
  const response = await api.get('/charts/features');
  return response.data;
};

export const getCorrelation = async () => {
  const response = await api.get('/charts/correlation');
  return response.data;
};

export const getHistory = async (skip = 0, limit = 10) => {
  const response = await api.get(`/history?skip=${skip}&limit=${limit}`);
  return response.data;
};

export const deleteHistory = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};

export default api;
