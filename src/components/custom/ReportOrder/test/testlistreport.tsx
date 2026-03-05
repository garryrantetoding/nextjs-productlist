// "use client";
// import React, { useState } from 'react';
// import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
// import CheckboxToggle from './buttons/toggle-button'; // Ensure this is correct path
// import PopupButton from './buttons/detail-button';
// import StatusSwitchConfirmationModal from './popups/popup-togglestatus'; // Import the new modal
// import { Role, Status, Deleted } from '@/data/services/enum/enum';
// import { ChangeStatus } from '@/data/services/brother/productlist-service';
// import ExitModal from '../ExitModal';
// import { LoadPermissionsAuth } from '@/data/services/brother/productlist-service';
// import { toast } from 'sonner';
// import Image from 'next/image';
// import UpdateImageButton from './buttons/updateinvoice-button';
// import EditInvoiceModal from './popups/popup-edit/popup-editInvoice';
// import { EditReportOrderList, EditReportOrderImage, LoadReportOrderList } from '@/data/services/brother/reportorder-service';
// import EditReportOrderModal from './popups/popup-edit/popup-editReportOrderList';
// import ConfirmSaveModal from './popups/popup-edit/popup-saveedit';
// import DiscardEditModal from './popups/popup-edit/popup-discardedit';
// import { BuyerRoleEnum, CategoryEnum, OrderStatusEnum, PaymentStatusEnum, TaskStatusEnum } from '@/data/services/enum/reportorder-enum';

// export type ReportOrderList = {
//   // id: number;
//   // no: number;
//   // invoice: string;//image
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

//   id: number;
//   no: number;
//   // invoice: string;//image
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


//   // no: number;
//   date: string;
//   invoice: string;//image
//   invoiceNumber: string;
//   roles: BuyerRoleEnum;// deleted
//   category: CategoryEnum;// deleted
//   orderStatus: OrderStatusEnum;// deleted
//   paymentStatus: PaymentStatusEnum;// deleted
//   taskStatus: TaskStatusEnum;// deleted
//   notes: string;//productname

// }





// export type EditReportOrderList = {


//   id: number;
//   no: number;


//   // no: number;
//   date: string;
//   invoice: File | null ;//image
//   invoiceNumber: string;
//   roles: BuyerRoleEnum;// deleted
//   category: CategoryEnum;// deleted
//   orderStatus: OrderStatusEnum;// deleted
//   paymentStatus: PaymentStatusEnum;// deleted
//   taskStatus: TaskStatusEnum;// deleted
//   notes: string;//productname


// }

// interface EditBackendErrorReportOrder {


//   // invoiceNumber: string;
//   // roles: string;// deleted
//   // category: string;// deleted
//   orderStatus: string;// deleted
//   paymentStatus: string;// deleted
//   taskStatus: string;// deleted
//   notes: string;//productname

// }

// const columnHelper = createColumnHelper<ReportOrderList>();

// interface ResellerListProps {
//   invoiceNumberSearch: string;
//   rolesFilter: BuyerRoleEnum | BuyerRoleEnum.Empty;
//   taskStatusFilter: TaskStatusEnum | TaskStatusEnum.Empty;
//   orderStatusFilter: OrderStatusEnum | OrderStatusEnum.Empty;
//   startDate: string;
//   endDate: string;
//   statusFilter: Status | undefined;
//   data: ReportOrderList[];
//   setData: React.Dispatch<React.SetStateAction<ReportOrderList[]>>;
//   selectedRows: Record<string, boolean>;  // Change to an object with row ids as keys
//   setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;  // Update state type to be an object
//   page: number;
//   pageSize: number;
// }

