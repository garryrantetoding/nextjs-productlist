// "use client";
// import React, { useState, useEffect } from 'react';
// import { EditProductList, Person } from '../ListProduct';  // Adjust the path if necessary
// import { LoadUserRole } from '@/data/services/userroles-service';
// import { z } from 'zod';

// // Define the Zod schema for validation
// const editSchema = z.object({
//   name: z.string().min(1, { message: 'Name is required' }),
//   roles: z
//     .string()
//     .min(1, { message: 'Role is required' })
//     .refine((val) => val !== '', { message: 'Please select a valid role' }), // Check for empty role

// });

// const editProductListSchema = z.object({

//   brochure: z.boolean(),
//   productname: z.string().min(1, { message: 'Product name is required' }),
//   category: z.string().min(1, { message: 'Category is required' }),
//   customerprice: z.string().min(1, { message: 'Customer price is required' }),
//   resellerprice: z.string().min(1, { message: 'Reseller price is required' }),
//   description: z.string().min(1, { message: 'Description is required' }),
//   videotutorial: z.string().url({ message: 'Video tutorial must be a valid URL' }),
// });
// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   editReportOrder: EditProductList | null;
//   setEditProduct: React.Dispatch<React.SetStateAction<EditProductList | null>>;
//   onSave: () => void;
//   onCancel: () => void;
//   backendError: { name: string; }; // For backend error display
//   setBackendError: React.Dispatch<React.SetStateAction<{  brochure: string;
//     productname: string;
//     category: string;
//     customerprice: string;
//     resellerprice: string;
//     description: string;
//     videotutorial: string }>>; // To reset the backend error

// }

// const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, editReportOrder, setEditProduct, onSave, onCancel,  backendError,
//   setBackendError,}) => {

//   const [roles, setRoles] = useState<any[]>([]); // State to store roles
//   const [loading, setLoading] = useState<boolean>(true); // State to track loading status
//   const [validationErrors, setValidationErrors] = useState<{  
//     brochure: string;
//     productname: string;
//     category: string;
//     customerprice: string;
//     resellerprice: string;
//     description: string;
//     videotutorial: string }>({

//       brochure: '',
//       productname: '',
//       category: '',
//       customerprice: '',
//       resellerprice: '',
//       description: '',
//       videotutorial: '',
//   }); // State to store Zod validation errors

//   // // Fetch roles from the backend API
//   // useEffect(() => {
//   //   const fetchRoles = async () => {
//   //     try {
//   //       const response = await LoadUserRole(); // API function to load roles
//   //       const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
//   //       setRoles(data); // Set the roles in state
//   //     } catch (error) {
//   //       console.error('Error fetching roles:', error);
//   //     } finally {
//   //       setLoading(false); // Set loading to false after the request completes
//   //     }
//   //   };

//   //   fetchRoles();
//   // }, []); // Empty dependency array to run only once on component mount

//   const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     if (editReportOrder && setEditProduct) {

//       setEditProduct({

//       });
//     }
//   };

//   const handleSave = async () => {
//     // Validate the form using Zod
//     const result = editProductListSchema.safeParse(editReportOrder);

//     if (!result.success) {
//       // If validation fails, map the errors to the state
//       const errors = {
//         brochure: result.error.format().brochure?._errors.join(', ') || '',
//         productname: result.error.format().productname?._errors.join(', ') || '',
//         category: result.error.format().category?._errors.join(', ') || '',
//         customerprice: result.error.format().customerprice?._errors.join(', ') || '',
//         resellerprice: result.error.format().resellerprice?._errors.join(', ') || '',
//         description: result.error.format().description?._errors.join(', ') || '',
//         videotutorial: result.error.format().videotutorial?._errors.join(', ') || '',

//       };

//       setValidationErrors(errors);
//       return; // Prevent saving if validation fails
//     }

//     // If validation is successful, proceed with saving
//     onSave();
//     setBackendError({
//       brochure: '',
//       productname: '',
//       category: '',
//       customerprice: '',
//       resellerprice: '',
//       description: '',
//       videotutorial: '', }); // Clear backend errors on save
//   };


//   // Reset errors when the modal is closed
//   useEffect(() => {
//     if (!isOpen) {
//       setValidationErrors({ 
//         brochure: '',
//         productname: '',
//         category: '',
//         customerprice: '',
//         resellerprice: '',
//         description: '',
//         videotutorial: '',}); // Reset validation errors
//       setBackendError({ brochure: '',
//         productname: '',
//         category: '',
//         customerprice: '',
//         resellerprice: '',
//         description: '',
//         videotutorial: '',}); // Reset backend errors
//     }
//   }, [isOpen, setBackendError]);

