// // // import React, { useState, useEffect } from 'react';
// // // import { z } from 'zod';


// // // // Define the Zod schema for validation
// // // const productSchema = z.object({
// // //   image: z
// // //     .instanceof(File, { message: 'Image must be a file' })
// // //     .refine(file => file.size > 0, { message: 'Image file is required' }),

// // //   brochure: z.boolean(),

// // //   productname: z
// // //     .string()
// // //     .min(1, { message: 'Product name is required' }),

// // //   category: z
// // //     .string()
// // //     .min(1, { message: 'Category is required' }),

// // //   customerprice: z
// // //     .string()
// // //     .min(1, { message: 'Customer price is required' }),

// // //   resellerprice: z
// // //     .string()
// // //     .min(1, { message: 'Reseller price is required' }),

// // //   description: z
// // //     .string()
// // //     .min(1, { message: 'Description is required' }),

// // //   videotutorial: z
// // //     .string()
// // //     .url({ message: 'Video tutorial must be a valid URL' }),
// // // });


// // // interface ListReportOrder {
// // //   // no: number;
// // //   image: File;
// // //   brochure: boolean;
// // //   productname: string;
// // //   category: string;
// // //   customerprice: string;
// // //   resellerprice: string;
// // //   description: string;
// // //   videotutorial: string;
// // //   // deleted: Deleted;

// // // }

// // // interface UserModalProps {
// // //   isOpen: boolean;
// // //   onClose: () => void;
// // //   onAddProductList: (image: File,
// // //     brochure: boolean,
// // //     productname: string,
// // //     category: string,
// // //     customerprice: string,
// // //     resellerprice: string,
// // //     description: string,
// // //     videotutorial: string,) => void;

// // //   newReportOrder: {image: File;
// // //     brochure: boolean;
// // //     productname: string;
// // //     category: string;
// // //     customerprice: string;
// // //     resellerprice: string;
// // //     description: string;
// // //     videotutorial: string;};

// // //   setNewReportOrder: React.Dispatch<React.SetStateAction<{ image: File;
// // //     brochure: boolean;
// // //     productname: string;
// // //     category: string;
// // //     customerprice: string;
// // //     resellerprice: string;
// // //     description: string;
// // //     videotutorial: string; }>>;
// // //   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// // //   backendError: {image: string; brochure: string;
// // //     productname: string;
// // //     category: string;
// // //     customerprice: string;
// // //     resellerprice: string;
// // //     description: string;
// // //     videotutorial: string;};  // Ensure this matches the type you are passing
// // //   setBackendError: React.Dispatch<React.SetStateAction<{ image: string; brochure: string;
// // //     productname: string;
// // //     category: string;
// // //     customerprice: string;
// // //     resellerprice: string;
// // //     description: string;
// // //     videotutorial: string; }>>;  // Same here
// // // }

// // // const ProductListModal: React.FC<UserModalProps> = ({ isOpen, onClose, onAddProductList, newReportOrder, setNewReportOrder, setDiscardConfirmationOpen,
// // //   backendError,  // Receive the backend error
// // //   setBackendError,  // Receive the function to reset the error
// // //  }) => {
// // //   const [errors, setErrors] = useState({
// // //     image: '',
// // //     brochure: '',
// // //     productname: '',
// // //     category: '',
// // //     customerprice: '',
// // //     resellerprice: '',
// // //     description: '',
// // //     videotutorial: '',
// // //   });
// // //   const [roles, setRoles] = useState<any[]>([]); // State to store roles

// // //   // // Fetch roles from the backend API
// // //   // useEffect(() => {
// // //   //   const fetchRoles = async () => {
// // //   //     try {
// // //   //       const response = await LoadUserRole(); // API function to load roles
// // //   //       const data = await response; // assuming response is an array [{ id: 1, roleName: 'Admin' }, ...]
// // //   //       setRoles(data); // Set the roles in state
// // //   //     } catch (error) {
// // //   //       console.error('Error fetching roles:', error);
// // //   //     }
// // //   //   };

// // //   //   fetchRoles();
// // //   // }, []); // Empty dependency array to run only once on component mount

