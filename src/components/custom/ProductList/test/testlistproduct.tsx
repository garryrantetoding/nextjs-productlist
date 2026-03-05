// // "use client";
// // import React, { useState } from 'react';
// // import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
// // import CheckboxToggle from './buttons/toggle-button'; // Ensure this is correct path
// // import PopupButton from './buttons/detail-button';
// // import Modal from './popups/popup-detail';
// // import StatusSwitchConfirmationModal from './popups/popup-togglestatus'; // Import the new modal
// // import EditModal from './popups/popup-edit'; // Import the new EditModal component
// // import ConfirmSaveModal from './popups/popup-saveedit';
// // import DiscardEditModal from './popups/popup-discardedit';
// // import { EditUser } from '@/data/services/productlist-service';
// // import { Role, Status, Deleted } from '@/data/services/enum';
// // import { ChangeStatus } from '@/data/services/productlist-service';
// // import ExitModal from '../ExitModal';
// // import { LoadPermissionsAuth } from '@/data/services/productlist-service';
// // import { toast } from 'sonner';
// // import Image from 'next/image';
// // import UpdateImageButton from './buttons/updateimage-button';


// // export type Person = {
// //   id: number;
// //   name: string; // Name will not be visible on the table but will be in the database
// //   email: string;
// //   // roles: Role;
// //   roles: string;
// //   status: Status;
// //   boxColor: string;
// //   roleColor: string;

// // };

// // export type ProductList = {

// //   no: number;
// //   image: string;
// //   brochure: boolean;
// //   productname: string;
// //   category: string;
// //   customerprice: string;
// //   resellerprice: string;
// //   description: string;
// //   videotutorial: string;
// //   deleted: Deleted;

// // }

// // interface EditBackendErrorUser {
// //   name: string;
// // }

// // const columnHelper = createColumnHelper<ProductList>();

// // interface UserListProps {
// //   searchQuery: string;
// //   roleFilter: string;
// //   statusFilter: Status | undefined;
// //   data: ProductList[];
// //   setData: React.Dispatch<React.SetStateAction<ProductList[]>>;
// //   selectedRows: Record<string, boolean>;  // Change to an object with row ids as keys
// //   setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;  // Update state type to be an object
// // }

// // function UserList({ searchQuery, roleFilter, statusFilter, data, setData, selectedRows, setSelectedRows }: UserListProps) {
// //   const [isModalOpen, setIsModalOpen] = React.useState(false);
// //   const [selectedProduct, setSelectedProduct] = React.useState<ProductList | null>(null);  // New state to store selected product
// //   const [isStatusSwitchModalOpen, setIsStatusSwitchModalOpen] = React.useState(false); // State for status switch modal
// //   const [ProductToSwitch, setProductToSwitch] = React.useState<ProductList | null>(null); // Store product for status switch
// //   const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);  // State for Edit Modal
// //   const [editProduct, setEditProduct] = React.useState<ProductList | null>(null); // Store the product to edit
// //   const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = React.useState(false);
// //   const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = React.useState(false);
// //   const [isEditing, setIsEditing] = React.useState(false); // Add this state declaration
// //   const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
// //   const [backendError, setBackendError] = useState<EditBackendErrorUser>({
// //     name: '',

// //   });
// //   const filteredData = React.useMemo(() => {
// //     let filtered = data;

// //     //   if (searchQuery) {
// //     //     filtered = filtered.filter(product =>
// //     //       product.email.toLowerCase().includes(searchQuery.toLowerCase())
// //     //     );
// //     //   }

// //     //   if (roleFilter) {
// //     //     filtered = filtered.filter(product => product.roles === roleFilter);
// //     //   }

// //     // // Filter by status
// //     // if (statusFilter !== undefined) {
// //     //   // Log the current value of statusFilter for debugging
// //     //   // console.log("statusFilter value:", statusFilter);

// //     //   // Determine the correct status based on the filter
// //     //   const statusToFilter = statusFilter === 'Active' ? Status.Active : Status.Inactive;

// //     //   // Log the status you want to filter by
// //     //   // console.log("Filtering by status:", statusToFilter);

// //     //   filtered = filtered.filter(product => {
// //     //     // console.log("product.Status:", product.status);  // Log the product's actual status
// //     //     return product.status === statusToFilter;
// //     //   });
// //     // }


// //     return filtered;
// //   }, [searchQuery, roleFilter, statusFilter, data]);

// //   const columns = React.useMemo(() => [
// //     // {
// //     //   id: 'select',
// //     //   header: ({ table }: { table: Table<any> }) => (
// //     //     <input
// //     //       type="checkbox"
// //     //       checked={table.getIsAllRowsSelected()}
// //     //       onChange={table.getToggleAllRowsSelectedHandler()}
// //     //     />
// //     //   ),
// //     //   cell: ({ row }: { row: Row<any> }) => (
// //     //     <input
// //     //       type="checkbox"
// //     //       checked={selectedRows[row.id] || false}  // Check selection based on selectedRows object
// //     //       onChange={() => {
// //     //         setSelectedRows(prev => {
// //     //           const newSelectedRows = { ...prev };
// //     //           if (newSelectedRows[row.id]) {
// //     //             delete newSelectedRows[row.id];  // Deselect row
// //     //           } else {
// //     //             newSelectedRows[row.id] = true;  // Select row
// //     //           }
// //     //           return newSelectedRows;
// //     //         });
// //     //       }}
// //     //     />
// //     //   ),
// //     // },



// //     columnHelper.accessor('no', {
// //       cell: info => info.getValue(),
// //       header: () => <span>No</span>,
// //       footer: info => info.column.id,
// //     }),
// //     // columnHelper.accessor('image', {
// //     //   cell: info => info.getValue(),
// //     //   header: () => <span>image</span>,
// //     //   footer: info => info.column.id,
// //     // }),

// //     // columnHelper.accessor('image', {
// //     //   cell: info => {
// //     //     const image = info.getValue();
// //     //     <Image src={data.image} alt="Logo" width={80} height={80} className="" />

// //     //   },
// //     //   header: () => <span>brochure</span>,
// //     //   footer: info => info.column.id,
// //     // }),
// //     columnHelper.accessor('image', {
// //       cell: info => {
// //         const image = info.getValue(); // Get the image value from the column
// //         return (
// //           <Image
// //             src={image} // Assuming 'image' is a URL or base64 string. Adjust accordingly if it’s different.
// //             alt="Logo"
// //             width={80}
// //             height={80}
// //             className="" // You can add any additional classes here if needed
// //           />
// //         );
// //       },
// //       header: () => <span>Image</span>,
// //       footer: info => info.column.id,
// //     }),

// //     // columnHelper.accessor('brochure', {
// //     //   cell: info => info.getValue(),
// //     //   header: () => <span>brochure</span>,
// //     //   footer: info => info.column.id,
// //     // }),

// //     columnHelper.accessor('brochure', {
// //       cell: info => {
// //         const brochure = info.getValue();
// //         switch (brochure) {
// //           case true:
// //             return (
// //               <div className=" flex justify-center ">
// //                 <Image src="/images/vectortrue.png" alt="Logo" width={16.95} height={16.95} className="" />
// //               </div>
// //             )
// //           case false:
// //             return (
// //               <div className="flex justify-center">
// //                 <Image src="/images/vectorfalse.png" alt="Logo" width={16.95} height={16.95} className="" />
// //               </div>
// //             )
// //           case undefined:
// //             return null
// //         }

// //       },
// //       header: () => <span>Brochure</span>,
// //       footer: info => info.column.id,
// //     }),

// //     columnHelper.accessor('productname', {
// //       cell: info => info.getValue(),
// //       header: () => <span>Product Name</span>,
// //       footer: info => info.column.id,
// //     }),
// //     columnHelper.accessor('category', {
// //       cell: info => info.getValue(),
// //       header: () => <span>Category</span>,
// //       footer: info => info.column.id,
// //     }),
// //     columnHelper.accessor('customerprice', {
// //       cell: info => info.getValue(),
// //       header: () => <span>Price for Customer</span>,
// //       footer: info => info.column.id,
// //     }),
// //     columnHelper.accessor('resellerprice', {
// //       cell: info => info.getValue(),
// //       header: () => <span>Price for Reseller</span>,
// //       footer: info => info.column.id,
// //     }),
// //     columnHelper.accessor('description', {
// //       cell: info => info.getValue(),
// //       header: () => <span>Description</span>,
// //       footer: info => info.column.id,
// //     }),
// //     // columnHelper.accessor('videotutorial', {
// //     //   cell: info => info.getValue(),
// //     //   header: () => <span>videotutorial</span>,
// //     //   footer: info => info.column.id,
// //     // }),
// //     columnHelper.accessor('videotutorial', {
// //       cell: info => {
// //         const url = info.getValue();
// //         return (
// //           <a
// //             href={url}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="text-blue-600 hover:underline"
// //           >
// //             {url}
// //           </a>
// //         );
// //       },
// //       header: () => <span>Video Tutorial</span>,
// //       footer: info => info.column.id,
// //     }),

// //     columnHelper.accessor('deleted', {
// //       cell: info => info.getValue(),
// //       header: () => <span>Deleted</span>,
// //       footer: info => info.column.id,
// //     }),

// //     // columnHelper.accessor('roles', {
// //     //   cell: info => {
// //     //     const role = info.getValue();  // Get the role name from the row data
// //     //     const rowData = info.row.original;  // Get the full row data
// //     //     const { boxColor, roleColor } = rowData;  // Destructure backgroundColor and textColor from the row data

// //     //     // Default styles
// //     //     const roleboxColor = boxColor || '#FFFFFF';  // Default to white if no color is provided
// //     //     const rolenameColor = roleColor || '#000000';  // Default to black if no color is provided

// //     //     // Inline styles for dynamic background and text color
// //     //     const roleStyle = {
// //     //       backgroundColor: roleboxColor,
// //     //       color: rolenameColor,
// //     //     };

// //     //     // Return the role name with inline styles
// //     //     return (
// //     //       <span
// //     //         className="px-4 py-2 w-8/10 inline-block text-center rounded-md"
// //     //         style={roleStyle}
// //     //       >
// //     //         {role}
// //     //       </span>
// //     //     );
// //     //   },
// //     //   header: () => <span>Role</span>,
// //     //   footer: info => info.column.id,
// //     // }),


// //     // {
// //     //   id: 'Deleted',
// //     //   header: 'Deleted',
// //     //   cell: ({ row }: { row: Row<ProductList> }) => {
// //     //     const isActive = row.original.deleted === Deleted.Yes;  // Correctly compare with Status enum
// //     //     const userId = row.original.no;

// //     //     const handleToggleClick = () => {
// //     //       setProductToSwitch(row.original);
// //     //       setIsStatusSwitchModalOpen(true);
// //     //     };

// //     //     return (
// //     //       <CheckboxToggle
// //     //         isActive={isActive ? Status.Active : Status.Inactive}  // Correctly pass the status as enum
// //     //         userId={userId}
// //     //         onToggle={handleToggleClick}
// //     //       />
// //     //     );
// //     //   },
// //     // },

// //     {
// //       id: 'UpdateImage',
// //       header: () => 'Update Image',
// //       cell: ({ row }: { row: Row<any> }) => (
// //         <UpdateImageButton onClick={() => openModal(row.original)} />
// //       ),
// //       footer: (info: { column: { id: string } }) => info.column.id,
// //     },

// //     {
// //       id: 'Action',
// //       header: () => 'Action',
// //       cell: ({ row }: { row: Row<any> }) => (
// //         <div className='flex items-center justify-between gap-2'
// //           // style={{
// //           //   width: 63.90513610839844,
// //           //   height: 34.77203369140625,

