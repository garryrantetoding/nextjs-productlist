"use client";
import React, { useState, useEffect } from 'react';
import UserList from '../custom/ProductList/ListProduct'; // Import the App component
import StatusFilter from '../custom/ProductList/filters/statusfilter'; // Import StatusFilter
import SearchBar from '../custom/ProductList/filters/searchbar';
import AddUserButton from '../custom/ProductList/buttons/add-user-button';
import DeleteUserButton from '../custom/ProductList/buttons/delete-user-button';
import ProductListModal from '../custom/ProductList/popups/popup-add/popup-addProductList';
import DiscardConfirmationModal from '../custom/ProductList/popups/popup-add/popup-discardadd'; // Import the DiscardConfirmationModal
import DeleteConfirmationModal from '../custom/ProductList/popups/popup-deleteuser';
import { DeleteUser, LoadList, LoadProductList } from '@/data/services/brother/productlist-service'; // Import the LoadList function
import { AddProductList } from '@/data/services/brother/productlist-service';
import { Role, Deleted } from '@/data/services/enum/enum'; // Make sure Role enum is imported
// import { DeleteUser } from '@/data/services/usermanagement-service';
import { Status } from '@/data/services/enum/enum';
import CryptoJS from "crypto-js";
import { toast } from 'sonner';
import { LoadPermissionsAuth } from '@/data/services/brother/productlist-service';
import ExitModal from '../custom/ExitModal';
import Pagination from '../custom/Pagination/pagination-button';
import PageSizeInput from '../custom/Pagination/pagesizeinput';
import { Loader2 } from 'lucide-react';

import CategoryFilter from '../custom/ProductList/filters/categoryfilter';

// interface User {
//   name: string;
//   email: string;
//   roles: string;
//   password: string;
// }

interface ListProduct {
  // no: number;
  image: File;
  brochure: boolean;
  productName: string;
  category: string;
  customerPrice: string;
  resellerPrice: string;
  description: string;
  videoTutorial: string;
  // deleted: Deleted;

}

