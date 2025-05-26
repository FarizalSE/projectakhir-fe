import React from 'react';

const TransactionTable = ({ transactions, onEdit }) => {
  return (
    <table className="min-w-full mt-4 bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Type</th>
          <th className="py-2 px-4 border-b">Amount</th>
          <th className="py-2 px-4 border-b">Status</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className="py-2 px-4 border-b">{transaction.type_transactions}</td>
            <td className="py-2 px-4 border-b">{transaction.amount}</td>
            <td className="py-2 px-4 border-b">{transaction.status}</td>
            <td className="py-2 px-4 border-b">
              <button onClick={() => onEdit(transaction)} className="text-blue-600 hover:underline">
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
