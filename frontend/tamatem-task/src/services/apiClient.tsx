// src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Replace with your backend URL
});

// Add token to headers for authenticated requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const fetchProducts = async (page = 1, pageSize = 10, location?: string) => {
  const params: { page: number; page_size: number; location?: string } = {
    page,
    page_size: pageSize,
  };

  if (location) {
    params.location = location;
  }

  const response = await apiClient.get('/products/', { params });
  return response.data;
};

export const fetchProductDetails = async (productId: number) => {
  const response = await apiClient.get(`/products/${productId}/`);
  return response.data;
};

export const purchaseProduct = async (productId: number) => {
  const response = await apiClient.post('/orders/create', { productId });
  return response.data;
};
export default apiClient;