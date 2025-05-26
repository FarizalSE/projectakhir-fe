// src/utils/validators.js

/**
 * Memvalidasi format email
 * @param {string} email - Email yang akan divalidasi
 * @returns {boolean} - True jika email valid, false jika tidak
 */
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

/**
 * Memvalidasi password
 * @param {string} password - Password yang akan divalidasi
 * @returns {boolean} - True jika password valid, false jika tidak
 */
export const validatePassword = (password) => {
    // Contoh validasi: minimal 6 karakter
    return password.length >= 6;
};

/**
 * Memvalidasi data pengguna
 * @param {object} userData - Data pengguna yang akan divalidasi
 * @returns {object} - Objek yang berisi status validasi dan pesan
 */
export const validateUserData = (userData) => {
    const { name, email, password } = userData;
    if (!name) {
        return { isValid: false, message: 'Nama harus diisi' };
    }
    if (!validateEmail(email)) {
        return { isValid: false, message: 'Email tidak valid' };
    }
    if (!validatePassword(password)) {
        return { isValid: false, message: 'Password harus minimal 6 karakter' };
    }
    return { isValid: true, message: '' };
};

// utils/validators.js
export const validateWeaponForm = (formData) => {
  const errors = {};
  
  if (!formData.name) errors.name = 'Name is required';
  if (!formData.type) errors.type = 'Type is required';
  if (!formData.serialNum) errors.serialNum = 'Serial number is required';
  if (!formData.condition) errors.condition = 'Condition is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};