//   if (!isOpen || !editReportOrder) return null; // Don't render the modal if not open or no person to edit

//   return (

//     <div className="fixed inset-0 flex justify-center items-center z-65" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl mb-4">Edit User</h2>
//           <div className="flex items-center">
//             <button onClick={handleSave} className="bg-blue-500 text-white rounded-md mr-2 h-8 w-20">
//               Save
//             </button>
//             <button onClick={onCancel} className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md">
//               Cancel
//             </button>
//           </div>
//         </div>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={editPerson.name || ''}
//             onChange={(e) => setEditPerson({ ...editPerson, name: e.target.value })}
//             className="p-2 border rounded w-full"
//           />
//              <div className="min-h-[1.25rem]">
//              {validationErrors.name && <p className="text-red-500 text-sm">{validationErrors.name}</p>}
//           {backendError.name && <p className="text-red-500 text-sm">{backendError.name}</p>}
//           </div>

//         </div>
//         <div className="mt-2">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={editPerson.email}
//             onChange={(e) => setEditPerson({ ...editPerson, email: e.target.value })}
//             className="p-2 border rounded w-full"
//             disabled
//           />
//                        <div className="min-h-[1.25rem]"></div>

//         </div>
//         <div className="mt-2">
//           <label>Role:</label>
//           <select
//             value={editPerson.roles || ''}
//             onChange={handleRoleChange}
//             className="p-2 border rounded w-full"
//             disabled={loading} // Disable select while loading
//           >
//             {loading ? (
//               <option value="" disabled>
//                 Loading roles...
//               </option>
//             ) : (
//               <>
//                 <option value="">Select Role</option> {/* This is now rendered only after roles are loaded */}
//                 {roles.length > 0 ? (
//                   roles.map((role) => (
//                     <option key={role.id} value={role.roleName}>
//                       {role.roleName}
//                     </option>
//                   ))
//                 ) : (
//                   <option value="" disabled>
//                     No roles available
//                   </option>
//                 )}
//               </>
//             )}
//           </select>
//           <div className="min-h-[1.25rem]">
//           {validationErrors.roles && <p className="text-red-500 text-sm">{validationErrors.roles}</p>}
// </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditModal;

