import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import TiptapEditor from '../../../input-custom/tiptapeditor';
import ImageUploader from '../../../input-custom/ImageUploader';
import { BuyerRoleEnum, CategoryEnum, OrderStatusEnum, PaymentStatusEnum, TaskStatusEnum } from '@/data/services/enum/reportorder-enum';
import PDFUploader from '@/components/custom/input-custom/PDFUploader';


// Zod validation schema


export const AddReportOrderSchema = z.object({
  invoice: z.instanceof(File),
  roles: z
    .string()
    .min(1, { message: 'Role is required' })
    .refine((val) => val !== BuyerRoleEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
  category: z
    .string()
    .min(1, { message: 'Role is required' })
    .refine((val) => val !== CategoryEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role

  orderStatus: z
    .string()
    .min(1, { message: 'Role is required' })
    .refine((val) => val !== OrderStatusEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
  paymentStatus: z
    .string()
    .min(1, { message: 'Role is required' })
    .refine((val) => val !== PaymentStatusEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
  taskStatus: z
    .string()
    .min(1, { message: 'Role is required' })
    .refine((val) => val !== TaskStatusEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
  notes: z.string().min(1, 'Address line 1 is required'),

});



interface ListReportOrder {

  invoice: File | null;
  roles: BuyerRoleEnum;
  category: CategoryEnum;
  orderStatus: OrderStatusEnum;
  paymentStatus: PaymentStatusEnum;
  taskStatus: TaskStatusEnum;
  notes: string;

}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReportOrder: (

    invoice: File | null,
    roles: BuyerRoleEnum,
    category: CategoryEnum,
    orderStatus: OrderStatusEnum,
    paymentStatus: PaymentStatusEnum,
    taskStatus: TaskStatusEnum,
    notes: string,



  ) => void;
  newReportOrder: ListReportOrder;
  setNewReportOrder: React.Dispatch<React.SetStateAction<ListReportOrder>>;
  setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backendError: Record<keyof ListReportOrder, string>;
  setBackendError: React.Dispatch<React.SetStateAction<Record<keyof ListReportOrder, string>>>;
}

const ReportOrderListModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onAddReportOrder,
  newReportOrder,
  setNewReportOrder,
  setDiscardConfirmationOpen,
  backendError,
  setBackendError,
}) => {
  const [errors, setErrors] = useState<Record<keyof ListReportOrder, string>>({

    invoice: '',
    roles: '',
    category: '',
    orderStatus: '',
    paymentStatus: '',
    taskStatus: '',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReportOrder(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      invoice: '',
      roles: '',
      category: '',
      orderStatus: '',
      paymentStatus: '',
      taskStatus: '',
      notes: '',
    });

    setBackendError({
      invoice: '',
      roles: '',
      category: '',
      orderStatus: '',
      paymentStatus: '',
      taskStatus: '',
      notes: '',
    });

    const result = AddReportOrderSchema.safeParse(newReportOrder);

    if (!result.success) {
      const formattedErrors = result.error.format();

      const validationErrors: Record<keyof ListReportOrder, string> = {

        invoice: formattedErrors.invoice?._errors.join(', ') || '',
        roles: formattedErrors.roles?._errors.join(', ') || '',
        category: formattedErrors.category?._errors.join(', ') || '',
        orderStatus: formattedErrors.orderStatus?._errors.join(', ') || '',
        paymentStatus: formattedErrors.paymentStatus?._errors.join(', ') || '',
        taskStatus: formattedErrors.taskStatus?._errors.join(', ') || '',
        notes: formattedErrors.notes?._errors.join(', ') || '',
      };

      setErrors(validationErrors);
      return;
    }

    onAddReportOrder(



      newReportOrder.invoice,
      newReportOrder.roles,
      newReportOrder.category,
      newReportOrder.orderStatus,
      newReportOrder.paymentStatus,
      newReportOrder.taskStatus,
      newReportOrder.notes,
    );

    onClose();
    setDiscardConfirmationOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setErrors({
        invoice: '',
        roles: '',
        category: '',
        orderStatus: '',
        paymentStatus: '',
        taskStatus: '',
        notes: '',
      });

      setBackendError({
        invoice: '',
        roles: '',
        category: '',
        orderStatus: '',
        paymentStatus: '',
        taskStatus: '',
        notes: '',
      });
    }
  }, [isOpen, setBackendError]);

  const handleFileUpload = (file: File) => {
    setNewReportOrder(prev => ({ ...prev, invoice: file }));
  };

  if (!isOpen) return null;

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
          <h2 className="text-xl font-semibold  w-full pb-4 px-2 border-b-1 border-neutral-200">New Item</h2>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload using ImageUploader */}
          <div className='flex justify-between'
            style={{ gap: '20px' }}>
            <div>
                <label className="block text-sm font-medium">Invoice</label>
                {/* <ImageUploader onFileSelect={handleFileUpload} /> */}
                <PDFUploader onFileSelect={handleFileUpload} />
                {errors.invoice || backendError.invoice ? (
                  <p className="text-red-500 text-sm">{errors.invoice || backendError.invoice}</p>
                ) : null}

            </div>
            <div className='w-full'>
              {/* Text Inputs */}
              <div>
                <label className="block text-sm font-medium">Roles</label>
                <select
                  name="roles"
                  value={newReportOrder.roles}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: newReportOrder.roles === "" ? '#989898' : 'black', // Apply red color if no role is selected
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value={BuyerRoleEnum.Empty}>Select Role</option>
                  <option value={BuyerRoleEnum.CUSTOMER}>Customer</option>
                  <option value={BuyerRoleEnum.RESELLER}>Reseller</option>
                  <option value={BuyerRoleEnum.DISTRIBUTOR}>Distributor</option>


                </select>
                {(errors.roles || backendError.roles) && (
                  <p className="text-red-500 text-sm">
                    {errors.roles || backendError.roles}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={newReportOrder.category}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: newReportOrder.category === "" ? '#989898' : 'black', // Apply red color if no role is selected
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value={CategoryEnum.Empty}>Select Role</option>
                  <option value={CategoryEnum.A3}>Printer Inkjet A3</option>
                  <option value={CategoryEnum.A4}>Printer Inkjet A4</option>
                  <option value={CategoryEnum.MJ}>Mesin Jahit</option>
                  <option value={CategoryEnum.ML}>Mesin Label</option>



                </select>
                {(errors.category || backendError.category) && (
                  <p className="text-red-500 text-sm">
                    {errors.category || backendError.category}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Order Status</label>
                <select
                  name="orderStatus"
                  value={newReportOrder.orderStatus}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: newReportOrder.orderStatus === "" ? '#989898' : 'black', // Apply red color if no role is selected
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value={OrderStatusEnum.Empty}>Select Status</option>
                  <option value={OrderStatusEnum.NEW}>New</option>
                  <option value={OrderStatusEnum.FINISH}>Finish</option>
                  <option value={OrderStatusEnum.PROGRESS}>Progress</option>
                  <option value={OrderStatusEnum.CANCEL}>Cancel</option>



                </select>
                {(errors.orderStatus || backendError.orderStatus) && (
                  <p className="text-red-500 text-sm">
                    {errors.orderStatus || backendError.orderStatus}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Payment Status</label>
                <select
                  name="paymentStatus"
                  value={newReportOrder.paymentStatus}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: newReportOrder.paymentStatus === "" ? '#989898' : 'black', // Apply red color if no role is selected
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
                {(errors.paymentStatus || backendError.paymentStatus) && (
                  <p className="text-red-500 text-sm">
                    {errors.paymentStatus || backendError.paymentStatus}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Task Status</label>
                <select
                  name="taskStatus"
                  value={newReportOrder.taskStatus}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: newReportOrder.taskStatus === "" ? '#989898' : 'black', // Apply red color if no role is selected
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value={TaskStatusEnum.Empty}>Select Role</option>
                  <option value={TaskStatusEnum.WAITING}>Waiting</option>
                  <option value={TaskStatusEnum.APPROVED}>Approved</option>
                  <option value={TaskStatusEnum.COMPLETE}>Complete</option>


                </select>
                {(errors.taskStatus || backendError.taskStatus) && (
                  <p className="text-red-500 text-sm">
                    {errors.taskStatus || backendError.taskStatus}
                  </p>
                )}
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-sm font-medium">Notes</label>
                <TiptapEditor
                  value={newReportOrder.notes}
                  onChange={(html) => setNewReportOrder(prev => ({ ...prev, notes: html }))}
                />
                {errors.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}
              </div>

            </div>
          </div>
        </form>
        <div className="flex justify-center space-x-2 mt-4">

          <button
            type="button"
            onClick={onClose}
            className="bg-neutral-400 border-2  text-white hover:bg-neutral-500 h-10 w-20 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white  hover:bg-blue-600 h-10 w-30 rounded-md"
          >
            Add Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportOrderListModal;
