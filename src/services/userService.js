import api from './api';

export const userService = {
  getAllUsers: () => {
    return api.get('/users');
  },

  getUserById: (id) => {
    return api.get(`/users/${id}`);
  },

  updateUser: (id, userData) => {
    return api.put(`/update-user/${id}`, userData);
  },

  deleteUser: (id) => {
    return api.delete(`/delete-user/${id}`);
  },
};