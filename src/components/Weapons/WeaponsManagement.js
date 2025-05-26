import React, { useEffect, useState } from 'react';
import { weaponService } from '../../services/weaponService';
import WeaponTable from './WeaponsTable';
import WeaponForm from './WeaponsForm';

const WeaponsManagement = () => {
  const [weapons, setWeapons] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchWeapons = async () => {
    try {
      const response = await weaponService.getAllWeapons();
      setWeapons(response.data);
    } catch (error) {
      console.error("Error fetching weapons:", error);
      // Show error to user
    }
  };

  useEffect(() => {
    fetchWeapons();
  }, []);

  const handleEdit = (weapon) => {
    setSelectedWeapon(weapon);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedWeapon(null);
    setIsFormOpen(false);
    fetchWeapons(); // Refresh the weapon list after adding/updating
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Weapons Management</h2>
      <button onClick={() => setIsFormOpen(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Add Weapon
      </button>
      <WeaponTable weapons={weapons} onEdit={handleEdit} />
      {isFormOpen && (
        <WeaponForm weapon={selectedWeapon} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default WeaponsManagement;