// // //   // Handle input changes
// // //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// // //     const { name, value } = e.target;
// // //     setNewReportOrder((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   // Handle form submission
// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     setErrors({
// // //       image: '',
// // //       brochure: '',
// // //       productname: '',
// // //       category: '',
// // //       customerprice: '',
// // //       resellerprice: '',
// // //       description: '',
// // //       videotutorial: '',
// // //     });
// // //     setBackendError({image: '',
// // //       brochure: '',
// // //       productname: '',
// // //       category: '',
// // //       customerprice: '',
// // //       resellerprice: '',
// // //       description: '',
// // //       videotutorial: '',});  // Reset backend error on close


// // //     e.preventDefault();


// // //     // Validate the newUser data using Zod
// // //     const result = productSchema.safeParse(newReportOrder);

// // //     if (!result.success) {
// // //       // Map Zod errors to a record of strings (error messages)
// // //       const formattedErrors = result.error.format();

// // //       const validationErrors: Record<
// // //         keyof z.infer<typeof productSchema>,
// // //         string
// // //       > = {
// // //         image: formattedErrors.image?._errors.join(', ') || '',
// // //         brochure: formattedErrors.brochure?._errors.join(', ') || '',
// // //         productname: formattedErrors.productname?._errors.join(', ') || '',
// // //         category: formattedErrors.category?._errors.join(', ') || '',
// // //         customerprice: formattedErrors.customerprice?._errors.join(', ') || '',
// // //         resellerprice: formattedErrors.resellerprice?._errors.join(', ') || '',
// // //         description: formattedErrors.description?._errors.join(', ') || '',
// // //         videotutorial: formattedErrors.videotutorial?._errors.join(', ') || '',
// // //       };
// // //       setErrors(validationErrors);
// // //       return;
// // //     }

// // //     // If validation is successful, proceed with adding the user
// // //     onAddProductList(newReportOrder.image, newReportOrder.brochure,newReportOrder.productname,newReportOrder.category,newReportOrder.customerprice,newReportOrder.resellerprice,newReportOrder.description,newReportOrder.videotutorial);

// // //     // Close the modal
// // //     onClose();

// // //     // Reset the discard confirmation modal state
// // //     setDiscardConfirmationOpen(false);
// // //   };

// // //   // Reset errors when the modal is closed
// // //   useEffect(() => {
// // //     if (!isOpen) {
// // //       setErrors({
// // //         image: '',
// // //       brochure: '',
// // //       productname: '',
// // //       category: '',
// // //       customerprice: '',
// // //       resellerprice: '',
// // //       description: '',
// // //       videotutorial: '',
// // //       });
// // //       setBackendError({ image: '',
// // //         brochure: '',
// // //         productname: '',
// // //         category: '',
// // //         customerprice: '',
// // //         resellerprice: '',
// // //         description: '',
// // //         videotutorial: '',});  // Reset backend error on close
// // //     }      
// // //   }, [isOpen,setBackendError]);

// // //   if (!isOpen) return null;

// // //   return (
// // //     <div
// // //       className="fixed inset-0 flex justify-center items-center z-60"
// // //       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// // //       onClick={onClose}
// // //     >
// // //       <div
// // //         className="bg-white p-6 rounded-lg shadow-lg w-1/2"
// // //         onClick={(e) => e.stopPropagation()}
// // //       >
// // //         <div className="flex justify-between items-center mb-4">
// // //           <h2 className="text-xl mb-4">Add User</h2>
// // //           <div className="flex justify-between">
// // //             <button
// // //               type="submit"
// // //               onClick={handleSubmit}
// // //               className="bg-blue-500 text-white h-8 w-20 mr-2 rounded-md"
// // //             >
// // //               Save
// // //             </button>
// // //             <button
// // //               type="button"
// // //               onClick={onClose}
// // //               className="bg-white border-2 border-blue-500 text-blue-500 h-8 w-20 rounded-md"
// // //             >
// // //               Cancel
// // //             </button>
// // //           </div>
// // //         </div>
// // //         <form onSubmit={handleSubmit} className="space-y-4 p-4">
// // //   {/* Image Upload */}
// // //   <div>
// // //     <label className="block text-sm font-medium">Image</label>
// // //     <input
// // //       type="file"
// // //       name="image"
// // //       accept="image/*"
// // //       onChange={(e) => {
// // //         const file = e.target.files?.[0];
// // //         if (file) {
// // //           setNewReportOrder((prev) => ({ ...prev, image: file }));
// // //         }
// // //       }}
// // //     />
// // //     {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
// // //     {backendError.image && <p className="text-red-500 text-sm">{backendError.image}</p>}
// // //   </div>

