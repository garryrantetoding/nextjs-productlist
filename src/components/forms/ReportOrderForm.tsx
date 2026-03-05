"use client";
import React, { useState, useEffect } from 'react';
import ReportOrderList from '../custom/ReportOrder/ListReportOrder';
import StatusFilter from '../custom/ReportOrder/filters/statusfilter'; // Import StatusFilter
import SearchBar from '../custom/ReportOrder/filters/searchbar';
import AddUserButton from '../custom/ReportOrder/buttons/add-user-button';
import DeleteUserButton from '../custom/ReportOrder/buttons/delete-user-button';
import ProductListModal from '../custom/ReportOrder/popups/popup-add/popup-addReportOrder';
import DiscardConfirmationModal from '../custom/ReportOrder/popups/popup-add/popup-discardadd'; // Import the DiscardConfirmationModal
import DeleteConfirmationModal from '../custom/ReportOrder/popups/popup-deleteuser';
import { DeleteUser, LoadList, LoadProductList } from '@/data/services/brother/productlist-service'; // Import the LoadList function
// import { DeleteUser } from '@/data/services/usermanagement-service';
import { Status } from '@/data/services/enum/enum';
import CryptoJS from "crypto-js";
import { toast } from 'sonner';
import { LoadPermissionsAuth } from '@/data/services/brother/productlist-service';
import ExitModal from '../custom/ExitModal';
import Pagination from '../custom/Pagination/pagination-button';
import PageSizeInput from '../custom/Pagination/pagesizeinput';
import { Loader2 } from 'lucide-react';

import RoleFilter from '../custom/ReportOrder/filters/rolesfilter';
import { AddResellerList, LoadResellerList } from '@/data/services/brother/reseller-service';
import ReportOrderListModal from '../custom/ReportOrder/popups/popup-add/popup-addReportOrder';
import { AddReportOrderList,LoadReportOrderList } from '@/data/services/brother/reportorder-service';
import { BuyerRoleEnum,CategoryEnum,OrderStatusEnum,PaymentStatusEnum,TaskStatusEnum} from '@/data/services/enum/reportorder-enum';
import DateRangeSelector from '../custom/ReportOrder/filters/datefilter';
import TaskStatusFilter from '../custom/ReportOrder/filters/taskStatusFilter';
import OrderStatusFilter from '../custom/ReportOrder/filters/orderStatusFilter';
// interface User {
//   name: string;
//   email: string;
//   roles: string;
//   password: string;
// }



interface ListReportOrder {

  // // no: number;
  // storephoto: File;//image
  // shopname: string;//productname
  // owner: string;//category
  // roles: string;//customerprice
  // email: string;//resellerprice
  // phone: string;//description
  // address1: string;//videotutorial
  // address2: string;//description
  // city: string;//videotutorial
  // printera3: boolean;//brochure
  // printera4: boolean;//brochure
  
  // no: number;
// date: string;
invoice: File | null;//image
// invoiceNumber: string;
roles: BuyerRoleEnum;// deleted
category: CategoryEnum;// deleted
orderStatus: OrderStatusEnum;// deleted
paymentStatus: PaymentStatusEnum;// deleted
taskStatus: TaskStatusEnum;// deleted
notes: string;//productname
  
  }



interface ReportOrderListProps {
  id: number;
  no: number;
  // storephoto: string;//image
  // shopname: string;//productname
  // owner: string;//category
  // roles: string;//customerprice
  // email: string;//resellerprice
  // phone: string;//description
  // address1: string;//videotutorial
  // address2: string;//description
  // city: string;//videotutorial
  // printera3: boolean;//brochure
  // printera4: boolean;//brochure
  

  // no: number;
date: string;
invoice: string;//image
invoiceNumber: string;
roles: BuyerRoleEnum;// deleted
category: CategoryEnum;// deleted
orderStatus: OrderStatusEnum;// deleted
paymentStatus: PaymentStatusEnum;// deleted
taskStatus: TaskStatusEnum;// deleted
notes: string;//productname
  }



interface BackEndErrorReportOrder {

  // storephoto: string;//image
  // shopname: string;//productname
  // owner: string;//category
  // roles: string;//customerprice
  // email: string;//resellerprice
  // phone: string;//description
  // address1: string;//videotutorial
  // address2: string;//description
  // city: string;//videotutorial
  // printera3: string;//brochure
  // printera4: string;//brochure
    

