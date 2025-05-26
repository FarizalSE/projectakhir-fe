import React, { useState, useEffect } from 'react';
import { transactionService } from '../../services/transactionService';
import Input from '../Common/Input';
import Button from '../Common/Button';

const TransactionForm = ({ transaction, onClose }) => {
  const [formData, setFormData] = useState({
    type_transactions: '',
    amount: 0,
    status: 'pending',
    weapon_id: '',
    user_id: '',
  });

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (transaction) {
        await transactionService.updateTransaction(transaction.id, formData);
      } else {
        await transactionService.addTransaction(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {transaction ? 'Edit Transaction' : 'Add Transaction'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Transaction Type"
            name="type_transactions"
            value={formData.type_transactions}
            onChange={handleChange}
            required
          />
          <Input
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <Input
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
          <Input
            label="Weapon ID"
            name="weapon_id"
            value={formData.weapon_id}
            onChange={handleChange}
            required
          />
          <Input
            label="User ID"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit">
            {transaction ? 'Update Transaction' : 'Save Transaction'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;