// // //   {/* Brochure Toggle */}
// // //   <div>
// // //     <label className="block text-sm font-medium">Brochure</label>
// // //     <input
// // //       type="checkbox"
// // //       name="brochure"
// // //       checked={newReportOrder.brochure}
// // //       onChange={(e) =>
// // //         setNewReportOrder((prev) => ({
// // //           ...prev,
// // //           brochure: e.target.checked,
// // //         }))
// // //       }
// // //     />
// // //     {errors.brochure && <p className="text-red-500 text-sm">{errors.brochure}</p>}
// // //   </div>

// // //   {/* Product Name */}
// // //   <div>
// // //     <label className="block text-sm font-medium">Product Name</label>
// // //     <input
// // //       type="text"
// // //       name="productname"
// // //       value={newReportOrder.productname}
// // //       onChange={handleInputChange}
// // //       className="w-full border px-3 py-2 rounded"
// // //     />
// // //     {errors.productname && <p className="text-red-500 text-sm">{errors.productname}</p>}
// // //     {backendError.productname && <p className="text-red-500 text-sm">{backendError.productname}</p>}
// // //   </div>

// // //   {/* Category */}
// // //   <div>
// // //     <label className="block text-sm font-medium">Category</label>
// // //     <input
// // //       type="text"
// // //       name="category"
// // //       value={newReportOrder.category}
// // //       onChange={handleInputChange}
// // //       className="w-full border px-3 py-2 rounded"
// // //     />
// // //     {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
// // //   </div>

// // //   {/* Customer Price */}
// // //   <div>
// // //     <label className="block text-sm font-medium">Customer Price</label>
// // //     <input
// // //       type="text"
// // //       name="customerprice"
// // //       value={newReportOrder.customerprice}
// // //       onChange={handleInputChange}
// // //       className="w-full border px-3 py-2 rounded"
// // //     />
// // //     {errors.customerprice && <p className="text-red-500 text-sm">{errors.customerprice}</p>}
// // //   </div>

// // //   {/* Reseller Price */}
// // //   <div>
// // //     <label className="block text-sm font-medium">Reseller Price</label>
// // //     <input
// // //       type="text"
// // //       name="resellerprice"
// // //       value={newReportOrder.resellerprice}
// // //       onChange={handleInputChange}
// // //       className="w-full border px-3 py-2 rounded"
// // //     />
// // //     {errors.resellerprice && <p className="text-red-500 text-sm">{errors.resellerprice}</p>}
// // //   </div>

// // //   {/* Description */}
// // //   <div>
// // //     <label className="block text-sm font-medium">Description</label>
// // //     <textarea
// // //       name="description"
// // //       value={newReportOrder.description}
// // //       onChange={handleInputChange}
// // //       className="w-full border px-3 py-2 rounded"
// // //     />
// // //     {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
// // //   </div>

// // //   {/* Video Tutorial URL */}
// // //   <div>
// // //     <label className="block text-sm font-medium">Video Tutorial URL</label>
// // //     <input
// // //       type="url"
// // //       name="videotutorial"
// // //       value={newReportOrder.videotutorial}
// // //       onChange={handleInputChange}
// // //       className="w-full border px-3 py-2 rounded"
// // //     />
// // //     {errors.videotutorial && <p className="text-red-500 text-sm">{errors.videotutorial}</p>}
// // //   </div>


// // // </form>

// // //       </div>
// // //     </div>
// // //   );
// // // };
// // // export default ProductListModal;

// // import React, { useState, useEffect } from 'react';
// // import { z } from 'zod';
// // // import dynamic from 'next/dynamic';
// // // import 'react-quill/dist/quill.snow.css'; // Quill styling

// // // // Dynamically import ReactQuill to avoid SSR issues if using Next.js
// // // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// // // import { RichTextEditor } from '@mantine/rte';
// // import TiptapEditor from './tiptapeditor';


// // // Zod validation schema
// // const productSchema = z.object({
// //   image: z
// //     .instanceof(File, { message: 'Image must be a file' })
// //     .refine(file => file.size > 0, { message: 'Image file is required' }),
// //   brochure: z.boolean(),
// //   productname: z.string().min(1, { message: 'Product name is required' }),
// //   category: z.string().min(1, { message: 'Category is required' }),
// //   customerprice: z.string().min(1, { message: 'Customer price is required' }),
// //   resellerprice: z.string().min(1, { message: 'Reseller price is required' }),
// //   description: z.string().min(1, { message: 'Description is required' }),
// //   videotutorial: z.string().url({ message: 'Video tutorial must be a valid URL' }),
// // });