import React, { useState, useEffect } from 'react';
import { EditReportOrderList } from '../../ListBestSeller';
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


    orderStatus: string;// deleted
    paymentStatus: string;// deleted
    taskStatus: string;// deleted
    notes: string;//productname


  };
  setBackendError: React.Dispatch<React.SetStateAction<{


    orderStatus: string;// deleted
    paymentStatus: string;// deleted
    taskStatus: string;// deleted
    notes: string;//productname
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

  // orderStatus: OrderStatus,// deleted
  // paymentStatus: PaymentStatus,// deleted
  // taskStatus: TaskStatus,// deleted
  // notes: string,//productname

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
    // brochure: '',
    // productname: '',
    // category: '',
    // customerprice: '',
    // resellerprice: '',
    // description: '',
    // videotutorial: '',

    orderStatus: '',// deleted
    paymentStatus: '',// deleted
    taskStatus: '',// deleted
    notes: '',//productname
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



        // orderStatus: OrderStatus,// deleted
        // paymentStatus: PaymentStatus,// deleted
        // taskStatus: TaskStatus,// deleted
        // notes: string,//productname
      });
      return;
    }

    onSave();
    setValidationErrors({

      orderStatus: '',// deleted
      paymentStatus: '',// deleted
      taskStatus: '',// deleted
      notes: '',//productname

    });
    setBackendError({

      orderStatus: '',// deleted
      paymentStatus: '',// deleted
      taskStatus: '',// deleted
      notes: '',//productname

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
          <h2 className="text-xl font-semibold w-full pb-4 px-2 border-b-1 border-neutral-200">Edit Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between" style={{ gap: '20px' }}>
            {/* Left side - Brochure only */}
            {/* <div>
            
            
            </div> */}

            {/* Right side - Form Fields */}
            <div className="w-full space-y-3">
              {/* <InputField
                label="Product Name"
                name="shopname"
                placeholder="Enter shop name"
                value={editReportOrder.shopname}
                onChange={(e) =>
                  setEditReportOrder(prev => prev ? { ...prev, shopname: e.target.value } : prev)
                }
                error={validationErrors.shopname || backendError.shopname}
              />


              <InputField
                label="Owner"
                name="owner"
                placeholder="Enter owner"
                value={editReportOrder.owner}
                onChange={(e) =>
                  setEditReportOrder(prev => prev ? { ...prev, owner: e.target.value } : prev)
                }
                error={validationErrors.owner || backendError.owner}
              />
              <label className="block text-sm font-medium">Roles</label>
              <select
                name="roles"
                value={editReportOrder.roles}
                onChange={(e) =>
                  setEditReportOrder(prev => prev ? { ...prev, roles: e.target.value } : prev)
                }
                className="w-full border px-3 py-2 rounded-3xl"
                style={{
                  height: 40,
                  color: editReportOrder.roles === "" ? '#989898' : 'black',
                  backgroundColor: '#F8F9FB',
                  border: '1px solid #E5E5E7',
                }}
              >
                <option value="">Choose roles</option>
                <option value="Reseller">Reseller</option>
              </select>
              {validationErrors.roles && <p className="text-red-500 text-sm">{validationErrors.roles}</p>}

              <InputField
                label="Email"
                name="email"
                placeholder="Enter email"
                value={editReportOrder.email}
                onChange={(e) =>
                  setEditReportOrder(prev => prev ? { ...prev, shopname: e.target.value } : prev)
                }
                error={validationErrors.email || backendError.email}
              />
              
              <InputField
                label="Phone"
                name="phone"
                placeholder="000"
                value={editReportOrder.phone}
                onChange={(e) =>
                  setEditReportOrder(prev => prev ? { ...prev, phone: e.target.value } : prev)
                }
                error={validationErrors.phone || backendError.phone}
              /> */}

              <div>
                <label className="block text-sm font-medium">Order Status</label>
                <select
                  name="orderStatus"
                  value={editReportOrder.orderStatus}
                  onChange={(e) =>
                    setEditReportOrder(prev => prev ? { ...prev, city: e.target.value } : prev)
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
                    setEditReportOrder(prev => prev ? { ...prev, city: e.target.value } : prev)
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
                    setEditReportOrder(prev => prev ? { ...prev, city: e.target.value } : prev)
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
                    setEditReportOrder(prev => prev ? { ...prev, description: html } : prev)
                  }
                />
                {(validationErrors.notes || backendError.notes) && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.notes || backendError.notes}
                  </p>
                )}
              </div>


              {/* <label className="block text-sm font-medium">Printer Inkjet A3</label>
              <select
                name="printera3"
                value={editReportOrder.printera3 ? "yes" : "no"}
                onChange={(e) =>
                  setEditReportOrder(prev => prev ? { ...prev, printera3: e.target.value === 'yes' } : prev)
                }
                className="w-full border px-3 py-2 rounded-3xl"
                style={{ height: 40, backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7' }}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {validationErrors.printera3 && <p className="text-red-500 text-sm">{validationErrors.printera3}</p>}
           

            <label className="block text-sm font-medium">Printer Inkjet A4</label>
              <select
                name="printera3"
                value={editReportOrder.printera4 ? "yes" : "no"}
                onChange={(e) =>
                  setEditReportOrder(prev => prev ? { ...prev, printera4: e.target.value === 'yes' } : prev)
                }
                className="w-full border px-3 py-2 rounded-3xl"
                style={{ height: 40, backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7' }}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {validationErrors.printera4 && <p className="text-red-500 text-sm">{validationErrors.printera4}</p>} */}

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


// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   name,
//   type = 'text',
//   placeholder = 'text',
//   value,
//   onChange,
//   error,
// }) => {
//   const isCurrency = name === 'customerprice' || name === 'resellerprice';

//   const formatCurrency = (val: string) => {
//     const num = val.replace(/\D/g, '');
//     return num
//       ? 'Rp ' + parseInt(num, 10).toLocaleString('id-ID')
//       : '';
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let rawValue = e.target.value;

//     if (isCurrency) {
//       const clean = rawValue.replace(/\D/g, ''); // remove non-digits
//       const formatted = formatCurrency(clean);

//       // Create a synthetic event with cleaned value to send to parent
//       const customEvent = {
//         ...e,
//         target: {
//           ...e.target,
//           name: e.target.name,
//           value: clean,
//         },
//       };

//       onChange?.(customEvent as React.ChangeEvent<HTMLInputElement>);
//     } else {
//       onChange?.(e);
//     }
//   };

//   return (
//     <div>
//       <label className="block text-sm font-medium">{label}</label>
//       <input
//         type={type}
//         name={name}
//         value={isCurrency ? formatCurrency(value ?? '') : value}
//         onChange={handleInputChange}
//         placeholder={placeholder}
//         className="w-full px-3 py-2 rounded-3xl"
//         style={{
//           height: 40,
//           backgroundColor: '#F8F9FB',
//           border: '1px solid #E5E5E7',
//         }}
//       />
//       {error && <p className="text-red-500 text-sm">{error}</p>}
//     </div>
//   );
// };

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