// //           // }}
// //         >
// //           <PopupButton onClick={() => openModal(row.original)} />
// //           <svg width="4" height="15" viewBox="0 0 4 15" fill="none" xmlns="http://www.w3.org/2000/svg">
// //             <path d="M1.90527 0.237488C2.3031 0.237488 2.68463 0.395523 2.96593 0.676828C3.24724 0.958132 3.40527 1.33966 3.40527 1.73749C3.40527 2.13531 3.24724 2.51684 2.96593 2.79815C2.68463 3.07945 2.3031 3.23749 1.90527 3.23749C1.50745 3.23749 1.12592 3.07945 0.844613 2.79815C0.563309 2.51684 0.405273 2.13531 0.405273 1.73749C0.405273 1.33966 0.563309 0.958132 0.844613 0.676828C1.12592 0.395523 1.50745 0.237488 1.90527 0.237488ZM1.90527 5.73749C2.3031 5.73749 2.68463 5.89552 2.96593 6.17683C3.24724 6.45813 3.40527 6.83966 3.40527 7.23749C3.40527 7.63531 3.24724 8.01684 2.96593 8.29815C2.68463 8.57945 2.3031 8.73749 1.90527 8.73749C1.50745 8.73749 1.12592 8.57945 0.844613 8.29815C0.563309 8.01684 0.405273 7.63531 0.405273 7.23749C0.405273 6.83966 0.563309 6.45813 0.844613 6.17683C1.12592 5.89552 1.50745 5.73749 1.90527 5.73749ZM3.40527 12.7375C3.40527 12.3397 3.24724 11.9581 2.96593 11.6768C2.68463 11.3955 2.3031 11.2375 1.90527 11.2375C1.50745 11.2375 1.12592 11.3955 0.844613 11.6768C0.563309 11.9581 0.405273 12.3397 0.405273 12.7375C0.405273 13.1353 0.563309 13.5168 0.844613 13.7981C1.12592 14.0795 1.50745 14.2375 1.90527 14.2375C2.3031 14.2375 2.68463 14.0795 2.96593 13.7981C3.24724 13.5168 3.40527 13.1353 3.40527 12.7375Z" fill="black" />
// //           </svg>
// //         </div>
// //       ),
// //       footer: (info: { column: { id: string } }) => info.column.id,
// //     },
// //   ], [data, selectedRows]);

// //   const table = useReactTable({
// //     data: filteredData, // Use filtered data
// //     columns,
// //     getCoreRowModel: getCoreRowModel(),
// //     state: {
// //       rowSelection: selectedRows,  // Pass the selected rows state (updated format)
// //     },
// //     onRowSelectionChange: setSelectedRows,  // Update selected rows when changed
// //   });

// //   const openModal = async (product: ProductList) => {
// //     // // console.log('Selected product:', product); 
// //     // setSelectedProduct(product);  // Set the selected product in the state
// //     // setIsModalOpen(true);        // Open the modal
// //     // setIsEditing(false);  // Initially, it's not editing

// //     const responsepermission = await LoadPermissionsAuth();
// //     if (responsepermission === undefined) {

// //       setIsExitModalOpen(true); // Open the modal when the token is expired
// //       toast.error(`Session Expired`, {
// //         style: { backgroundColor: '#FF4D4D', color: 'white' },
// //         position: 'top-center',
// //         duration: 5000,
// //       });
// //     } else if (responsepermission.includes("GET_USER")) {

// //       setSelectedProduct(product);  // Set the selected product in the state
// //       setIsModalOpen(true);        // Open the modal
// //       setIsEditing(false);  // Initially, it's not editing   
// //     }
// //     else {
// //       toast.error(`You dont have the permission to view detail`, {
// //         style: { backgroundColor: '#FF4D4D', color: 'white' },
// //         position: 'top-center',
// //         duration: 5000,
// //       });

// //       return null
// //     }


// //   };

// //   const closeExitModal = () => {
// //     setIsExitModalOpen(false);

// //   };

// //   const closeModal = () => {
// //     setIsModalOpen(false);       // Close the modal
// //     setSelectedProduct(null);     // Reset the selected product
// //   };

// //   const closeStatusSwitchModal = () => {
// //     setIsStatusSwitchModalOpen(false); // Close the status switch modal
// //     setProductToSwitch(null);           // Reset the product
// //   };

// //   // const switchStatus = async () => {
// //   //   if (ProductToSwitch) {
// //   //     // console.log("qwedws",ProductToSwitch)

// //   //     try {
// //   //       // Perform the status update on the backend
// //   //       const updatedProduct = await ChangeStatus(ProductToSwitch.no, ProductToSwitch.deleted);

// //   //       // Update the local data state with the updated product data
// //   //     const updatedData = data.map(product =>
// //   //       product.no === updatedProduct.id ? { ...product, status: updatedProduct.status } : product
// //   //     );

// //   //       setData(updatedData);  // Update the data state

// //   //       closeStatusSwitchModal();  // Close the modal after switching status

// //   //     } catch (error) {
// //   //       console.error('Error updating status:', error);
// //   //     }
// //   //   }

// //   // };


// //   // Handle saving the changes
// //   const handleSaveClick = () => {
// //     setIsSaveConfirmationOpen(true); // Show the confirmation modal for saving
// //   };

// //   // Handle discarding the changes
// //   const handleCancelClick = () => {
// //     setIsDiscardConfirmationOpen(true); // Show the confirmation modal for discarding
// //   };

// //   // const handleSaveConfirm = async () => {
// //   //   if (editProduct) {
// //   //     try {
// //   //       // Update the user on the backend
// //   //       const updatedUser = await EditUser(editProduct.email, editProduct.name, editProduct.roles);
// //   //       console.log("The new data:", updatedUser);


// //   //       if (updatedUser?.zodErrorsusername){
// //   // // Handle backend errors by setting the error state
// //   //         const errorMessageUsername = Array.isArray(updatedUser?.zodErrorsusername)
// //   //           ? updatedUser?.zodErrorsusername.join(', ') // Join array if multiple errors
// //   //           : updatedUser?.zodErrorsusername || '';

// //   //         // Set backend errors
// //   //         setBackendError({ name: errorMessageUsername,});
// //   //         setIsSaveConfirmationOpen(false); // Close the save confirmation modal

// //   //         return; // Stop further processing if there are backend errors

// //   //       } else{


// //   //       // Update the local data state with the new user information
// //   //       const updatedData = data.map(product =>
// //   //         product.no === updatedUser.id ? { ...product, ...updatedUser } : product
// //   //       );

// //   //       setData(updatedData); // Update the data state
// //   //       // console.log(updatedData);

// //   //       setEditProduct(null); // Clear the edit state
// //   //       setIsEditModalOpen(false); // Close the Edit Modal

// //   //       // Reopen the Detail Modal with the updated data
// //   //       setTimeout(() => {
// //   //         setIsModalOpen(true); // Reopen the detail modal
// //   //         setSelectedProduct(updatedUser); // Set the updated user to detail modal
// //   //       }, 100); // A short delay to ensure the modal closes and reopens with updated state
// //   //     }
// //   //     } catch (error) {
// //   //       console.error('Error saving user:', error);
// //   //     }
// //   //   }

// //   //   setIsSaveConfirmationOpen(false); // Close the save confirmation modal
// //   // };


// //   // Confirm Discard changes
// //   const handleDiscardConfirm = () => {
// //     setEditProduct(null); // Clear the edit state
// //     setIsEditModalOpen(false); // Close the Edit Modal
// //     setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal
// //   };

// //   const handleDiscardCancel = () => {
// //     setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal without any action
// //   };




// //   return (
// //     // <div className="py-4 px-4 bg-white">
// //     //   {/* Table wrapper */}
// //     //   <div className="overflow-hidden">
// //     //     <table className="w-full table-auto table-layout-fixed">
// //     //       <thead className="sticky top-0 bg-white z-10">
// //     //         {/* Header rows */}
// //     //         {table.getHeaderGroups().map(headerGroup => (
// //     //           <div key={headerGroup.id} style={{
// //     //             width: 1199,
// //     //             height: 96,
// //     //             gap: '24px',
// //     //             borderRadius: '8.47px',
// //     //             padding: '8px 12px 8px 12px',    //Top, Right, Bottom, Left (clockwise)
// //     //           }}
// //     //           >

// //     //             <tr key={headerGroup.id}>
// //     //               {headerGroup.headers.map(header => (
// //     //                 <th
// //     //                   key={header.id}
// //     //                   className={`
// //     //                 ${header.id === 'no' ? 'w-20 h-16 text-left' : ''}
// //     //                 ${header.id === 'image' ? 'w-80 h-16 text-left' : ''}
// //     //                 ${header.id === 'brochure' ? 'w-55 h-16 text-left' : ''}
// //     //                 ${header.id === 'productname' ? 'w-47 h-32 text-left break-words' : ''}
// //     //                 ${header.id === 'category' ? 'w-75 h-16 text-left ' : ''}
// //     //                 ${header.id === 'customerprice' ? 'w-80 h-32 opacity-72 text-left break-words' : ''}
// //     //                 ${header.id === 'resellerprice' ? 'w-80 h-32 text-left break-words' : ''}
// //     //                 ${header.id === 'description' ? 'w-176 h-16 text-left' : ''}
// //     //                 ${header.id === 'videotutorial' ? 'w-70 h-32 text-left break-words' : ''}
// //     //                 ${header.id === 'deleted' ? 'w-47 h-16 text-left' : ''}
// //     //                 ${header.id === 'UpdateImage' ? 'w-114 h-16 text-left' : ''}
// //     //                 ${header.id === 'Action' ? 'w-82 h-16 text-left' : ''}
// //     //               `}
// //     //                 >
// //     //                   {header.isPlaceholder
// //     //                     ? null
// //     //                     : flexRender(header.column.columnDef.header, header.getContext())}
// //     //                 </th>
// //     //               ))}
// //     //             </tr>
// //     //           </div>
// //     //         ))}
// //     //       </thead>
// //     //     </table>

// //     //     {/* Scrollable tbody wrapper */}
// //     //     <div className="h-96 overflow-y-auto"
// //     //       style={{
// //     //         /* For Firefox */
// //     //         scrollbarWidth: 'none',

// //     //         /* For Chrome, Safari, and Opera */
// //     //         WebkitOverflowScrolling: 'touch',
// //     //       }}
// //     //     >
// //     //       <table className="w-full table-auto table-layout-fixed">
// //     //         <tbody>
// //     //           {/* Body rows */}
// //     //           {table.getRowModel().rows.map(row => (
// //     //             //  <div key={row.id} className="border-2 rounded-md mb-20">
// //     //             <tr key={row.id} className="border-2 rounded-md mb-2">
// //     //                 {row.getVisibleCells().map(cell => (
// //     //                   <td
// //     //                     key={cell.id}
// //     //                     className={`
// //     //                  ${cell.column.id === 'no' ? 'w-20 h-16 text-left' : ''}
// //     //                 ${cell.column.id === 'image' ? 'w-80 h-16 text-left' : ''}
// //     //                 ${cell.column.id === 'brochure' ? 'w-55 h-16 text-left' : ''}
// //     //                 ${cell.column.id === 'productname' ? 'w-47 h-32 text-left break-words' : ''}
// //     //                 ${cell.column.id === 'category' ? 'w-75 h-16 text-left ' : ''}
// //     //                 ${cell.column.id === 'customerprice' ? 'w-80 h-32 opacity-72 text-left break-words' : ''}
// //     //                 ${cell.column.id === 'resellerprice' ? 'w-80 h-32 text-left break-words' : ''}
// //     //                 ${cell.column.id === 'description' ? 'w-176 h-16 text-left' : ''}
// //     //                 ${cell.column.id === 'videotutorial' ? 'w-70 h-32 text-left break-words' : ''}
// //     //                 ${cell.column.id === 'deleted' ? 'w-47 h-16 text-left' : ''}
// //     //                 ${cell.column.id === 'UpdateImage' ? 'w-114 h-16 text-left' : ''}
// //     //                 ${cell.column.id === 'Action' ? 'w-82 h-16 text-left' : ''}
// //     //                 `}
// //     //                   >
// //     //                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //     //                   </td>
// //     //                 ))}
// //     //               </tr>
// //     //             //  </div>
// //     //           ))}
// //     //         </tbody>
// //     //       </table>
// //     //     </div>
// //     //   </div>

