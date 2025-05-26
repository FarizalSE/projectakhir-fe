import React, { useEffect, useState } from 'react';
import { transactionService } from '../../services/transactionService';
import TransactionTable from './TransactionTable';
import TransactionForm from './TransactionForm';

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchTransactions = async () => {
    const response = await transactionService.getAllTransactions();
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEdit = (transaction) => {
    setSelectedTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedTransaction(null);
    setIsFormOpen(false);
    fetchTransactions(); // Refresh the transaction list after adding/updating
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Transaction Management</h2>
      <button onClick={() => setIsFormOpen(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Add Transaction
      </button>
      <TransactionTable transactions={transactions} onEdit={handleEdit} />
      {isFormOpen && (
        <TransactionForm transaction={selectedTransaction} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default TransactionManagement;
