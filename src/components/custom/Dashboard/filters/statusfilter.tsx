import React, {useState} from 'react';
import { Status } from '@/data/services/enum/enum'; // Import your enum

interface StatusFilterProps {
  onStatusChange: (status: Status ) => void; // Change to use Status enum
}

const StatusFilter: React.FC<StatusFilterProps> = ({ onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(''); // Track the selected status

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value === 'active'
      ? Status.Active
      : event.target.value === 'inactive'
      ? Status.Inactive
      : Status.undefined; // Return undefined for "All Status"

    setSelectedStatus(event.target.value); // Update selectedStatus state
    onStatusChange(status); // Notify parent of the status change
  };

  // Define styles for conditional text color
  const selectStyle = {
    color: selectedStatus === "" ? '#adadad' : 'black', // Apply red color if no status is selected
  };


  return (
    <div>
      <label htmlFor="status-filter"></label>
      <select id="status-filter" onChange={handleChange} 
      className="border h-10   bg-white p-2 rounded-md"
      value={selectedStatus} // Bind to selected status state
      style={selectStyle} // Apply the conditional style for text color
      >
        <option value="">Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default StatusFilter;