// // interface ListProduct {
// //   image: File;
// //   brochure: boolean;
// //   productname: string;
// //   category: string;
// //   customerprice: string;
// //   resellerprice: string;
// //   description: string;
// //   videotutorial: string;
// // }

// // interface UserModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   onAddProductList: (
// //     image: File,
// //     brochure: boolean,
// //     productname: string,
// //     category: string,
// //     customerprice: string,
// //     resellerprice: string,
// //     description: string,
// //     videotutorial: string
// //   ) => void;
// //   newReportOrder: ListProduct;
// //   setNewReportOrder: React.Dispatch<React.SetStateAction<ListProduct>>;
// //   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// //   backendError: Record<keyof ListProduct, string>;
// //   setBackendError: React.Dispatch<React.SetStateAction<Record<keyof ListProduct, string>>>;
// // }

// // const ProductListModal: React.FC<UserModalProps> = ({
// //   isOpen,
// //   onClose,
// //   onAddProductList,
// //   newReportOrder,
// //   setNewReportOrder,
// //   setDiscardConfirmationOpen,
// //   backendError,
// //   setBackendError,
// // }) => {
// //   const [errors, setErrors] = useState<Record<keyof ListProduct, string>>({
// //     image: '',
// //     brochure: '',
// //     productname: '',
// //     category: '',
// //     customerprice: '',
// //     resellerprice: '',
// //     description: '',
// //     videotutorial: '',
// //   });

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target;
// //     setNewReportOrder(prev => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();

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

// //     setBackendError({
// //       image: '',
// //       brochure: '',
// //       productname: '',
// //       category: '',
// //       customerprice: '',
// //       resellerprice: '',
// //       description: '',
// //       videotutorial: '',
// //     });

// //     const result = productSchema.safeParse(newReportOrder);

// //     if (!result.success) {
// //       const formattedErrors = result.error.format();

// //       const validationErrors: Record<keyof ListProduct, string> = {
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

// //     onAddProductList(
// //       newReportOrder.image,
// //       newReportOrder.brochure,
// //       newReportOrder.productname,
// //       newReportOrder.category,
// //       newReportOrder.customerprice,
// //       newReportOrder.resellerprice,
// //       newReportOrder.description,
// //       newReportOrder.videotutorial
// //     );

// //     onClose();
// //     setDiscardConfirmationOpen(false);
// //   };

// //   useEffect(() => {
// //     if (!isOpen) {
// //       setErrors({
// //         image: '',
// //         brochure: '',
// //         productname: '',
// //         category: '',
// //         customerprice: '',
// //         resellerprice: '',
// //         description: '',
// //         videotutorial: '',
// //       });

// //       setBackendError({
// //         image: '',
// //         brochure: '',
// //         productname: '',
// //         category: '',
// //         customerprice: '',
// //         resellerprice: '',
// //         description: '',
// //         videotutorial: '',
// //       });
// //     }
// //   }, [isOpen, setBackendError]);

// //   if (!isOpen) return null;

// //   return (
// //         <div
// //       className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-60"
// //       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
// //       onClick={onClose}
// //     >
// //       <div
// //         className="bg-white p-6 rounded-lg shadow-lg w-1/2"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-xl font-semibold">Add Product</h2>
// //           <div className="flex space-x-2">
// //             <button
// //               type="submit"
// //               onClick={handleSubmit}
// //               className="bg-blue-500 text-white h-8 w-20 rounded-md"
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

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           {/* File Upload */}
// //           <InputField
// //             label="Image"
// //             type="file"
// //             name="image"
// //             onChange={(e) => {
// //               const file = e.target.files?.[0];
// //               if (file) setNewReportOrder(prev => ({ ...prev, image: file }));
// //             }}
// //             error={errors.image || backendError.image}
// //           />

