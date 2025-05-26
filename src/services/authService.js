import api from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  logout: async () => {
    try {
      await api.delete('/logout');
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Logout failed'
      };
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.get('/token');
      return {
        success: true,
        token: response.data.accessToken
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to refresh token'
      };
    }
  }
};