// // import React, { useState, useEffect } from 'react';
// // import { z } from 'zod';


// // // Define the Zod schema for validation
// // const productSchema = z.object({
// //   image: z
// //     .instanceof(File, { message: 'Image must be a file' })
// //     .refine(file => file.size > 0, { message: 'Image file is required' }),

// //   brochure: z.boolean(),

// //   productname: z
// //     .string()
// //     .min(1, { message: 'Product name is required' }),

// //   category: z
// //     .string()
// //     .min(1, { message: 'Category is required' }),

// //   customerprice: z
// //     .string()
// //     .min(1, { message: 'Customer price is required' }),

// //   resellerprice: z
// //     .string()
// //     .min(1, { message: 'Reseller price is required' }),

// //   description: z
// //     .string()
// //     .min(1, { message: 'Description is required' }),

// //   videotutorial: z
// //     .string()
// //     .url({ message: 'Video tutorial must be a valid URL' }),
// // });


// // interface ListProduct {
// //   // no: number;
// //   image: File;
// //   brochure: boolean;
// //   productname: string;
// //   category: string;
// //   customerprice: string;
// //   resellerprice: string;
// //   description: string;
// //   videotutorial: string;
// //   // deleted: Deleted;

// // }

// // interface UserModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onAddProductList: (image: File,
// //     brochure: boolean,
// //     productname: string,
// //     category: string,
// //     customerprice: string,
// //     resellerprice: string,
// //     description: string,
// //     videotutorial: string,) => void;

// //   newProductList: {image: File;
// //     brochure: boolean;
// //     productname: string;
// //     category: string;
// //     customerprice: string;
// //     resellerprice: string;
// //     description: string;
// //     videotutorial: string;};

// //   setNewProductList: React.Dispatch<React.SetStateAction<{ image: File;
// //     brochure: boolean;
// //     productname: string;
// //     category: string;
// //     customerprice: string;
// //     resellerprice: string;
// //     description: string;
// //     videotutorial: string; }>>;
// //   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// //   backendError: {image: string; brochure: string;
// //     productname: string;
// //     category: string;
// //     customerprice: string;
// //     resellerprice: string;
// //     description: string;
// //     videotutorial: string;};  // Ensure this matches the type you are passing
// //   setBackendError: React.Dispatch<React.SetStateAction<{ image: string; brochure: string;
// //     productname: string;
// //     category: string;
// //     customerprice: string;
// //     resellerprice: string;
// //     description: string;
// //     videotutorial: string; }>>;  // Same here
// // }

// // const ProductListModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddProductList, newProductList, setNewProductList, setDiscardConfirmationOpen,
// //   backendError,  // Receive the backend error
// //   setBackendError,  // Receive the function to reset the error
// //  }) => {
// //   const [errors, setErrors] = useState({
// //     image: '',
// //     brochure: '',
// //     productname: '',
// //     category: '',
// //     customerprice: '',
// //     resellerprice: '',
// //     description: '',
// //     videotutorial: '',
// //   });
// //   const [roles, setRoles] = useState<any[]>([]); // State to store roles

// //   // // Fetch roles from the backend API
// //   // useEffect(() => {
// //   //   const fetchRoles = async () => {
// //   //     try {
// //   //       const response = await LoadUserRole(); // API function to load roles
// //   //       const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
// //   //       setRoles(data); // Set the roles in state
// //   //     } catch (error) {
// //   //       console.error('Error fetching roles:', error);
// //   //     }
// //   //   };

// //   //   fetchRoles();
// //   // }, []); // Empty dependency array to run only once on component mount

// //   // Handle input changes
// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setNewProductList((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   // Handle form submission
// //   const handleSubmit = (e: React.FormEvent) => {
// //     setErrors({
// //       image: '',
// //       brochure: '',
// //       productname: '',
// //       category: '',
// //       customerprice: '',
// //       resellerprice: '',
// //       description: '',
// //       videotutorial: '',
// //     });
// //     setBackendError({image: '',
// //       brochure: '',
// //       productname: '',
// //       category: '',
// //       customerprice: '',
// //       resellerprice: '',
// //       description: '',
// //       videotutorial: '',});  // Reset backend error on close


// //     e.preventDefault();


