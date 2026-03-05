"use client";
import React, { useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
import CheckboxToggle from './buttons/toggle-button'; // Ensure this is correct path
import PopupButton from './buttons/detail-button';
import Modal from './popups/popup-detail';
import StatusSwitchConfirmationModal from './popups/popup-togglestatus'; // Import the new modal
import EditProductModal from './popups/popup-edit/popup-editProductList'; // Import the new EditModal component
import ConfirmSaveModal from './popups/popup-edit/popup-saveedit';
import DiscardEditModal from './popups/popup-edit/popup-discardedit';
import { EditProductImage, EditProductList, EditUser, LoadProductList } from '@/data/services/brother/productlist-service';
import { Role, Status, Deleted } from '@/data/services/enum/enum';
import { ChangeStatus } from '@/data/services/brother/productlist-service';
import ExitModal from '../ExitModal';
import { LoadPermissionsAuth } from '@/data/services/brother/productlist-service';
import { toast } from 'sonner';
import Image from 'next/image';
import UpdateImageButton from './buttons/updateimage-button';
import EditImageModal from './popups/popup-edit/popup-editImage';

export type Person = {
  id: number;
  name: string; // Name will not be visible on the table but will be in the database
  email: string;
  // roles: Role;
  roles: string;
  status: Status;
  boxColor: string;
  roleColor: string;

};

export type ProductList = {
  id: number;

  no: number;
  image: string;
  brochure: boolean;
  productName: string;
  category: string;
  customerPrice: string;
  resellerPrice: string;
  description: string;
  videoTutorial: string;
  deleted: Deleted;

}

export type EditProductList = {
  id: number;

  no: number;
  image: File;
  brochure: boolean;
  productName: string;
  category: string;
  customerPrice: string;
  resellerPrice: string;
  description: string;
  videoTutorial: string;
  deleted: Deleted;

}

interface EditBackendErrorUser {
  brochure: string;
  productName: string;
  category: string;
  customerPrice: string;
  resellerPrice: string;
  description: string;
  videoTutorial: string
}

const columnHelper = createColumnHelper<ProductList>();

interface UserListProps {
  productNameSearch: string;
  categoryFilter: string;
  //   productnamesearch
  // categoryfilter
  statusFilter: Status | undefined;
  data: ProductList[];
  setData: React.Dispatch<React.SetStateAction<ProductList[]>>;
  selectedRows: Record<string, boolean>;  // Change to an object with row ids as keys
  setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;  // Update state type to be an object
  page: number;
  pageSize: number;
}

function UserList({ productNameSearch, categoryFilter, statusFilter, data, setData, selectedRows, setSelectedRows, page, pageSize }: UserListProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<EditProductList | null>(null);  // New state to store selected product
  const [isStatusSwitchModalOpen, setIsStatusSwitchModalOpen] = React.useState(false); // State for status switch modal
  const [ProductToSwitch, setProductToSwitch] = React.useState<ProductList | null>(null); // Store product for status switch
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);  // State for Edit Modal

  const [isEditImageModalOpen, setIsEditImageModalOpen] = React.useState(false);  // State for Edit Modal
  const [isEditProductModalOpen, setIsEditProductModalOpen] = React.useState(false);  // State for Edit Modal
  const [isEditingImage, setIsEditingImage] = React.useState(false); // Add this state declaration
  const [isEditingProduct, setIsEditingProduct] = React.useState(false); // Add this state declaration

  const [saveContext, setSaveContext] = useState<'product' | 'image' | null>(null);

  const [editProduct, setEditProduct] = React.useState<EditProductList | null>(null); // Store the product to edit
  const [isSaveConfirmationOpen, setIsSaveConfirmationOpen] = React.useState(false);
  const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false); // Add this state declaration
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
  const [ProductbackendError, setProductBackendError] = useState<EditBackendErrorUser>({
    brochure: '',
    productName: '',
    category: '',
    customerPrice: '',
    resellerPrice: '',
    description: '',
    videoTutorial: '',
  });
  const [ImagebackendError, setImageBackendError] = useState<{ image: string }>({
    image: '', // placeholder File

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





  const openImageModal = async (product: EditProductList) => {
    // // // console.log('Selected product:', product); 
    // // setSelectedProduct(product);  // Set the selected product in the state
    // // setIsModalOpen(true);        // Open the modal
    // // setIsEditing(false);  // Initially, it's not editing

    // const responsepermission = await LoadPermissionsAuth();
    // if (responsepermission === undefined) {

    //   setIsExitModalOpen(true); // Open the modal when the token is expired
    //   toast.error(`Session Expired`, {
    //     style: { backgroundColor: '#FF4D4D', color: 'white' },
    //     position: 'top-center',
    //     duration: 5000,
    //   });
    // } else if (responsepermission.includes("GET_USER")) {

    //   setSelectedProduct(product);  // Set the selected product in the state
    //   setIsModalOpen(true);        // Open the modal
    //   setIsEditing(false);  // Initially, it's not editing   
    // }
    // else {
    //   toast.error(`You dont have the permission to view detail`, {
    //     style: { backgroundColor: '#FF4D4D', color: 'white' },
    //     position: 'top-center',
    //     duration: 5000,
    //   });

    //   return null
    // }


    setSelectedProduct(product);  // Set the selected product in the state
    // Convert to EditProductList type and set
    const convertedProduct: EditProductList = {
      ...product,
      productName: '',
      category: '',
      customerPrice: '',
      resellerPrice: '',
      description: '',
      videoTutorial: '', // Placeholder if not editing image
    };

    setEditProduct(convertedProduct); // <-- This was missing!

    setIsEditImageModalOpen(true);        // Open the modal
    setIsEditingImage(true);  // 


  };

  const openEditProductModal = async (product: EditProductList) => {
    console.log("testopen")
    setSelectedProduct(product);  // Set the selected product in the state

    // Convert to EditProductList type and set
    const convertedProduct: EditProductList = {
      ...product,
      image: new File([], ''), // Placeholder if not editing image
    };

    setEditProduct(convertedProduct); // <-- This was missing!
    setIsEditProductModalOpen(true);        // Open the modal
    setIsEditingProduct(true);  // 
    console.log("testopen2", isEditingProduct)


  };

  const handleSaveImageConfirm = async () => {
    if (editProduct) {
      try {
        console.log("testedit", editProduct)

        // Update the user on the backend
        const updatedImage = await EditProductImage(editProduct.id, editProduct.image);
        console.log("The new data:", updatedImage);


        if (updatedImage?.zodErrorsusername) {
          // Handle backend errors by setting the error state
          const errorMessageUsername = Array.isArray(updatedImage?.zodErrorsusername)
            ? updatedImage?.zodErrorsusername.join(', ') // Join array if multiple errors
            : updatedImage?.zodErrorsusername || '';

          // Set backend errors
          setImageBackendError({ image: errorMessageUsername, });
          setIsSaveConfirmationOpen(false); // Close the save confirmation modal

          return; // Stop further processing if there are backend errors

        } else {


          // Update the local data state with the new user information
          // const updatedData = data.map(product =>
          //   product.id === updatedImage.id ? { ...product, ...updatedImage } : product
          // );
          const updatedData = await LoadProductList(page, pageSize, productNameSearch, categoryFilter,);

          // setData(updatedData.data); // Update the data state
          if (updatedData.empty) {
            setData([]);

          } else {

            setData(updatedData.data.data); // Set the fetched data to state

          }
          // console.log(updatedData);

          setEditProduct(null); // Clear the edit state
          setIsEditImageModalOpen(false); // Close the Edit Modal

          // // Reopen the Detail Modal with the updated data
          // setTimeout(() => {
          //   setIsModalOpen(true); // Reopen the detail modal
          //   setSelectedProduct(updatedUser); // Set the updated user to detail modal
          // }, 100); // A short delay to ensure the modal closes and reopens with updated state
        }
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }

    setIsSaveConfirmationOpen(false); // Close the save confirmation modal
  };

  const handleSaveProductConfirm = async () => {
    if (editProduct) {
      try {
        console.log("testedit", editProduct)
        // Update the user on the backend
        const cleanedCustomerPrice = cleanCurrency(editProduct.customerPrice);
        const cleanedResellerPrice = cleanCurrency(editProduct.resellerPrice);

        // Then send these to your service
        console.log("testpage", page, pageSize, productNameSearch, categoryFilter)

        const updatedProductList = await EditProductList(editProduct.id, editProduct.brochure,
          editProduct.productName,
          editProduct.category,
          cleanedCustomerPrice,
          cleanedResellerPrice,
          editProduct.description,
          editProduct.videoTutorial,);
        console.log("The new data:", updatedProductList);


        if (updatedProductList?.zodErrorsusername) {
          // Handle backend errors by setting the error state
          const errorMessageUsername = Array.isArray(updatedProductList?.zodErrorsusername)
            ? updatedProductList?.zodErrorsusername.join(', ') // Join array if multiple errors
            : updatedProductList?.zodErrorsusername || '';

          // Set backend errors
          // setProductBackendError({ brochure: errorMessageUsername,});
          setIsSaveConfirmationOpen(false); // Close the save confirmation modal

          return; // Stop further processing if there are backend errors

        } else {


          // Update the local data state with the new user information
          // const updatedData = data.map(product =>
          //   product.id === updatedImage.id ? { ...product, ...updatedImage } : product
          // );
          const updatedData = await LoadProductList(page, pageSize, productNameSearch, categoryFilter,);
          console.log("testdatapage", updatedData);

          // setData(updatedData); // Update the data state
          // setData(updatedData.data); //  NEW: Force a new reference
          if (updatedData.empty) {
            setData([]);

          } else {

            setData(updatedData.data.data); // Set the fetched data to state

          }
          setEditProduct(null); // Clear the edit state
          setIsEditProductModalOpen(false); // Close the Edit Modal

          // // Reopen the Detail Modal with the updated data
          // setTimeout(() => {
          //   setIsModalOpen(true); // Reopen the detail modal
          //   setSelectedProduct(updatedUser); // Set the updated user to detail modal
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

  const handleSaveClick = (context: 'product' | 'image') => {
    setSaveContext(context); // Save what context we’re in
    setIsSaveConfirmationOpen(true); // Then show confirmation modal
  };


  // Handle discarding the changes
  const handleCancelClick = (context: 'product' | 'image') => {
    setSaveContext(context); // Save what context we’re in
    setIsDiscardConfirmationOpen(true); // Show the confirmation modal for discarding
  };


  // Confirm Discard changes
  const handleDiscardConfirm = () => {
    setEditProduct(null); // Clear the edit state
    if (saveContext === 'product') {
      setIsEditProductModalOpen(false); // Close the Edit Modal
    } else if (saveContext === 'image') {
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

    columnHelper.accessor('image', {
      cell: info => {
        const image = info.getValue(); // Get the image value from the column
        return (
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`} // Assuming 'image' is a URL or base64 string. Adjust accordingly if it’s different.
            alt="Logo"
            width={80}
            height={80}
            className="" // You can add any additional classes here if needed
          />
        );
      },
      header: () => <span>Image</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('brochure', {
      cell: info => {
        const brochure = info.getValue();
        switch (brochure) {
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
      header: () => <span>Brochure</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('productName', {
      cell: info => info.getValue(),
      header: () => <span>Product Name</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('category', {
      cell: info => {
        const categoryValue = info.getValue();  // Get the role name from the row data

        let CategoryName

        switch (categoryValue) {
          case 'A3':
            CategoryName = 'Printer Inkjet A3';

            break;
          case 'A4':
            CategoryName = 'Printer Inkjet A4';

            break;
          case 'MJ':
            CategoryName = 'Mesin Jahit';
            break;
          case 'ML':
            CategoryName = 'Mesin Label';
            break;
          default:
            CategoryName = 'Unknown';
            break;
        }


        // Return the role name with inline styles
        return (
          <span
            className=""
          >
            {CategoryName}
          </span>
        );
      },
      header: () => <span>Category</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('customerPrice', {
      cell: info => info.getValue(),
      header: () => <span>Price for Customer</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('resellerPrice', {
      cell: info => info.getValue(),
      header: () => <span>Price for Reseller</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('description', {
      cell: info => (
        <div
          style={{ maxHeight: '100px', overflowY: 'auto' }}
          dangerouslySetInnerHTML={{ __html: info.getValue() }}
        />
      ),
      header: () => <span>Description</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('videoTutorial', {
      cell: info => {
        const url = info.getValue();
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {url}
          </a>
        );
      },
      header: () => <span>Video Tutorial</span>,
      footer: info => info.column.id,
    }),

    columnHelper.accessor('deleted', {
      cell: info => info.getValue(),
      header: () => <span>Deleted</span>,
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
            <PopupButton onClick={() => openEditProductModal(row.original)} />
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
                      {/* <colgroup>
                        <col style={{ width: '40px' }} />
                        <col style={{ width: '80px' }} />
                        <col style={{ width: '90px' }} />
                        <col style={{ width: '80px' }} />
                        <col style={{ width: '90px' }} />
                        <col style={{ width: '100px' }} />
                        <col style={{ width: '100px' }} />
                        <col style={{ width: '180px' }} />
                        <col style={{ width: '120px' }} />
                        <col style={{ width: '70px' }} />
                        <col style={{ width: '130px' }} />
                        <col style={{ width: '60px' }} />
                      </colgroup> */}
                      <colgroup>
                        <col style={{ width: `${(40 / 1140) * 100}%` }} />
                        <col style={{ width: `${(80 / 1140) * 100}%` }} />
                        <col style={{ width: `${(90 / 1140) * 100}%` }} />
                        <col style={{ width: `${(80 / 1140) * 100}%` }} />
                        <col style={{ width: `${(90 / 1140) * 100}%` }} />
                        <col style={{ width: `${(100 / 1140) * 100}%` }} />
                        <col style={{ width: `${(100 / 1140) * 100}%` }} />
                        <col style={{ width: `${(180 / 1140) * 100}%` }} />
                        <col style={{ width: `${(120 / 1140) * 100}%` }} />
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
                      <colgroup>
                        <col style={{ width: `${(40 / 1140) * 100}%` }} />
                        <col style={{ width: `${(80 / 1140) * 100}%` }} />
                        <col style={{ width: `${(90 / 1140) * 100}%` }} />
                        <col style={{ width: `${(80 / 1140) * 100}%` }} />
                        <col style={{ width: `${(90 / 1140) * 100}%` }} />
                        <col style={{ width: `${(100 / 1140) * 100}%` }} />
                        <col style={{ width: `${(100 / 1140) * 100}%` }} />
                        <col style={{ width: `${(180 / 1140) * 100}%` }} />
                        <col style={{ width: `${(120 / 1140) * 100}%` }} />
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




      {/* Modal for product details */}

      {/* <Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  selectedProduct={selectedProduct}
  isEditing={false}  // Not in edit mode
  onEdit={() => {
    setEditProduct(selectedProduct);  // Set the product to edit
    setIsEditModalOpen(true);        // Open the edit modal
  }}
  // onSave={handleSaveConfirm}
  // onCancel={handleDiscardConfirm}
  setIsModalOpen={setIsModalOpen}  // Pass the setIsModalOpen function
/> */}



      {/* Edit Modal for editing user details */}
      <EditProductModal
        isOpen={isEditProductModalOpen}
        onClose={() => setIsEditProductModalOpen(false)}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        // onSave={handleSaveClick} // Show Save confirmation modal
        onSave={() => handleSaveClick('product')} // For editing product
        onCancel={() => handleCancelClick('product')} // Show Discard confirmation modal
        backendError={ProductbackendError}  // Pass backend error
        setBackendError={setProductBackendError}  // Pass function to reset the error
      />
      {/* Confirm Save Modal */}
      <ConfirmSaveModal
        isOpen={isSaveConfirmationOpen}
        onClose={() => setIsSaveConfirmationOpen(false)} // Close the modal
        // onSave={handleSaveProductConfirm} // Save the changes

        onSave={() => {
          if (saveContext === 'product') {
            handleSaveProductConfirm();
          } else if (saveContext === 'image') {
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
      {isEditImageModalOpen && selectedProduct && (
        <EditImageModal
          isOpen={isEditImageModalOpen}
          onClose={() => setIsEditImageModalOpen(false)} // Close modal on cancel
          product={selectedProduct}
          setProduct={setEditProduct} // Pass function to update product
          // onSave={handleSaveClick} // Show Save confirmation modal
          onSave={() => handleSaveClick('image')}   // For updating image
          onCancel={() => handleCancelClick('image')} // Show Discard confirmation modal
          errorMessage={ImagebackendError.image} // Display any error from backend
        />
      )}


      <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

    </div>
  );
}

export default UserList;
