

// // // import { getAccessTokenFromCookies } from './get-token'; // Access token helper
// // // import { refreshAccessToken } from './refresh-service'; // Refresh logic

// // // let isRefreshing = false;  // A flag to ensure only one refresh is triggered at a time
// // // let refreshTokenPromise: Promise<any> | null = null; // Store the refresh promise to prevent multiple refresh calls

// // // export async function ensureValidAccessToken() {
    
// // //     let TokenAccess = await getAccessTokenFromCookies();
    
// // //     if (!TokenAccess) {
// // //         console.log("No access token found.");
// // //         return null;
// // //     }

// // //     // If access token is expired, try refreshing it
// // //     const tokenExpiration = getTokenExpiration(TokenAccess); // Implement this to check token expiration
// // //     if (isTokenExpired(tokenExpiration)) {  // Assuming you have logic to check expiration
// // //         if (isRefreshing) {
// // //             // If already refreshing, wait for the previous refresh to finish
// // //             console.log("Access token refresh in progress. Please wait.");
// // //             await refreshTokenPromise;  // Wait for the ongoing refresh to complete
// // //             TokenAccess = await getAccessTokenFromCookies(); // Get the refreshed token
// // //         } else {
// // //             try {
// // //                 isRefreshing = true;
// // //                 console.log("Refreshing access token...");
// // //                 // Trigger the refresh and store the promise
// // //                 refreshTokenPromise = refreshAccessToken();
// // //                 await refreshTokenPromise; // Wait for refresh to complete
// // //                 TokenAccess = await getAccessTokenFromCookies(); // Get the refreshed token
// // //             } catch (error) {
// // //                 console.error("Error refreshing access token:", error);
// // //                 isRefreshing = false;
// // //                 return null;
// // //             } finally {
// // //                 isRefreshing = false;
// // //                 refreshTokenPromise = null;  // Clear the refresh promise after it completes
// // //             }
// // //         }
// // //     }

// // //     return TokenAccess;
// // // }

// // // function getTokenExpiration(token: string) {
// // //     // Implement logic to decode and get the expiration time from JWT token
// // //     return decodeJwt(token).exp;
// // // }

// // // function isTokenExpired(expirationTime: number) {
// // //     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
// // //     return expirationTime < currentTime;
// // // }

// // // function decodeJwt(token: string) {
// // //     const payload = token.split('.')[1];
// // //     const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
// // //     return JSON.parse(decodedPayload);
// // // }

// // import { getAccessTokenFromCookies } from './get-token'; // Access token helper
// // import { refreshAccessToken } from './refresh-service'; // Refresh logic

// // let isRefreshing = false;  // A flag to ensure only one refresh is triggered at a time
// // let refreshTokenPromise: Promise<any> | null = null; // Store the refresh promise to prevent multiple refresh calls

// // export async function ensureValidAccessToken() {
// //   // Get the access token from cookies
// //   let TokenAccess = await getAccessTokenFromCookies();

// //   if (!TokenAccess) {
// //     console.log("No access token found.");
// //     return null;
// //   }

// //     // Log the current (old) access token before checking expiration
// //     console.log("Old access token:", TokenAccess);

// //   // If access token is expired, try refreshing it
// //   const tokenExpiration = getTokenExpiration(TokenAccess);  // Implement this to check token expiration
// //   if (isTokenExpired(tokenExpiration)) {  // Assuming you have logic to check expiration
// //     if (isRefreshing) {
// //       // If already refreshing, wait for the previous refresh to finish
// //       console.log("Access token refresh in progress. Please wait.");
// //       await refreshTokenPromise;  // Wait for the ongoing refresh to complete
// //       TokenAccess = await getAccessTokenFromCookies(); // Get the refreshed token
// //     } else {
// //       try {
// //         isRefreshing = true;
// //         console.log("Refreshing access token...");
// //         // Trigger the refresh and store the promise
// //         refreshTokenPromise = refreshAccessToken();
// //         await refreshTokenPromise; // Wait for refresh to complete
// //         TokenAccess = await getAccessTokenFromCookies(); // Get the refreshed token
// //       } catch (error) {
// //         console.error("Error refreshing access token:", error);
// //         isRefreshing = false;
// //         return null;
// //       } finally {
// //         isRefreshing = false;
// //         refreshTokenPromise = null;  // Clear the refresh promise after it completes
// //       }
// //     }
// //   }


// //   // Log the new access token after refreshing it
// //   console.log("New access token:", TokenAccess);