// function ReportOrderList({ invoiceNumberSearch, rolesFilter, taskStatusFilter, orderStatusFilter, startDate, endDate, statusFilter, data, setData, selectedRows, setSelectedRows, page, pageSize }: ResellerListProps) {
//   const [selectedReportOrder, setSelectedReportOrder] = React.useState<EditReportOrderList | null>(null);  // New state to store selected reportorder
//   const [isEditImageModalOpen, setIsEditImageModalOpen] = React.useState(false);  // State for Edit Modal
//   const [isEditReportOrderModalOpen, setIsEditReportOrderModalOpen] = React.useState(false);  // State for Edit Modal
//   const [isEditingImage, setIsEditingImage] = React.useState(false); // Add this state declaration
//   const [isEditingReportOrder, setIsEditingReportOrder] = React.useState(false); // Add this state declaration
//   const [saveContext, setSaveContext] = useState<'reportorder' | 'invoice' | null>(null);

//   const [editReportOrder, setEditReportOrder] = React.useState<EditReportOrderList | null>(null); // Store the reportorder to edit
//   const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = React.useState(false);
//   const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = React.useState(false);
//   const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
//   const [ReportOrderBackendError, setReportOrderBackendError] = useState<EditBackendErrorReportOrder>({
//     // invoiceNumber: '',
//     // roles: '',// deleted
//     // category: '',// deleted
//     orderStatus: '',// deleted
//     paymentStatus: '',// deleted
//     taskStatus: '',// deleted
//     notes: '',//productname
//   });
//   const [ImagebackendError, setImageBackendError] = useState<{ invoice: string }>({
//     invoice: '', // placeholder File

//   });

//   const cleanCurrency = (value: string) => {
//     return value.replace(/[^\d]/g, ''); // Remove all non-digit characters
//   };

//   // const filteredData = React.useMemo(() => {
//   //   let filtered = data;


//   //   return filtered;
//   // }, [searchQuery, rolesFilter, statusFilter, data]);

//   React.useEffect(() => {
//     console.log("Data updated for table:", data);
//   }, [data]);





//   const openImageModal = async (reportorder: EditReportOrderList) => {


//     setSelectedReportOrder(reportorder);  // Set the selected reportorder in the state
//     // Convert to EditReportOrderList type and set
//     const convertedProduct: EditReportOrderList = {
//       ...reportorder,
//       roles: BuyerRoleEnum.Empty,// deleted
//       category: CategoryEnum.Empty,// deleted
//       orderStatus: OrderStatusEnum.Empty,// deleted
//       paymentStatus: PaymentStatusEnum.Empty,// deleted
//       taskStatus: TaskStatusEnum.Empty,// deleted

//       // Placeholder if not editing image
//     };

//     setEditReportOrder(convertedProduct); // <-- This was missing!

//     setIsEditImageModalOpen(true);        // Open the modal
//     setIsEditingImage(true);  // 


//   };

//   const openEditResellerModal = async (reportorder: EditReportOrderList) => {
//     console.log("testopen")
//     setSelectedReportOrder(reportorder);  // Set the selected reportorder in the state

//     // Convert to EditReportOrderList type and set
//     const convertedProduct: EditReportOrderList = {
//       ...reportorder,
//       // invoice: new File([], ''), // Placeholder if not editing image
//       invoice: null, // Placeholder if not editing image

//     };

//     setEditReportOrder(convertedProduct); // <-- This was missing!
//     setIsEditReportOrderModalOpen(true);        // Open the modal
//     setIsEditingReportOrder(true);  // 
//     console.log("testopen2", editReportOrder)


//   };

//   const handleSaveImageConfirm = async () => {
//     if (editReportOrder) {
//       try {
//         console.log("testedit", editReportOrder)

//         // Update the user on the backend
//         const updatedImage = await EditReportOrderImage(editReportOrder.id, editReportOrder.invoice);
//         console.log("The new data:", updatedImage);


//         if (updatedImage?.zodErrorsusername) {
//           // Handle backend errors by setting the error state
//           const errorMessageUsername = Array.isArray(updatedImage?.zodErrorsusername)
//             ? updatedImage?.zodErrorsusername.join(', ') // Join array if multiple errors
//             : updatedImage?.zodErrorsusername || '';

