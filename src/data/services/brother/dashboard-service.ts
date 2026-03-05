"use server";

import { ensureValidAccessToken } from '../token-handler';
import axiosInstance from '../axios-instance'; // Assuming axiosInstance is already set up
import { BuyerRoleEnum, CategoryEnum, OrderStatusEnum, PaymentStatusEnum, TaskStatusEnum } from '../enum/reportorder-enum';



interface ShippedOrderProps {
    shippedOrderCount: number;
}

interface PendingOrderProps {
    pendingOrderCount: number;
}

interface NewOrderProps {
    newOrderCount: number;
}

interface ChartProps {
    city: string;
    totalResellers: number;
}

interface MapProps {
    coordinates: { lat: number; lng: number };
    shopName: string;
    address: string;
}

interface BestSellerProps {
    product: string;
    price: string;
    soldItems: number;
    profit: string;
}



// /shiporder
// /pendingorder
// /neworder
// /chart
// /bestseller
// /:no/geocoding



export async function LoadShippingOrder(
    startDate: string, endDate: string
) {
    const url = "/dashboard/shiporder";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
    const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
        console.error('No access token found');
        return {
            empty: true,
            message: "no access token",
        }
    }
    try {
        const params:any ={};
        if (startDate?.trim()) params.startDate=startDate;
        if (endDate?.trim()) params.endDate=endDate;


        const response = await axiosInstance.get(url, {
            params,
            // : {
            //      startDate: startDate, endDate: endDate, 
            //     // invoiceNumberSearch: invoiceNumberSearch,
            // },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });

        const data = response.data;

        if (data.data && data.data.length === 0) {
            return {
                empty: true,
                message: "no products found",
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

export async function LoadPendingOrder(
    startDate: string, endDate: string
) {
    const url = "/dashboard/pendingorder";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
    const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
        console.error('No access token found');
        return {
            empty: true,
            message: "no access token",
        }
    }
    try {

        const params:any ={};
        if (startDate?.trim()) params.startDate=startDate;
        if (endDate?.trim()) params.endDate=endDate;


        const response = await axiosInstance.get(url, {
            params,
            // : {
            //     startDate: startDate, endDate: endDate, 
            //     // invoiceNumberSearch: invoiceNumberSearch,
            // },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });

        const data = response.data;

        if (data.data && data.data.length === 0) {
            return {
                empty: true,
                message: "no products found",
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

export async function LoadNewOrder(
     startDate: string, endDate: string
) {
    const url = "/dashboard/neworder";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
    const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
        console.error('No access token found');
        return {
            empty: true,
            message: "no access token",
        }
    }
    try {

        const params:any ={};
        if (startDate?.trim()) params.startDate=startDate;
        if (endDate?.trim()) params.endDate=endDate;



        const response = await axiosInstance.get(url, {
            params,
            
            // : {
            //     startDate: startDate, endDate: endDate, 
            //     // invoiceNumberSearch: invoiceNumberSearch,
            // },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });

        const data = response.data;

        if (data.data && data.data.length === 0) {
            return {
                empty: true,
                message: "no products found",
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


export async function LoadChart(
    // startDate: string, endDate: string,  invoiceNumberSearch: string,
) {
    const url = "/dashboard/chart";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
    const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
        console.error('No access token found');
        return {
            empty: true,
            message: "no access token",
        }
    }
    try {


        const response = await axiosInstance.get(url, {
            params: {
                // startDate: startDate, endDate: endDate, invoiceNumberSearch: invoiceNumberSearch,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });

        const data = response.data;

        if (data.data && data.data.length === 0) {
            return {
                empty: true,
                message: "no products found",
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

export async function LoadBestSeller(
     startDate: string, endDate: string
) {
    const url = "/dashboard/bestseller";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
    const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
        console.error('No access token found');
        return {
            empty: true,
            message: "no access token",
        }
    }
    try {

        const params:any ={};
        if (startDate?.trim()) params.startDate=startDate;
        if (endDate?.trim()) params.endDate=endDate;


        const response = await axiosInstance.get(url, {
            params,
            // : {
            //      startDate: startDate, endDate: endDate, 
            //     // invoiceNumberSearch: invoiceNumberSearch,
            // },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });

        const data = response.data;

        if (data.data && data.data.length === 0) {
            return {
                empty: true,
                message: "no products found",
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

export async function LoadMap(
    // startDate: string, endDate: string,  invoiceNumberSearch: string,
) {
    const url = "/dashboard/geocoding/all";
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
    const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
        console.error('No access token found');
        return {
            empty: true,
            message: "no access token",
        }
    }
    try {


        const response = await axiosInstance.get(url, {
            params: {
                // startDate: startDate, endDate: endDate, invoiceNumberSearch: invoiceNumberSearch,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });

        const data = response.data;

        if (data.data && data.data.length === 0) {
            return {
                empty: true,
                message: "no products found",
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

export async function LoadMapDetail(no: number,
    // startDate: string, endDate: string,  invoiceNumberSearch: string,
) {
    const url = `/dashboard/${no}/geocoding`;
    // const accessToken = await getAccessTokenFromCookies();
    // console.error('edcr', accessToken);
    const accessToken = await ensureValidAccessToken();

    if (!accessToken) {
        console.error('No access token found');
        return {
            empty: true,
            message: "no access token",
        }
    }
    try {


        const response = await axiosInstance.get(url, {
            params: {
                // startDate: startDate, endDate: endDate, invoiceNumberSearch: invoiceNumberSearch,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`, // Using the retrieved token
            },
            withCredentials: true,  // Ensure cookies are sent with the request (if you're using cookies)
        });

        const data = response.data;

        if (data.data && data.data.length === 0) {
            return {
                empty: true,
                message: "no products found",
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

