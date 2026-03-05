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
//   productName: z.string().min(1, { message: 'Product name is required' }),
//   category: z.string().min(1, { message: 'Category is required' }),
//   customerPrice: z.string().min(1, { message: 'Customer price is required' }),
//   resellerPrice: z.string().min(1, { message: 'Reseller price is required' }),
//   description: z.string().min(1, { message: 'Description is required' }),
//   videoTutorial: z.string().url({ message: 'Video tutorial must be a valid URL' }),
// });
// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   editProduct: EditProductList | null;
//   setEditProduct: React.Dispatch<React.SetStateAction<EditProductList | null>>;
//   onSave: () => void;
//   onCancel: () => void;
//   backendError: { name: string; }; // For backend error display
//   setBackendError: React.Dispatch<React.SetStateAction<{  brochure: string;
//     productName: string;
//     category: string;
//     customerPrice: string;
//     resellerPrice: string;
//     description: string;
//     videoTutorial: string }>>; // To reset the backend error

// }

// const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, editProduct, setEditProduct, onSave, onCancel,  backendError,
//   setBackendError,}) => {

//   const [roles, setRoles] = useState<any[]>([]); // State to store roles
//   const [loading, setLoading] = useState<boolean>(true); // State to track loading status
//   const [validationErrors, setValidationErrors] = useState<{  
//     brochure: string;
//     productName: string;
//     category: string;
//     customerPrice: string;
//     resellerPrice: string;
//     description: string;
//     videoTutorial: string }>({

//       brochure: '',
//       productName: '',
//       category: '',
//       customerPrice: '',
//       resellerPrice: '',
//       description: '',
//       videoTutorial: '',
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
//     if (editProduct && setEditProduct) {

//       setEditProduct({

//       });
//     }
//   };

//   const handleSave = async () => {
//     // Validate the form using Zod
//     const result = editProductListSchema.safeParse(editProduct);

//     if (!result.success) {
//       // If validation fails, map the errors to the state
//       const errors = {
//         brochure: result.error.format().brochure?._errors.join(', ') || '',
//         productName: result.error.format().productName?._errors.join(', ') || '',
//         category: result.error.format().category?._errors.join(', ') || '',
//         customerPrice: result.error.format().customerPrice?._errors.join(', ') || '',
//         resellerPrice: result.error.format().resellerPrice?._errors.join(', ') || '',
//         description: result.error.format().description?._errors.join(', ') || '',
//         videoTutorial: result.error.format().videoTutorial?._errors.join(', ') || '',

//       };

//       setValidationErrors(errors);
//       return; // Prevent saving if validation fails
//     }

//     // If validation is successful, proceed with saving
//     onSave();
//     setBackendError({
//       brochure: '',
//       productName: '',
//       category: '',
//       customerPrice: '',
//       resellerPrice: '',
//       description: '',
//       videoTutorial: '', }); // Clear backend errors on save
//   };


//   // Reset errors when the modal is closed
//   useEffect(() => {
//     if (!isOpen) {
//       setValidationErrors({ 
//         brochure: '',
//         productName: '',
//         category: '',
//         customerPrice: '',
//         resellerPrice: '',
//         description: '',
//         videoTutorial: '',}); // Reset validation errors
//       setBackendError({ brochure: '',
//         productName: '',
//         category: '',
//         customerPrice: '',
//         resellerPrice: '',
//         description: '',
//         videoTutorial: '',}); // Reset backend errors
//     }
//   }, [isOpen, setBackendError]);

//   if (!isOpen || !editProduct) return null; // Don't render the modal if not open or no person to edit

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
import { EditProductList } from '../../ListProduct';
import { z } from 'zod';
import TiptapEditor from '../../../input-custom/tiptapeditor';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editProduct: EditProductList | null;
  setEditProduct: React.Dispatch<React.SetStateAction<EditProductList | null>>;
  onSave: () => void;
  onCancel: () => void;
  backendError: {
    brochure: string;
    productName: string;
    category: string;
    customerPrice: string;
    resellerPrice: string;
    description: string;
    videoTutorial: string;
  };
  setBackendError: React.Dispatch<React.SetStateAction<{
    brochure: string;
    productName: string;
    category: string;
    customerPrice: string;
    resellerPrice: string;
    description: string;
    videoTutorial: string;
  }>>;
}

