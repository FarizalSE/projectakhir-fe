import React from 'react';

const UserTable = ({ users, onEdit }) => {
  return (
    <table className="min-w-full mt-4 bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Role</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="py-2 px-4 border-b">{user.name}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.role}</td>
            <td className="py-2 px-4 border-b">
              <button onClick={() => onEdit(user)} className="text-blue-600 hover:underline">
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