// //   //   <div className="py-4 px-4 bg-white">
// //   // {/* Table wrapper */}
// //   // <div className="overflow-hidden">
// //   //   <table className="w-full table-auto table-layout-fixed">
// //   //     <thead className="sticky top-0 bg-red-900 z-10">
// //   //       {/* Header rows */}
// //   //       {table.getHeaderGroups().map(headerGroup => (
// //   //         <tr key={headerGroup.id}>
// //   //           {headerGroup.headers.map(header => (
// //   //             <th
// //   //               key={header.id}
// //   //               className={`
// //   //                 ${header.id === 'no' ? 'w-20 h-16 text-left' : ''}
// //   //                 ${header.id === 'image' ? 'w-80 h-16 text-left' : ''}
// //   //                 ${header.id === 'brochure' ? 'w-55 h-16 text-left' : ''}
// //   //                 ${header.id === 'productname' ? 'w-47 h-32 text-left break-words' : ''}
// //   //                 ${header.id === 'category' ? 'w-75 h-16 text-left ' : ''}
// //   //                 ${header.id === 'customerprice' ? 'w-80 h-32 opacity-72 text-left break-words' : ''}
// //   //                 ${header.id === 'resellerprice' ? 'w-80 h-32 text-left break-words' : ''}
// //   //                 ${header.id === 'description' ? 'w-176 h-16 text-left' : ''}
// //   //                 ${header.id === 'videotutorial' ? 'w-70 h-32 text-left break-words' : ''}
// //   //                 ${header.id === 'deleted' ? 'w-47 h-16 text-left' : ''}
// //   //                 ${header.id === 'UpdateImage' ? 'w-114 h-16 text-left' : ''}
// //   //                 ${header.id === 'Action' ? 'w-82 h-16 text-left' : ''}
// //   //               `}
// //   //             >
// //   //               {header.isPlaceholder
// //   //                 ? null
// //   //                 : flexRender(header.column.columnDef.header, header.getContext())}
// //   //             </th>
// //   //           ))}
// //   //         </tr>
// //   //       ))}
// //   //     </thead>
// //   //   </table>

// //   //   {/* Scrollable tbody wrapper */}
// //   //   <div className="h-96 overflow-y-auto"
// //   //     style={{
// //   //       /* For Firefox */
// //   //       scrollbarWidth: 'none',

// //   //       /* For Chrome, Safari, and Opera */
// //   //       WebkitOverflowScrolling: 'touch',
// //   //     }}
// //   //   >
// //   //     <table className="w-full table-auto table-layout-fixed">
// //   //       <tbody>
// //   //         {/* Body rows */}
// //   //         {table.getRowModel().rows.map(row => (
// //   //           <tr key={row.id}>
// //   //             {/* Wrapper div to apply border-radius to each row */}
// //   //             <td colSpan={row.getVisibleCells().length}>
// //   //               <div className="border-2 rounded-md mb-2">
// //   //                 <table className="w-full table-auto table-layout-fixed">
// //   //                   <tbody>
// //   //                   <tr >
// //   //                     {row.getVisibleCells().map(cell => (
// //   //                         <td
// //   //                           key={cell.id}
// //   //                           className={`
// //   //                             ${cell.column.id === 'no' ? 'w-20 h-16 text-left px-2' : ''}
// //   //                             ${cell.column.id === 'image' ? 'w-80 h-16 text-left' : ''}
// //   //                             ${cell.column.id === 'brochure' ? 'w-55 h-16 text-left' : ''}
// //   //                             ${cell.column.id === 'productname' ? 'w-47 h-32 text-left break-words' : ''}
// //   //                             ${cell.column.id === 'category' ? 'w-75 h-16 text-left ' : ''}
// //   //                             ${cell.column.id === 'customerprice' ? 'w-80 h-32 opacity-72 text-left break-words' : ''}
// //   //                             ${cell.column.id === 'resellerprice' ? 'w-80 h-32 text-left break-words' : ''}
// //   //                             ${cell.column.id === 'description' ? 'w-176 h-16 text-left' : ''}
// //   //                             ${cell.column.id === 'videotutorial' ? 'w-70 h-32 text-left break-words' : ''}
// //   //                             ${cell.column.id === 'deleted' ? 'w-47 h-16 text-left' : ''}
// //   //                             ${cell.column.id === 'UpdateImage' ? 'w-114 h-16 text-left' : ''}
// //   //                             ${cell.column.id === 'Action' ? 'w-82 h-16 text-left' : ''}
// //   //                           `}
// //   //                         >
// //   //                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //   //                         </td>
// //   //                       ))}
// //   //                     </tr>
// //   //                   </tbody>
// //   //                 </table>
// //   //               </div>
// //   //             </td>
// //   //           </tr>
// //   //         ))}
// //   //       </tbody>
// //   //     </table>
// //   //   </div>
// //   // </div>

// //   // <div className="mt-20"  >
// //   // {/* Table wrapper */}
// //   // <div className="overflow-hidden">
// //   //   <table className="w-full table-auto table-layout-fixed">
// //   //     <thead className="sticky top-0  z-10">
// //   //       {/* Header rows */}
// //   //       {table.getHeaderGroups().map(headerGroup => (
// //   //         <tr key={headerGroup.id}>
// //   //           {/* Wrapper div to apply border-radius to each header cell */}
// //   //           <td colSpan={headerGroup.headers.length}>
// //   //             <div className=" bg-white rounded-md mb-2 py-2">
// //   //               <table className="w-full table-auto table-layout-fixed">
// //   //                 <thead className="">
// //   //                   <tr className="">
// //   //                     {headerGroup.headers.map(header => (
// //   //                       <th
// //   //                         key={header.id}
// //   //                         className={`
// //   //                             ${header.id === 'no' ? ' w-10 h-20 bg-green-900 text-left  text-xs px-2' : ''} 
// //   //                             ${header.id === 'image' ? 'w-20 h-20 bg-red-900 text-left text-xs px-2' : ''} 
// //   //                             ${header.id === 'brochure' ? 'w-22 h-20  bg-green-900 text-left  text-xs px-2 ' : ''} 
// //   //                             ${header.id === 'productname' ? 'w-22 h-20  bg-blue-900 text-left text-xs break-words px-2 ' : ''  } 
// //   //                             ${header.id === 'category' ? 'w-22 h-20  bg-green-900  text-left  text-xs px-2 ' : ' '} 
// //   //                             ${header.id === 'customerprice' ? 'w-30 h-20  bg-red-900 opacity-72 text-left  text-xs break-words px-2 ' : ''} 
// //   //                             ${header.id === 'resellerprice' ? 'w-30 h-20   bg-green-900 text-left  text-xs break-words px-2 ' : ''} 
// //   //                             ${header.id === 'description' ? 'w-54 h-20  bg-blue-900 text-left  text-xs break-words px-2 ' : ''} 
// //   //                             ${header.id === 'videotutorial' ? 'w-18 h-20   bg-green-900 text-left  text-xs break-words  px-2' : ''} 
// //   //                             ${header.id === 'deleted' ? 'w-18 h-20  bg-red-900 text-left px-2 ' : ''} 
// //   //                             ${header.id === 'UpdateImage' ? 'w-34 h-20  bg-green-900 text-left px-2 ' : ''} 
// //   //                             ${header.id === 'Action' ? ' w-12 h-20  bg-blue-900 text-left px-2 ' : ''}                            
// //   //                             `}
// //   //                       >
// //   //                         {header.isPlaceholder
// //   //                           ? null
// //   //                           : flexRender(header.column.columnDef.header, header.getContext())}
// //   //                       </th>
// //   //                     ))}
// //   //                   </tr>
// //   //                 </thead>
// //   //               </table>
// //   //             </div>
// //   //           </td>
// //   //         </tr>
// //   //       ))}
// //   //     </thead>
// //   //   </table>

// //   //   {/* Scrollable tbody wrapper */}
// //   //   <div className="h-96 overflow-y-auto"
// //   //     style={{
// //   //       /* For Firefox */
// //   //       scrollbarWidth: 'none',

// //   //       /* For Chrome, Safari, and Opera */
// //   //       WebkitOverflowScrolling: 'touch',
// //   //     }}
// //   //   >
// //   //     <table className="w-full table-auto table-layout-fixed">
// //   //       <tbody>
// //   //         {/* Body rows */}
// //   //         {table.getRowModel().rows.map(row => (
// //   //           <tr key={row.id}>
// //   //             {/* Wrapper div to apply border-radius to each row */}
// //   //             <td colSpan={row.getVisibleCells().length}>
// //   //               <div className=" bg-white rounded-md mb-2 py-2">
// //   //                 <table className="w-full table-auto table-layout-fixed ">
// //   //                   <tbody>
// //   //                     <tr className=""> {/* Add gap-x for horizontal gap */}
// //   //                       {row.getVisibleCells().map(cell => (
// //   //                         <td
// //   //                           key={cell.id}
// //   //                           className={`
// //   //                             ${cell.column.id === 'no' ? ' w-10 h-20 bg-green-900 text-left  text-xs px-2' : ''} 
// //   //                             ${cell.column.id === 'image' ? 'w-20 h-20 bg-red-900 text-left text-xs px-2' : ''} 
// //   //                             ${cell.column.id === 'brochure' ? 'w-22 h-20  bg-green-900 text-left  text-xs px-2 ' : ''} 
// //   //                             ${cell.column.id === 'productname' ? 'w-22 h-20  bg-blue-900 text-left text-xs break-words px-2 ' : ''  } 
// //   //                             ${cell.column.id === 'category' ? 'w-22 h-20  bg-green-900  text-left  text-xs px-2 ' : ' '} 
// //   //                             ${cell.column.id === 'customerprice' ? 'w-30 h-20  bg-red-900 opacity-72 text-left  text-xs break-words px-2 ' : ''} 
// //   //                             ${cell.column.id === 'resellerprice' ? 'w-30 h-20   bg-green-900 text-left  text-xs break-words px-2 ' : ''} 
// //   //                             ${cell.column.id === 'description' ? 'w-54 h-20  bg-blue-900 text-left  text-xs break-words px-2 ' : ''} 
// //   //                             ${cell.column.id === 'videotutorial' ? 'w-18 h-20   bg-green-900 text-left  text-xs break-words  px-2' : ''} 
// //   //                             ${cell.column.id === 'deleted' ? 'w-18 h-20  bg-red-900 text-left px-2 ' : ''} 
// //   //                             ${cell.column.id === 'UpdateImage' ? 'w-34 h-20  bg-green-900 text-left px-2 ' : ''} 
// //   //                             ${cell.column.id === 'Action' ? ' w-12 h-20  bg-blue-900 text-left px-2 ' : ''}        
// //   //                           `}
// //   //                         >
// //   //                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //   //                         </td>
// //   //                       ))}
// //   //                     </tr>
// //   //                   </tbody>
// //   //                 </table>
// //   //               </div>
// //   //             </td>
// //   //           </tr>
// //   //         ))}
// //   //       </tbody>
// //   //     </table>
// //   //   </div>
// //   // </div>

// //   <div className="mt-20">
// //   {/* Table wrapper */}
// //   <div className="overflow-hidden">
// //     <table className="w-full table-auto table-layout-fixed">
     
