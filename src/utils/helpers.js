// src/utils/helpers.js

/**
 * Format tanggal menjadi string yang lebih mudah dibaca
 * @param {string} dateString - Tanggal dalam format string
 * @returns {string} - Tanggal yang diformat
 */
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Mengubah huruf pertama dari string menjadi huruf kapital
 * @param {string} string - String yang akan diubah
 * @returns {string} - String dengan huruf pertama kapital
 */
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Menghitung total dari array angka
 * @param {number[]} numbers - Array angka
 * @returns {number} - Total dari angka-angka
 */
export const calculateTotal = (numbers) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
};


