import React, { useEffect, useState } from 'react';
import { userService } from '../../services/userService';
import UserTable from './UsersTable';
import UserForm from './UsersForm';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message || 'Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setIsFormOpen(false);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <button 
        onClick={() => setIsFormOpen(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add User
      </button>
      
      <UserTable users={users} onEdit={handleEdit} />
      
      {isFormOpen && (
        <UserForm 
          user={selectedUser} 
          onClose={handleCloseForm} 
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
};

export default UserManagement;