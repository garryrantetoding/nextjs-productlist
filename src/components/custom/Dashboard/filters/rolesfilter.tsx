import React, { useState } from 'react';
import { BuyerRoleEnum } from '@/data/services/enum/reportorder-enum';

interface RoleFilterProps {
  onRoleChange: (role: BuyerRoleEnum) => void;
}

const RoleFilter: React.FC<RoleFilterProps> = ({ onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState<string>(''); // Local string for select value

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    // Update the dropdown state
    setSelectedRole(value);

    // Map string to enum and notify parent
    const selectedEnum =
      value === 'CUSTOMER'
        ? BuyerRoleEnum.CUSTOMER
        : value === 'RESELLER'
        ? BuyerRoleEnum.RESELLER
        : value === 'DISTRIBUTOR'
        ? BuyerRoleEnum.DISTRIBUTOR
        : BuyerRoleEnum.Empty; // Default/fallback value

    onRoleChange(selectedEnum);
  };

  const selectStyle = {
    color: selectedRole === '' ? '#adadad' : 'black', // Gray text if no value selected
  };

  return (
    <div>
      <label htmlFor="role-filter" className="sr-only">
        Role
      </label>
      <select
        id="role-filter"
        onChange={handleChange}
        value={selectedRole}
        className="border h-10 p-2 bg-white rounded-md"
        style={selectStyle}
      >
        <option value="">Buyer Role</option>
        <option value="CUSTOMER">Customer</option>
        <option value="RESELLER">Reseller</option>
        <option value="DISTRIBUTOR">Distributor</option>
      </select>
    </div>
  );
};

export default RoleFilter;
