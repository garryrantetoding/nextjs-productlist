"use server";

import { ensureValidAccessToken } from '../token-handler';
import axiosInstance from '../axios-instance'; // Assuming axiosInstance is already set up
import { BuyerRoleEnum,CategoryEnum,OrderStatusEnum,PaymentStatusEnum,TaskStatusEnum } from '../enum/reportorder-enum';



interface ReportOrderProps {
// no: number;
// date: string;
invoice: File | null;//image
// invoicenumber: string;
roles: BuyerRoleEnum;// deleted
category: CategoryEnum;// deleted
orderStatus: OrderStatusEnum;// deleted
paymentStatus: PaymentStatusEnum;// deleted
taskStatus: TaskStatusEnum;// deleted
notes: string;//productname

}


// Create a function to send reportorder data to the backend
export async function  AddReportOrderList(reportorder: ReportOrderProps) {
    const url = "/reportorder";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
        const accessToken = await ensureValidAccessToken();

        if (!accessToken) {
            console.error('No access token found');
            return {empty: true,
              message: "id access token", 
            }
          }

    const formData = new FormData();
  
    // Append the image to the FormData
    // formData.append('invoice', reportorder.invoice);  // 'image' corresponds to the backend field
  
    if (reportorder.invoice) {
        formData.append('invoice', reportorder.invoice);
      }

    // Append other reportorder fields to the FormData
    // formData.append('no', reportorder.no.toString());
    // formData.append('roles', reportorder.roles);
    // formData.append('owner', reportorder.owner);
    // formData.append('roles', reportorder.roles);
    // formData.append('email', reportorder.email);
    // formData.append('phone', reportorder.phone);
    // formData.append('address1', reportorder.address1);
    // formData.append('address2', reportorder.address2);
    // formData.append('city', reportorder.city);
    // formData.append('printera3', reportorder.printera3.toString());
    // formData.append('printera4', reportorder.printera4.toString());

    formData.append('roles', reportorder.roles); // Enums are strings or numbers — just append
  formData.append('category', reportorder.category);
  formData.append('orderStatus', reportorder.orderStatus);
  formData.append('paymentStatus', reportorder.paymentStatus);
  formData.append('taskStatus', reportorder.taskStatus);

  formData.append('notes', reportorder.notes); // this is your product name


//     // formData.append('deleted', reportorder.deleted);
//     no: number;
//     invoice: File;//image
//     roles: BuyerRole;// deleted
//     category: Category;// deleted
//     orderStatus: OrderStatus;// deleted
//     paymentStatus: PaymentStatus;// deleted
//     taskStatus: TaskStatus;// deleted
//     notes: String;//productname
  
    try {
      const response = await axiosInstance.post(url, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            "Content-Type": 'multipart/form-data',
        },
        withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
    });
    //   return response.data;  // Return the response data from the backend
      const data =response.data;

      if (data.data && data.data.length ===0){
          return {
              empty: true,
              message:"id products found",
              data,
          };
      }

           return { 
              empty: false, 
              data,
           }
    } catch (error) {
      console.error('Error sending reportorder data:', error);
      throw error;  // Re-throw the error so it can be handled by the caller
    }
}

export async function LoadReportOrderList(page: number, pageSize: number, startDate: string, endDate: string, orderStatusFilter: string, taskStatusFilter: string, rolesFilter: string, invoiceNumberSearch: string,
) {
    const url = "/reportorder";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
        const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
      console.error('No access token found');
      return {empty: true,
        message: "no access token", 
      }
    }
    try {

    //     const params: Record<string, any> = { page, pageSize };
    //     if (startDate) params.startDate = startDate;
    // if (endDate) params.endDate = endDate;
    // if (orderStatusFilter) params.orderStatusFilter = orderStatusFilter;
    // if (taskStatusFilter) params.taskStatusFilter = taskStatusFilter;
    // if (rolesFilter) params.rolesFilter = rolesFilter;
    // if (invoiceNumberSearch) params.invoiceNumberSearch = invoiceNumberSearch;


        const response = await axiosInstance.get(url, {
            params:{ page, pageSize, startDate: startDate, endDate: endDate, orderStatusFilter: orderStatusFilter, taskStatusFilter: taskStatusFilter, rolesFilter: rolesFilter, invoiceNumberSearch: invoiceNumberSearch,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });
        
        const data =response.data;

        if (data.data && data.data.length ===0){
            return {
                empty: true,
                message:"no products found",
                data,
            };
        }

             return { 
                empty: false, 
                data,
             }




    } catch (error: any) {
        // console.error('Error fetching data:', error);
        throw error;
    }
}


