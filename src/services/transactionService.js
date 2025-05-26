import api from './api';

export const transactionService = {
  getAllTransactions: () => {
    return api.get('/transaction');
  },

  getTransactionById: (id) => {
    return api.get(`/transaction/${id}`);
  },

  addTransaction: (transactionData) => {
    return api.post('/add-transaction', transactionData);
  },

  updateTransaction: (id, transactionData) => {
    return api.put(`/update-transaction/${id}`, transactionData);
  },
};