// //   return TokenAccess;
// // }

// // function getTokenExpiration(token: string) {
// //   // Decode and get the expiration time from the JWT token
// //   return decodeJwt(token).exp;
// // }

// // function isTokenExpired(expirationTime: number) {
// //   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
// //   return expirationTime < currentTime;
// // }

// // function decodeJwt(token: string) {
// //   const payload = token.split('.')[1];
// //   const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
// //   return JSON.parse(decodedPayload);
// // }


// import { getAccessTokenFromCookies } from './get-token'; // Access token helper
// import { refreshAccessToken } from './refresh-service'; // Refresh logic

// let isRefreshing = false;  // A flag to ensure only one refresh is triggered at a time
// let refreshTokenPromise: Promise<any> | null = null; // Store the refresh promise to prevent multiple refresh calls



// // export async function ensureValidAccessToken() {
// //     let TokenAccess = await getAccessTokenFromCookies();
// //     console.log("Access token from cookies wasdfer:", TokenAccess);  // Debugging log
  
// //     if (!TokenAccess) {
// //       console.error("No access token found in cookies.");
// //       return null;
// //     }
  
// //     // If you need to refresh the token when it's expired
// //     const tokenExpiration = getTokenExpiration(TokenAccess); // Assuming you have some way to check token expiry
// //     if (tokenExpiration < Date.now()) {
// //       console.log("Access token expired, refreshing...");
// //       TokenAccess = await refreshAccessToken();  // Ensure this is working correctly
// //       console.log("New access token after refresh:", TokenAccess);
// //     }
  
// //     return TokenAccess;
// //   }

// export async function ensureValidAccessToken() {
//     console.log("Entering ensureValidAccessToken...");
//     let TokenAccess = await getAccessTokenFromCookies();
//     console.log("Access token from cookies:", TokenAccess);  // Log if it's retrieved correctly
  
//     if (!TokenAccess) {
//       console.error("No access token found.");
//       return null;
//     } 

//     console.log("Initial access token:", TokenAccess);

  
//     // Additional logic to refresh token if expired
//     const tokenExpiration = getTokenExpiration(TokenAccess);
//     if (tokenExpiration < Date.now()) {
//       console.log("Token expired, refreshing...");
//       TokenAccess = await refreshAccessToken();
//       console.log("New access token after refresh:", TokenAccess);
//     }
  
//     return TokenAccess;
//   }
  
  

// function getTokenExpiration(token: string) {
//   // Decode and get the expiration time from the JWT token
//   return decodeJwt(token).exp;
// }

// function isTokenExpired(expirationTime: number) {
//   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//   return expirationTime < currentTime;
// }

// function decodeJwt(token: string) {
//   const payload = token.split('.')[1];
//   const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
//   return JSON.parse(decodedPayload);
// }

import axios from 'axios';

import { getAccessTokenFromCookies } from './token/get-token'; // Access token helper
import { refreshAccessToken } from './token/refresh-service'; // Refresh logic

export const ensureValidAccessToken = async (): Promise<string | null> => {
  // Step 1: Retrieve the access token from cookies or storage.
  let TokenAccess = await getAccessTokenFromCookies();
  
  if (!TokenAccess) {
    console.error('No access token found');
    return null;
  }

  console.log("Initial access token:", TokenAccess);

  // Step 2: Check if the token is expired.
  const isExpired = isTokenExpired(TokenAccess);
  
  if (isExpired) {
    console.log('Access token is expired, attempting to refresh...');
    
    // Step 3: Try to refresh the token.
    try {
      const newTokens = await refreshAccessToken();
      console.log('New tokens received:', newTokens);

      // Step 4: Update the access token and save it for future use.
      if (newTokens && newTokens.accessToken) {
        console.log('Updating access token...');
        TokenAccess = newTokens.accessToken;  // Update the access token to the new one.
      } else {
        console.error('Error: No access token in the refreshed tokens.');
        return null;
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  } else {
    console.log('Access token is still valid.');
  }

  // Step 5: Return the valid access token.
  console.log("Returning valid access token:", TokenAccess);
  return TokenAccess;
};

// Utility function to check if the token is expired.
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));  // Decoding the JWT token to get its expiry date.
    const expiryTime = decoded.exp * 1000;  // Convert expiry time to milliseconds.
    const currentTime = Date.now();
    return currentTime >= expiryTime;
  } catch (e) {
    console.error('Error decoding token:', e);
    return true;  // If decoding fails, assume the token is expired.
  }
};


