import React, { useState } from 'react';
import { OrderStatusEnum } from '@/data/services/enum/reportorder-enum';

interface OrderStatusFilterProps {
  onStatusChange: (orderStatusFilter: OrderStatusEnum) => void;
}

const OrderStatusFilter: React.FC<OrderStatusFilterProps> = ({ onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(''); // Local string for select

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);

    const selectedEnum =
      value === 'NEW'
        ? OrderStatusEnum.NEW
        : value === 'FINISH'
        ? OrderStatusEnum.FINISH
        : value === 'PROGRESS'
        ? OrderStatusEnum.PROGRESS
        : value === 'CANCEL'
        ? OrderStatusEnum.CANCEL
        : OrderStatusEnum.Empty;

    onStatusChange(selectedEnum);
  };

  const selectStyle = {
    color: selectedStatus === '' ? '#adadad' : 'black',
  };

  return (
    <div>
      <label htmlFor="order-status-filter" className="sr-only">
        Order Status
      </label>
      <select
        id="order-status-filter"
        onChange={handleChange}
        value={selectedStatus}
        className="border h-10 p-2 bg-white rounded-md"
        style={selectStyle}
      >
        <option value="">Order Status</option>
        <option value="NEW">New</option>
        <option value="FINISH">Finished</option>
        <option value="PROGRESS">In Progress</option>
        <option value="CANCEL">Cancelled</option>
      </select>
    </div>
  );
};

export default OrderStatusFilter;