// //     // Validate the newUser data using Zod
// //     const result = productSchema.safeParse(newProductList);

// //     if (!result.success) {
// //       // Map Zod errors to a record of strings (error messages)
// //       const formattedErrors = result.error.format();

// //       const validationErrors: Record<
// //         keyof z.infer<typeof productSchema>,
// //         string
// //       > = {
// //         image: formattedErrors.image?._errors.join(', ') || '',
// //         brochure: formattedErrors.brochure?._errors.join(', ') || '',
// //         productname: formattedErrors.productname?._errors.join(', ') || '',
// //         category: formattedErrors.category?._errors.join(', ') || '',
// //         customerprice: formattedErrors.customerprice?._errors.join(', ') || '',
// //         resellerprice: formattedErrors.resellerprice?._errors.join(', ') || '',
// //         description: formattedErrors.description?._errors.join(', ') || '',
// //         videotutorial: formattedErrors.videotutorial?._errors.join(', ') || '',
// //       };
// //       setErrors(validationErrors);
// //       return;
// //     }

// //     // If validation is successful, proceed with adding the user
// //     onAddProductList(newProductList.image, newProductList.brochure,newProductList.productname,newProductList.category,newProductList.customerprice,newProductList.resellerprice,newProductList.description,newProductList.videotutorial);

// //     // Close the modal
// //     onClose();

// //     // Reset the discard confirmation modal state
// //     setDiscardConfirmationOpen(false);
// //   };

// //   // Reset errors when the modal is closed
// //   useEffect(() => {
// //     if (!isOpen) {
// //       setErrors({
// //         image: '',
// //       brochure: '',
// //       productname: '',
// //       category: '',
// //       customerprice: '',
// //       resellerprice: '',
// //       description: '',
// //       videotutorial: '',
// //       });
// //       setBackendError({ image: '',
// //         brochure: '',
// //         productname: '',
// //         category: '',
// //         customerprice: '',
// //         resellerprice: '',
// //         description: '',
// //         videotutorial: '',});  // Reset backend error on close
// //     }      
// //   }, [isOpen,setBackendError]);

// //   if (!isOpen) return null;

// //   return (
// //     <div
// //       className="fixed inset-0 flex justify-center items-center z-60"
// //       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// //       onClick={onClose}
// //     >
// //       <div
// //         className="bg-white p-6 rounded-lg shadow-lg w-1/2"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl mb-4">Add User</h2>
// //           <div className="flex justify-between">
// //             <button
// //               type="submit"
// //               onClick={handleSubmit}
// //               className="bg-blue-500 text-white h-8 w-20 mr-2 rounded-md"
// //             >
// //               Save
// //             </button>
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //         <form onSubmit={handleSubmit} className="space-y-4 p-4">
// //   {/* Image Upload */}
// //   <div>
// //     <label className="block text-sm font-medium">Image</label>
// //     <input
// //       type="file"
// //       name="image"
// //       accept="image/*"
// //       onChange={(e) => {
// //         const file = e.target.files?.[0];
// //         if (file) {
// //           setNewProductList((prev) => ({ ...prev, image: file }));
// //         }
// //       }}
// //     />
// //     {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
// //     {backendError.image && <p className="text-red-500 text-sm">{backendError.image}</p>}
// //   </div>

// //   {/* Brochure Toggle */}
// //   <div>
// //     <label className="block text-sm font-medium">Brochure</label>
// //     <input
// //       type="checkbox"
// //       name="brochure"
// //       checked={newProductList.brochure}
// //       onChange={(e) =>
// //         setNewProductList((prev) => ({
// //           ...prev,
// //           brochure: e.target.checked,
// //         }))
// //       }
// //     />
// //     {errors.brochure && <p className="text-red-500 text-sm">{errors.brochure}</p>}
// //   </div>

// //   {/* Product Name */}
// //   <div>
// //     <label className="block text-sm font-medium">Product Name</label>
// //     <input
// //       type="text"
// //       name="productname"
// //       value={newProductList.productname}
// //       onChange={handleInputChange}
// //       className="w-full border px-3 py-2 rounded"
// //     />
// //     {errors.productname && <p className="text-red-500 text-sm">{errors.productname}</p>}
// //     {backendError.productname && <p className="text-red-500 text-sm">{backendError.productname}</p>}
// //   </div>