// //           {/* Brochure */}
// //           <div>
// //             <label className="block text-sm font-medium">Brochure</label>
// //             <input
// //               type="checkbox"
// //               name="brochure"
// //               checked={newReportOrder.brochure}
// //               onChange={(e) =>
// //                 setNewReportOrder(prev => ({ ...prev, brochure: e.target.checked }))
// //               }
// //             />
// //             {errors.brochure && <p className="text-red-500 text-sm">{errors.brochure}</p>}
// //           </div>

// //           {/* Text Inputs */}
// //           <InputField
// //             label="Product Name"
// //             name="productname"
// //             value={newReportOrder.productname}
// //             onChange={handleInputChange}
// //             error={errors.productname || backendError.productname}
// //           />

// //           <InputField
// //             label="Category"
// //             name="category"
// //             value={newReportOrder.category}
// //             onChange={handleInputChange}
// //             error={errors.category}
// //           />

// //           <InputField
// //             label="Customer Price"
// //             name="customerprice"
// //             value={newReportOrder.customerprice}
// //             onChange={handleInputChange}
// //             error={errors.customerprice}
// //           />

// //           <InputField
// //             label="Reseller Price"
// //             name="resellerprice"
// //             value={newReportOrder.resellerprice}
// //             onChange={handleInputChange}
// //             error={errors.resellerprice}
// //           />

// //           {/* Textarea */}
// //           <div>
// //             <label className="block text-sm font-medium">Description</label>
// //             {/* <textarea
// //               name="description"
// //               value={newReportOrder.description}
// //               onChange={handleInputChange}
// //               className="w-full border px-3 py-2 rounded"
// //             /> */}
// //             {/* <RichTextEditor
// //   value={newReportOrder.description}
// //   onChange={(value) => setNewReportOrder(prev => ({ ...prev, description: value }))}
// //   styles={{ root: { minHeight: 200, border: '1px solid #ccc', borderRadius: 4 } }}
// // /> */}
// // <TiptapEditor
// //   value={newReportOrder.description}
// //   onChange={(html) => setNewReportOrder(prev => ({ ...prev, description: html }))}
// // />
// //             {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
// //           </div>


// //           <InputField
// //             label="Video Tutorial URL"
// //             name="videotutorial"
// //             type="url"
// //             value={newReportOrder.videotutorial}
// //             onChange={handleInputChange}
// //             error={errors.videotutorial}
// //           />
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductListModal;

// // // Reusable Input Field Component
// // type InputFieldProps = {
// //   label: string;
// //   name: string;
// //   type?: string;
// //   value?: string;
// //   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// //   onChangeFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// //   error?: string;
// // };

// // const InputField: React.FC<InputFieldProps> = ({
// //   label,
// //   name,
// //   type = 'text',
// //   value,
// //   onChange,
// //   error,
// // }) => (
// //   <div>
// //     <label className="block text-sm font-medium">{label}</label>
// //     <input
// //       type={type}
// //       name={name}
// //       value={value}
// //       onChange={onChange}
// //       className="w-full border px-3 py-2 rounded"
// //     />
// //     {error && <p className="text-red-500 text-sm">{error}</p>}
// //   </div>
// // );

// import React, { useState, useEffect } from 'react';
// import { z } from 'zod';
// import TiptapEditor from '../../../input-custom/tiptapeditor';
// import ImageUploader from '../../../input-custom/ImageUploader';
// import { BuyerRoleEnum, CategoryEnum, OrderStatusEnum, PaymentStatusEnum, TaskStatusEnum } from '@/data/services/enum/reportorder-enum';
// import PDFUploader from '@/components/custom/input-custom/PDFUploader';
// // Zod validation schema


// export const AddReportOrderSchema = z.object({
//   invoice: z.instanceof(File),
//   roles: z
//     .string()
//     .min(1, { message: 'Role is required' })
//     .refine((val) => val !== BuyerRoleEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
//   category: z
//     .string()
//     .min(1, { message: 'Role is required' })
//     .refine((val) => val !== CategoryEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role

//   orderStatus: z
//     .string()
//     .min(1, { message: 'Role is required' })
//     .refine((val) => val !== OrderStatusEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
//   paymentStatus: z
//     .string()
//     .min(1, { message: 'Role is required' })
//     .refine((val) => val !== PaymentStatusEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
//   taskStatus: z
//     .string()
//     .min(1, { message: 'Role is required' })
//     .refine((val) => val !== TaskStatusEnum.Empty, { message: 'Please select a valid role' }), // Check for empty role
//   notes: z.string().min(1, 'Address line 1 is required'),