interface ProductList {
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

interface BackendErrorUser  {
  image: string; 
  brochure: string;
  productName: string;
  category: string;
  customerPrice: string;
  resellerPrice: string;
  description: string;
  videoTutorial: string;
}

// interface ProductListModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddProductList: (name: string, email: string, roles: string) => void;  // Ensure the role parameter is of type Role
//   newUser: ListProduct;
//   setNewProductList: React.Dispatch<React.SetStateAction<ListProduct>>;
//   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }


const ProductListDashboard: React.FC = () => {
  const [productNameSearch, setProductNameSearch] = useState('');
  
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status>(Status.undefined);  // Update state to hold Status | undefined
  const [data, setData] = useState<ProductList[]>([]); // Initially empty, will be populated by backend data
  // const [permissionauth, setPermissionauth] = useState<any[]>([]); // Initially empty, will be populated by backend data
  const [backendError, setBackendError] = useState<BackendErrorUser>({
    image: '',
    brochure: '',
    productName: '',
    category: '',
    customerPrice: '',
    resellerPrice: '',
    description: '',
    videoTutorial: '',
  });
  // State to manage the selected rows
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const scaleValue = 1; // Adjust this value to control the scale

  // State to manage modals visibility
  const [isModalOpen, setIsModalOpen] = useState(false); // For UserModal
  const [isDiscardConfirmationOpen, setIsDiscardConfirmationOpen] = useState(false); // For DiscardConfirmationModal
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [newProductList, setNewProductList] = useState<ListProduct>({
    image: new File([], ""), // placeholder File
    brochure: false,
    productName: '',
    category: '',
    customerPrice: '',
    resellerPrice: '',
    description: '',
    videoTutorial: '',
  });
  
  function encryptPassword(password: string): string {
    // Ensure that the secretKey and iv are available and have the correct length
    const secretKey = CryptoJS.enc.Utf8.parse(process.env.secretKey || 'defaultSecretKey1234'); // Ensure it has 16, 24, or 32 chars
    const iv = CryptoJS.enc.Utf8.parse(process.env.iv || 'defaultIV123456789'); // IV should be 16 bytes long

    if (secretKey.sigBytes !== 16 && secretKey.sigBytes !== 24 && secretKey.sigBytes !== 32) {
      throw new Error('Invalid secret key length. The key should be 16, 24, or 32 bytes long.');
    }

    if (iv.sigBytes !== 16) {
      throw new Error('Invalid IV length. The IV should be 16 bytes long.');
    }

    // Perform the AES encryption using CBC mode and PKCS7 padding
    const encrypted = CryptoJS.AES.encrypt(password, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    // Return the encrypted password as a Base64 string
    return encrypted.toString();
  }


  const [loading, setLoading] = useState(true); // Loading state



  useEffect(() => {

    const fetchData = async () => {
      // try {
      //   // Fetch permissions
      //   const responsepermission = await LoadPermissionsAuth();
      //   // setPermissionauth(responsepermission);
      //   // console.log("testauth",responsepermission);
      //   // Check if the user has the DELETE_USER permission
      //    if (responsepermission===undefined){

      //         setIsExitModalOpen(true); // Open the modal when the token is expired
      //         toast.error(`Session Expired`, {
      //           style: { backgroundColor: '#FF4D4D', color: 'white' },
      //           position: 'top-center',
      //           duration: 5000,
      //         }); 
      //   } else if (responsepermission.includes("GETALL_USER")) {
      try {
        // Fetch the list of data if the user has permission
        // const fetchedData = await LoadList(page,pageSize,searchQuery,roleFilter,statusFilter);
        console.log("filtertest",page, pageSize,productNameSearch, categoryFilter)
        const fetchedData = await LoadProductList(page, pageSize,productNameSearch, categoryFilter);

        console.log("Fetched Data:", fetchedData);
        if (fetchedData.empty){
          setData([]);
          setTotalPages(1); // Update total pages

        }else {

        setData(fetchedData.data.data); // Set the fetched data to state
        
        setTotalPages(fetchedData.data.totalPages); // Update total pages
      }
      
//         setData([])
// setData([{ no: 1,
//   image: "public/images/logo.png",
//   brochure: true,
//   productname: "string",
//   category: "string",
//   customerprice: "string",
//   resellerprice: "string",
//   description: "string",
//   videotutorial: "string",
//   deleted: Deleted.Yes,}]);

      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data", {
          style: { backgroundColor: '#FF4D4D', color: 'white' },
          position: 'top-center',
          duration: 5000,
        });
      } finally {
            setLoading(false)
          }
      
      //     } else {
      //       setData([]); // Clear the data if no permission to delete
      //     }
      //   } catch (error) {
      //     // Error when fetching permissions
      //     console.error("Error fetching permissions:", error);
      //     toast.error("Error fetching permissions", {
      //       style: { backgroundColor: '#FF4D4D', color: 'white' },
      //       position: 'top-center',
      //       duration: 5000,
      //     });
      //   } finally {
      //     setLoading(false)
      //   }
    };

    fetchData();
  }, [page, pageSize, productNameSearch, categoryFilter, statusFilter]); // Empty dependency array to run this effect only once when the component mounts.

  const handleStatusChange = (status: Status) => {
    setStatusFilter(status);
  };

  // Function to open the User Modal
  const openModal = async () => {
    // const responsepermission = await LoadPermissionsAuth();

    // if (responsepermission === undefined) {

    //   setIsExitModalOpen(true); // Open the modal when the token is expired
    //   toast.error(`Session Expired`, {
    //     style: { backgroundColor: '#FF4D4D', color: 'white' },
    //     position: 'top-center',
    //     duration: 5000,
    //   });
    // }
    // else if (responsepermission.includes("CREATE_USER")) {

    //   setIsModalOpen(true);

    // }
    // else {
    //   toast.error(`You dont have the permission to add user`, {
    //     style: { backgroundColor: '#FF4D4D', color: 'white' },
    //     position: 'top-center',
    //     duration: 5000,
    //   });

    //   return null
    // }
    setIsModalOpen(true);

  };

  // Function to close the User Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to open the Discard Confirmation Modal
  const openDiscardConfirmationModal = () => {
    setIsDiscardConfirmationOpen(true);
  };

  // Function to close the Discard Confirmation Modal
  const closeDiscardConfirmationModal = () => {
    setIsDiscardConfirmationOpen(false);
  };

  // Function to discard changes and close the UserModal
  const discardChanges = () => {
    setNewProductList({
      image: new File([], ""), // placeholder File
      brochure: false,
      productName: '',
      category: '',
      customerPrice: '',
      resellerPrice: '',
      description: '',
      videoTutorial: '',
    });  // Reset roles to a default value
    closeModal();
    closeDiscardConfirmationModal();
  };