// //   {/* Category */}
// //   <div>
// //     <label className="block text-sm font-medium">Category</label>
// //     <input
// //       type="text"
// //       name="category"
// //       value={newProductList.category}
// //       onChange={handleInputChange}
// //       className="w-full border px-3 py-2 rounded"
// //     />
// //     {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
// //   </div>

// //   {/* Customer Price */}
// //   <div>
// //     <label className="block text-sm font-medium">Customer Price</label>
// //     <input
// //       type="text"
// //       name="customerprice"
// //       value={newProductList.customerprice}
// //       onChange={handleInputChange}
// //       className="w-full border px-3 py-2 rounded"
// //     />
// //     {errors.customerprice && <p className="text-red-500 text-sm">{errors.customerprice}</p>}
// //   </div>

// //   {/* Reseller Price */}
// //   <div>
// //     <label className="block text-sm font-medium">Reseller Price</label>
// //     <input
// //       type="text"
// //       name="resellerprice"
// //       value={newProductList.resellerprice}
// //       onChange={handleInputChange}
// //       className="w-full border px-3 py-2 rounded"
// //     />
// //     {errors.resellerprice && <p className="text-red-500 text-sm">{errors.resellerprice}</p>}
// //   </div>

// //   {/* Description */}
// //   <div>
// //     <label className="block text-sm font-medium">Description</label>
// //     <textarea
// //       name="description"
// //       value={newProductList.description}
// //       onChange={handleInputChange}
// //       className="w-full border px-3 py-2 rounded"
// //     />
// //     {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
// //   </div>

// //   {/* Video Tutorial URL */}
// //   <div>
// //     <label className="block text-sm font-medium">Video Tutorial URL</label>
// //     <input
// //       type="url"
// //       name="videotutorial"
// //       value={newProductList.videotutorial}
// //       onChange={handleInputChange}
// //       className="w-full border px-3 py-2 rounded"
// //     />
// //     {errors.videotutorial && <p className="text-red-500 text-sm">{errors.videotutorial}</p>}
// //   </div>


// // </form>

// //       </div>
// //     </div>
// //   );
// // };
// // export default ProductListModal;

// import React, { useState, useEffect } from 'react';
// import { z } from 'zod';
// // import dynamic from 'next/dynamic';
// // import 'react-quill/dist/quill.snow.css'; // Quill styling

// // // Dynamically import ReactQuill to avoid SSR issues if using Next.js
// // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// // import { RichTextEditor } from '@mantine/rte';
// import TiptapEditor from './tiptapeditor';


// // Zod validation schema
// const productSchema = z.object({
//   image: z
//     .instanceof(File, { message: 'Image must be a file' })
//     .refine(file => file.size > 0, { message: 'Image file is required' }),
//   brochure: z.boolean(),
//   productname: z.string().min(1, { message: 'Product name is required' }),
//   category: z.string().min(1, { message: 'Category is required' }),
//   customerprice: z.string().min(1, { message: 'Customer price is required' }),
//   resellerprice: z.string().min(1, { message: 'Reseller price is required' }),
//   description: z.string().min(1, { message: 'Description is required' }),
//   videotutorial: z.string().url({ message: 'Video tutorial must be a valid URL' }),
// });

// interface ListProduct {
//   image: File;
//   brochure: boolean;
//   productname: string;
//   category: string;
//   customerprice: string;
//   resellerprice: string;
//   description: string;
//   videotutorial: string;
// }

// interface UserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddProductList: (
//     image: File,
//     brochure: boolean,
//     productname: string,
//     category: string,
//     customerprice: string,
//     resellerprice: string,
//     description: string,
//     videotutorial: string
//   ) => void;
//   newProductList: ListProduct;
//   setNewProductList: React.Dispatch<React.SetStateAction<ListProduct>>;
//   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   backendError: Record<keyof ListProduct, string>;
//   setBackendError: React.Dispatch<React.SetStateAction<Record<keyof ListProduct, string>>>;
// }

