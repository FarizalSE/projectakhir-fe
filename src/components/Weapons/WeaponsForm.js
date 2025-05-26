import React, { useEffect, useState } from 'react';
import { weaponService } from '../../services/weaponService';
import Input from '../Common/Input';
import Button from '../Common/Button';

const WeaponForm = ({ weapon, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    serialNum: '',
    condition: '',
    location: '',
    stok: 0,
  });

  useEffect(() => {
    if (weapon) {
      setFormData(weapon);
    }
  }, [weapon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (weapon) {
        await weaponService.updateWeapon(weapon.id, formData);
      } else {
        await weaponService.addWeapon(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving weapon:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{weapon ? 'Edit Weapon' : 'Add Weapon'}</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <Input
          label="Serial Number"
          name="serialNum"
          value={formData.serialNum}
          onChange={handleChange}
          required
        />
        <Input
          label="Condition"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
        />
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <Input
          label="Stock"
          name="stok"
          type="number"
          value={formData.stok}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="mt-4">
          {weapon ? 'Update Weapon' : 'Add Weapon'}
        </Button>
        <Button type="button" onClick={onClose} className="mt-2">
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default WeaponForm;
