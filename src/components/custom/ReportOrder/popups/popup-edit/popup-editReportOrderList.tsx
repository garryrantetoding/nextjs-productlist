import React, { useState, useEffect } from 'react';
import { EditReportOrderList } from '../../ListReportOrder';
import { z } from 'zod';
import TiptapEditor from '../../../input-custom/tiptapeditor';
import { BuyerRoleEnum, CategoryEnum, OrderStatusEnum, PaymentStatusEnum, TaskStatusEnum } from '@/data/services/enum/reportorder-enum';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editReportOrder: EditReportOrderList | null;
  setEditReportOrder: React.Dispatch<React.SetStateAction<EditReportOrderList | null>>;
  onSave: () => void;
  onCancel: () => void;
  backendError: {


    orderStatus: string;
    paymentStatus: string;
    taskStatus: string;
    notes: string;


  };
  setBackendError: React.Dispatch<React.SetStateAction<{


    orderStatus: string;
    paymentStatus: string;
    taskStatus: string;
    notes: string;
  }>>;
}

const editProductListSchema = z.object({
  brochure: z.boolean(),
  productname: z.string().min(1, { message: 'Product name is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  customerprice: z.string().min(1, { message: 'Customer price is required' }),
  resellerprice: z.string().min(1, { message: 'Reseller price is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  videotutorial: z.string().url({ message: 'Video tutorial must be a valid URL' }),
});


export const editResellerSchema = z.object({
  // storephoto: z.instanceof(File),
  shopname: z.string().min(1, 'Shop name is required'),
  owner: z.string().min(1, 'Owner is required'),
  roles: z.string().min(1, 'Roles are required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  phone: z
    .string()
    .regex(/^\d+$/, 'Phone must contain only numbers')
    .min(1, 'Phone number is required'),
  address1: z.string().min(1, 'Address line 1 is required'),
  address2: z.string().min(1, 'Address line 2 is required'),
  city: z.string().min(1, 'City is required'),
  printera3: z.boolean(),
  printera4: z.boolean(),
});


export const editReportOrderSchema = z.object({

  orderStatus: z
    .string()
    .min(1, { message: 'Role is required' })
    .refine((val) => val !== OrderStatusEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
  paymentStatus: z
    .string()
    .min(1, { message: 'Role is required' })
    .refine((val) => val !== OrderStatusEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
  taskStatus: z
    .string()
    .min(1, { message: 'Role is required' })
    .refine((val) => val !== OrderStatusEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
  notes: z.string().min(1, 'Address line 1 is required'),

});

const EditReportOrderModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  editReportOrder,
  setEditReportOrder,
  onSave,
  onCancel,
  backendError,
  setBackendError,
}) => {
  const [validationErrors, setValidationErrors] = useState({
   

    orderStatus: '',
    paymentStatus: '',
    taskStatus: '',
    notes: '',
  });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const result = editReportOrderSchema.safeParse(editReportOrder);
    if (!result.success) {
      const formatted = result.error.format();
      setValidationErrors({
        orderStatus: formatted.orderStatus?._errors.join(', ') || '',
        paymentStatus: formatted.paymentStatus?._errors.join(', ') || '',
        taskStatus: formatted.taskStatus?._errors.join(', ') || '',
        notes: formatted.notes?._errors.join(', ') || '',
      });
      return;
    }

    onSave();
    setValidationErrors({

      orderStatus: '',
      paymentStatus: '',
      taskStatus: '',
      notes: '',

    });
    setBackendError({

      orderStatus: '',
      paymentStatus: '',
      taskStatus: '',
      notes: '',

    });
  };

  if (!isOpen || !editReportOrder) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-60"
      style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold w-full pb-4 px-2 border-b-1 border-neutral-200">Edit Report Order</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between" style={{ gap: '20px' }}>
          
            {/* Form Fields */}
            <div className="w-full space-y-3">
              <div>
                <label className="block text-sm font-medium">Order Status</label>
                <select
                  name="orderStatus"
                  value={editReportOrder.orderStatus}
                  onChange={(e) =>
                    setEditReportOrder(prev => prev ? { ...prev, orderStatus: e.target.value as OrderStatusEnum } : prev)
                  } className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: editReportOrder.orderStatus === "" ? '#989898' : 'black', // Apply red color if no role is selected
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value={OrderStatusEnum.Empty}>Select Status</option>
                  <option value={OrderStatusEnum.NEW}>New</option>
                  <option value={OrderStatusEnum.FINISH}>Finish</option>
                  <option value={OrderStatusEnum.PROGRESS}>Progress</option>
                  <option value={OrderStatusEnum.CANCEL}>Cancel</option>
                </select>
                {(validationErrors.orderStatus || backendError.orderStatus) && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.orderStatus || backendError.orderStatus}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Payment Status</label>
                <select
                  name="paymentStatus"
                  value={editReportOrder.paymentStatus}
                  onChange={(e) =>
                    setEditReportOrder(prev => prev ? { ...prev, paymentStatus: e.target.value as PaymentStatusEnum } : prev)
                  } className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: editReportOrder.paymentStatus === "" ? '#989898' : 'black', // Apply red color if no role is selected
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value={PaymentStatusEnum.Empty}>Select Status</option>
                  <option value={PaymentStatusEnum.PENDING}>Pending</option>
                  <option value={PaymentStatusEnum.SUCCESS}>Success</option>
                  <option value={PaymentStatusEnum.SETTLEMENT}>Settlement</option>
                  <option value={PaymentStatusEnum.CANCEL}>Cancel</option>
                  <option value={PaymentStatusEnum.REFUND}>Refund</option>
                  <option value={PaymentStatusEnum.REJECTED}>Rejected</option>


                </select>
                {(validationErrors.paymentStatus || backendError.paymentStatus) && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.paymentStatus || backendError.paymentStatus}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Task Status</label>
                <select
                  name="taskStatus"
                  value={editReportOrder.taskStatus}
                  onChange={(e) =>
                    setEditReportOrder(prev => prev ? { ...prev, taskStatus: e.target.value as TaskStatusEnum } : prev)
                  } className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: editReportOrder.taskStatus === "" ? '#989898' : 'black', // Apply red color if no role is selected
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value={TaskStatusEnum.Empty}>Select Role</option>
                  <option value={TaskStatusEnum.WAITING}>Waiting</option>
                  <option value={TaskStatusEnum.APPROVED}>Approved</option>
                  <option value={TaskStatusEnum.COMPLETE}>Complete</option>


                </select>
                {(validationErrors.taskStatus || backendError.taskStatus) && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.taskStatus || backendError.taskStatus}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">Notes</label>
                <TiptapEditor
                  value={editReportOrder.notes}
                  onChange={(html) =>
                    setEditReportOrder(prev => prev ? { ...prev, notes: html } : prev)
                  }
                />
                {(validationErrors.notes || backendError.notes) && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.notes || backendError.notes}
                  </p>
                )}
              </div>


            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-neutral-400 border-2 text-white hover:bg-neutral-500 h-10 w-20 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 h-10 w-30 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReportOrderModal;

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};


const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder = 'text',
  value,
  onChange,
  error,
}) => {
  const isPhoneNumber = name === 'phone'; // You can adjust this condition

  const formatPhoneNumber = (val: string) => {
    const num = val.replace(/\D/g, '');
    return num.replace(/(\d{4})(\d{3,4})(\d{0,4})/, (_, p1, p2, p3) =>
      [p1, p2, p3].filter(Boolean).join(' ')
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    if (isPhoneNumber) {
      const clean = rawValue.replace(/\D/g, ''); // Remove non-digits
      const formatted = formatPhoneNumber(clean);

      // Send raw numeric value to parent
      const customEvent = {
        ...e,
        target: {
          ...e.target,
          name: e.target.name,
          value: clean,
        },
      };

      onChange?.(customEvent as React.ChangeEvent<HTMLInputElement>);
    } else {
      onChange?.(e);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={isPhoneNumber ? formatPhoneNumber(value ?? '') : value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-3xl"
        style={{
          height: 40,
          backgroundColor: '#F8F9FB',
          border: '1px solid #E5E5E7',
        }}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