// const ProductListModal: React.FC<UserModalProps> = ({
//   isOpen,
//   onClose,
//   onAddProductList,
//   newProductList,
//   setNewProductList,
//   setDiscardConfirmationOpen,
//   backendError,
//   setBackendError,
// }) => {
//   const [errors, setErrors] = useState<Record<keyof ListProduct, string>>({
//     image: '',
//     brochure: '',
//     productname: '',
//     category: '',
//     customerprice: '',
//     resellerprice: '',
//     description: '',
//     videotutorial: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewProductList(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     setErrors({
//       image: '',
//       brochure: '',
//       productname: '',
//       category: '',
//       customerprice: '',
//       resellerprice: '',
//       description: '',
//       videotutorial: '',
//     });

//     setBackendError({
//       image: '',
//       brochure: '',
//       productname: '',
//       category: '',
//       customerprice: '',
//       resellerprice: '',
//       description: '',
//       videotutorial: '',
//     });

//     const result = productSchema.safeParse(newProductList);

//     if (!result.success) {
//       const formattedErrors = result.error.format();

//       const validationErrors: Record<keyof ListProduct, string> = {
//         image: formattedErrors.image?._errors.join(', ') || '',
//         brochure: formattedErrors.brochure?._errors.join(', ') || '',
//         productname: formattedErrors.productname?._errors.join(', ') || '',
//         category: formattedErrors.category?._errors.join(', ') || '',
//         customerprice: formattedErrors.customerprice?._errors.join(', ') || '',
//         resellerprice: formattedErrors.resellerprice?._errors.join(', ') || '',
//         description: formattedErrors.description?._errors.join(', ') || '',
//         videotutorial: formattedErrors.videotutorial?._errors.join(', ') || '',
//       };

//       setErrors(validationErrors);
//       return;
//     }

//     onAddProductList(
//       newProductList.image,
//       newProductList.brochure,
//       newProductList.productname,
//       newProductList.category,
//       newProductList.customerprice,
//       newProductList.resellerprice,
//       newProductList.description,
//       newProductList.videotutorial
//     );

//     onClose();
//     setDiscardConfirmationOpen(false);
//   };

//   useEffect(() => {
//     if (!isOpen) {
//       setErrors({
//         image: '',
//         brochure: '',
//         productname: '',
//         category: '',
//         customerprice: '',
//         resellerprice: '',
//         description: '',
//         videotutorial: '',
//       });

//       setBackendError({
//         image: '',
//         brochure: '',
//         productname: '',
//         category: '',
//         customerprice: '',
//         resellerprice: '',
//         description: '',
//         videotutorial: '',
//       });
//     }
//   }, [isOpen, setBackendError]);

//   if (!isOpen) return null;

//   return (
//         <div
//       className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-60"
//       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg w-1/2"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Add Product</h2>
//           <div className="flex space-x-2">
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="bg-blue-500 text-white h-8 w-20 rounded-md"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* File Upload */}
//           <InputField
//             label="Image"
//             type="file"
//             name="image"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) setNewProductList(prev => ({ ...prev, image: file }));
//             }}
//             error={errors.image || backendError.image}
//           />

//           {/* Brochure */}
//           <div>
//             <label className="block text-sm font-medium">Brochure</label>
//             <input
//               type="checkbox"
//               name="brochure"
//               checked={newProductList.brochure}
//               onChange={(e) =>
//                 setNewProductList(prev => ({ ...prev, brochure: e.target.checked }))
//               }
//             />
//             {errors.brochure && <p className="text-red-500 text-sm">{errors.brochure}</p>}
//           </div>

//           {/* Text Inputs */}
//           <InputField
//             label="Product Name"
//             name="productname"
//             value={newProductList.productname}
//             onChange={handleInputChange}
//             error={errors.productname || backendError.productname}
//           />

//           <InputField
//             label="Category"
//             name="category"
//             value={newProductList.category}
//             onChange={handleInputChange}
//             error={errors.category}
//           />

//           <InputField
//             label="Customer Price"
//             name="customerprice"
//             value={newProductList.customerprice}
//             onChange={handleInputChange}
//             error={errors.customerprice}
//           />

//           <InputField
//             label="Reseller Price"
//             name="resellerprice"
//             value={newProductList.resellerprice}
//             onChange={handleInputChange}
//             error={errors.resellerprice}
//           />