// //       {/* <thead className="sticky top-0 z-10"> */}
// //        {/* Header rows */}
// //         {/* {table.getHeaderGroups().map(headerGroup => (
// //           <tr key={headerGroup.id}> */}
// //             {/* Wrapper div to apply border-radius to each header cell */}
// //             {/* <td colSpan={headerGroup.headers.length}>
// //               <div className="bg-white rounded-md mb-2 py-2 ">
// //                 <table className="w-full table-auto table-layout-fixed">
// //                   <thead className="">
// //                     <tr className="">
// //                       {headerGroup.headers.map(header => (
// //                         <th
// //                           key={header.id}
// //                           className={`
// //                             ${header.id === 'no' ? 'w-[3%] h-20 bg-green-900 text-left text-xs px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'image' ? 'w-[8%] h-20 bg-red-900 text-left text-xs px-2 ' : ''}
// //                             ${header.id === 'brochure' ? 'w-[7%] h-20 bg-green-900 text-left text-xs px-2' : ''}
// //                             ${header.id === 'productname' ? 'w-[8%] h-20 bg-blue-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'category' ? 'w-[8%] h-20 bg-green-900 text-left text-xs px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'customerprice' ? 'w-[8%] h-20 bg-red-900 opacity-72 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'resellerprice' ? 'w-[8%] h-20 bg-green-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'description' ? 'w-[14%] h-20 bg-blue-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'videotutorial' ? ' h-[8%] bg-green-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'deleted' ? 'w-[7%] h-20 bg-red-900 text-left px-2' : ''}
// //                             ${header.id === 'UpdateImage' ? 'w-[12%] h-20 bg-green-900 text-left px-2' : ''}
// //                             ${header.id === 'Action' ? 'w-[9%] h-20 bg-blue-900 text-left px-2' : ''}
// //                           `}
// //                         >
// //                           {header.isPlaceholder
// //                             ? null
// //                             : flexRender(header.column.columnDef.header, header.getContext())}
// //                         </th>
// //                       ))}
// //                     </tr>
// //                   </thead>
// //                 </table>
// //               </div>
// //             </td>
// //           </tr>
// //         ))}
// //       </thead> */}
// //       <thead>
// //         {/* Body rows */}
       
// //             {table.getHeaderGroups().map(headerGroup => (
// //           <tr key={headerGroup.id}>
// //             {/* Wrapper div to apply border-radius to each header cell */}
// //             <td colSpan={headerGroup.headers.length}>
// //               <div className="bg-white rounded-md mb-2 py-2 ">
// //                 <table className="w-full table-auto table-layout-fixed">
// //                   <thead>
// //                     <tr>
// //                     {headerGroup.headers.map(header => (
// //                         <td
// //                           key={header.id}
// //                           className={`
// //                             ${header.id === 'no' ? 'w-[3%] h-20 bg-green-900 text-left text-xs px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'image' ? 'w-[8%] h-20 bg-red-900 text-left text-xs px-2 ' : ''}
// //                             ${header.id === 'brochure' ? 'w-[7%] h-20 bg-green-900 text-left text-xs px-2' : ''}
// //                             ${header.id === 'productname' ? 'w-[8%] h-20 bg-blue-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'category' ? 'w-[8%] h-20 bg-green-900 text-left text-xs px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'customerprice' ? 'w-[8%] h-20 bg-red-900 opacity-72 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'resellerprice' ? 'w-[8%] h-20 bg-green-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'description' ? 'w-[14%] h-20 bg-blue-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'videotutorial' ? ' w-[8%] h-20 bg-green-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'deleted' ? 'w-[7%] h-20 bg-red-900 text-left px-2' : ''}
// //                             ${header.id === 'UpdateImage' ? 'w-[12%] h-20 bg-green-900 text-left px-2' : ''}
// //                             ${header.id === 'Action' ? 'w-[9%] h-20 bg-blue-900 text-left px-2' : ''}
// //                           `}
// //                         >
// //   {header.isPlaceholder
// //                             ? null
// //                             : flexRender(header.column.columnDef.header, header.getContext())}                        </td>
// //                       ))}
// //                     </tr>
// //                   </thead>
// //                 </table>
// //               </div>
// //             </td>
// //           </tr>
// //         ))}
// //       </thead>

// //       <tbody>
// //         {/* Body rows */}
// //         {table.getRowModel().rows.map(row => (
// //           <tr key={row.id}>
// //             {/* Wrapper div to apply border-radius to each row */}
// //             <td colSpan={row.getVisibleCells().length}>
// //               <div className="bg-white rounded-md mb-2 py-2 ">
// //                 <table className="w-full table-auto table-layout-fixed">
// //                   <tbody>
// //                     <tr>
// //                       {row.getVisibleCells().map(cell => (
// //                         <td
// //                           key={cell.id}
// //                           className={`
// //                             ${cell.column.id === 'no' ? 'w-[3%] h-20 bg-green-900 text-left text-xs px-2 overflow-y-auto' : ''}
// //                             ${cell.column.id === 'image' ? 'w-[8%] h-20 bg-red-900 text-left text-xs px-2 ' : ''}
// //                             ${cell.column.id === 'brochure' ? 'w-[7%] h-20 bg-green-900 text-left text-xs px-2' : ''}
// //                             ${cell.column.id === 'productname' ? 'w-[8%] h-20 bg-blue-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${cell.column.id === 'category' ? 'w-[8%] h-20 bg-green-900 text-left text-xs px-2 overflow-y-auto' : ''}
// //                             ${cell.column.id === 'customerprice' ? 'w-[8%] h-20 bg-red-900 opacity-72 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${cell.column.id === 'resellerprice' ? 'w-[8%] h-20 bg-green-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${cell.column.id === 'description' ? 'w-[14%] h-20 bg-blue-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${cell.column.id === 'videotutorial' ? ' w-[8%] h-20 bg-green-900 text-left text-xs break-words px-2 overflow-x-auto' : ''}
// //                             ${cell.column.id === 'deleted' ? 'w-[7%] h-20 bg-red-900 text-left px-2' : ''}
// //                             ${cell.column.id === 'UpdateImage' ? 'w-[12%] h-20 bg-green-900 text-left px-2' : ''}
// //                             ${cell.column.id === 'Action' ? 'w-[9%] h-20 bg-blue-900 text-left px-2' : ''}
// //                           `}
// //                         >
// //                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //                         </td>
// //                       ))}
// //                     </tr>
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </td>
// //           </tr>
// //         ))}
// //       </tbody>
// //       <thead>
// //         {/* Body rows */}
       
// //             {table.getHeaderGroups().map(headerGroup => (
// //           <tr key={headerGroup.id}>
// //             {/* Wrapper div to apply border-radius to each header cell */}
// //             <td colSpan={headerGroup.headers.length}>
// //               <div className="bg-white rounded-md mb-2 py-2 ">
// //                 <table className="w-full table-auto table-layout-fixed">
// //                   <thead>
// //                     <tr>
// //                     {headerGroup.headers.map(header => (
// //                         <td
// //                           key={header.id}
// //                           className={`
// //                             ${header.id === 'no' ? 'w-[3%] h-20 bg-green-900 text-left text-xs px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'image' ? 'w-[8%] h-20 bg-red-900 text-left text-xs px-2 ' : ''}
// //                             ${header.id === 'brochure' ? 'w-[7%] h-20 bg-green-900 text-left text-xs px-2' : ''}
// //                             ${header.id === 'productname' ? 'w-[8%] h-20 bg-blue-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'category' ? 'w-[8%] h-20 bg-green-900 text-left text-xs px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'customerprice' ? 'w-[8%] h-20 bg-red-900 opacity-72 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'resellerprice' ? 'w-[8%] h-20 bg-green-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'description' ? 'w-[14%] h-20 bg-blue-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'videotutorial' ? ' w-[8%] h-20 bg-green-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
// //                             ${header.id === 'deleted' ? 'w-[7%] h-20 bg-red-900 text-left px-2' : ''}
// //                             ${header.id === 'UpdateImage' ? 'w-[12%] h-20 bg-green-900 text-left px-2' : ''}
// //                             ${header.id === 'Action' ? 'w-[9%] h-20 bg-blue-900 text-left px-2' : ''}
// //                           `}
// //                         >
// //   {header.isPlaceholder
// //                             ? null
// //                             : flexRender(header.column.columnDef.header, header.getContext())}                        </td>
// //                       ))}


                      
// //                     </tr>
// //                   </thead>
// //                 </table>
// //               </div>
// //             </td>
// //           </tr>
// //         ))}
// //       </thead>

// //       <tbody>
// //   {/* Body rows */}
// //   {table.getRowModel().rows.map(row => (
// //     <tr key={row.id}>
// //       {/* Wrapper div to apply border-radius to each row */}
// //       <td colSpan={row.getVisibleCells().length}>
// //         <div className="bg-white rounded-md mb-2 py-2">
// //           <table className="w-full table-auto table-layout-fixed">
// //             <tbody>
// //               <tr>
// //                 {row.getVisibleCells().map(cell => (
// //                   <td
// //                     key={cell.id}
// //                     className={`
// //                       ${cell.column.id === 'no' ? 'w-[3%] h-16 bg-green-900 text-left text-xs p-2 overflow-y-auto' : ''}
// //                       ${cell.column.id === 'image' ? 'w-[8%] h-16 bg-red-900 text-left text-xs p-2' : ''}
// //                       ${cell.column.id === 'brochure' ? 'w-[6%] h-16 bg-green-900 text-left text-xs p-2' : ''}
// //                       ${cell.column.id === 'productname' ? 'w-[8%] h-16 bg-blue-900 text-left text-xs break-words p-2 overflow-y-auto' : ''}
// //                       ${cell.column.id === 'category' ? 'w-[9%] h-16 bg-green-900 text-left text-xs p-2 overflow-y-auto' : ''}
// //                       ${cell.column.id === 'customerprice' ? 'w-[9%] h-16 bg-red-900 opacity-72 text-left text-xs break-words p-2 overflow-y-auto' : ''}
// //                       ${cell.column.id === 'resellerprice' ? 'w-[9%] h-16 bg-green-900 text-left text-xs break-words p-2 overflow-y-auto' : ''}
// //                       ${cell.column.id === 'description' ? 'w-[14%] h-16 bg-blue-900 text-left text-xs break-words p-2 overflow-y-auto' : ''}
// //                       ${cell.column.id === 'videotutorial' ? 'w-[6%] h-16 bg-green-900 text-left text-xs p-2' : ''}
// //                       ${cell.column.id === 'deleted' ? 'w-[7%] h-16 bg-red-900 text-left p-2' : ''}
// //                       ${cell.column.id === 'UpdateImage' ? 'w-[12%] h-16 bg-green-900 text-left p-2' : ''}
// //                       ${cell.column.id === 'Action' ? 'w-[9%] h-16 bg-blue-900 text-left p-2' : ''}
// //                     `}
// //                   >
// //                     {cell.column.id === 'videotutorial' ? (
// //                       <div className="overflow-auto whitespace-nowrap max-w-full">
// //                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //                       </div>
// //                     ) : (                    <div className="max-h-20 overflow-y-auto">
// //                      { flexRender(cell.column.columnDef.cell, cell.getContext())}
// //                      </div>
// //                     )}
// //                   </td>
// //                 ))}
// //               </tr>
// //             </tbody>
// //           </table>
// //         </div>
// //       </td>
// //     </tr>
// //   ))}
// // </tbody>

// //     </table>
// //   </div>




// //       {/* Modal for product details */}

// //       {/* <Modal
// //   isOpen={isModalOpen}
// //   onClose={() => setIsModalOpen(false)}
// //   selectedProduct={selectedProduct}
// //   isEditing={false}  // Not in edit mode
// //   onEdit={() => {
// //     setEditProduct(selectedProduct);  // Set the product to edit
// //     setIsEditModalOpen(true);        // Open the edit modal
// //   }}
// //   // onSave={handleSaveConfirm}
// //   // onCancel={handleDiscardConfirm}
// //   setIsModalOpen={setIsModalOpen}  // Pass the setIsModalOpen function
// // /> */}



// //       {/* Edit Modal for editing user details */}
// //       {/* <EditModal
// //   isOpen={isEditModalOpen}
// //   onClose={closeModal}
// //   editProduct={editProduct}
// //   setEditProduct={setEditProduct}
// //   onSave={handleSaveClick} // Show Save confirmation modal
// //   onCancel={handleCancelClick} // Show Discard confirmation modal
// //   backendError={backendError}  // Pass backend error
// //   setBackendError={setBackendError}  // Pass function to reset the error
// // /> */}
// //       {/* Confirm Save Modal */}
// //       {/* <ConfirmSaveModal
// //   isOpen={isSaveConfirmationOpen}
// //   onClose={() => setIsSaveConfirmationOpen(false)} // Close the modal
// //   onSave={handleSaveConfirm} // Save the changes
// // /> */}

