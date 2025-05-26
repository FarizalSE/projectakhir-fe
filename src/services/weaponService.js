import api from './api';

export const weaponService = {
  getAllWeapons: () => {
    return api.get('/weapons');
  },

  getWeaponById: (id) => {
    return api.get(`/weapons/${id}`);
  },

  addWeapon: (weaponData) => {
    return api.post('/add-weapons', weaponData);
  },

  updateWeapon: (id, weaponData) => {
    return api.put(`/update-weapons/${id}`, weaponData);
  },

  deleteWeapon: (id) => {
    return api.delete(`/delete-weapons/${id}`);
  },
};