  invoice: string;//image
// invoiceNumber: string;
roles: string;// deleted
category: string;// deleted
orderStatus: string;// deleted
paymentStatus: string;// deleted
taskStatus: string;// deleted
notes: string;//productname
  }

// interface ProductListModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddProductList: (name: string, email: string, roles: string) => void;  // Ensure the role parameter is of type Role
//   newUser: ListReportOrder;
//   setNewReportOrder: React.Dispatch<React.SetStateAction<ListReportOrder>>;
//   setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }


const ReportOrderDashboard: React.FC = () => {
  const [invoiceNumberSearch, setInvoiceNumberSearch] = useState('');
  const [rolesFilter, setRoleFilter] = useState<BuyerRoleEnum>(BuyerRoleEnum.Empty);
  const [taskStatusFilter, setTaskStatusFilter] = useState<TaskStatusEnum>(TaskStatusEnum.Empty);
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatusEnum>(OrderStatusEnum.Empty);
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<Status>(Status.undefined);  // Update state to hold Status | undefined
  const [data, setData] = useState<ReportOrderListProps[]>([]); // Initially empty, will be populated by backend data
  // const [permissionauth, setPermissionauth] = useState<any[]>([]); // Initially empty, will be populated by backend data
  const [backendError, setBackendError] = useState<BackEndErrorReportOrder>({
    // storephoto: '',
    //   shopname: '',
    //   owner: '',
    //   roles: '',
    //   email: '',
    //   phone: '',
    //   address1: '',
    //   address2: '',
    //   city: '',
    //   printera3: '',
    //   printera4: '',

      invoice: '',//image
// invoiceNumber: '',
roles: '',// deleted
category: '',// deleted
orderStatus: '',// deleted
paymentStatus: '',// deleted
taskStatus: '',// deleted
notes: '',//productname

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
  const [newReportOrder, setNewReportOrder] = useState<ListReportOrder>({
    // invoice: new File([], ""),
    invoice: null,
    // invoiceNumber: '',
    roles: BuyerRoleEnum.Empty,// deleted
    category: CategoryEnum.Empty,// deleted
    orderStatus: OrderStatusEnum.Empty,// deleted
    paymentStatus: PaymentStatusEnum.Empty,// deleted
    taskStatus: TaskStatusEnum.Empty,// deleted
    notes: '',//productname
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
        // const fetchedData = await LoadList(page,pageSize,searchQuery,rolesFilter,statusFilter);
        console.log("filtertest",page, pageSize, startDate, endDate, orderStatusFilter, taskStatusFilter,rolesFilter, invoiceNumberSearch,)
        const fetchedData = await LoadReportOrderList(page, pageSize, startDate, endDate, orderStatusFilter, taskStatusFilter,rolesFilter, invoiceNumberSearch,);

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
  }, [page, pageSize, startDate, endDate, orderStatusFilter, taskStatusFilter,rolesFilter, invoiceNumberSearch,]); // Empty dependency array to run this effect only once when the component mounts.

  const handleStatusChange = (status: Status) => {
    setStatusFilter(status);
  };

  const handleDateChange = (start: Date | null, end: Date | null) => {
    const formattedStart = start ? start.toISOString().split('T')[0] : ''
    const formattedEnd = end ? end.toISOString().split('T')[0] : ''

    setStartDate(formattedStart)
    setEndDate(formattedEnd)

    // You can update state or make API calls here
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
    setNewReportOrder({
    
      invoice: new File([], ""),
      
    // invoiceNumber: '',
    roles: BuyerRoleEnum.Empty,// deleted
    category: CategoryEnum.Empty,// deleted
    orderStatus: OrderStatusEnum.Empty,// deleted
    paymentStatus: PaymentStatusEnum.Empty,// deleted
    taskStatus: TaskStatusEnum.Empty,// deleted
    notes: '',//productname
    });  // Reset roles to a default value
    closeModal();
    closeDiscardConfirmationModal();
  };

  const handleAddReportOrderList = async (
  

  

  // no: number;
invoice: File | null,//image
roles: BuyerRoleEnum,// deleted
category: CategoryEnum,// deleted
orderStatus: OrderStatusEnum,// deleted
paymentStatus: PaymentStatusEnum,// deleted
taskStatus: TaskStatusEnum,// deleted
notes: string,//productname
  
  ) => {
    // Convert the string role to a Role enum value
    // Encrypt the password here
    const newReportOrder: ListReportOrder = {
      invoice,//image
      // invoiceNumber,
      roles,// deleted
      category,// deleted
      orderStatus,// deleted
      paymentStatus,// deleted
      taskStatus,// deleted
      notes,//productname
   
    };
    // console.log("testing3",newUser)

    try {
      console.log("testadd",newReportOrder)
      const response = await AddReportOrderList(newReportOrder);
      // console.log("testing4",response)
      console.log("testadd2",response)

      if (response?.data) {
        // console.log('User added successfully');
        // Fetch updated list of users after adding a new user
        const updatedData = await LoadReportOrderList(page, pageSize, startDate, endDate, orderStatusFilter, taskStatusFilter,rolesFilter, invoiceNumberSearch,);
        // console.log("testing1",updatedData)
        if (updatedData.empty){
          setData([]);
          setTotalPages(1); // Update total pages

        } else {

        setData(updatedData.data.data); // Set the fetched data to state
        
        setTotalPages(updatedData.data.totalPages); // Update total pages
      }
        setNewReportOrder({
          // invoice: new File([], ""),
          invoice: null, // or undefined

      
          // invoiceNumber: '',
          roles: BuyerRoleEnum.Empty,// deleted
          category: CategoryEnum.Empty,// deleted
          orderStatus: OrderStatusEnum.Empty,// deleted
          paymentStatus: PaymentStatusEnum.Empty,// deleted
          taskStatus: TaskStatusEnum.Empty,// deleted
          notes: '',//productname
        });
        // console.log("testing2",updatedData)
        // console.log("Data updated. Closing modal...");
        setTimeout(() => {
          // console.log("Closing modal...");
          closeModal();
          // console.log("Closed modal...");

        }, 0); // Ensure modal closes after everything else

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
        // setBackendError({ name: errorMessageUsername, email: errorMessageEmail });
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };


  // // Function to open the delete confirmation modal
  // const openDeleteConfirmationModal = async () => {
  //   const responsepermission = await LoadPermissionsAuth();

  //   if (responsepermission === undefined) {

  //     setIsExitModalOpen(true); // Open the modal when the token is expired
  //     toast.error(`Session Expired`, {
  //       style: { backgroundColor: '#FF4D4D', color: 'white' },
  //       position: 'top-center',
  //       duration: 5000,
  //     });
  //   } else if (responsepermission.includes("DELETE_USER")) {

  //     setIsDeleteConfirmationOpen(true);

  //   }
  //   else {
  //     toast.error(`You dont have the permission to delete data`, {
  //       style: { backgroundColor: '#FF4D4D', color: 'white' },
  //       position: 'top-center',
  //       duration: 5000,
  //     });

  //     return null
  //   }
  // };

  // Function to close the delete confirmation modal
  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationOpen(false);
  };

  // const handleDeleteUsers = async () => {
  //   const usersToDelete: number[] = []; // Collect userIds to delete

  //   // Iterate over selectedRows to get the userIds to delete
  //   Object.keys(selectedRows).forEach((rowId) => {
  //     if (selectedRows[rowId]) {
  //       const userId = data[+rowId].no; // Get userId from selected rows
  //       usersToDelete.push(userId);
  //     }
  //   });

  //   if (usersToDelete.length === 0) return; // If no users are selected, do nothing

  //   try {
  //     // Perform deletion for each selected user
  //     const deleteResponses = await Promise.all(
  //       usersToDelete.map(async (userId) => {
  //         try {
  //           const response = await DeleteUser(userId); // Attempt deletion

  //           console.log("testresponse", response)
  //           if (response.errormessage === "Forbidden: You do not have permission to delete this user.") {
  //             toast.error(`forbidden`, {
  //               style: { backgroundColor: '#FF4D4D', color: 'white' },
  //               position: 'top-center',
  //               duration: 5000,
  //             });
  //           }

  //           if (response.errormessage === "success") {
  //             // const filteredData = data.filter((user) => !usersToDelete.includes(user.id));
  //             // setData(filteredData); // Update the data state

  //             const updatedData = await LoadResellerList(page, pageSize, invoiceNumberSearch, rolesFilter);
  //             // console.log("testing1",updatedData)
  //             if (updatedData.empty){
  //               setData([]);
  //               setTotalPages(1); // Update total pages

  //             }else {
      
  //             setData(updatedData.data.data); // Set the fetched data to state
              
  //             setTotalPages(updatedData.data.totalPages); // Update total pages
  //           }
  //             toast.success('Data successfully deleted', {
  //               style: { backgroundColor: '#EC7C15', color: 'white' },
  //               position: 'top-center',
  //               duration: 3000,
  //               icon: (
  //                 <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //                   <path
  //                     d="M4.49992 12.6667C4.49992 13.4 5.09992 14 5.83325 14H11.1666C11.8999 14 12.4999 13.4 12.4999 12.6667V4.66667H4.49992V12.6667ZM13.1666 2.66667H10.8333L10.1666 2H6.83325L6.16659 2.66667H3.83325V4H13.1666V2.66667Z"
  //                     fill="#FEF8EC"
  //                   />
  //                 </svg>
  //               ),
  //             });


  //           }
  //           return { userId, response }; // Return response with userId if deletion is successful
  //         } catch (error: any) {
  //           // Handle error per user here if necessary
  //           console.error(`Failed to delete user with ID ${userId}`, error);

  //           // Check if error contains an errormessage and return it
  //           const errorMessage = error?.errormessage || error?.response?.data?.message || error?.message || 'Unknown error';

  //           // Return the error message for the failed user
  //           return { userId, response: errorMessage };
  //         }
  //       })
  //     );



  //     // Reset selected rows and close the modal
  //     setSelectedRows({});
  //     closeDeleteConfirmationModal();


  //   } catch (error) {
  //     console.error("Error deleting users:", error);

  //     // Show a generic error if the whole delete operation failed
  //     toast.error('An error occurred while trying to delete users.', {
  //       style: { backgroundColor: '#FF4D4D', color: 'white' },
  //       position: 'top-center',
  //       duration: 5000,
  //     });
  //   }
  // };

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
          <div className="flex justify-between items-top mb-2 w-full">
            {/* Search Bar */}
            <div className="flex space-x-2 ">
              {/* Role and Status Filters */}
              <DateRangeSelector onDateChange={handleDateChange} />
              <OrderStatusFilter onStatusChange={setOrderStatusFilter} />
              <TaskStatusFilter onStatusChange={setTaskStatusFilter} />
              <RoleFilter onRoleChange={setRoleFilter} />
              
              {/* <StatusFilter onStatusChange={handleStatusChange} /> */}
              <PageSizeInput
                pageSize={pageSize}
                setPageSize={setPageSize}
                text="page"
              // onPageSizeSubmit={handlePageSizeSubmit}  // Pass the submit handler
              />

            </div>
            {/* Add User Button */}
            <div className=" justify-end">
            <SearchBar searchQuery={invoiceNumberSearch} setSearchQuery={setInvoiceNumberSearch} />

              {/* <AddUserButton onClick={openModal} /> */}
            </div>
          </div>
          <div className='flex justify-end mb-4'>
          <AddUserButton onClick={openModal} />
          </div>
        {/* </>
      ) : (
        <div className="flex justify-between items-center mb-4 w-full">
          <div className="ml-auto">
            <DeleteUserButton onClick={openDeleteConfirmationModal} />
          </div>
        </div>
      )} */}

      {/* Pass searchQuery, rolesFilter, and statusFilter to the App component */}
      <ReportOrderList
        invoiceNumberSearch={invoiceNumberSearch}
        rolesFilter={rolesFilter}
        taskStatusFilter={taskStatusFilter}
        orderStatusFilter={orderStatusFilter}
        startDate={startDate}
        endDate={endDate}
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
      <ReportOrderListModal 
        isOpen={isModalOpen} 
        onClose={openDiscardConfirmationModal}  // Open discard confirmation on cancel
        onAddReportOrder={handleAddReportOrderList} 
        newReportOrder={newReportOrder}
        setNewReportOrder={setNewReportOrder}
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
      {/* <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onCancel={closeDeleteConfirmationModal}
        onDelete={handleDeleteUsers}
      /> */}
      <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

    </div>
  );
};

export default ReportOrderDashboard;