// //       {/* Discard Edit Modal */}
// //       <DiscardEditModal
// //         isOpen={isDiscardConfirmationOpen}
// //         onClose={() => setIsDiscardConfirmationOpen(false)} // Close the modal
// //         onDiscard={handleDiscardConfirm} // Discard the changes
// //       />



// //       {/* Status Switch Confirmation Modal */}
// //       {/* <StatusSwitchConfirmationModal
// //         isOpen={isStatusSwitchModalOpen}
// //         onCancel={closeStatusSwitchModal}
// //         onSwitch={switchStatus}
// //       /> */}
// //       <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

// //     </div>
// //   );
// // }

// // export default UserList;
// "use client";
// import React, { useState } from 'react';
// import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
// import CheckboxToggle from './buttons/toggle-button'; // Ensure this is correct path
// import PopupButton from './buttons/detail-button';
// import Modal from './popups/popup-detail';
// import StatusSwitchConfirmationModal from './popups/popup-togglestatus'; // Import the new modal
// import EditModal from './popups/popup-editProductList'; // Import the new EditModal component
// import ConfirmSaveModal from './popups/popup-saveedit';
// import DiscardEditModal from './popups/popup-discardedit';
// import { EditProductImage, EditProductList, EditUser, LoadProductList } from '@/data/services/productlist-service';
// import { Role, Status, Deleted } from '@/data/services/enum';
// import { ChangeStatus } from '@/data/services/productlist-service';
// import ExitModal from '../ExitModal';
// import { LoadPermissionsAuth } from '@/data/services/productlist-service';
// import { toast } from 'sonner';
// import Image from 'next/image';
// import UpdateImageButton from './buttons/updateimage-button';
// import { WidthSidebar } from '@/components/forms/DashboardPage';

// export type Person = {
//   id: number;
//   name: string; // Name will not be visible on the table but will be in the database
//   email: string;
//   // roles: Role;
//   roles: string;
//   status: Status;
//   boxColor: string;
//   roleColor: string;

// };

// export type ProductList = {

//   no: number;
//   image: string;
//   brochure: boolean;
//   productname: string;
//   category: string;
//   customerprice: string;
//   resellerprice: string;
//   description: string;
//   videotutorial: string;
//   deleted: Deleted;

// }

// export type EditProductList = {

//   no: number;
//   image: File;
//   brochure: boolean;
//   productname: string;
//   category: string;
//   customerprice: string;
//   resellerprice: string;
//   description: string;
//   videotutorial: string;
//   deleted: Deleted;

// }

// interface EditBackendErrorUser {
//   brochure: string;
//     productname: string;
//     category: string;
//     customerprice: string;
//     resellerprice: string;
//     description: string;
//     videotutorial: string
// }

// const columnHelper = createColumnHelper<ProductList>();

// interface UserListProps {
//   searchQuery: string;
//   roleFilter: string;
//   statusFilter: Status | undefined;
//   data: ProductList[];
//   setData: React.Dispatch<React.SetStateAction<ProductList[]>>;
//   selectedRows: Record<string, boolean>;  // Change to an object with row ids as keys
//   setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;  // Update state type to be an object
//   page: number;
//   pageSize: number;
// }

// function UserList({ searchQuery, roleFilter, statusFilter, data, setData, selectedRows, setSelectedRows, page, pageSize }: UserListProps) {
//   const [isModalOpen, setIsModalOpen] = React.useState(false);
//   const [selectedProduct, setSelectedProduct] = React.useState<ProductList | null>(null);  // New state to store selected product
//   const [isStatusSwitchModalOpen, setIsStatusSwitchModalOpen] = React.useState(false); // State for status switch modal
//   const [ProductToSwitch, setProductToSwitch] = React.useState<ProductList | null>(null); // Store product for status switch
//   const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);  // State for Edit Modal
  
//   const [isEditImageModalOpen, setIsEditImageModalOpen] = React.useState(false);  // State for Edit Modal
//   const [isEditProductModalOpen, setIsEditProductModalOpen] = React.useState(false);  // State for Edit Modal
//   const [isEditingImage, setIsEditingImage] = React.useState(false); // Add this state declaration
//   const [isEditingProduct, setIsEditingProduct] = React.useState(false); // Add this state declaration


//   const [editProduct, setEditProduct] = React.useState<EditProductList | null>(null); // Store the product to edit
//   const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = React.useState(false);
//   const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = React.useState(false);
//   const [isEditing, setIsEditing] = React.useState(false); // Add this state declaration
//   const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
//   const [ProductbackendError, setProductBackendError] = useState<EditBackendErrorUser>({
//     brochure: '',
//     productname: '',
//     category: '',
//     customerprice: '',
//     resellerprice: '',
//     description: '',
//     videotutorial: '',
//   });
//   const [ImagebackendError, setImageBackendError] = useState<{image:File}>({
//     image: new File([], ""), // placeholder File
   
//   });
//   const filteredData = React.useMemo(() => {
//     let filtered = data;

//     //   if (searchQuery) {
//     //     filtered = filtered.filter(product =>
//     //       product.email.toLowerCase().includes(searchQuery.toLowerCase())
//     //     );
//     //   }

//     //   if (roleFilter) {
//     //     filtered = filtered.filter(product => product.roles === roleFilter);
//     //   }

//     // // Filter by status
//     // if (statusFilter !== undefined) {
//     //   // Log the current value of statusFilter for debugging
//     //   // console.log("statusFilter value:", statusFilter);

//     //   // Determine the correct status based on the filter
//     //   const statusToFilter = statusFilter === 'Active' ? Status.Active : Status.Inactive;

//     //   // Log the status you want to filter by
//     //   // console.log("Filtering by status:", statusToFilter);

//     //   filtered = filtered.filter(product => {
//     //     // console.log("product.Status:", product.status);  // Log the product's actual status
//     //     return product.status === statusToFilter;
//     //   });
//     // }


//     return filtered;
//   }, [searchQuery, roleFilter, statusFilter, data]);

//   const columns = React.useMemo(() => [
//     // {
//     //   id: 'select',
//     //   header: ({ table }: { table: Table<any> }) => (
//     //     <input
//     //       type="checkbox"
//     //       checked={table.getIsAllRowsSelected()}
//     //       onChange={table.getToggleAllRowsSelectedHandler()}
//     //     />
//     //   ),
//     //   cell: ({ row }: { row: Row<any> }) => (
//     //     <input
//     //       type="checkbox"
//     //       checked={selectedRows[row.id] || false}  // Check selection based on selectedRows object
//     //       onChange={() => {
//     //         setSelectedRows(prev => {
//     //           const newSelectedRows = { ...prev };
//     //           if (newSelectedRows[row.id]) {
//     //             delete newSelectedRows[row.id];  // Deselect row
//     //           } else {
//     //             newSelectedRows[row.id] = true;  // Select row
//     //           }
//     //           return newSelectedRows;
//     //         });
//     //       }}
//     //     />
//     //   ),
//     // },



//     columnHelper.accessor('no', {
//       cell: info => info.getValue(),
//       header: () => <span>No</span>,
//       footer: info => info.column.id,
//     }),
//     // columnHelper.accessor('image', {
//     //   cell: info => info.getValue(),
//     //   header: () => <span>image</span>,
//     //   footer: info => info.column.id,
//     // }),

//     // columnHelper.accessor('image', {
//     //   cell: info => {
//     //     const image = info.getValue();
//     //     <Image src={data.image} alt="Logo" width={80} height={80} className="" />

//     //   },
//     //   header: () => <span>brochure</span>,
//     //   footer: info => info.column.id,
//     // }),
//     columnHelper.accessor('image', {
//       cell: info => {
//         const image = info.getValue(); // Get the image value from the column
//         return (
//           <Image
//             src={image} // Assuming 'image' is a URL or base64 string. Adjust accordingly if it’s different.
//             alt="Logo"
//             width={80}
//             height={80}
//             className="" // You can add any additional classes here if needed
//           />
//         );
//       },
//       header: () => <span>Image</span>,
//       footer: info => info.column.id,
//     }),

//     // columnHelper.accessor('brochure', {
//     //   cell: info => info.getValue(),
//     //   header: () => <span>brochure</span>,
//     //   footer: info => info.column.id,
//     // }),

//     columnHelper.accessor('brochure', {
//       cell: info => {
//         const brochure = info.getValue();
//         switch (brochure) {
//           case true:
//             return (
//               <div className=" flex justify-center ">
//                 <Image src="/images/vectortrue.png" alt="Logo" width={16.95} height={16.95} className="" />
//               </div>
//             )
//           case false:
//             return (
//               <div className="flex justify-center">
//                 <Image src="/images/vectorfalse.png" alt="Logo" width={16.95} height={16.95} className="" />
//               </div>
//             )
//           case undefined:
//             return null
//         }

//       },
//       header: () => <span>Brochure</span>,
//       footer: info => info.column.id,
//     }),

