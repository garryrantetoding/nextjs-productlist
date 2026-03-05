import React, { useState } from 'react';
import { TaskStatusEnum } from '@/data/services/enum/reportorder-enum';

interface TaskStatusFilterProps {
  onStatusChange: (taskStatusFilter: TaskStatusEnum) => void;
}

const TaskStatusFilter: React.FC<TaskStatusFilterProps> = ({ onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(''); // Local string for select

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);

    const selectedEnum =
      value === 'WAITING'
        ? TaskStatusEnum.WAITING
        : value === 'APPROVED'
        ? TaskStatusEnum.APPROVED
        : value === 'COMPLETE'
        ? TaskStatusEnum.COMPLETE
        : TaskStatusEnum.Empty;

    onStatusChange(selectedEnum);
  };

  const selectStyle = {
    color: selectedStatus === '' ? '#adadad' : 'black',
  };

  return (
    <div>
      <label htmlFor="task-status-filter" className="sr-only">
        Task Status
      </label>
      <select
        id="task-status-filter"
        onChange={handleChange}
        value={selectedStatus}
        className="border h-10 p-2 bg-white rounded-md"
        style={selectStyle}
      >
        <option value="">Task Status</option>
        <option value="WAITING">Waiting</option>
        <option value="APPROVED">Approved</option>
        <option value="COMPLETE">Complete</option>
      </select>
    </div>
  );
};

export default TaskStatusFilter;
