import axios from 'axios';

const api = axios.create({
  baseURL: 'http://191.202.83.253:5000/api',
});

export const getProducts = () => api.get('/products');
export const createProduct = (product) => api.post('/products', product);