//     columnHelper.accessor('productname', {
//       cell: info => info.getValue(),
//       header: () => <span>Product Name</span>,
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor('category', {
//       cell: info => info.getValue(),
//       header: () => <span>Category</span>,
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor('customerprice', {
//       cell: info => info.getValue(),
//       header: () => <span>Price for Customer</span>,
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor('resellerprice', {
//       cell: info => info.getValue(),
//       header: () => <span>Price for Reseller</span>,
//       footer: info => info.column.id,
//     }),
//     // columnHelper.accessor('description', {
//     //   cell: info => info.getValue(),
//     //   header: () => <span>Description</span>,
//     //   footer: info => info.column.id,
//     // }),
//     columnHelper.accessor('description', {
//       cell: info => (
//         <div
//           style={{ maxHeight: '100px', overflowY: 'auto' }}
//           dangerouslySetInnerHTML={{ __html: info.getValue() }}
//         />
//       ),
//       header: () => <span>Description</span>,
//       footer: info => info.column.id,
//     }),
    
//     // columnHelper.accessor('videotutorial', {
//     //   cell: info => info.getValue(),
//     //   header: () => <span>videotutorial</span>,
//     //   footer: info => info.column.id,
//     // }),
//     columnHelper.accessor('videotutorial', {
//       cell: info => {
//         const url = info.getValue();
//         return (
//           <a
//             href={url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 hover:underline"
//           >
//             {url}
//           </a>
//         );
//       },
//       header: () => <span>Video Tutorial</span>,
//       footer: info => info.column.id,
//     }),

//     columnHelper.accessor('deleted', {
//       cell: info => info.getValue(),
//       header: () => <span>Deleted</span>,
//       footer: info => info.column.id,
//     }),

//     // columnHelper.accessor('roles', {
//     //   cell: info => {
//     //     const role = info.getValue();  // Get the role name from the row data
//     //     const rowData = info.row.original;  // Get the full row data
//     //     const { boxColor, roleColor } = rowData;  // Destructure backgroundColor and textColor from the row data

//     //     // Default styles
//     //     const roleboxColor = boxColor || '#FFFFFF';  // Default to white if no color is provided
//     //     const rolenameColor = roleColor || '#000000';  // Default to black if no color is provided

//     //     // Inline styles for dynamic background and text color
//     //     const roleStyle = {
//     //       backgroundColor: roleboxColor,
//     //       color: rolenameColor,
//     //     };

//     //     // Return the role name with inline styles
//     //     return (
//     //       <span
//     //         className="px-4 py-2 w-8/10 inline-block text-center rounded-md"
//     //         style={roleStyle}
//     //       >
//     //         {role}
//     //       </span>
//     //     );
//     //   },
//     //   header: () => <span>Role</span>,
//     //   footer: info => info.column.id,
//     // }),


//     // {
//     //   id: 'Deleted',
//     //   header: 'Deleted',
//     //   cell: ({ row }: { row: Row<ProductList> }) => {
//     //     const isActive = row.original.deleted === Deleted.Yes;  // Correctly compare with Status enum
//     //     const userId = row.original.no;

//     //     const handleToggleClick = () => {
//     //       setProductToSwitch(row.original);
//     //       setIsStatusSwitchModalOpen(true);
//     //     };

//     //     return (
//     //       <CheckboxToggle
//     //         isActive={isActive ? Status.Active : Status.Inactive}  // Correctly pass the status as enum
//     //         userId={userId}
//     //         onToggle={handleToggleClick}
//     //       />
//     //     );
//     //   },
//     // },

//     {
//       id: 'UpdateImage',
//       header: () => 'Update Image',
//       cell: ({ row }: { row: Row<any> }) => (
//         <UpdateImageButton onClick={() => openImageModal(row.original)} />
//       ),
//       footer: (info: { column: { id: string } }) => info.column.id,
//     },

//     {
//       id: 'Action',
//       header: () => 'Action',
//       cell: ({ row }: { row: Row<any> }) => (
//         <div className='flex items-center justify-between '
//           // style={{
//           //   width: 63.90513610839844,
//           //   height: 34.77203369140625,

//           // }}
//         >
//           <div>
//           <PopupButton onClick={() => openEditProductModal(row.original)} />
//           </div>
//             <div className=''>
//           <svg width="4" height="15" viewBox="0 0 4 15" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M1.90527 0.237488C2.3031 0.237488 2.68463 0.395523 2.96593 0.676828C3.24724 0.958132 3.40527 1.33966 3.40527 1.73749C3.40527 2.13531 3.24724 2.51684 2.96593 2.79815C2.68463 3.07945 2.3031 3.23749 1.90527 3.23749C1.50745 3.23749 1.12592 3.07945 0.844613 2.79815C0.563309 2.51684 0.405273 2.13531 0.405273 1.73749C0.405273 1.33966 0.563309 0.958132 0.844613 0.676828C1.12592 0.395523 1.50745 0.237488 1.90527 0.237488ZM1.90527 5.73749C2.3031 5.73749 2.68463 5.89552 2.96593 6.17683C3.24724 6.45813 3.40527 6.83966 3.40527 7.23749C3.40527 7.63531 3.24724 8.01684 2.96593 8.29815C2.68463 8.57945 2.3031 8.73749 1.90527 8.73749C1.50745 8.73749 1.12592 8.57945 0.844613 8.29815C0.563309 8.01684 0.405273 7.63531 0.405273 7.23749C0.405273 6.83966 0.563309 6.45813 0.844613 6.17683C1.12592 5.89552 1.50745 5.73749 1.90527 5.73749ZM3.40527 12.7375C3.40527 12.3397 3.24724 11.9581 2.96593 11.6768C2.68463 11.3955 2.3031 11.2375 1.90527 11.2375C1.50745 11.2375 1.12592 11.3955 0.844613 11.6768C0.563309 11.9581 0.405273 12.3397 0.405273 12.7375C0.405273 13.1353 0.563309 13.5168 0.844613 13.7981C1.12592 14.0795 1.50745 14.2375 1.90527 14.2375C2.3031 14.2375 2.68463 14.0795 2.96593 13.7981C3.24724 13.5168 3.40527 13.1353 3.40527 12.7375Z" fill="black" />
//           </svg>
//           </div>
//         </div>
//       ),
//       footer: (info: { column: { id: string } }) => info.column.id,
//     },
//   ], [data, selectedRows]);

//   const table = useReactTable({
//     data: filteredData, // Use filtered data
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     state: {
//       rowSelection: selectedRows,  // Pass the selected rows state (updated format)
//     },
//     onRowSelectionChange: setSelectedRows,  // Update selected rows when changed
//   });

//   const openModal = async (product: ProductList) => {
//     // // console.log('Selected product:', product); 
//     // setSelectedProduct(product);  // Set the selected product in the state
//     // setIsModalOpen(true);        // Open the modal
//     // setIsEditing(false);  // Initially, it's not editing

//     const responsepermission = await LoadPermissionsAuth();
//     if (responsepermission === undefined) {

//       setIsExitModalOpen(true); // Open the modal when the token is expired
//       toast.error(`Session Expired`, {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       });
//     } else if (responsepermission.includes("GET_USER")) {

//       setSelectedProduct(product);  // Set the selected product in the state
//       setIsModalOpen(true);        // Open the modal
//       setIsEditing(false);  // Initially, it's not editing   
//     }
//     else {
//       toast.error(`You dont have the permission to view detail`, {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       });

//       return null
//     }


//   };

//   const openImageModal = async (product: ProductList) => {
//     // // // console.log('Selected product:', product); 
//     // // setSelectedProduct(product);  // Set the selected product in the state
//     // // setIsModalOpen(true);        // Open the modal
//     // // setIsEditing(false);  // Initially, it's not editing

//     // const responsepermission = await LoadPermissionsAuth();
//     // if (responsepermission === undefined) {

//     //   setIsExitModalOpen(true); // Open the modal when the token is expired
//     //   toast.error(`Session Expired`, {
//     //     style: { backgroundColor: '#FF4D4D', color: 'white' },
//     //     position: 'top-center',
//     //     duration: 5000,
//     //   });
//     // } else if (responsepermission.includes("GET_USER")) {

//     //   setSelectedProduct(product);  // Set the selected product in the state
//     //   setIsModalOpen(true);        // Open the modal
//     //   setIsEditing(false);  // Initially, it's not editing   
//     // }
//     // else {
//     //   toast.error(`You dont have the permission to view detail`, {
//     //     style: { backgroundColor: '#FF4D4D', color: 'white' },
//     //     position: 'top-center',
//     //     duration: 5000,
//     //   });

//     //   return null
//     // }


//     setSelectedProduct(product);  // Set the selected product in the state
//     setIsEditImageModalOpen(true);        // Open the modal
//     setIsEditingImage(true);  // 


//   };

//   const openEditProductModal = async (product: ProductList) => {
//     console.log("testopen")
//     setSelectedProduct(product);  // Set the selected product in the state
//     setIsEditProductModalOpen(true);        // Open the modal
//     setIsEditingProduct(true);  // 
//     console.log("testopen2",isEditingProduct)


//   };

//   const handleSaveImageConfirm = async () => {
//     if (editProduct) {
//       try {
//         // Update the user on the backend
//         const updatedImage = await EditProductImage(editProduct.no, editProduct.image);
//         console.log("The new data:", updatedImage);


//         if (updatedImage?.zodErrorsusername){
//   // Handle backend errors by setting the error state
//           const errorMessageUsername = Array.isArray(updatedImage?.zodErrorsusername)
//             ? updatedImage?.zodErrorsusername.join(', ') // Join array if multiple errors
//             : updatedImage?.zodErrorsusername || '';

//           // Set backend errors
//           setImageBackendError({ image: errorMessageUsername,});
//           setIsSaveConfirmationOpen(false); // Close the save confirmation modal

//           return; // Stop further processing if there are backend errors

//         } else{


//         // Update the local data state with the new user information
//         // const updatedData = data.map(product =>
//         //   product.no === updatedImage.id ? { ...product, ...updatedImage } : product
//         // );
//         const updatedData = await LoadProductList(page, pageSize, searchQuery, roleFilter);

//         setData(updatedData); // Update the data state
//         // console.log(updatedData);

//         setEditProduct(null); // Clear the edit state
//         setIsEditImageModalOpen(false); // Close the Edit Modal

//         // // Reopen the Detail Modal with the updated data
//         // setTimeout(() => {
//         //   setIsModalOpen(true); // Reopen the detail modal
//         //   setSelectedProduct(updatedUser); // Set the updated user to detail modal
//         // }, 100); // A short delay to ensure the modal closes and reopens with updated state
//       }
//       } catch (error) {
//         console.error('Error saving user:', error);
//       }
//     }

//     setIsSaveConfirmationOpen(false); // Close the save confirmation modal
//   };


//   const handleSaveProductConfirm = async () => {
//     if (editProduct) {
//       try {
//         // Update the user on the backend
//         const updatedProductList = await EditProductList(editProduct.no, editProduct.brochure,
//           editProduct.productname,
//           editProduct.category,
//           editProduct.customerprice,
//           editProduct.resellerprice,
//           editProduct.description,
//           editProduct.videotutorial,);
//         console.log("The new data:", updatedProductList);


//         if (updatedProductList?.zodErrorsusername){
//   // Handle backend errors by setting the error state
//           const errorMessageUsername = Array.isArray(updatedProductList?.zodErrorsusername)
//             ? updatedProductList?.zodErrorsusername.join(', ') // Join array if multiple errors
//             : updatedProductList?.zodErrorsusername || '';

//           // Set backend errors
//           // setProductBackendError({ brochure: errorMessageUsername,});
//           setIsSaveConfirmationOpen(false); // Close the save confirmation modal

//           return; // Stop further processing if there are backend errors

//         } else{


//         // Update the local data state with the new user information
//         // const updatedData = data.map(product =>
//         //   product.no === updatedImage.id ? { ...product, ...updatedImage } : product
//         // );
//         const updatedData = await LoadProductList(page, pageSize, searchQuery, roleFilter);

//         setData(updatedData); // Update the data state
//         // console.log(updatedData);

//         setEditProduct(null); // Clear the edit state
//         setIsEditProductModalOpen(false); // Close the Edit Modal

//         // // Reopen the Detail Modal with the updated data
//         // setTimeout(() => {
//         //   setIsModalOpen(true); // Reopen the detail modal
//         //   setSelectedProduct(updatedUser); // Set the updated user to detail modal
//         // }, 100); // A short delay to ensure the modal closes and reopens with updated state
//       }
//       } catch (error) {
//         console.error('Error saving user:', error);
//       }
//     }

//     setIsSaveConfirmationOpen(false); // Close the save confirmation modal
//   };




//   const closeExitModal = () => {
//     setIsExitModalOpen(false);

//   };

//   const closeModal = () => {
//     setIsModalOpen(false);       // Close the modal
//     setSelectedProduct(null);     // Reset the selected product
//   };

//   const closeStatusSwitchModal = () => {
//     setIsStatusSwitchModalOpen(false); // Close the status switch modal
//     setProductToSwitch(null);           // Reset the product
//   };

//   // const switchStatus = async () => {
//   //   if (ProductToSwitch) {
//   //     // console.log("qwedws",ProductToSwitch)

//   //     try {
//   //       // Perform the status update on the backend
//   //       const updatedProduct = await ChangeStatus(ProductToSwitch.no, ProductToSwitch.deleted);

//   //       // Update the local data state with the updated product data
//   //     const updatedData = data.map(product =>
//   //       product.no === updatedProduct.id ? { ...product, status: updatedProduct.status } : product
//   //     );

//   //       setData(updatedData);  // Update the data state

//   //       closeStatusSwitchModal();  // Close the modal after switching status

//   //     } catch (error) {
//   //       console.error('Error updating status:', error);
//   //     }
//   //   }

//   // };


//   // Handle saving the changes
//   const handleSaveClick = () => {
//     setIsSaveConfirmationOpen(true); // Show the confirmation modal for saving
//   };

//   // Handle discarding the changes
//   const handleCancelClick = () => {
//     setIsDiscardConfirmationOpen(true); // Show the confirmation modal for discarding
//   };

//   // const handleSaveConfirm = async () => {
//   //   if (editProduct) {
//   //     try {
//   //       // Update the user on the backend
//   //       const updatedUser = await EditUser(editProduct.email, editProduct.name, editProduct.roles);
//   //       console.log("The new data:", updatedUser);


//   //       if (updatedUser?.zodErrorsusername){
//   // // Handle backend errors by setting the error state
//   //         const errorMessageUsername = Array.isArray(updatedUser?.zodErrorsusername)
//   //           ? updatedUser?.zodErrorsusername.join(', ') // Join array if multiple errors
//   //           : updatedUser?.zodErrorsusername || '';

//   //         // Set backend errors
//   //         setBackendError({ name: errorMessageUsername,});
//   //         setIsSaveConfirmationOpen(false); // Close the save confirmation modal

//   //         return; // Stop further processing if there are backend errors

//   //       } else{


//   //       // Update the local data state with the new user information
//   //       const updatedData = data.map(product =>
//   //         product.no === updatedUser.id ? { ...product, ...updatedUser } : product
//   //       );

//   //       setData(updatedData); // Update the data state
//   //       // console.log(updatedData);

//   //       setEditProduct(null); // Clear the edit state
//   //       setIsEditModalOpen(false); // Close the Edit Modal

//   //       // Reopen the Detail Modal with the updated data
//   //       setTimeout(() => {
//   //         setIsModalOpen(true); // Reopen the detail modal
//   //         setSelectedProduct(updatedUser); // Set the updated user to detail modal
//   //       }, 100); // A short delay to ensure the modal closes and reopens with updated state
//   //     }
//   //     } catch (error) {
//   //       console.error('Error saving user:', error);
//   //     }
//   //   }

//   //   setIsSaveConfirmationOpen(false); // Close the save confirmation modal
//   // };


//   // Confirm Discard changes
//   const handleDiscardConfirm = () => {
//     setEditProduct(null); // Clear the edit state
//     setIsEditModalOpen(false); // Close the Edit Modal
//     setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal
//   };

//   const handleDiscardCancel = () => {
//     setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal without any action
//   };




//   return (
//     // <div className="py-4 px-4 bg-white">
//     //   {/* Table wrapper */}
//     //   <div className="overflow-hidden">
//     //     <table className="w-full table-auto table-layout-fixed">
//     //       <thead className="sticky top-0 bg-white z-10">
//     //         {/* Header rows */}
//     //         {table.getHeaderGroups().map(headerGroup => (
//     //           <div key={headerGroup.id} style={{
//     //             width: 1199,
//     //             height: 96,
//     //             gap: '24px',
//     //             borderRadius: '8.47px',
//     //             padding: '8px 12px 8px 12px',    //Top, Right, Bottom, Left (clockwise)
//     //           }}
//     //           >

//     //             <tr key={headerGroup.id}>
//     //               {headerGroup.headers.map(header => (
//     //                 <th
//     //                   key={header.id}
//     //                   className={`
//     //                 ${header.id === 'no' ? 'w-20 h-16 text-left' : ''}
//     //                 ${header.id === 'image' ? 'w-80 h-16 text-left' : ''}
//     //                 ${header.id === 'brochure' ? 'w-55 h-16 text-left' : ''}
//     //                 ${header.id === 'productname' ? 'w-47 h-32 text-left break-words' : ''}
//     //                 ${header.id === 'category' ? 'w-75 h-16 text-left ' : ''}
//     //                 ${header.id === 'customerprice' ? 'w-80 h-32 opacity-72 text-left break-words' : ''}
//     //                 ${header.id === 'resellerprice' ? 'w-80 h-32 text-left break-words' : ''}
//     //                 ${header.id === 'description' ? 'w-176 h-16 text-left' : ''}
//     //                 ${header.id === 'videotutorial' ? 'w-70 h-32 text-left break-words' : ''}
//     //                 ${header.id === 'deleted' ? 'w-47 h-16 text-left' : ''}
//     //                 ${header.id === 'UpdateImage' ? 'w-114 h-16 text-left' : ''}
//     //                 ${header.id === 'Action' ? 'w-82 h-16 text-left' : ''}
//     //               `}
//     //                 >
//     //                   {header.isPlaceholder
//     //                     ? null
//     //                     : flexRender(header.column.columnDef.header, header.getContext())}
//     //                 </th>
//     //               ))}
//     //             </tr>
//     //           </div>
//     //         ))}
//     //       </thead>
//     //     </table>

//     //     {/* Scrollable tbody wrapper */}
//     //     <div className="h-96 overflow-y-auto"
//     //       style={{
//     //         /* For Firefox */
//     //         scrollbarWidth: 'none',

//     //         /* For Chrome, Safari, and Opera */
//     //         WebkitOverflowScrolling: 'touch',
//     //       }}
//     //     >
//     //       <table className="w-full table-auto table-layout-fixed">
//     //         <tbody>
//     //           {/* Body rows */}
//     //           {table.getRowModel().rows.map(row => (
//     //             //  <div key={row.id} className="border-2 rounded-md mb-20">
//     //             <tr key={row.id} className="border-2 rounded-md mb-2">
//     //                 {row.getVisibleCells().map(cell => (
//     //                   <td
//     //                     key={cell.id}
//     //                     className={`
//     //                  ${cell.column.id === 'no' ? 'w-20 h-16 text-left' : ''}
//     //                 ${cell.column.id === 'image' ? 'w-80 h-16 text-left' : ''}
//     //                 ${cell.column.id === 'brochure' ? 'w-55 h-16 text-left' : ''}
//     //                 ${cell.column.id === 'productname' ? 'w-47 h-32 text-left break-words' : ''}
//     //                 ${cell.column.id === 'category' ? 'w-75 h-16 text-left ' : ''}
//     //                 ${cell.column.id === 'customerprice' ? 'w-80 h-32 opacity-72 text-left break-words' : ''}
//     //                 ${cell.column.id === 'resellerprice' ? 'w-80 h-32 text-left break-words' : ''}
//     //                 ${cell.column.id === 'description' ? 'w-176 h-16 text-left' : ''}
//     //                 ${cell.column.id === 'videotutorial' ? 'w-70 h-32 text-left break-words' : ''}
//     //                 ${cell.column.id === 'deleted' ? 'w-47 h-16 text-left' : ''}
//     //                 ${cell.column.id === 'UpdateImage' ? 'w-114 h-16 text-left' : ''}
//     //                 ${cell.column.id === 'Action' ? 'w-82 h-16 text-left' : ''}
//     //                 `}
//     //                   >
//     //                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//     //                   </td>
//     //                 ))}
//     //               </tr>
//     //             //  </div>
//     //           ))}
//     //         </tbody>
//     //       </table>
//     //     </div>
//     //   </div>

//   //   <div className="py-4 px-4 bg-white">
//   // {/* Table wrapper */}
//   // <div className="overflow-hidden">
//   //   <table className="w-full table-auto table-layout-fixed">
//   //     <thead className="sticky top-0 bg-red-900 z-10">
//   //       {/* Header rows */}
//   //       {table.getHeaderGroups().map(headerGroup => (
//   //         <tr key={headerGroup.id}>
//   //           {headerGroup.headers.map(header => (
//   //             <th
//   //               key={header.id}
//   //               className={`
//   //                 ${header.id === 'no' ? 'w-20 h-16 text-left' : ''}
//   //                 ${header.id === 'image' ? 'w-80 h-16 text-left' : ''}
//   //                 ${header.id === 'brochure' ? 'w-55 h-16 text-left' : ''}
//   //                 ${header.id === 'productname' ? 'w-47 h-32 text-left break-words' : ''}
//   //                 ${header.id === 'category' ? 'w-75 h-16 text-left ' : ''}
//   //                 ${header.id === 'customerprice' ? 'w-80 h-32 opacity-72 text-left break-words' : ''}
//   //                 ${header.id === 'resellerprice' ? 'w-80 h-32 text-left break-words' : ''}
//   //                 ${header.id === 'description' ? 'w-176 h-16 text-left' : ''}
//   //                 ${header.id === 'videotutorial' ? 'w-70 h-32 text-left break-words' : ''}
//   //                 ${header.id === 'deleted' ? 'w-47 h-16 text-left' : ''}
//   //                 ${header.id === 'UpdateImage' ? 'w-114 h-16 text-left' : ''}
//   //                 ${header.id === 'Action' ? 'w-82 h-16 text-left' : ''}
//   //               `}
//   //             >
//   //               {header.isPlaceholder
//   //                 ? null
//   //                 : flexRender(header.column.columnDef.header, header.getContext())}
//   //             </th>
//   //           ))}
//   //         </tr>
//   //       ))}
//   //     </thead>
//   //   </table>

//   //   {/* Scrollable tbody wrapper */}
//   //   <div className="h-96 overflow-y-auto"
//   //     style={{
//   //       /* For Firefox */
//   //       scrollbarWidth: 'none',

//   //       /* For Chrome, Safari, and Opera */
//   //       WebkitOverflowScrolling: 'touch',
//   //     }}
//   //   >
//   //     <table className="w-full table-auto table-layout-fixed">
//   //       <tbody>
//   //         {/* Body rows */}
//   //         {table.getRowModel().rows.map(row => (
//   //           <tr key={row.id}>
//   //             {/* Wrapper div to apply border-radius to each row */}
//   //             <td colSpan={row.getVisibleCells().length}>
//   //               <div className="border-2 rounded-md mb-2">
//   //                 <table className="w-full table-auto table-layout-fixed">
//   //                   <tbody>
//   //                   <tr >
//   //                     {row.getVisibleCells().map(cell => (
//   //                         <td
//   //                           key={cell.id}
//   //                           className={`
//   //                             ${cell.column.id === 'no' ? 'w-20 h-16 text-left px-2' : ''}
//   //                             ${cell.column.id === 'image' ? 'w-80 h-16 text-left' : ''}
//   //                             ${cell.column.id === 'brochure' ? 'w-55 h-16 text-left' : ''}
//   //                             ${cell.column.id === 'productname' ? 'w-47 h-32 text-left break-words' : ''}
//   //                             ${cell.column.id === 'category' ? 'w-75 h-16 text-left ' : ''}
//   //                             ${cell.column.id === 'customerprice' ? 'w-80 h-32 opacity-72 text-left break-words' : ''}
//   //                             ${cell.column.id === 'resellerprice' ? 'w-80 h-32 text-left break-words' : ''}
//   //                             ${cell.column.id === 'description' ? 'w-176 h-16 text-left' : ''}
//   //                             ${cell.column.id === 'videotutorial' ? 'w-70 h-32 text-left break-words' : ''}
//   //                             ${cell.column.id === 'deleted' ? 'w-47 h-16 text-left' : ''}
//   //                             ${cell.column.id === 'UpdateImage' ? 'w-114 h-16 text-left' : ''}
//   //                             ${cell.column.id === 'Action' ? 'w-82 h-16 text-left' : ''}
//   //                           `}
//   //                         >
//   //                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//   //                         </td>
//   //                       ))}
//   //                     </tr>
//   //                   </tbody>
//   //                 </table>
//   //               </div>
//   //             </td>
//   //           </tr>
//   //         ))}
//   //       </tbody>
//   //     </table>
//   //   </div>
//   // </div>

//   // <div className="mt-20"  >
//   // {/* Table wrapper */}
//   // <div className="overflow-hidden">
//   //   <table className="w-full table-auto table-layout-fixed">
//   //     <thead className="sticky top-0  z-10">
//   //       {/* Header rows */}
//   //       {table.getHeaderGroups().map(headerGroup => (
//   //         <tr key={headerGroup.id}>
//   //           {/* Wrapper div to apply border-radius to each header cell */}
//   //           <td colSpan={headerGroup.headers.length}>
//   //             <div className=" bg-white rounded-md mb-2 py-2">
//   //               <table className="w-full table-auto table-layout-fixed">
//   //                 <thead className="">
//   //                   <tr className="">
//   //                     {headerGroup.headers.map(header => (
//   //                       <th
//   //                         key={header.id}
//   //                         className={`
//   //                             ${header.id === 'no' ? ' w-10 h-20 bg-green-900 text-left  text-xs px-2' : ''} 
//   //                             ${header.id === 'image' ? 'w-20 h-20 bg-red-900 text-left text-xs px-2' : ''} 
//   //                             ${header.id === 'brochure' ? 'w-22 h-20  bg-green-900 text-left  text-xs px-2 ' : ''} 
//   //                             ${header.id === 'productname' ? 'w-22 h-20  bg-blue-900 text-left text-xs break-words px-2 ' : ''  } 
//   //                             ${header.id === 'category' ? 'w-22 h-20  bg-green-900  text-left  text-xs px-2 ' : ' '} 
//   //                             ${header.id === 'customerprice' ? 'w-30 h-20  bg-red-900 opacity-72 text-left  text-xs break-words px-2 ' : ''} 
//   //                             ${header.id === 'resellerprice' ? 'w-30 h-20   bg-green-900 text-left  text-xs break-words px-2 ' : ''} 
//   //                             ${header.id === 'description' ? 'w-54 h-20  bg-blue-900 text-left  text-xs break-words px-2 ' : ''} 
//   //                             ${header.id === 'videotutorial' ? 'w-18 h-20   bg-green-900 text-left  text-xs break-words  px-2' : ''} 
//   //                             ${header.id === 'deleted' ? 'w-18 h-20  bg-red-900 text-left px-2 ' : ''} 
//   //                             ${header.id === 'UpdateImage' ? 'w-34 h-20  bg-green-900 text-left px-2 ' : ''} 
//   //                             ${header.id === 'Action' ? ' w-12 h-20  bg-blue-900 text-left px-2 ' : ''}                            
//   //                             `}
//   //                       >
//   //                         {header.isPlaceholder
//   //                           ? null
//   //                           : flexRender(header.column.columnDef.header, header.getContext())}
//   //                       </th>
//   //                     ))}
//   //                   </tr>
//   //                 </thead>
//   //               </table>
//   //             </div>
//   //           </td>
//   //         </tr>
//   //       ))}
//   //     </thead>
//   //   </table>

//   //   {/* Scrollable tbody wrapper */}
//   //   <div className="h-96 overflow-y-auto"
//   //     style={{
//   //       /* For Firefox */
//   //       scrollbarWidth: 'none',

//   //       /* For Chrome, Safari, and Opera */
//   //       WebkitOverflowScrolling: 'touch',
//   //     }}
//   //   >
//   //     <table className="w-full table-auto table-layout-fixed">
//   //       <tbody>
//   //         {/* Body rows */}
//   //         {table.getRowModel().rows.map(row => (
//   //           <tr key={row.id}>
//   //             {/* Wrapper div to apply border-radius to each row */}
//   //             <td colSpan={row.getVisibleCells().length}>
//   //               <div className=" bg-white rounded-md mb-2 py-2">
//   //                 <table className="w-full table-auto table-layout-fixed ">
//   //                   <tbody>
//   //                     <tr className=""> {/* Add gap-x for horizontal gap */}
//   //                       {row.getVisibleCells().map(cell => (
//   //                         <td
//   //                           key={cell.id}
//   //                           className={`
//   //                             ${cell.column.id === 'no' ? ' w-10 h-20 bg-green-900 text-left  text-xs px-2' : ''} 
//   //                             ${cell.column.id === 'image' ? 'w-20 h-20 bg-red-900 text-left text-xs px-2' : ''} 
//   //                             ${cell.column.id === 'brochure' ? 'w-22 h-20  bg-green-900 text-left  text-xs px-2 ' : ''} 
//   //                             ${cell.column.id === 'productname' ? 'w-22 h-20  bg-blue-900 text-left text-xs break-words px-2 ' : ''  } 
//   //                             ${cell.column.id === 'category' ? 'w-22 h-20  bg-green-900  text-left  text-xs px-2 ' : ' '} 
//   //                             ${cell.column.id === 'customerprice' ? 'w-30 h-20  bg-red-900 opacity-72 text-left  text-xs break-words px-2 ' : ''} 
//   //                             ${cell.column.id === 'resellerprice' ? 'w-30 h-20   bg-green-900 text-left  text-xs break-words px-2 ' : ''} 
//   //                             ${cell.column.id === 'description' ? 'w-54 h-20  bg-blue-900 text-left  text-xs break-words px-2 ' : ''} 
//   //                             ${cell.column.id === 'videotutorial' ? 'w-18 h-20   bg-green-900 text-left  text-xs break-words  px-2' : ''} 
//   //                             ${cell.column.id === 'deleted' ? 'w-18 h-20  bg-red-900 text-left px-2 ' : ''} 
//   //                             ${cell.column.id === 'UpdateImage' ? 'w-34 h-20  bg-green-900 text-left px-2 ' : ''} 
//   //                             ${cell.column.id === 'Action' ? ' w-12 h-20  bg-blue-900 text-left px-2 ' : ''}        
//   //                           `}
//   //                         >
//   //                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//   //                         </td>
//   //                       ))}
//   //                     </tr>
//   //                   </tbody>
//   //                 </table>
//   //               </div>
//   //             </td>
//   //           </tr>
//   //         ))}
//   //       </tbody>
//   //     </table>
//   //   </div>
//   // </div>

//   <div className={`mt-2`}>
//   {/* Table wrapper */}
//   <div className="overflow-hidden">
//     <table className="w-full table-auto table-layout-fixed">
     
//       {/* <thead className="sticky top-0 z-10"> */}
//        {/* Header rows */}
//         {/* {table.getHeaderGroups().map(headerGroup => (
//           <tr key={headerGroup.id}> */}
//             {/* Wrapper div to apply border-radius to each header cell */}
//             {/* <td colSpan={headerGroup.headers.length}>
//               <div className="bg-white rounded-md mb-2 py-2 ">
//                 <table className="w-full table-auto table-layout-fixed">
//                   <thead className="">
//                     <tr className="">
//                       {headerGroup.headers.map(header => (
//                         <th
//                           key={header.id}
//                           className={`
//                             ${header.id === 'no' ? 'w-[3%] h-20 bg-green-900 text-left text-xs px-2 overflow-y-auto' : ''}
//                             ${header.id === 'image' ? 'w-[8%] h-20 bg-red-900 text-left text-xs px-2 ' : ''}
//                             ${header.id === 'brochure' ? 'w-[7%] h-20 bg-green-900 text-left text-xs px-2' : ''}
//                             ${header.id === 'productname' ? 'w-[8%] h-20 bg-blue-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
//                             ${header.id === 'category' ? 'w-[8%] h-20 bg-green-900 text-left text-xs px-2 overflow-y-auto' : ''}
//                             ${header.id === 'customerprice' ? 'w-[8%] h-20 bg-red-900 opacity-72 text-left text-xs break-words px-2 overflow-y-auto' : ''}
//                             ${header.id === 'resellerprice' ? 'w-[8%] h-20 bg-green-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
//                             ${header.id === 'description' ? 'w-[14%] h-20 bg-blue-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
//                             ${header.id === 'videotutorial' ? ' h-[8%] bg-green-900 text-left text-xs break-words px-2 overflow-y-auto' : ''}
//                             ${header.id === 'deleted' ? 'w-[7%] h-20 bg-red-900 text-left px-2' : ''}
//                             ${header.id === 'UpdateImage' ? 'w-[12%] h-20 bg-green-900 text-left px-2' : ''}
//                             ${header.id === 'Action' ? 'w-[9%] h-20 bg-blue-900 text-left px-2' : ''}
//                           `}
//                         >
//                           {header.isPlaceholder
//                             ? null
//                             : flexRender(header.column.columnDef.header, header.getContext())}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                 </table>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </thead> */}
//     <thead>
//   {table.getHeaderGroups().map(headerGroup => (
//     <tr key={headerGroup.id}>
//       <td colSpan={headerGroup.headers.length}>
//         <div className="bg-white rounded-md mb-2 py-2 overflow-hidden">
//         <table className="table-fixed" style={{
//   width: `calc(100% - ${WidthSidebar}px)`,  // Adjust table width based on sidebar width
// }}>
//               <colgroup>
//               <col style={{ width: '40px' }} />
//               <col style={{ width: '80px' }} />
//               <col style={{ width: '90px' }} />
//               <col style={{ width: '80px' }} />
//               <col style={{ width: '90px' }} />
//               <col style={{ width: '100px' }} />
//               <col style={{ width: '100px' }} />
//               <col style={{ width: '180px' }} />
//               <col style={{ width: '120px' }} />
//               <col style={{ width: '70px' }} />
//               <col style={{ width: '130px' }} />
//               <col style={{ width: '60px' }} />
//             </colgroup>
//             <thead>
//               <tr>
//                 {headerGroup.headers.map(header => (
//                   <th key={header.id} className=" text-left text-xs px-2 py-2 text-black">
//                     <div className="max-h-20 overflow-y-auto overflow-hidden text-ellipsis break-words">
//                       {!header.isPlaceholder &&
//                         flexRender(header.column.columnDef.header, header.getContext())}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//           </table>
//         </div>
//       </td>
//     </tr>
//   ))}
// </thead>

// <tbody>
//   {table.getRowModel().rows.map(row => (
//     <tr key={row.id}>
//       <td colSpan={row.getVisibleCells().length}>
//         <div className="bg-white rounded-md mb-2 py-2 overflow-hidden">
//           <table className="table-fixed" style={{
//   width: `calc(100% - ${WidthSidebar}px)`,  // Adjust table width based on sidebar width
// }}>
//             <colgroup>
//               <col style={{ width: '40px' }} />
//               <col style={{ width: '80px' }} />
//               <col style={{ width: '90px' }} />
//               <col style={{ width: '80px' }} />
//               <col style={{ width: '90px' }} />
//               <col style={{ width: '100px' }} />
//               <col style={{ width: '100px' }} />
//               <col style={{ width: '180px' }} />
//               <col style={{ width: '120px' }} />
//               <col style={{ width: '70px' }} />
//               <col style={{ width: '130px' }} />
//               <col style={{ width: '60px' }} />
//             </colgroup>
//             <tbody>
//               <tr>
//                 {row.getVisibleCells().map(cell => (
//                   <td key={cell.id} className=" text-left text-xs px-2 py-2 text-black">
//                     <div className="max-h-20 overflow-y-auto overflow-hidden text-ellipsis break-words">
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </div>
//                   </td>
//                 ))}
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </td>
//     </tr>
//   ))}
// </tbody>


//     </table>
//   </div>




//       {/* Modal for product details */}

//       {/* <Modal
//   isOpen={isModalOpen}
//   onClose={() => setIsModalOpen(false)}
//   selectedProduct={selectedProduct}
//   isEditing={false}  // Not in edit mode
//   onEdit={() => {
//     setEditProduct(selectedProduct);  // Set the product to edit
//     setIsEditModalOpen(true);        // Open the edit modal
//   }}
//   // onSave={handleSaveConfirm}
//   // onCancel={handleDiscardConfirm}
//   setIsModalOpen={setIsModalOpen}  // Pass the setIsModalOpen function
// /> */}



//       {/* Edit Modal for editing user details */}
//       <EditModal
//   isOpen={isEditProductModalOpen}
//   onClose={closeModal}
//   editProduct={editProduct}
//   setEditProduct={setEditProduct}
//   onSave={handleSaveClick} // Show Save confirmation modal
//   onCancel={handleCancelClick} // Show Discard confirmation modal
//   backendError={ProductbackendError}  // Pass backend error
//   setBackendError={setProductBackendError}  // Pass function to reset the error
// />
//       {/* Confirm Save Modal */}
//       <ConfirmSaveModal
//   isOpen={isSaveConfirmationOpen}
//   onClose={() => setIsSaveConfirmationOpen(false)} // Close the modal
//   onSave={handleSaveImageConfirm} // Save the changes
// />

//       {/* Discard Edit Modal */}
//       <DiscardEditModal
//         isOpen={isDiscardConfirmationOpen}
//         onClose={() => setIsDiscardConfirmationOpen(false)} // Close the modal
//         onDiscard={handleDiscardConfirm} // Discard the changes
//       />



//       {/* Status Switch Confirmation Modal */}
//       {/* <StatusSwitchConfirmationModal
//         isOpen={isStatusSwitchModalOpen}
//         onCancel={closeStatusSwitchModal}
//         onSwitch={switchStatus}
//       /> */}
//       <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

//     </div>
//   );
// }

// export default UserList;