  const handleAddProductList = async (
    image: File,
    brochure: boolean,
    productName: string,
    category: string,
    customerPrice: string,
    resellerPrice: string,
    description: string,
    videoTutorial: string,
  
  ) => {
    // Convert the string role to a Role enum value
    // Encrypt the password here
    const newProductList: ListProduct = {
      image,
      brochure,
      productName,
      category,
      customerPrice,
      resellerPrice,
      description,
      videoTutorial,
   
    };
    // console.log("testing3",newUser)

    try {
      console.log("testadd",newProductList)
      const response = await AddProductList(newProductList);
      // console.log("testing4",response)
      console.log("testadd2",response)

      if (response?.data) {
        // console.log('User added successfully');
        // Fetch updated list of users after adding a new user
        const updatedData = await LoadProductList(page, pageSize, productNameSearch, categoryFilter);
        // console.log("testing1",updatedData)
        if (updatedData.empty){
          setData([]);
          setTotalPages(1); // Update total pages

        }else {

        setData(updatedData.data.data); // Set the fetched data to state
        
        setTotalPages(updatedData.data.totalPages); // Update total pages
      }
        setNewProductList({
          image: new File([], ""), // placeholder File
          brochure: false,
          productName: '',
          category: '',
          customerPrice: '',
          resellerPrice: '',
          description: '',
          videoTutorial: '',
        });
        // console.log("testing2",updatedData)
        // console.log("Data updated. Closing modal...");
        // setTimeout(() => {
          // console.log("Closing modal...");
          closeModal();
          // console.log("Closed modal...");

        // }, 0); // Ensure modal closes after everything else

        toast.success('New Data successfully added', {
          style: { backgroundColor: '#33B640', color: 'white' },

          position: 'top-center',
          duration: 3000,

        })

      } else {
        // Handle errors from the backend (e.g., validation or database errors)
        // Handle backend errors
        // const errorMessageUsername = Array.isArray(response?.zodErrorsusername)
        //   ? response?.zodErrorsusername.join(', ')  // Join the array into a string
        //   : response?.zodErrorsusername || '';

        // const errorMessageEmail = Array.isArray(response?.zodErrorsemail)
        //   ? response?.zodErrorsemail.join(', ')  // Join the array into a string
        //   : response?.zodErrorsemail || '';
        // console.log("Email Error Message:", errorMessageEmail); // Log email error message
        // // setBackendError({ name: errorMessageUsername, email: errorMessageEmail });
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };


  // Function to open the delete confirmation modal
  const openDeleteConfirmationModal = async () => {
    const responsepermission = await LoadPermissionsAuth();

    if (responsepermission === undefined) {

      setIsExitModalOpen(true); // Open the modal when the token is expired
      toast.error(`Session Expired`, {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      });
    } else if (responsepermission.includes("DELETE_USER")) {

      setIsDeleteConfirmationOpen(true);

    }
    else {
      toast.error(`You dont have the permission to delete data`, {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      });

      return null
    }
  };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleDeleteUsers = async () => {
    const usersToDelete: number[] = []; // Collect userIds to delete

    // Iterate over selectedRows to get the userIds to delete
    Object.keys(selectedRows).forEach((rowId) => {
      if (selectedRows[rowId]) {
        const userId = data[+rowId].id; // Get userId from selected rows
        usersToDelete.push(userId);
      }
    });

    if (usersToDelete.length === 0) return; // If no users are selected, do nothing

    try {
      // Perform deletion for each selected user
      const deleteResponses = await Promise.all(
        usersToDelete.map(async (userId) => {
          try {
            const response = await DeleteUser(userId); // Attempt deletion

            console.log("testresponse", response)
            if (response.errormessage === "Forbidden: You do not have permission to delete this user.") {
              toast.error(`forbidden`, {
                style: { backgroundColor: '#FF4D4D', color: 'white' },
                position: 'top-center',
                duration: 5000,
              });
            }

            if (response.errormessage === "success") {
              // const filteredData = data.filter((user) => !usersToDelete.includes(user.id));
              // setData(filteredData); // Update the data state

              const updatedData = await LoadProductList(page, pageSize, productNameSearch, categoryFilter);
              // console.log("testing1",updatedData)
              if (updatedData.empty){
                setData([]);
                setTotalPages(1); // Update total pages

              }else {
      
              setData(updatedData.data.data); // Set the fetched data to state
              
              setTotalPages(updatedData.data.totalPages); // Update total pages
            }
              toast.success('Data successfully deleted', {
                style: { backgroundColor: '#EC7C15', color: 'white' },
                position: 'top-center',
                duration: 3000,
                icon: (
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.49992 12.6667C4.49992 13.4 5.09992 14 5.83325 14H11.1666C11.8999 14 12.4999 13.4 12.4999 12.6667V4.66667H4.49992V12.6667ZM13.1666 2.66667H10.8333L10.1666 2H6.83325L6.16659 2.66667H3.83325V4H13.1666V2.66667Z"
                      fill="#FEF8EC"
                    />
                  </svg>
                ),
              });


            }
            return { userId, response }; // Return response with userId if deletion is successful
          } catch (error: any) {
            // Handle error per user here if necessary
            console.error(`Failed to delete user with ID ${userId}`, error);

            // Check if error contains an errormessage and return it
            const errorMessage = error?.errormessage || error?.response?.data?.message || error?.message || 'Unknown error';

            // Return the error message for the failed user
            return { userId, response: errorMessage };
          }
        })
      );



      // Reset selected rows and close the modal
      setSelectedRows({});
      closeDeleteConfirmationModal();


    } catch (error) {
      console.error("Error deleting users:", error);

      // Show a generic error if the whole delete operation failed
      toast.error('An error occurred while trying to delete users.', {
        style: { backgroundColor: '#FF4D4D', color: 'white' },
        position: 'top-center',
        duration: 5000,
      });
    }
  };

  const closeExitModal = () => {
    setIsExitModalOpen(false);
  };


  // const handlePageSizeSubmit = () => {
  //   fetchData();  // Trigger data fetch with the new pageSize
  // };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);  // Update page and fetch new data
  };


  if (loading) {
    return (
      <div className={`h-screen  flex justify-center items-center bg-neutral-100 `}>
        <Loader2 className="mr-2 h-12 w-12 animate-spin" />

        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    ); // Display loading message or spinner while fetching userroles
  }
  return (
    <div className={`p-5 `}
    style={{ backgroundColor: 'rgba(231, 244, 255, 1)' }}
>
      {/* {Object.keys(selectedRows).length === 0 ? (
        <> */}
          <div className="flex justify-between items-center mb-4 w-full">
            {/* Search Bar */}
            <div className="flex space-x-4 ">
              {/* Role and Status Filters */}
              <CategoryFilter onRoleChange={setCategoryFilter} />
              {/* <StatusFilter onStatusChange={handleStatusChange} /> */}
              <PageSizeInput
                pageSize={pageSize}
                setPageSize={setPageSize}
                text="page"
              // onPageSizeSubmit={handlePageSizeSubmit}  // Pass the submit handler
              />

            </div>
            {/* Add User Button */}
            <div className="flex space-x-4 ">
            <SearchBar searchQuery={productNameSearch} setSearchQuery={setProductNameSearch} />

              <AddUserButton onClick={openModal} />
            </div>
          </div>
        {/* </>
      ) : (
        <div className="flex justify-between items-center mb-4 w-full">
          <div className="ml-auto">
            <DeleteUserButton onClick={openDeleteConfirmationModal} />
          </div>
        </div>
      )} */}

      {/* Pass searchQuery, roleFilter, and statusFilter to the App component */}
      <UserList
        productNameSearch={productNameSearch}
        categoryFilter={categoryFilter}
        statusFilter={statusFilter}
        data={data}
        setData={setData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        page={page}
        pageSize={pageSize}
      />
      {/* Pagination Controls */}
      {/* <Pagination page={page} totalPages={totalPages} setPage={setPage} />  Pagination component */}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        scale={scaleValue}
      // onPageSizeChange={setPageSize}  // You may use this for future enhancements if needed
      // pageSize={pageSize}
      />

      {/* User Modal component */}
      <ProductListModal 
        isOpen={isModalOpen} 
        onClose={openDiscardConfirmationModal}  // Open discard confirmation on cancel
        onAddProductList={handleAddProductList} 
        newProductList={newProductList}
        setNewProductList={setNewProductList}
        setDiscardConfirmationOpen={setIsDiscardConfirmationOpen}  // Pass this function here
        backendError={backendError}  // Pass backend error
        setBackendError={setBackendError}  // Pass function to reset the error
      />

      {/* Discard Confirmation Modal */}
      <DiscardConfirmationModal
        isOpen={isDiscardConfirmationOpen}
        onCancel={closeDiscardConfirmationModal}
        onDiscard={discardChanges}
      />
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onCancel={closeDeleteConfirmationModal}
        onDelete={handleDeleteUsers}
      />
      <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

    </div>
  );
};

export default ProductListDashboard;
