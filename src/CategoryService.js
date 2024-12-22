import axios from 'axios';

const API_URL = 'http://localhost:3000/categories';

const getCategories = () => {
  return axios.get(API_URL);
};

const createCategory = (category) => {
  return axios.post(API_URL, category);
};

const updateCategory = (id, category) => {
  return axios.patch(`${API_URL}/${id}`, category);
};

const deleteCategory = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
