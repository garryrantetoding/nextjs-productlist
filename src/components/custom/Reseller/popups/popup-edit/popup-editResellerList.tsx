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
//   editReseller: EditProductList | null;
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

// const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, editReseller, setEditProduct, onSave, onCancel,  backendError,
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
//     if (editReseller && setEditProduct) {

//       setEditProduct({

//       });
//     }
//   };

//   const handleSave = async () => {
//     // Validate the form using Zod
//     const result = editProductListSchema.safeParse(editReseller);

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

//   if (!isOpen || !editReseller) return null; // Don't render the modal if not open or no person to edit

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
import { EditResellerList } from '../../ListReseller';
import { z } from 'zod';
import TiptapEditor from '../../../input-custom/tiptapeditor';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editReseller: EditResellerList | null;
  setEditReseller: React.Dispatch<React.SetStateAction<EditResellerList | null>>;
  onSave: () => void;
  onCancel: () => void;
  backendError: {
    shopName: string;//productname
    owner: string;//category
    roles: string;//customerprice
    email: string;//resellerprice
    phone: string;//description
    address1: string;//videotutorial
    address2: string;//description
    city: string;//videotutorial
    printerA3: string;//brochure
    printerA4: string;//brochure

  };
  setBackendError: React.Dispatch<React.SetStateAction<{

    shopName: string;//productname
    owner: string;//category
    roles: string;//customerprice
    email: string;//resellerprice
    phone: string;//description
    address1: string;//videotutorial
    address2: string;//description
    city: string;//videotutorial
    printerA3: string;//brochure
    printerA4: string;//brochure
  }>>;
}




export const editResellerSchema = z.object({
  // storephoto: z.instanceof(File),
  shopName: z.string().min(1, 'Shop name is required'),
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
  printerA3: z.boolean(),
  printerA4: z.boolean(),
});


const EditResellerModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  editReseller,
  setEditReseller,
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

    shopName: '',
    owner: '',
    roles: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    printerA3: '',
    printerA4: '',
  });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const result = editResellerSchema.safeParse(editReseller);
    if (!result.success) {
      const formatted = result.error.format();
      setValidationErrors({
        shopName: formatted.shopName?._errors.join(', ') || '',
        owner: formatted.owner?._errors.join(', ') || '',
        roles: formatted.roles?._errors.join(', ') || '',
        email: formatted.email?._errors.join(', ') || '',
        phone: formatted.phone?._errors.join(', ') || '',
        address1: formatted.address1?._errors.join(', ') || '',
        address2: formatted.address2?._errors.join(', ') || '',
        city: formatted.city?._errors.join(', ') || '',
        printerA3: formatted.printerA3?._errors.join(', ') || '',
        printerA4: formatted.printerA4?._errors.join(', ') || '',
      });
      return;
    }

    onSave();
    setValidationErrors({
      shopName: '',
      owner: '',
      roles: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      printerA3: '',
      printerA4: '',
    });
    setBackendError({
      shopName: '',
      owner: '',
      roles: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      printerA3: '',
      printerA4: '',
    });
  };

  if (!isOpen || !editReseller) return null;

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
          <h2 className="text-xl font-semibold w-full pb-4 px-2 border-b-1 border-neutral-200">Edit Reseller</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between" style={{ gap: '20px' }}>
            {/* Left side - Brochure only */}
            {/* <div>
            
            
            </div> */}

            {/* Right side - Form Fields */}
            <div className="w-full space-y-3">
              <InputField
                label="Product Name"
                name="shopName"
                placeholder="Enter shop name"
                value={editReseller.shopName}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, shopName: e.target.value } : prev)
                }
                error={validationErrors.shopName || backendError.shopName}
              />

              <InputField
                label="Owner"
                name="owner"
                placeholder="Enter owner"
                value={editReseller.owner}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, owner: e.target.value } : prev)
                }
                error={validationErrors.owner || backendError.owner}
              />
              <label className="block text-sm font-medium">Roles</label>
              <select
                name="roles"
                value={editReseller.roles}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, roles: e.target.value } : prev)
                }
                className="w-full border px-3 py-2 rounded-3xl"
                style={{
                  height: 40,
                  color: editReseller.roles === "" ? '#989898' : 'black',
                  backgroundColor: '#F8F9FB',
                  border: '1px solid #E5E5E7',
                }}
              >
                <option value="">Choose roles</option>
                <option value="Reseller">Reseller</option>
              </select>
              {(validationErrors.roles || backendError.roles) && (
                <p className="text-red-500 text-sm">
                  {validationErrors.roles || backendError.roles}
                </p>
              )}
              <InputField
                label="Email"
                name="email"
                placeholder="Enter email"
                value={editReseller.email}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, shopName: e.target.value } : prev)
                }
                error={validationErrors.email || backendError.email}
              />
              {/* <InputField
                label="Video Tutorial URL"
                name="videotutorial"
                type="url"
                placeholder="URL"
                value={editReseller.videotutorial}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, videotutorial: e.target.value } : prev)
                }
                error={validationErrors.videotutorial || backendError.videotutorial}
              /> */}

              {/* <InputField
                label="Customer Price"
                name="customerprice"
                placeholder="0,00"
                value={editReseller.customerprice}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, customerprice: e.target.value } : prev)
                }
                error={validationErrors.customerprice || backendError.customerprice}
              /> */}

              <InputField
                label="Phone"
                name="phone"
                placeholder="000"
                value={editReseller.phone}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, phone: e.target.value } : prev)
                }
                error={validationErrors.phone || backendError.phone}
              />

              {/* <div>
                <label className="block text-sm font-medium">Address 1</label>
                <TiptapEditor
                  value={editReseller.address1}
                  onChange={(html) =>
                    setEditReseller(prev => prev ? { ...prev, description: html } : prev)
                  }
                />
                {(validationErrors.address1 || backendError.address1) && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.address1 || backendError.address1}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Address 2</label>
                <TiptapEditor
                  value={editReseller.address2}
                  onChange={(html) =>
                    setEditReseller(prev => prev ? { ...prev, description: html } : prev)
                  }
                />
                {(validationErrors.address2 || backendError.address2) && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.address2 || backendError.address2}
                  </p>
                )}
              </div> */}
              <InputField
                label="Address 1"
                name="address1"
                placeholder="Enter address 1"
                value={editReseller.address1}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, address1: e.target.value } : prev)
                }
                error={validationErrors.address1 || backendError.address1}
              />
              <InputField
                label="Address 2"
                name="address2"
                placeholder="Enter address 2"
                value={editReseller.address2}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, address2: e.target.value } : prev)
                }
                error={validationErrors.address2 || backendError.address2}
              />

              {/* <label className="block text-sm font-medium">City</label>
              <select
                name="roles"
                value={editReseller.city}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, city: e.target.value } : prev)
                }
                className="w-full border px-3 py-2 rounded-3xl"
                style={{
                  height: 40,
                  color: editReseller.city === "" ? '#989898' : 'black',
                  backgroundColor: '#F8F9FB',
                  border: '1px solid #E5E5E7',
                }}
              >
                <option value="">Choose City</option>
                <option value="Bogor">Bogor</option>
              </select>
              {(validationErrors.city || backendError.city) && (
                <p className="text-red-500 text-sm">
                  {validationErrors.city || backendError.city}
                </p>
              )} */}

              <InputField
                label="City"
                name="city"
                placeholder="Enter city"
                value={editReseller.city}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, city: e.target.value } : prev)
                }
                error={validationErrors.city || backendError.city}
              />
              <label className="block text-sm font-medium">Printer Inkjet A3</label>
              <select
                name="printerA3"
                value={editReseller.printerA3 ? "yes" : "no"}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, printerA3: e.target.value === 'yes' } : prev)
                }
                className="w-full border px-3 py-2 rounded-3xl"
                style={{ height: 40, backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7' }}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {(validationErrors.printerA3 || backendError.printerA3) && (
                <p className="text-red-500 text-sm">
                  {validationErrors.printerA3 || backendError.printerA3}
                </p>
              )}

              <label className="block text-sm font-medium">Printer Inkjet A4</label>
              <select
                name="printerA4"
                value={editReseller.printerA4 ? "yes" : "no"}
                onChange={(e) =>
                  setEditReseller(prev => prev ? { ...prev, printerA4: e.target.value === 'yes' } : prev)
                }
                className="w-full border px-3 py-2 rounded-3xl"
                style={{ height: 40, backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7' }}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {(validationErrors.printerA4 || backendError.printerA4) && (
                <p className="text-red-500 text-sm">
                  {validationErrors.printerA4 || backendError.printerA4}
                </p>
              )}
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

export default EditResellerModal;

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