// });



// interface ListReportOrder {

//   // no: number;
//   // storephoto: File;//image
//   // shopname: string;//productname
//   // owner: string;//category
//   // roles: string;//customerprice
//   // email: string;//resellerprice
//   // phone: string;//description
//   // address1: string;//videotutorial
//   // address2: string;//description
//   // city: string;//videotutorial
//   // printera3: boolean;//brochure
//   // printera4: boolean;//brochure

//   // deleted: Deleted;

//   invoice: File | null;//image
//   // invoicenumber: string;
//   roles: BuyerRoleEnum;// deleted
//   category: CategoryEnum;// deleted
//   orderStatus: OrderStatusEnum;// deleted
//   paymentStatus: PaymentStatusEnum;// deleted
//   taskStatus: TaskStatusEnum;// deleted
//   notes: string;//productname

// }

// interface UserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddReportOrder: (




//     // no: number;
//     // storephoto: File,//image
//     // shopname: string,//productname
//     // owner: string,//category
//     // roles: string,//customerprice
//     // email: string,//resellerprice
//     // phone: string,//description
//     // address1: string,//videotutorial
//     // address2: string,//description
//     // city: string,//videotutorial
//     // printera3: boolean,//brochure
//     // printera4: boolean,//brochure

//     invoice: File | null,//image
//     // invoicenumber: string,
//     roles: BuyerRoleEnum,// deleted
//     category: CategoryEnum,// deleted
//     orderStatus: OrderStatusEnum,// deleted
//     paymentStatus: PaymentStatusEnum,// deleted
//     taskStatus: TaskStatusEnum,// deleted
//     notes: string,//productname
//     // deleted: Deleted;


//   ) => void;
//   newReportOrder: ListReportOrder;
//   setNewReportOrder: React.Dispatch<React.SetStateAction<ListReportOrder>>;
//   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   backendError: Record<keyof ListReportOrder, string>;
//   setBackendError: React.Dispatch<React.SetStateAction<Record<keyof ListReportOrder, string>>>;
// }

// const ReportOrderListModal: React.FC<UserModalProps> = ({
//   isOpen,
//   onClose,
//   onAddReportOrder,
//   newReportOrder,
//   setNewReportOrder,
//   setDiscardConfirmationOpen,
//   backendError,
//   setBackendError,
// }) => {
//   const [errors, setErrors] = useState<Record<keyof ListReportOrder, string>>({
//     // storephoto: '',
//     // shopname: '',
//     // owner: '',
//     // roles: '',
//     // email: '',
//     // phone: '',
//     // address1: '',
//     // address2: '',
//     // city: '',
//     // printera3: '',
//     // printera4: '',

