import React from 'react';

const WeaponTable = ({ weapons, onEdit }) => {
  return (
    <table className="min-w-full mt-4 bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Type</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {weapons.map((weapon) => (
          <tr key={weapon.id}>
            <td className="py-2 px-4 border-b">{weapon.name}</td>
            <td className="py-2 px-4 border-b">{weapon.type}</td>
            <td className="py-2 px-4 border-b">
              <button onClick={() => onEdit(weapon)} className="text-blue-600 hover:underline">
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeaponTable;