const editProductListSchema = z.object({
  brochure: z.boolean(),
  productName: z.string().min(1, { message: 'Product name is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  customerPrice: z.string().min(1, { message: 'Customer price is required' }),
  resellerPrice: z.string().min(1, { message: 'Reseller price is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  videoTutorial: z.string().url({ message: 'Video tutorial must be a valid URL' }),
});

const EditProductModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  editProduct,
  setEditProduct,
  onSave,
  onCancel,
  backendError,
  setBackendError,
}) => {
  const [validationErrors, setValidationErrors] = useState({
    brochure: '',
    productName: '',
    category: '',
    customerPrice: '',
    resellerPrice: '',
    description: '',
    videoTutorial: '',
  });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const result = editProductListSchema.safeParse(editProduct);
    if (!result.success) {
      const formattedErrors = result.error.format();
      setValidationErrors({
        brochure: formattedErrors.brochure?._errors.join(', ') || '',
        productName: formattedErrors.productName?._errors.join(', ') || '',
        category: formattedErrors.category?._errors.join(', ') || '',
        customerPrice: formattedErrors.customerPrice?._errors.join(', ') || '',
        resellerPrice: formattedErrors.resellerPrice?._errors.join(', ') || '',
        description: formattedErrors.description?._errors.join(', ') || '',
        videoTutorial: formattedErrors.videoTutorial?._errors.join(', ') || '',
      });
      return;
    }

    onSave();
    setValidationErrors({
      brochure: '',
      productName: '',
      category: '',
      customerPrice: '',
      resellerPrice: '',
      description: '',
      videoTutorial: '',
    });
    setBackendError({
      brochure: '',
      productName: '',
      category: '',
      customerPrice: '',
      resellerPrice: '',
      description: '',
      videoTutorial: '',
    });
  };

  if (!isOpen || !editProduct) return null;

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
            <div>
              <label className="block text-sm font-medium">Brochure</label>
              <select
                name="brochure"
                value={editProduct.brochure ? "yes" : "no"}
                onChange={(e) =>
                  setEditProduct(prev => prev ? { ...prev, brochure: e.target.value === 'yes' } : prev)
                }
                className="w-full border px-3 py-2 rounded-3xl"
                style={{ height: 40, backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7' }}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {(validationErrors.brochure || backendError.brochure) && (
                <p className="text-red-500 text-sm">
                  {validationErrors.brochure || backendError.brochure}
                </p>
              )}
            </div>

            {/* Right side - Form Fields */}
            <div className="w-full space-y-3">
              <InputField
                label="Product Name"
                name="productName"
                placeholder="Enter product name"
                value={editProduct.productName}
                onChange={(e) =>
                  setEditProduct(prev => prev ? { ...prev, productName: e.target.value } : prev)
                }
                error={validationErrors.productName || backendError.productName}
              />

              <label className="block text-sm font-medium">Category</label>
              <select
                name="category"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct(prev => prev ? { ...prev, category: e.target.value } : prev)
                }
                className="w-full border px-3 py-2 rounded-3xl"
                style={{
                  height: 40,
                  color: editProduct.category === "" ? '#989898' : 'black',
                  backgroundColor: '#F8F9FB',
                  border: '1px solid #E5E5E7',
                }}
              >
                <option value="">Choose Category</option>
                <option value="MJ">Mesin Jahit</option>
                <option value="A3">Printer Inkjet A3</option>
                <option value="A4">Printer Inkjet A4</option>
                <option value="ML">Mesin Label</option>
              </select>
              {(validationErrors.category || backendError.category) && (
                <p className="text-red-500 text-sm">
                  {validationErrors.category || backendError.category}
                </p>
              )}
              <InputField
                label="Video Tutorial URL"
                name="videoTutorial"
                type="url"
                placeholder="URL"
                value={editProduct.videoTutorial}
                onChange={(e) =>
                  setEditProduct(prev => prev ? { ...prev, videoTutorial: e.target.value } : prev)
                }
                error={validationErrors.videoTutorial || backendError.videoTutorial}
              />

              <InputField
                label="Customer Price"
                name="customerPrice"
                placeholder="0,00"
                value={editProduct.customerPrice}
                onChange={(e) =>
                  setEditProduct(prev => prev ? { ...prev, customerPrice: e.target.value } : prev)
                }
                error={validationErrors.customerPrice || backendError.customerPrice}
              />

              <InputField
                label="Reseller Price"
                name="resellerPrice"
                placeholder="0,00"
                value={editProduct.resellerPrice}
                onChange={(e) =>
                  setEditProduct(prev => prev ? { ...prev, resellerPrice: e.target.value } : prev)
                }
                error={validationErrors.resellerPrice || backendError.resellerPrice}
              />

              <div>
                <label className="block text-sm font-medium">Description</label>
                <TiptapEditor
                  value={editProduct.description}
                  onChange={(html) =>
                    setEditProduct(prev => prev ? { ...prev, description: html } : prev)
                  }
                />
                {(validationErrors.description || backendError.description) && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.description || backendError.description}
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

export default EditProductModal;

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
//   placeholder = '',
//   value,
//   onChange,
//   error,
// }) => (
//   <div>
//     <label className="block text-sm font-medium">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full px-3 py-2 rounded-3xl"
//       style={{ height: 40, backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7' }}
//     />
//     {error && <p className="text-red-500 text-sm">{error}</p>}
//   </div>
// );
const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder = 'text',
  value,
  onChange,
  error,
}) => {
  const isCurrency = name === 'customerPrice' || name === 'resellerPrice';

  const formatCurrency = (val: string) => {
    const num = val.replace(/\D/g, '');
    return num
      ? 'Rp ' + parseInt(num, 10).toLocaleString('id-ID')
      : '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    if (isCurrency) {
      const clean = rawValue.replace(/\D/g, ''); // remove non-digits
      const formatted = formatCurrency(clean);

      // Create a synthetic event with cleaned value to send to parent
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
        value={isCurrency ? formatCurrency(value ?? '') : value}
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