export async function EditReportOrderList(id: number,


orderStatus: OrderStatusEnum,// deleted
paymentStatus: PaymentStatusEnum,// deleted
taskStatus: TaskStatusEnum,// deleted
notes: string,//productname

) {
    const url = `/reportorder/${id}/data`; // The endpoint you're calling
    const accessToken = await ensureValidAccessToken(); // Use ensureValidAccessToken
  
    console.log("Access token retrieved qasd:", accessToken); // Debugging line: log the access token
  
    if (!accessToken) {
        console.error('No access token found');
        return {empty: true,
          message: "id access token", 
        }
      }
  
    try {
        console.log('Access token in EditUser:', accessToken);  // Log the access token

      const response = await axiosInstance.put(url, {
        orderStatus,
        paymentStatus,
        taskStatus,
        notes,
        }, {
          headers: {
              Authorization: `Bearer ${accessToken}`, // Using the retrieved token
          },
          withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
      });
  
      console.log('Backend Response for Edit wasd:', response); // Debugging line: log the response for debugging
      return response.data; // Assuming the response contains the updated user data
    } catch (error: any) {
        // Error handling (same as before)
        if (error.response) {
            const errorMessage = error.response.data.message;

            if (errorMessage === 'Name already used') {
                console.error("Registration Error: Username already exists");
                return {
                    zodmessage: "Registration failed. Username already exists.",
                    zodErrorsusername: ["Username already exists. Please choose another one."],
                };
            } else {
                console.error("Registration Error:", errorMessage);
                return {
                    message: errorMessage || "Registration failed.",
                    zodErrors: {
                        username: [null],
                             }
                };
            }
        } else if (error.request) {
            console.error("Registration Error2: No response received from server");
            return {
                message: "No response from the server. Please try again later.",
                zodErrors: ["No response from the server. Please try again later."],
            };
        } else {
            console.error("Registration Error3:", error.message);
            return {
                message: error.message,
                zodErrors: [error.message]
            };
        }
    }
}
    
    
export async function EditReportOrderImage(id: number, invoice: File,


) {
    const url = `/reportorder/${id}/invoice`; // The endpoint you're calling
    const accessToken = await ensureValidAccessToken(); // Use ensureValidAccessToken
  
    console.log("Access token retrieved qasd:", accessToken); // Debugging line: log the access token
  
    if (!accessToken) {
        console.error('No access token found');
        return {empty: true,
          message: "id access token", 
        }
      }

    const formData = new FormData();
  
    // Append the image to the FormData
    formData.append('invoice', invoice);  // 'image' corresponds to the backend field
  
  
    try {
        console.log('Access token in EditUser:', accessToken);  // Log the access token

      const response = await axiosInstance.put(url, 
        formData,
         {
          headers: {
              Authorization: `Bearer ${accessToken}`, // Using the retrieved token
              "Content-Type": 'multipart/form-data',

          },
          withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
      });
  
      console.log('Backend Response for Edit wasd:', response); // Debugging line: log the response for debugging
      return response.data; // Assuming the response contains the updated user data
    } catch (error: any) {
        // Error handling (same as before)
        if (error.response) {
            const errorMessage = error.response.data.message;

            if (errorMessage === 'Name already used') {
                console.error("Registration Error: Username already exists");
                return {
                    zodmessage: "Registration failed. Username already exists.",
                    zodErrorsusername: ["Username already exists. Please choose another one."],
                };
            } else {
                console.error("Registration Error:", errorMessage);
                return {
                    message: errorMessage || "Registration failed.",
                    zodErrors: {
                        username: [null],
                             }
                };
            }
        } else if (error.request) {
            console.error("Registration Error2: No response received from server");
            return {
                message: "No response from the server. Please try again later.",
                zodErrors: ["No response from the server. Please try again later."],
            };
        } else {
            console.error("Registration Error3:", error.message);
            return {
                message: error.message,
                zodErrors: [error.message]
            };
        }
    }
}
