"use server";

import { ensureValidAccessToken } from '../token-handler';
import axiosInstance from '../axios-instance'; // Assuming axiosInstance is already set up




interface ResellerListProps {

// no: number;
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

// deleted: Deleted;

}


// Create a function to send reseller data to the backend
export async function  AddResellerList(reseller: ResellerListProps) {
    const url = "/resellers";
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
    // formData.append('storePhoto', reseller.storePhoto);  // 'image' corresponds to the backend field
  
    if (reseller.storePhoto) {
        formData.append('photo', reseller.storePhoto);
      }
    // Append other reseller fields to the FormData
    // formData.append('no', reseller.no.toString());
    formData.append('shopName', reseller.shopName);
    formData.append('owner', reseller.owner);
    formData.append('roles', reseller.roles);
    formData.append('email', reseller.email);
    formData.append('phone', reseller.phone);
    formData.append('address1', reseller.address1);
    formData.append('address2', reseller.address2);
    formData.append('city', reseller.city);
    formData.append('printerA3', reseller.printerA3.toString());
    formData.append('printerA4', reseller.printerA4.toString());

    // formData.append('deleted', reseller.deleted);

  
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
      console.error('Error sending reseller data:', error);
      throw error;  // Re-throw the error so it can be handled by the caller
    }
}

export async function LoadResellerList(page: number, pageSize: number,shopNameSearch: string, roleFilter: string) {
    const url = "/resellers";
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


        const response = await axiosInstance.get(url, {
            params:{ page, pageSize,shopNameSearch:shopNameSearch,roleFilter:roleFilter},
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


export async function EditResellerList(id: number,
shopName: string,
owner: string,
roles: string,
email: string,
phone: string,
address1: string,
address2: string,
city: string,
printerA3: boolean,
printerA4: boolean,
) {
    const url = `/resellers/${id}/data`; // The endpoint you're calling
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
        shopName,
        owner,
        roles,
        email,
        phone,
        address1,
        address2,
        city,
        printerA3,
        printerA4,
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
    
    
export async function EditResellerImage(id: number, storePhoto: File,


) {
    const url = `/resellers/${id}/image`; // The endpoint you're calling
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
    formData.append('photo', storePhoto);  // 'image' corresponds to the backend field
  
  
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