//           // Set backend errors
//           setImageBackendError({ invoice: errorMessageUsername, });
//           setIsSaveConfirmationOpen(false); // Close the save confirmation modal

//           return; // Stop further processing if there are backend errors

//         } else {


//           // Update the local data state with the new user information
//           // const updatedData = data.map(reportorder =>
//           //   reportorder.id === updatedImage.id ? { ...reportorder, ...updatedImage } : reportorder
//           // );
//           const updatedData = await LoadReportOrderList(page, pageSize, startDate, endDate, orderStatusFilter, taskStatusFilter, rolesFilter, invoiceNumberSearch,);

//           // setData(updatedData.data); // Update the data state
//           if (updatedData.empty) {
//             setData([]);

//           } else {

//             setData(updatedData.data.data); // Set the fetched data to state

//           }
//           // console.log(updatedData);

//           setEditReportOrder(null); // Clear the edit state
//           setIsEditImageModalOpen(false); // Close the Edit Modal

//           // // Reopen the Detail Modal with the updated data
//           // setTimeout(() => {
//           //   setIsModalOpen(true); // Reopen the detail modal
//           //   setSelectedReportOrder(updatedUser); // Set the updated user to detail modal
//           // }, 100); // A short delay to ensure the modal closes and reopens with updated state
//         }
//       } catch (error) {
//         console.error('Error saving user:', error);
//       }
//     }

//     setIsSaveConfirmationOpen(false); // Close the save confirmation modal
//   };

//   const handleSaveResellerConfirm = async () => {
//     if (editReportOrder) {
//       try {
//         console.log("testedit", editReportOrder)
//         // Update the user on the backend
//         // Then send these to your service
//         console.log("testpage", page, pageSize, invoiceNumberSearch, rolesFilter)

//         const updatedProductList = await EditReportOrderList(


//           editReportOrder.id,
//           // editReportOrder.no,
//           // editReportOrder.invoice,

//           editReportOrder.orderStatus,//customerprice
//           editReportOrder.paymentStatus,//resellerprice
//           editReportOrder.taskStatus,//description
//           editReportOrder.notes,//description


//         );
//         console.log("The new data 2:", updatedProductList);


//         if (updatedProductList?.zodErrorsusername) {
//           // Handle backend errors by setting the error state
//           const errorMessageUsername = Array.isArray(updatedProductList?.zodErrorsusername)
//             ? updatedProductList?.zodErrorsusername.join(', ') // Join array if multiple errors
//             : updatedProductList?.zodErrorsusername || '';

//           // Set backend errors
//           // setReportOrderBackendError({ brochure: errorMessageUsername,});
//           setIsSaveConfirmationOpen(false); // Close the save confirmation modal

//           return; // Stop further processing if there are backend errors

//         } else {


//           // Update the local data state with the new user information
//           // const updatedData = data.map(reportorder =>
//           //   reportorder.id === updatedImage.id ? { ...reportorder, ...updatedImage } : reportorder
//           // );
//           const updatedData = await LoadReportOrderList(page, pageSize, startDate, endDate, orderStatusFilter, taskStatusFilter, rolesFilter, invoiceNumberSearch,);
//           console.log("testdatapage", updatedData);

//           // setData(updatedData); // Update the data state
//           // setData(updatedData.data); //  NEW: Force a new reference
//           if (updatedData.empty) {
//             setData([]);

//           } else {

//             setData(updatedData.data.data); // Set the fetched data to state

//           }
//           setEditReportOrder(null); // Clear the edit state
//           setIsEditReportOrderModalOpen(false); // Close the Edit Modal

//           // // Reopen the Detail Modal with the updated data
//           // setTimeout(() => {
//           //   setIsModalOpen(true); // Reopen the detail modal
//           //   setSelectedReportOrder(updatedUser); // Set the updated user to detail modal
//           // }, 100); // A short delay to ensure the modal closes and reopens with updated state
//         }
//       } catch (error) {
//         console.error('Error saving user:', error);
//       }
//     }