//           {/* Textarea */}
//           <div>
//             <label className="block text-sm font-medium">Description</label>
//             {/* <textarea
//               name="description"
//               value={newProductList.description}
//               onChange={handleInputChange}
//               className="w-full border px-3 py-2 rounded"
//             /> */}
//             {/* <RichTextEditor
//   value={newProductList.description}
//   onChange={(value) => setNewProductList(prev => ({ ...prev, description: value }))}
//   styles={{ root: { minHeight: 200, border: '1px solid #ccc', borderRadius: 4 } }}
// /> */}
// <TiptapEditor
//   value={newProductList.description}
//   onChange={(html) => setNewProductList(prev => ({ ...prev, description: html }))}
// />
//             {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//           </div>


//           <InputField
//             label="Video Tutorial URL"
//             name="videotutorial"
//             type="url"
//             value={newProductList.videotutorial}
//             onChange={handleInputChange}
//             error={errors.videotutorial}
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductListModal;

// // Reusable Input Field Component
// type InputFieldProps = {
//   label: string;
//   name: string;
//   type?: string;
//   value?: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onChangeFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   error?: string;
// };

// const InputField: React.FC<InputFieldProps> = ({
//   label,
//   name,
//   type = 'text',
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
//       className="w-full border px-3 py-2 rounded"
//     />
//     {error && <p className="text-red-500 text-sm">{error}</p>}
//   </div>
// );

import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import TiptapEditor from '../../../input-custom/tiptapeditor';
import ImageUploader from '../../../input-custom/ImageUploader';

