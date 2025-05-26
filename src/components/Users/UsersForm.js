import React, { useEffect, useState } from 'react';
import { userService } from '../../services/userService';
import Input from '../Common/Input';
import Button from '../Common/Button';

const UserForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'petugas', // Default role
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await userService.updateUser (user.id, formData);
      } else {
        await userService.createUser (formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{user ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required={!user} // Password is required only when adding a new user
        />
        <Input
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="mt-4">
          {user ? 'Update User' : 'Add User'}
        </Button>
        <Button type="button" onClick={onClose} className="mt-2">
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