//     invoice: '',//image
//     // invoicenumber: string;
//     roles: '',// deleted
//     category: '',// deleted
//     orderStatus: '',// deleted
//     paymentStatus: '',// deleted
//     taskStatus: '',// deleted
//     notes: '',//productname
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewReportOrder(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     setErrors({
//       invoice: '',
//       roles: '',
//       category: '',
//       orderStatus: '',
//       paymentStatus: '',
//       taskStatus: '',
//       notes: '',
//     });

//     setBackendError({
//       invoice: '',
//       roles: '',
//       category: '',
//       orderStatus: '',
//       paymentStatus: '',
//       taskStatus: '',
//       notes: '',
//     });

//     const result = AddReportOrderSchema.safeParse(newReportOrder);

//     if (!result.success) {
//       const formattedErrors = result.error.format();

//       const validationErrors: Record<keyof ListReportOrder, string> = {

//         invoice: formattedErrors.invoice?._errors.join(', ') || '',
//         roles: formattedErrors.roles?._errors.join(', ') || '',
//         category: formattedErrors.category?._errors.join(', ') || '',
//         orderStatus: formattedErrors.orderStatus?._errors.join(', ') || '',
//         paymentStatus: formattedErrors.paymentStatus?._errors.join(', ') || '',
//         taskStatus: formattedErrors.taskStatus?._errors.join(', ') || '',
//         notes: formattedErrors.notes?._errors.join(', ') || '',
//       };

//       setErrors(validationErrors);
//       return;
//     }

//     onAddReportOrder(



//       newReportOrder.invoice,
//       newReportOrder.roles,
//       newReportOrder.category,
//       newReportOrder.orderStatus,
//       newReportOrder.paymentStatus,
//       newReportOrder.taskStatus,
//       newReportOrder.notes,
//     );

//     onClose();
//     setDiscardConfirmationOpen(false);
//   };

//   useEffect(() => {
//     if (!isOpen) {
//       setErrors({
//         invoice: '',
//         roles: '',
//         category: '',
//         orderStatus: '',
//         paymentStatus: '',
//         taskStatus: '',
//         notes: '',
//       });

//       setBackendError({
//         invoice: '',
//         roles: '',
//         category: '',
//         orderStatus: '',
//         paymentStatus: '',
//         taskStatus: '',
//         notes: '',
//       });
//     }
//   }, [isOpen, setBackendError]);

//   const handleFileUpload = (file: File) => {
//     setNewReportOrder(prev => ({ ...prev, image: file }));
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-60"
//       style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold  w-full pb-4 px-2 border-b-1 border-neutral-200">New Item</h2>

//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* File Upload using ImageUploader */}
//           <div className='flex justify-between'
//             style={{ gap: '20px' }}>
//             <div>
//               <div>
//                 <label className="block text-sm font-medium">Invoice</label>
//                 {/* <ImageUploader onFileSelect={handleFileUpload} /> */}
//                 <PDFUploader onFileSelect={handleFileUpload} />
//                 {errors.invoice || backendError.invoice ? (
//                   <p className="text-red-500 text-sm">{errors.invoice || backendError.invoice}</p>
//                 ) : null}
//               </div>

//               {/* Brochure */}
//               {/* <div>
//                 <label className="block text-sm font-medium">Printer Inkjet A3</label>
//                 <select
//                   name="printera3"
//                   value={newReportOrder.printera3 ? "yes" : "no"}
//                   onChange={(e) =>
//                     setNewReportOrder(prev => ({
//                       ...prev,
//                       printera3: e.target.value === "yes",  // Set printera3 as true if "yes" is selected
//                     }))
//                   }
//                   className="w-full border px-3 py-2 rounded-3xl"
//                   style={{
//                     height: 40,
//                     backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
//                   }}
//                 >
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//                 {errors.printera3 && <p className="text-red-500 text-sm">{errors.printera3}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Printer Inkjet A4</label>
//                 <select
//                   name="printera3"
//                   value={newReportOrder.printera4 ? "yes" : "no"}
//                   onChange={(e) =>
//                     setNewReportOrder(prev => ({
//                       ...prev,
//                       printera4: e.target.value === "yes",  // Set printera4 as true if "yes" is selected
//                     }))
//                   }
//                   className="w-full border px-3 py-2 rounded-3xl"
//                   style={{
//                     height: 40,
//                     backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
//                   }}
//                 >
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//                 {errors.printera4 && <p className="text-red-500 text-sm">{errors.printera4}</p>}
//               </div> */}

//             </div>
//             <div className='w-full'>
//               {/* Text Inputs */}
//               <div>
//                 <label className="block text-sm font-medium">Roles</label>
//                 <select
//                   name="roles"
//                   value={newReportOrder.roles}
//                   onChange={handleInputChange}
//                   className="w-full border px-3 py-2 rounded-3xl"
//                   style={{
//                     height: 40,
//                     color: newReportOrder.roles === "" ? '#989898' : 'black', // Apply red color if no role is selected
//                     backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
//                   }}
//                 >
//                   <option value={BuyerRoleEnum.Empty}>Select Role</option>
//                   <option value={BuyerRoleEnum.CUSTOMER}>Customer</option>
//                   <option value={BuyerRoleEnum.RESELLER}>Reseller</option>
//                   <option value={BuyerRoleEnum.DISTRIBUTOR}>Distributor</option>


//                 </select>
//                 {(errors.roles || backendError.roles) && (
//                   <p className="text-red-500 text-sm">
//                     {errors.roles || backendError.roles}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Category</label>
//                 <select
//                   name="category"
//                   value={newReportOrder.category}
//                   onChange={handleInputChange}
//                   className="w-full border px-3 py-2 rounded-3xl"
//                   style={{
//                     height: 40,
//                     color: newReportOrder.category === "" ? '#989898' : 'black', // Apply red color if no role is selected
//                     backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
//                   }}
//                 >
//                   <option value={CategoryEnum.Empty}>Select Role</option>
//                   <option value={CategoryEnum.A3}>Printer Inkjet A3</option>
//                   <option value={CategoryEnum.A4}>Printer Inkjet A4</option>
//                   <option value={CategoryEnum.MJ}>Mesin Jahit</option>
//                   <option value={CategoryEnum.ML}>Mesin Label</option>



//                 </select>
//                 {(errors.category || backendError.category) && (
//                   <p className="text-red-500 text-sm">
//                     {errors.category || backendError.category}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Order Status</label>
//                 <select
//                   name="orderStatus"
//                   value={newReportOrder.orderStatus}
//                   onChange={handleInputChange}
//                   className="w-full border px-3 py-2 rounded-3xl"
//                   style={{
//                     height: 40,
//                     color: newReportOrder.orderStatus === "" ? '#989898' : 'black', // Apply red color if no role is selected
//                     backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
//                   }}
//                 >
//                   <option value={OrderStatusEnum.Empty}>Select Status</option>
//                   <option value={OrderStatusEnum.NEW}>New</option>
//                   <option value={OrderStatusEnum.FINISH}>Finish</option>
//                   <option value={OrderStatusEnum.PROGRESS}>Progress</option>
//                   <option value={OrderStatusEnum.CANCEL}>Cancel</option>



//                 </select>
//                 {(errors.orderStatus || backendError.orderStatus) && (
//                   <p className="text-red-500 text-sm">
//                     {errors.orderStatus || backendError.orderStatus}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Payment Status</label>
//                 <select
//                   name="paymentStatus"
//                   value={newReportOrder.paymentStatus}
//                   onChange={handleInputChange}
//                   className="w-full border px-3 py-2 rounded-3xl"
//                   style={{
//                     height: 40,
//                     color: newReportOrder.paymentStatus === "" ? '#989898' : 'black', // Apply red color if no role is selected
//                     backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
//                   }}
//                 >
//                   <option value={PaymentStatusEnum.Empty}>Select Status</option>
//                   <option value={PaymentStatusEnum.PENDING}>Pending</option>
//                   <option value={PaymentStatusEnum.SUCCESS}>Success</option>
//                   <option value={PaymentStatusEnum.SETTLEMENT}>Settlement</option>
//                   <option value={PaymentStatusEnum.CANCEL}>Cancel</option>
//                   <option value={PaymentStatusEnum.REFUND}>Refund</option>
//                   <option value={PaymentStatusEnum.REJECTED}>Rejected</option>


//                 </select>
//                 {(errors.paymentStatus || backendError.paymentStatus) && (
//                   <p className="text-red-500 text-sm">
//                     {errors.paymentStatus || backendError.paymentStatus}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Task Status</label>
//                 <select
//                   name="taskStatus"
//                   value={newReportOrder.taskStatus}
//                   onChange={handleInputChange}
//                   className="w-full border px-3 py-2 rounded-3xl"
//                   style={{
//                     height: 40,
//                     color: newReportOrder.taskStatus === "" ? '#989898' : 'black', // Apply red color if no role is selected
//                     backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
//                   }}
//                 >
//                   <option value={TaskStatusEnum.Empty}>Select Role</option>
//                   <option value={TaskStatusEnum.WAITING}>Waiting</option>
//                   <option value={TaskStatusEnum.APPROVED}>Approved</option>
//                   <option value={TaskStatusEnum.COMPLETE}>Complete</option>


//                 </select>
//                 {(errors.taskStatus || backendError.taskStatus) && (
//                   <p className="text-red-500 text-sm">
//                     {errors.taskStatus || backendError.taskStatus}
//                   </p>
//                 )}
//               </div>

//               {/* Textarea */}
//               <div>
//                 <label className="block text-sm font-medium">Notes</label>
//                 <TiptapEditor
//                   value={newReportOrder.notes}
//                   onChange={(html) => setNewReportOrder(prev => ({ ...prev, notes: html }))}
//                 />
//                 {errors.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}
//               </div>

//             </div>
//           </div>
//         </form>
//         <div className="flex justify-center space-x-2 mt-4">

//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-neutral-400 border-2  text-white hover:bg-neutral-500 h-10 w-20 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="bg-blue-500 text-white  hover:bg-blue-600 h-10 w-30 rounded-md"
//           >
//             Add Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReportOrderListModal;