// Zod validation schema
const productSchema = z.object({
  image: z
    .instanceof(File, { message: 'Image must be a file' })
    .refine(file => file.size > 0, { message: 'Image file is required' }),
  brochure: z.boolean(),
  productName: z.string().min(1, { message: 'Product name is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  customerPrice: z.string()
    .regex(/^\d+$/, 'Phone must contain only numbers')
    .min(1, 'Phone number is required'),

  // resellerprice: z.string().min(1, { message: 'Reseller price is required' }),
  resellerPrice: z.string()
    .regex(/^\d+$/, 'Phone must contain only numbers')
    .min(1, 'Phone number is required'),
  description: z.string().min(1, { message: 'Description is required' }),
  videoTutorial: z.string().url({ message: 'Video tutorial must be a valid URL' }),
});

interface ListProduct {
  image: File;
  brochure: boolean;
  productName: string;
  category: string;
  customerPrice: string;
  resellerPrice: string;
  description: string;
  videoTutorial: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProductList: (
    image: File,
    brochure: boolean,
    productName: string,
    category: string,
    customerPrice: string,
    resellerPrice: string,
    description: string,
    videoTutorial: string
  ) => void;
  newProductList: ListProduct;
  setNewProductList: React.Dispatch<React.SetStateAction<ListProduct>>;
  setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backendError: Record<keyof ListProduct, string>;
  setBackendError: React.Dispatch<React.SetStateAction<Record<keyof ListProduct, string>>>;
}

const ProductListModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onAddProductList,
  newProductList,
  setNewProductList,
  setDiscardConfirmationOpen,
  backendError,
  setBackendError,
}) => {
  const [errors, setErrors] = useState<Record<keyof ListProduct, string>>({
    image: '',
    brochure: '',
    productName: '',
    category: '',
    customerPrice: '',
    resellerPrice: '',
    description: '',
    videoTutorial: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProductList(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      image: '',
      brochure: '',
      productName: '',
      category: '',
      customerPrice: '',
      resellerPrice: '',
      description: '',
      videoTutorial: '',
    });

    setBackendError({
      image: '',
      brochure: '',
      productName: '',
      category: '',
      customerPrice: '',
      resellerPrice: '',
      description: '',
      videoTutorial: '',
    });

    const result = productSchema.safeParse(newProductList);

    if (!result.success) {
      const formattedErrors = result.error.format();

      const validationErrors: Record<keyof ListProduct, string> = {
        image: formattedErrors.image?._errors.join(', ') || '',
        brochure: formattedErrors.brochure?._errors.join(', ') || '',
        productName: formattedErrors.productName?._errors.join(', ') || '',
        category: formattedErrors.category?._errors.join(', ') || '',
        customerPrice: formattedErrors.customerPrice?._errors.join(', ') || '',
        resellerPrice: formattedErrors.resellerPrice?._errors.join(', ') || '',
        description: formattedErrors.description?._errors.join(', ') || '',
        videoTutorial: formattedErrors.videoTutorial?._errors.join(', ') || '',
      };

      setErrors(validationErrors);
      return;
    }

    onAddProductList(
      newProductList.image,
      newProductList.brochure,
      newProductList.productName,
      newProductList.category,
      newProductList.customerPrice,
      newProductList.resellerPrice,
      newProductList.description,
      newProductList.videoTutorial
    );

    onClose();
    setDiscardConfirmationOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setErrors({
        image: '',
        brochure: '',
        productName: '',
        category: '',
        customerPrice: '',
        resellerPrice: '',
        description: '',
        videoTutorial: '',
      });

      setBackendError({
        image: '',
        brochure: '',
        productName: '',
        category: '',
        customerPrice: '',
        resellerPrice: '',
        description: '',
        videoTutorial: '',
      });
    }
  }, [isOpen, setBackendError]);

  const handleFileUpload = (file: File) => {
    setNewProductList(prev => ({ ...prev, image: file }));
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
              <div>
                <label className="block text-sm font-medium">Image</label>
                <ImageUploader onFileSelect={handleFileUpload} />
                {errors.image || backendError.image ? (
                  <p className="text-red-500 text-sm">{errors.image || backendError.image}</p>
                ) : null}
              </div>

              {/* Brochure */}
              <div>
                <label className="block text-sm font-medium">Brochure</label>
                <select
                  name="brochure"
                  value={newProductList.brochure ? "yes" : "no"}
                  onChange={(e) =>
                    setNewProductList(prev => ({
                      ...prev,
                      brochure: e.target.value === "yes",  // Set brochure as true if "yes" is selected
                    }))
                  }
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {(errors.brochure || backendError.brochure) && (
                  <p className="text-red-500 text-sm">
                    {errors.brochure || backendError.brochure}
                  </p>
                )}              </div>

            </div>
            <div className='w-full'>
              {/* Text Inputs */}
              <InputField
                label="Product Name"
                name="productName"
                placeholder="Enter name product"
                value={newProductList.productName}
                onChange={handleInputChange}
                error={errors.productName || backendError.productName}
              />

              {/* <InputField
                label="Category"
                name="category"
                value={newProductList.category}
                onChange={handleInputChange}
                error={errors.category}
              /> */}

              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category"
                  value={newProductList.category}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: newProductList.category === "" ? '#989898' : 'black', // Apply red color if no role is selected
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value="">Choose Category</option>

                  <option value="MJ">Mesin Jahit</option>
                  <option value="A3">Printer Inkjet A3</option>
                  <option value="A4">Printer Inkjet A4</option>
                  <option value="ML">Mesin Label</option>

                </select>
                {(errors.category || backendError.category) && (
                  <p className="text-red-500 text-sm">
                    {errors.category || backendError.category}
                  </p>
                )}              </div>
              <InputField
                label="Video Tutorial URL"
                name="videoTutorial"
                type="url"
                placeholder='URL'
                value={newProductList.videoTutorial}
                onChange={handleInputChange}
                error={errors.videoTutorial}
              />

              <InputField
                label="Customer Price"
                name="customerPrice"
                placeholder='0,00'
                value={newProductList.customerPrice}
                onChange={handleInputChange}
                error={errors.customerPrice}
              />

              <InputField
                label="Reseller Price"
                name="resellerPrice"
                placeholder='0,00'
                value={newProductList.resellerPrice}
                onChange={handleInputChange}
                error={errors.resellerPrice}
              />

              {/* Textarea */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <TiptapEditor
                  value={newProductList.description}
                  onChange={(html) => setNewProductList(prev => ({ ...prev, description: html }))}
                />
                {(errors.description || backendError.description) && (
                  <p className="text-red-500 text-sm">
                    {errors.description || backendError.description}
                  </p>
                )}
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
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListModal;

// Reusable Input Field Component
type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
// }) => (
//   <div>
//     <label className="block text-sm font-medium">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full  px-3 py-2 rounded-3xl"
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
