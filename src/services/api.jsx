import axios from 'axios';

const API_BASE = 'https://bookshop-api-er7t.onrender.com/api';

export const createBook = async (bookData) => {
  try {
    const res = await axios.post(`${API_BASE}/books`, bookData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const searchBooks = async (query = '', page = 1, limit = 10) => {
  try {
    const res = await axios.get(`${API_BASE}/books/search`, {
      params: { query, page, limit },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getBooks = async (page = 1, limit = 10) => {
  try {
    const res = await axios.get(`${API_BASE}/books`, {
      params: { page, limit },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateBook = async (id, bookData) => {
  try {
    const res = await axios.put(`${API_BASE}/books/${id}`, bookData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteBook = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/books/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
