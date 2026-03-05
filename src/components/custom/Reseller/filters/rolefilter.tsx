import React, { useState, useEffect } from 'react';
import { LoadUserRole } from '@/data/services/userroles-service';

interface RoleFilterProps {
  onRoleChange: (role: string) => void;
}

const RoleFilter: React.FC<RoleFilterProps> = ({ onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState<string>(''); // State for selected role

  // Handle role change, update both local state and notify parent
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedRole(selected); // Update local state
    onRoleChange(selected); // Notify parent component of the change
console.log("testselected",selected)
  };

  // Fetch roles from the backend API
  // useEffect(() => {
  //   const fetchRoles = async () => {
  //     try {
  //       const response = await LoadUserRole(); // API function to load roles
  //       const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
  //       setRoles(data); // Set the roles in state
  //     } catch (error) {
  //       console.error('Error fetching roles:', error);
  //     }
  //   };

  //   fetchRoles();
  // }, []); // Empty dependency array to run only once on component mount

  // Define styles for conditional text color
  const selectStyle = {
    color: selectedRole === "" ? '#adadad' : 'black', // Apply red color if no role is selected
  };

  return (
    <div>
      <label htmlFor="role-filter"></label>
      
        <select
          id="role-filter"
          onChange={handleChange} // Handle change event
          value={selectedRole} // Bind the value to the selected role state
          className={`border h-10 p-2 bg-white rounded-md `}
          style={selectStyle} // Apply the conditional style for text color
        >
          {/* Default empty option */}
          <option value="">Role</option>

                  <option value="Mesin Jahit">Mesin Jahit</option>
                  <option value="Printer">Printer</option>
                  <option value="Mesin Label">Mesin Label</option>

       
        </select>

    </div>
  );
};

export default RoleFilter;