//     setIsSaveConfirmationOpen(false); // Close the save confirmation modal
//   };


//   const closeExitModal = () => {
//     setIsExitModalOpen(false);

//   };
//   // Handle saving the changes
//   // const handleSaveClick = () => {
//   //   setIsSaveConfirmationOpen(true); // Show the confirmation modal for saving
//   // };

//   const handleSaveClick = (context: 'reportorder' | 'invoice') => {
//     setSaveContext(context); // Save what context we’re in
//     setIsSaveConfirmationOpen(true); // Then show confirmation modal
//   };


//   // Handle discarding the changes
//   const handleCancelClick = (context: 'reportorder' | 'invoice') => {
//     setSaveContext(context); // Save what context we’re in
//     setIsDiscardConfirmationOpen(true); // Show the confirmation modal for discarding
//   };


//   // Confirm Discard changes
//   const handleDiscardConfirm = () => {
//     setEditReportOrder(null); // Clear the edit state
//     if (saveContext === 'reportorder') {
//       setIsEditReportOrderModalOpen(false); // Close the Edit Modal
//     } else if (saveContext === 'invoice') {
//       setIsEditImageModalOpen(false);
//     }
//     setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal
//   };

//   const handleDiscardCancel = () => {
//     setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal without any action
//   };


//   const columns = React.useMemo(() => [


