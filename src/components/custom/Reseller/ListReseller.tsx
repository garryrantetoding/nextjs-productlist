"use client";
import React, { useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
import CheckboxToggle from './buttons/toggle-button'; // Ensure this is correct path
import PopupButton from './buttons/detail-button';
import Modal from './popups/popup-detail';
import StatusSwitchConfirmationModal from './popups/popup-togglestatus'; // Import the new modal
import { Role, Status, Deleted } from '@/data/services/enum/enum';
import { ChangeStatus } from '@/data/services/brother/productlist-service';
import ExitModal from '../ExitModal';
import { LoadPermissionsAuth } from '@/data/services/brother/productlist-service';
import { toast } from 'sonner';
import Image from 'next/image';
import UpdateImageButton from './buttons/updateimage-button';
import EditImageModal from './popups/popup-edit/popup-editImage';
import { EditResellerList, EditResellerImage, LoadResellerList } from '@/data/services/brother/reseller-service';
import EditResellerModal from './popups/popup-edit/popup-editResellerList';
import ConfirmSaveModal from './popups/popup-edit/popup-saveedit';
import DiscardEditModal from './popups/popup-edit/popup-discardedit';


export type ResellerList = {
  id: number;
  no: number;
  storePhoto: string;//image
  shopName: string;//productname
  owner: string;//category
  roles: string;//customerprice
  email: string;//resellerprice
  phone: string;//description
  address1: string;//videotutorial
  address2: string;//description
  city: string;//videotutorial
  printerA3: boolean;//brochure
  printerA4: boolean;//brochure

}





export type EditResellerList = {
  id: number;
  no: number;
  storePhoto: File;//image
  shopName: string;//productname
  owner: string;//category
  roles: string;//customerprice
  email: string;//resellerprice
  phone: string;//description
  address1: string;//videotutorial
  address2: string;//description
  city: string;//videotutorial
  printerA3: boolean;//brochure
  printerA4: boolean;//brochure

}

interface EditBackendErrorReseller {

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

}

const columnHelper = createColumnHelper<ResellerList>();

interface ResellerListProps {
  shopNameSearch: string;
  roleFilter: string;
  statusFilter: Status | undefined;
  data: ResellerList[];
  setData: React.Dispatch<React.SetStateAction<ResellerList[]>>;
  selectedRows: Record<string, boolean>;  // Change to an object with row ids as keys
  setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;  // Update state type to be an object
  page: number;
  pageSize: number;
}

function ResellerList({ shopNameSearch, roleFilter, statusFilter, data, setData, selectedRows, setSelectedRows, page, pageSize }: ResellerListProps) {
  const [selectedReseller, setSelectedReseller] = React.useState<EditResellerList | null>(null);  // New state to store selected reseller
  const [isEditImageModalOpen, setIsEditImageModalOpen] = React.useState(false);  // State for Edit Modal
  const [isEditResellerModalOpen, setIsEditResellerModalOpen] = React.useState(false);  // State for Edit Modal
  const [isEditingImage, setIsEditingImage] = React.useState(false); // Add this state declaration
  const [isEditingReseller, setIsEditingReseller] = React.useState(false); // Add this state declaration
  const [saveContext, setSaveContext] = useState<'reseller' | 'storePhoto' | null>(null);

  const [editReseller, setEditReseller] = React.useState<EditResellerList | null>(null); // Store the reseller to edit
  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = React.useState(false);
  const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = React.useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
  const [ResellerBackendError, setResellerBackendError] = useState<EditBackendErrorReseller>({
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
  const [ImagebackendError, setImageBackendError] = useState<{ storePhoto: string }>({
    storePhoto: '', // placeholder File

  });

  const cleanCurrency = (value: string) => {
    return value.replace(/[^\d]/g, ''); // Remove all non-digit characters
  };

  // const filteredData = React.useMemo(() => {
  //   let filtered = data;


  //   return filtered;
  // }, [searchQuery, roleFilter, statusFilter, data]);

  React.useEffect(() => {
    console.log("Data updated for table:", data);
  }, [data]);





  const openImageModal = async (reseller: EditResellerList) => {


    setSelectedReseller(reseller);  // Set the selected reseller in the state
    // Convert to EditResellerList type and set
    const convertedProduct: EditResellerList = {
      ...reseller,
      shopName: '',
      owner: '',
      roles: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',


      // Placeholder if not editing image
    };

    setEditReseller(convertedProduct); // <-- This was missing!

    setIsEditImageModalOpen(true);        // Open the modal
    setIsEditingImage(true);  // 


  };

  const openEditResellerModal = async (reseller: EditResellerList) => {
    console.log("testopen")
    setSelectedReseller(reseller);  // Set the selected reseller in the state

    // Convert to EditResellerList type and set
    const convertedProduct: EditResellerList = {
      ...reseller,
      storePhoto: new File([], ''), // Placeholder if not editing image
    };

    setEditReseller(convertedProduct); // <-- This was missing!
    setIsEditResellerModalOpen(true);        // Open the modal
    setIsEditingReseller(true);  // 
    console.log("testopen2", editReseller)


  };

  const handleSaveImageConfirm = async () => {
    if (editReseller) {
      try {
        console.log("testedit", editReseller)

        // Update the user on the backend
        const updatedImage = await EditResellerImage(editReseller.id, editReseller.storePhoto);
        console.log("The new data:", updatedImage);


        if (updatedImage?.zodErrorsusername) {
          // Handle backend errors by setting the error state
          const errorMessageUsername = Array.isArray(updatedImage?.zodErrorsusername)
            ? updatedImage?.zodErrorsusername.join(', ') // Join array if multiple errors
            : updatedImage?.zodErrorsusername || '';

          // Set backend errors
          setImageBackendError({ storePhoto: errorMessageUsername, });
          setIsSaveConfirmationOpen(false); // Close the save confirmation modal

          return; // Stop further processing if there are backend errors

        } else {


          // Update the local data state with the new user information
          // const updatedData = data.map(reseller =>
          //   reseller.id === updatedImage.id ? { ...reseller, ...updatedImage } : reseller
          // );
          const updatedData = await LoadResellerList(page, pageSize, shopNameSearch, roleFilter,);

          // setData(updatedData.data); // Update the data state
          if (updatedData.empty) {
            setData([]);

          } else {

            setData(updatedData.data.data); // Set the fetched data to state

          }
          // console.log(updatedData);

          setEditReseller(null); // Clear the edit state
          setIsEditImageModalOpen(false); // Close the Edit Modal

          // // Reopen the Detail Modal with the updated data
          // setTimeout(() => {
          //   setIsModalOpen(true); // Reopen the detail modal
          //   setSelectedReseller(updatedUser); // Set the updated user to detail modal
          // }, 100); // A short delay to ensure the modal closes and reopens with updated state
        }
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }

    setIsSaveConfirmationOpen(false); // Close the save confirmation modal
  };

  const handleSaveResellerConfirm = async () => {
    if (editReseller) {
      try {
        console.log("testedit", editReseller)
        // Update the user on the backend
        // Then send these to your service
        console.log("testpage", page, pageSize, shopNameSearch, roleFilter)

        const updatedProductList = await EditResellerList(


          editReseller.id,
          // editReseller.no,
          // editReseller.storePhoto,
          editReseller.shopName,//productname
          editReseller.owner,//category
          editReseller.roles,//customerprice
          editReseller.email,//resellerprice
          editReseller.phone,//description
          editReseller.address1,//videotutorial
          editReseller.address2,//description
          editReseller.city,//videotutorial
          editReseller.printerA3,//brochure
          editReseller.printerA4,//brochure

        );
        console.log("The new data 2:", updatedProductList);


        if (updatedProductList?.zodErrorsusername) {
          // Handle backend errors by setting the error state
          const errorMessageUsername = Array.isArray(updatedProductList?.zodErrorsusername)
            ? updatedProductList?.zodErrorsusername.join(', ') // Join array if multiple errors
            : updatedProductList?.zodErrorsusername || '';

          // Set backend errors
          // setResellerBackendError({ brochure: errorMessageUsername,});
          setIsSaveConfirmationOpen(false); // Close the save confirmation modal

          return; // Stop further processing if there are backend errors

        } else {


          // Update the local data state with the new user information
          // const updatedData = data.map(reseller =>
          //   reseller.id === updatedImage.id ? { ...reseller, ...updatedImage } : reseller
          // );
          const updatedData = await LoadResellerList(page, pageSize, shopNameSearch, roleFilter,);
          console.log("testdatapage", updatedData);

          // setData(updatedData); // Update the data state
          // setData(updatedData.data); //  NEW: Force a new reference
          if (updatedData.empty) {
            setData([]);

          } else {

            setData(updatedData.data.data); // Set the fetched data to state

          }
          setEditReseller(null); // Clear the edit state
          setIsEditResellerModalOpen(false); // Close the Edit Modal

          // // Reopen the Detail Modal with the updated data
          // setTimeout(() => {
          //   setIsModalOpen(true); // Reopen the detail modal
          //   setSelectedReseller(updatedUser); // Set the updated user to detail modal
          // }, 100); // A short delay to ensure the modal closes and reopens with updated state
        }
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }

    setIsSaveConfirmationOpen(false); // Close the save confirmation modal
  };


  const closeExitModal = () => {
    setIsExitModalOpen(false);

  };
  // Handle saving the changes
  // const handleSaveClick = () => {
  //   setIsSaveConfirmationOpen(true); // Show the confirmation modal for saving
  // };

  const handleSaveClick = (context: 'reseller' | 'storePhoto') => {
    setSaveContext(context); // Save what context we’re in
    setIsSaveConfirmationOpen(true); // Then show confirmation modal
  };


  // Handle discarding the changes
  const handleCancelClick = (context: 'reseller' | 'storePhoto') => {
    setSaveContext(context); // Save what context we’re in
    setIsDiscardConfirmationOpen(true); // Show the confirmation modal for discarding
  };


  // Confirm Discard changes
  const handleDiscardConfirm = () => {
    setEditReseller(null); // Clear the edit state
    if (saveContext === 'reseller') {
      setIsEditResellerModalOpen(false); // Close the Edit Modal
    } else if (saveContext === 'storePhoto') {
      setIsEditImageModalOpen(false);
    }
    setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal
  };

  const handleDiscardCancel = () => {
    setIsDiscardConfirmationOpen(false); // Close the discard confirmation modal without any action
  };


  const columns = React.useMemo(() => [


    columnHelper.accessor('no', {
      cell: info => info.getValue(),
      header: () => <span>No</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('storePhoto', {
      cell: info => {
        const image = info.getValue(); // Get the image value from the column
        return (
          <Image
            // src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`} // Assuming 'storePhoto' is a URL or base64 string. Adjust accordingly if it’s different.
            // src={image} // Assuming 'storePhoto' is a URL or base64 string. Adjust accordingly if it’s different.
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`} // Assuming 'image' is a URL or base64 string. Adjust accordingly if it’s different.

            alt="Logo"
            width={75}
            height={75}
            className="" // You can add any additional classes here if needed
          />
        );
      },
      header: () => <span>Store Photo</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('shopName', {
      cell: info => info.getValue(),
      header: () => <span>Shop Name</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('owner', {
      cell: info => info.getValue(),
      header: () => <span>Owner</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('roles', {
      cell: info => info.getValue(),
      header: () => <span>Roles</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('email', {
      cell: info => info.getValue(),
      header: () => <span>Email</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('phone', {
      cell: info => info.getValue(),
      header: () => <span>Phone</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('address1', {
      cell: info => (
        <div
          style={{ maxHeight: '100px', overflowY: 'auto' }}
          dangerouslySetInnerHTML={{ __html: info.getValue() }}
        />
      ),
      header: () => <span>Address 1</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('address2', {
      cell: info => (
        <div
          style={{ maxHeight: '100px', overflowY: 'auto' }}
          dangerouslySetInnerHTML={{ __html: info.getValue() }}
        />
      ),
      header: () => <span>Address 2</span>,
      footer: info => info.column.id,
    }),

    // columnHelper.accessor('videotutorial', {
    //   cell: info => {
    //     const url = info.getValue();
    //     return (
    //       <a
    //         href={url}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="text-blue-600 hover:underline"
    //       >
    //         {url}
    //       </a>
    //     );
    //   },
    //   header: () => <span>Video Tutorial</span>,
    //   footer: info => info.column.id,
    // }),

    columnHelper.accessor('city', {
      cell: info => info.getValue(),
      header: () => <span>City</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('printerA3', {
      cell: info => {
        const printerA3 = info.getValue();
        switch (printerA3) {
          case true:
            return (
              <div className=" flex justify-center ">
                <Image src="/images/vectortrue.png" alt="Logo" width={16.95} height={16.95} className="" />
              </div>
            )
          case false:
            return (
              <div className="flex justify-center">
                <Image src="/images/vectorfalse.png" alt="Logo" width={16.95} height={16.95} className="" />
              </div>
            )
          case undefined:
            return null
        }

      },
      header: () => <span>Printer Inkjet A3</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('printerA4', {
      cell: info => {
        const printerA4 = info.getValue();
        switch (printerA4) {
          case true:
            return (
              <div className=" flex justify-center ">
                <Image src="/images/vectortrue.png" alt="Logo" width={16.95} height={16.95} className="" />
              </div>
            )
          case false:
            return (
              <div className="flex justify-center">
                <Image src="/images/vectorfalse.png" alt="Logo" width={16.95} height={16.95} className="" />
              </div>
            )
          case undefined:
            return null
        }

      },
      header: () => <span>Printer Inkjet A4</span>,
      footer: info => info.column.id,
    }),

    {
      id: 'UpdateImage',
      header: () => 'Update Image',
      cell: ({ row }: { row: Row<any> }) => (
        <UpdateImageButton onClick={() => openImageModal(row.original)} />
      ),
      footer: (info: { column: { id: string } }) => info.column.id,
    },

    {
      id: 'Action',
      header: () => 'Action',
      cell: ({ row }: { row: Row<any> }) => (
        <div className='flex items-center justify-between '
        >
          <div>
            <PopupButton onClick={() => openEditResellerModal(row.original)} />
          </div>
          <div className=''>
            <svg width="4" height="15" viewBox="0 0 4 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.90527 0.237488C2.3031 0.237488 2.68463 0.395523 2.96593 0.676828C3.24724 0.958132 3.40527 1.33966 3.40527 1.73749C3.40527 2.13531 3.24724 2.51684 2.96593 2.79815C2.68463 3.07945 2.3031 3.23749 1.90527 3.23749C1.50745 3.23749 1.12592 3.07945 0.844613 2.79815C0.563309 2.51684 0.405273 2.13531 0.405273 1.73749C0.405273 1.33966 0.563309 0.958132 0.844613 0.676828C1.12592 0.395523 1.50745 0.237488 1.90527 0.237488ZM1.90527 5.73749C2.3031 5.73749 2.68463 5.89552 2.96593 6.17683C3.24724 6.45813 3.40527 6.83966 3.40527 7.23749C3.40527 7.63531 3.24724 8.01684 2.96593 8.29815C2.68463 8.57945 2.3031 8.73749 1.90527 8.73749C1.50745 8.73749 1.12592 8.57945 0.844613 8.29815C0.563309 8.01684 0.405273 7.63531 0.405273 7.23749C0.405273 6.83966 0.563309 6.45813 0.844613 6.17683C1.12592 5.89552 1.50745 5.73749 1.90527 5.73749ZM3.40527 12.7375C3.40527 12.3397 3.24724 11.9581 2.96593 11.6768C2.68463 11.3955 2.3031 11.2375 1.90527 11.2375C1.50745 11.2375 1.12592 11.3955 0.844613 11.6768C0.563309 11.9581 0.405273 12.3397 0.405273 12.7375C0.405273 13.1353 0.563309 13.5168 0.844613 13.7981C1.12592 14.0795 1.50745 14.2375 1.90527 14.2375C2.3031 14.2375 2.68463 14.0795 2.96593 13.7981C3.24724 13.5168 3.40527 13.1353 3.40527 12.7375Z" fill="black" />
            </svg>
          </div>
        </div>
      ),
      footer: (info: { column: { id: string } }) => info.column.id,
    },
  ], [data, selectedRows]);

  const table = useReactTable({
    // data: filteredData, // Use filtered data
    data,

    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selectedRows,  // Pass the selected rows state (updated format)
    },
    onRowSelectionChange: setSelectedRows,  // Update selected rows when changed
  });


  return (
    <div className={`mt-2`}>
      {/* Table wrapper */}
      <div className="overflow-hidden">
        <table className="w-full table-auto table-layout-fixed">

          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <td colSpan={headerGroup.headers.length}>
                  <div className="bg-white rounded-md mb-2 py-2 overflow-hidden">
                    <table className="table-fixed" style={{
                      width: '100%',  // Adjust table width based on sidebar width
                    }}>
                      {/* total width 1140px */}
                      {/* <colgroup>
                        <col style={{ width: '35px' }} />
                        <col style={{ width: '80px' }} />
                        <col style={{ width: '75px' }} />
                        <col style={{ width: '60px' }} />
                        <col style={{ width: '65px' }} />
                        <col style={{ width: '60px' }} />
                        <col style={{ width: '70px' }} />
                        <col style={{ width: '155px' }} />
                        <col style={{ width: '160px' }} />
                        <col style={{ width: '50px' }} />
                        <col style={{ width: '70px' }} />
                        <col style={{ width: '70px' }} />
                        <col style={{ width: '130px' }} />
                        <col style={{ width: '60px' }} />
                      </colgroup> */}
                      <colgroup>
                        <col style={{ width: `${(35 / 1140) * 100}%` }} />
                        <col style={{ width: `${(80 / 1140) * 100}%` }} />
                        <col style={{ width: `${(75 / 1140) * 100}%` }} />
                        <col style={{ width: `${(60 / 1140) * 100}%` }} />
                        <col style={{ width: `${(65 / 1140) * 100}%` }} />
                        <col style={{ width: `${(60 / 1140) * 100}%` }} />
                        <col style={{ width: `${(70 / 1140) * 100}%` }} />
                        <col style={{ width: `${(155 / 1140) * 100}%` }} />
                        <col style={{ width: `${(160 / 1140) * 100}%` }} />
                        <col style={{ width: `${(50 / 1140) * 100}%` }} />
                        <col style={{ width: `${(70 / 1140) * 100}%` }} />
                        <col style={{ width: `${(70 / 1140) * 100}%` }} />
                        <col style={{ width: `${(130 / 1140) * 100}%` }} />
                        <col style={{ width: `${(60 / 1140) * 100}%` }} />
                      </colgroup>

                      <thead>
                        <tr>
                          {headerGroup.headers.map(header => (
                            <th key={header.id} className=" text-left text-xs px-2 py-2 text-black">
                              <div className="max-h-20 overflow-y-auto overflow-hidden text-ellipsis break-words">
                                {!header.isPlaceholder &&
                                  flexRender(header.column.columnDef.header, header.getContext())}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                <td colSpan={row.getVisibleCells().length}>
                  <div className="bg-white rounded-md mb-2 py-2 overflow-hidden">
                    <table className="table-fixed" style={{
                      width: '100%',  // Adjust table width based on sidebar width
                    }}>
                      {/* total width 1140px */}
                      <colgroup>
                        <col style={{ width: `${(35 / 1140) * 100}%` }} />
                        <col style={{ width: `${(80 / 1140) * 100}%` }} />
                        <col style={{ width: `${(75 / 1140) * 100}%` }} />
                        <col style={{ width: `${(60 / 1140) * 100}%` }} />
                        <col style={{ width: `${(65 / 1140) * 100}%` }} />
                        <col style={{ width: `${(60 / 1140) * 100}%` }} />
                        <col style={{ width: `${(70 / 1140) * 100}%` }} />
                        <col style={{ width: `${(155 / 1140) * 100}%` }} />
                        <col style={{ width: `${(160 / 1140) * 100}%` }} />
                        <col style={{ width: `${(50 / 1140) * 100}%` }} />
                        <col style={{ width: `${(70 / 1140) * 100}%` }} />
                        <col style={{ width: `${(70 / 1140) * 100}%` }} />
                        <col style={{ width: `${(130 / 1140) * 100}%` }} />
                        <col style={{ width: `${(60 / 1140) * 100}%` }} />
                      </colgroup>

                      <tbody>
                        <tr>
                          {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className=" text-left text-xs px-2 py-2 text-black">
                              <div className="max-h-20 overflow-y-auto overflow-hidden text-ellipsis break-words">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>


        </table>
      </div>




      {/* Modal for reseller details */}

      {/* <Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  selectedReseller={selectedReseller}
  isEditing={false}  // Not in edit mode
  onEdit={() => {
    setEditReseller(selectedReseller);  // Set the reseller to edit
    setIsEditModalOpen(true);        // Open the edit modal
  }}
  // onSave={handleSaveConfirm}
  // onCancel={handleDiscardConfirm}
  setIsModalOpen={setIsModalOpen}  // Pass the setIsModalOpen function
/> */}



      {/* Edit Modal for editing user details */}
      <EditResellerModal
        isOpen={isEditResellerModalOpen}
        onClose={() => setIsEditResellerModalOpen(false)}
        editReseller={editReseller}
        setEditReseller={setEditReseller}
        // onSave={handleSaveClick} // Show Save confirmation modal
        onSave={() => handleSaveClick('reseller')} // For editing reseller
        onCancel={() => handleCancelClick('reseller')} // Show Discard confirmation modal
        backendError={ResellerBackendError}  // Pass backend error
        setBackendError={setResellerBackendError}  // Pass function to reset the error
      />
      {/* Confirm Save Modal */}
      <ConfirmSaveModal
        isOpen={isSaveConfirmationOpen}
        onClose={() => setIsSaveConfirmationOpen(false)} // Close the modal
        // onSave={handleSaveResellerConfirm} // Save the changes

        onSave={() => {
          if (saveContext === 'reseller') {
            handleSaveResellerConfirm();
          } else if (saveContext === 'storePhoto') {
            handleSaveImageConfirm();
          }
          setSaveContext(null); // Reset context after saving
        }}

      />

      {/* Discard Edit Modal */}
      <DiscardEditModal
        isOpen={isDiscardConfirmationOpen}
        onClose={() => setIsDiscardConfirmationOpen(false)} // Close the modal
        onDiscard={handleDiscardConfirm} // Discard the changes
      />

      {/* Edit Image Modal Integration */}
      {isEditImageModalOpen && selectedReseller && (
        <EditImageModal
          isOpen={isEditImageModalOpen}
          onClose={() => setIsEditImageModalOpen(false)} // Close modal on cancel
          reseller={selectedReseller}
          setReseller={setEditReseller} // Pass function to update reseller
          // onSave={handleSaveClick} // Show Save confirmation modal
          onSave={() => handleSaveClick('storePhoto')}   // For updating image
          onCancel={() => handleCancelClick('storePhoto')} // Show Discard confirmation modal
          errorMessage={ImagebackendError.storePhoto} // Display any error from backend
        />
      )}


      <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

    </div>
  );
}

export default ResellerList;