//     columnHelper.accessor('no', {
//       cell: info => info.getValue(),
//       header: () => <span>No</span>,
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor('date', {
//       cell: info => info.getValue(),
//       header: () => <span>Date</span>,
//       footer: info => info.column.id,
//     }),

//     columnHelper.accessor('invoice', {
//       cell: info => {
//         const image = info.getValue(); // Get the image value from the column
//         return (
//           // <Image
//           //   src={image} // Assuming 'invoice' is a URL or base64 string. Adjust accordingly if it’s different.
//           //   alt="Logo"
//           //   width={75}
//           //   height={75}
//           //   className="" // You can add any additional classes here if needed
//           // />
//           <a
//             // href={getImageSrc(reportOrder.invoice)}
//             href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`} // Assuming 'image' is a URL or base64 string. Adjust accordingly if it’s different.

//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block mt-2 text-blue-600 hover:underline text-sm"
//           >
//             Open File in New Tab
//           </a>
//         );
//       },
//       header: () => <span>Invoice</span>,
//       footer: info => info.column.id,
//     }),

//     columnHelper.accessor('invoiceNumber', {
//       cell: info => info.getValue(),
//       header: () => <span>Invoice Number</span>,
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor('roles', {
//       cell: info => info.getValue(),
//       header: () => <span>Roles</span>,
//       footer: info => info.column.id,
//     }),
//     columnHelper.accessor('category', {
//       cell: info => info.getValue(),
//       header: () => <span>Category</span>,
//       footer: info => info.column.id,
//     }),
//     // columnHelper.accessor('orderStatus', {
//     //   cell: info => info.getValue(),
//     //   header: () => <span>Order Status</span>,
//     //   footer: info => info.column.id,
//     // }),

//     columnHelper.accessor('orderStatus', {
//       cell: info => {
//         const orderStatus = info.getValue();  // Get the role name from the row data
//         // const rowData = info.row.original;  // Get the full row data
//         // const { boxColor, roleColor } = rowData;  // Destructure backgroundColor and textColor from the row data

//         // Default styles
//         // let roleboxColor = boxColor || '#FFFFFF';  // Default to white if no color is provided
//         // let rolenameColor = roleColor || '#000000';  // Default to black if no color is provided

//         let OrderBoxColor

//         let OrderName
//         // Inline styles for dynamic background and text color

//         // Empty = '',
//         // NEW = 'NEW',
//         // FINISH = 'FINISH',
//         // PROGRESS = 'PROGRESS',
//         // CANCEL = 'CANCEL',
//         switch (orderStatus) {
//           case 'NEW':
//             OrderBoxColor = '#2B67FF';
//             OrderName = 'New';

//             break;
//           case 'FINISH':
//             OrderBoxColor = ' #2EA00D';  // Green background 
//             OrderName = 'Finish';

//             break;
//           case 'PROGRESS':
//             OrderBoxColor = ' #FF9535';  // Orange background
//             OrderName = 'Progress';
//             break;
//           case 'CANCEL':
//             OrderBoxColor = ' ##C93405';  // Red background 
//             OrderName = 'Cancel';
//             break;
//           case '':
//             OrderBoxColor = '#ccc';  // Default to white if no color is provided
//             OrderName = 'Unknown';
//             break;
//         }

//         const OrderStatusStyle = {
//           backgroundColor: OrderBoxColor,
//           color: '#FFFFFF',
//           padding: '2px 0',
//           width: 76,
//           height: 20,
//           borderRadius: '7.42px', // Makes it round
//           display: 'inline-block',
//         };
//         // Return the role name with inline styles
//         return (
//           <span
//             className="text-center"
//             style={OrderStatusStyle}
//           >
//             {OrderName}
//           </span>
//         );
//       },
//       header: () => <span>Order Status</span>,
//       footer: info => info.column.id,
//     }),

//     // columnHelper.accessor('roles', {
//     //   cell: info => {
//     //     const role = info.getValue();  // Get the role value

//     //     // Map roles to colors and styling
//     //     let roleClass = 'px-4 py-2 w-8/10 inline-block  text-center rounded-md';  // Common styles for rounded container and padding

//     //     switch (role) {
//     //       case 'Owner':
//     //         roleClass += ' bg-blue-50 text-blue-500';  // Red background for Admin
//     //         break;
//     //       case 'Approver':
//     //         roleClass += ' bg-amber-50 text-amber-500';  // Blue background for User
//     //         break;
//     //       case 'Staff':
//     //         roleClass += ' bg-green-100 text-green-500';  // Green background for Guest
//     //     }

//     //     return <span className={roleClass}>{role}</span>;  // Render role inside a colored container
//     //   },
//     //   header: () => <span>Role</span>,
//     //   footer: info => info.column.id,


//     // }),
//     columnHelper.accessor('paymentStatus', {
//       cell: info => {
//         const raw = info.getValue() as string
//         const formatted =
//           raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
//         return formatted
//       },
//       header: () => <span>Payment Status</span>,
//       footer: info => info.column.id,
//     }),
//     // columnHelper.accessor('taskStatus', {
//     //   cell: info => info.getValue(),
//     //   header: () => <span>Task Status</span>,
//     //   footer: info => info.column.id,
//     // }),

//     columnHelper.accessor('taskStatus', {
//       cell: info => {
//         const taskStatus = info.getValue();  // Get the role name from the row data

//         let TaskBoxColor

//         let TaskName

//         switch (taskStatus) {
//           case 'WAITING':
//             TaskBoxColor = '#F19811';  // orange background 
//             TaskName = 'Waiting';

//             break;
//           case 'APPROVED':
//             TaskBoxColor = ' #2EA00D';  // green background 
//             TaskName = 'Approved';

//             break;
//           case 'COMPLETE':
//             TaskBoxColor = ' #2B67FF';  // blue background 
//             TaskName = 'Complete';
//             break;
//           case '':
//             TaskBoxColor = '#ccc';  // Default to white if no color is provided
//             TaskName = 'Unknown';
//             break;
//         }

//         // const TaskStatusStyle = {
//         //   backgroundColor: TaskBoxColor,
//         //   color: TaskNameColor,
//         //   width: 9,
//         //   height: 9,
//         // };
//         const TaskStatusStyle = {
//           backgroundColor: TaskBoxColor,
//           width: '9px',       // Set width and height as string with 'px'
//           height: '9px',
//           borderRadius: '50%', // Makes it round
//           display: 'inline-block',
//           flexShrink: 0,       // Prevent it from shrinking
//         };



//         // Map roles to colors and styling
//         // let roleClass = 'px-4 py-2 w-8/10 inline-block  text-center rounded-md';  // Common styles for rounded container and padding

//         // switch (taskStatus) {
//         //   case 'WAITING':
//         //     roleClass += ' bg-blue-50 text-blue-500';  // Red background for Admin
//         //     break;
//         //   case 'APPROVED':
//         //     roleClass += ' bg-amber-50 text-amber-500';  // Blue background for User
//         //     break;
//         //   case 'COMPLETE':
//         //     roleClass += ' bg-green-100 text-green-500';  // Green background for Guest
//         // }


//         // Return the role name with inline styles
//         return (
//           <div className='flex items-center justify-center gap-2'>
//             {/* <span
//             className="px-4 py-2 w-8/10 inline-block text-center rounded-md"
//             style={TaskStatusStyle}
//           >
//             {taskStatus}
//           </span> */}
//             <div style={TaskStatusStyle}
//             ></div>
//             <span>{TaskName}</span>
//           </div>
//           // <span className={roleClass}>{taskStatus}</span> // Render role inside a colored container


//         );
//         // const taskStatus = info.getValue();

//         //     let TaskBoxColor = '#ccc'; // default gray
//         //     let TaskNameColor = '#000';

//         //     switch (taskStatus) {
//         //       case 'WAITING':
//         //         TaskBoxColor = '#FFFFFF';
//         //         TaskNameColor = '#000000';
//         //         break;
//         //       case 'APPROVED':
//         //         TaskBoxColor = '#2EA00D';
//         //         TaskNameColor = '#FFFFFF';
//         //         break;
//         //       case 'COMPLETE':
//         //         TaskBoxColor = '#C93405'; // no double ##
//         //         TaskNameColor = '#FFFFFF';
//         //         break;
//         //     }

//         //     return (
//         //       <div className="flex items-center gap-2">
//         //         {/* Colored ball */}
//         //         <div
//         //           style={{
//         //             backgroundColor: TaskBoxColor,
//         //             width: '12px',
//         //             height: '12px',
//         //             borderRadius: '9999px',
//         //           }}
//         //         />
//         //         {/* Status text */}
//         //         <span style={{ color: TaskNameColor }}>{taskStatus || 'UNKNOWN'}</span>
//         //       </div>
//         // );
//       },
//       header: () => <span>Task Status</span>,
//       footer: info => info.column.id,
//     }),

//     // columnHelper.accessor('taskStatus', {
//     //   cell: info => {
//     //     const taskStatus = info.getValue();

//     //     let TaskBoxColor = '#ccc'; // default gray
//     //     let TaskNameColor = '#000';

//     //     switch (taskStatus) {
//     //       case 'WAITING':
//     //         TaskBoxColor = '#FFFFFF';
//     //         TaskNameColor = '#000000';
//     //         break;
//     //       case 'APPROVED':
//     //         TaskBoxColor = '#2EA00D';
//     //         TaskNameColor = '#FFFFFF';
//     //         break;
//     //       case 'COMPLETE':
//     //         TaskBoxColor = '#C93405'; // no double ##
//     //         TaskNameColor = '#FFFFFF';
//     //         break;
//     //     }

//     //     return (
//     //       <div className="flex items-center gap-2">
//     //         {/* Colored ball */}
//     //         <div
//     //           style={{
//     //             backgroundColor: TaskBoxColor,
//     //             width: '12px',
//     //             height: '12px',
//     //             borderRadius: '9999px',
//     //           }}
//     //         />
//     //         {/* Status text */}
//     //         <span style={{ color: TaskNameColor }}>{taskStatus || 'UNKNOWN'}</span>
//     //       </div>
//     //     );
//     //   },
//     // }),



//     // No date invoice invoice number roles category orderStatus paymentStatus taskStatus  

//     columnHelper.accessor('notes', {
//       cell: info => (
//         <div
//           style={{ maxHeight: '100px', overflowY: 'auto' }}
//           dangerouslySetInnerHTML={{ __html: info.getValue() }}
//         />
//       ),
//       header: () => <span>Notes</span>,
//       footer: info => info.column.id,
//     }),



//     // columnHelper.accessor('videotutorial', {
//     //   cell: info => {
//     //     const url = info.getValue();
//     //     return (
//     //       <a
//     //         href={url}
//     //         target="_blank"
//     //         rel="noopener noreferrer"
//     //         className="text-blue-600 hover:underline"
//     //       >
//     //         {url}
//     //       </a>
//     //     );
//     //   },
//     //   header: () => <span>Video Tutorial</span>,
//     //   footer: info => info.column.id,
//     // }),

//     {
//       id: 'Action',
//       header: () => 'Action',
//       cell: ({ row }: { row: Row<any> }) => (
//         <div className='flex items-center justify-between '
//         >
//           <div>
//             <PopupButton onClick={() => openEditResellerModal(row.original)} />
//           </div>
//           <div className=''>
//             <UpdateImageButton onClick={() => openImageModal(row.original)} />

//           </div>
//         </div>
//       ),
//       footer: (info: { column: { id: string } }) => info.column.id,
//     },
//   ], [data, selectedRows]);

//   const table = useReactTable({
//     // data: filteredData, // Use filtered data
//     data,

//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     state: {
//       rowSelection: selectedRows,  // Pass the selected rows state (updated format)
//     },
//     onRowSelectionChange: setSelectedRows,  // Update selected rows when changed
//   });


//   return (
//     <div className={`mt-2`}>
//       {/* Table wrapper */}
//       <div className="overflow-hidden">
//         <table className="w-full table-auto table-layout-fixed">

//           <thead>
//             {table.getHeaderGroups().map(headerGroup => (
//               <tr key={headerGroup.id}>
//                 <td colSpan={headerGroup.headers.length}>
//                   <div className="bg-white rounded-md mb-2 py-2 overflow-hidden">
//                     <table className="table-fixed" style={{
//                       width: '100%',  // Adjust table width based on sidebar width
//                     }}>
//                       {/* total width 1140px */}
//                       {/* <colgroup>
//                       <col style={{ width: '40px' }} />
//                         <col style={{ width: '80px' }} />
//                         <col style={{ width: '90px' }} />
//                         <col style={{ width: '150px' }} />
//                         <col style={{ width: '80px' }} />
//                         <col style={{ width: '105px' }} />
//                         <col style={{ width: '100px' }} />
//                         <col style={{ width: '90px'}} />
//                         <col style={{ width: '105px'  }} />
//                         <col style={{ width: '200px' }} />
//                         <col style={{ width: '100px' }} />
//                       </colgroup> */}
//                       <colgroup>
//                         <col style={{ width: `${(40 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(80 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(90 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(150 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(80 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(105 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(100 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(90 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(105 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(200 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(100 / 1140) * 100}%` }} />
//                       </colgroup>

//                       <thead>
//                         <tr>
//                           {headerGroup.headers.map(header => (
//                             <th key={header.id} className=" text-left text-xs px-2 py-2 text-black">
//                               <div className="max-h-20 overflow-y-auto overflow-hidden text-ellipsis break-words">
//                                 {!header.isPlaceholder &&
//                                   flexRender(header.column.columnDef.header, header.getContext())}
//                               </div>
//                             </th>
//                           ))}
//                         </tr>
//                       </thead>
//                     </table>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </thead>

//           <tbody>
//             {table.getRowModel().rows.map(row => (
//               <tr key={row.id}>
//                 <td colSpan={row.getVisibleCells().length} >
//                   <div className="bg-white rounded-md mb-2 py-2 overflow-hidden">
//                     <table className="table-fixed" style={{
//                       width: '100%',  // Adjust table width based on sidebar width
//                     }}>
//                       {/* total width 1140px */}
//                       <colgroup>
//                         <col style={{ width: `${(40 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(80 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(90 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(150 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(80 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(105 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(100 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(90 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(105 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(200 / 1140) * 100}%` }} />
//                         <col style={{ width: `${(100 / 1140) * 100}%` }} />
//                       </colgroup>

//                       <tbody>
//                         <tr>
//                           {row.getVisibleCells().map(cell => (
//                             <td key={cell.id} className=" text-left text-xs px-2 py-2 text-black">
//                               <div className="max-h-20 overflow-y-auto overflow-hidden text-ellipsis break-words">
//                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                               </div>
//                             </td>
//                           ))}
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>


//         </table>
//       </div>




//       {/* Modal for reportorder details */}

//       {/* <Modal
//   isOpen={isModalOpen}
//   onClose={() => setIsModalOpen(false)}
//   selectedReportOrder={selectedReportOrder}
//   isEditing={false}  // Not in edit mode
//   onEdit={() => {
//     setEditReportOrder(selectedReportOrder);  // Set the reportorder to edit
//     setIsEditModalOpen(true);        // Open the edit modal
//   }}
//   // onSave={handleSaveConfirm}
//   // onCancel={handleDiscardConfirm}
//   setIsModalOpen={setIsModalOpen}  // Pass the setIsModalOpen function
// /> */}



//       {/* Edit Modal for editing user details */}
//       <EditReportOrderModal
//         isOpen={isEditReportOrderModalOpen}
//         onClose={() => setIsEditReportOrderModalOpen(false)}
//         editReportOrder={editReportOrder}
//         setEditReportOrder={setEditReportOrder}
//         // onSave={handleSaveClick} // Show Save confirmation modal
//         onSave={() => handleSaveClick('reportorder')} // For editing reportorder
//         onCancel={() => handleCancelClick('reportorder')} // Show Discard confirmation modal
//         backendError={ReportOrderBackendError}  // Pass backend error
//         setBackendError={setReportOrderBackendError}  // Pass function to reset the error
//       />
//       {/* Confirm Save Modal */}
//       <ConfirmSaveModal
//         isOpen={isSaveConfirmationOpen}
//         onClose={() => setIsSaveConfirmationOpen(false)} // Close the modal
//         // onSave={handleSaveResellerConfirm} // Save the changes

//         onSave={() => {
//           if (saveContext === 'reportorder') {
//             handleSaveResellerConfirm();
//           } else if (saveContext === 'invoice') {
//             handleSaveImageConfirm();
//           }
//           setSaveContext(null); // Reset context after saving
//         }}

//       />

//       {/* Discard Edit Modal */}
//       <DiscardEditModal
//         isOpen={isDiscardConfirmationOpen}
//         onClose={() => setIsDiscardConfirmationOpen(false)} // Close the modal
//         onDiscard={handleDiscardConfirm} // Discard the changes
//       />

//       {/* Edit Image Modal Integration */}
//       {isEditImageModalOpen && selectedReportOrder && (
//         <EditInvoiceModal
//           isOpen={isEditImageModalOpen}
//           onClose={() => setIsEditImageModalOpen(false)} // Close modal on cancel
//           reportOrder={selectedReportOrder}
//           setReportOrder={setEditReportOrder} // Pass function to update reportorder
//           // onSave={handleSaveClick} // Show Save confirmation modal
//           onSave={() => handleSaveClick('invoice')}   // For updating image
//           onCancel={() => handleCancelClick('invoice')} // Show Discard confirmation modal
//           errorMessage={ImagebackendError.invoice} // Display any error from backend
//         />
//       )}


//       <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

//     </div>
//   );
// }

// export default ReportOrderList;
