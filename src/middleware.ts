
// // // //   // If the route is protected and the token is missing
// // // //     // Case 1: If no access token, try refreshing the token
   
// // // //           // Set the new access token in cookies and redirect to the same route
   
// // // //       // If refresh token is invalid or refresh fails, log out the user
 

// // // //       // If refresh fails, redirect to login page


// // // //     // Case 2: If the access token is expired, attempt to refresh it

// // // //         // Attempt to refresh the token using the refresh token
  
// // // //             // Set the new access token in cookies after successful refresh
      

// // // //       // If refresh fails, log out the user
  

// // // //       // If refresh fails, redirect to login page
 
// // // //     // Case 3: If no token at all (null token), redirect to login
   

// // // //     // Case 4: Token is valid, proceed to the route
 
// // // // import { NextResponse } from 'next/server';
// // // // import { NextRequest } from 'next/server';
// // // // import { getAccessTokenFromCookies, getRefreshTokenFromCookies } from './data/services/get-token';
// // // // import { refreshAccessToken } from './data/services/refresh-service';
// // // // import { logoutBackendAction } from './data/actions/auth-actions';

// // // // const protectedRoutes = ['/brother'];

// // // // export async function middleware(request: NextRequest) {
// // // //   const currentPath = request.nextUrl.pathname;
// // // //   const token = await getAccessTokenFromCookies();
// // // //   const TokenRefresh = await getRefreshTokenFromCookies();

// // // //   // If the route is protected
// // // //   if (protectedRoutes.some(route => currentPath.startsWith(route))) {

// // // //     // Case 1: If no access token and refresh token is missing or invalid, log out
// // // //     if (!token && !TokenRefresh) {
// // // //       await logoutBackendAction(); // Call logoutAction to handle logout
// // // //       const response = NextResponse.redirect(new URL('/login', request.url));
// // // //       return response;
// // // //     }

// // // //     // Case 2: If the access token is expired, try refreshing it
// // // //     if (token && isTokenExpired(token)) {
// // // //       try {
// // // //         if (TokenRefresh) {
// // // //           const newToken = await refreshAccessToken();
// // // //           if (newToken) {
// // // //             // Set new access token in cookies
// // // //             const response = NextResponse.redirect(request.url);
// // // //             response.cookies.set('accessToken', newToken, { path: '/' });
// // // //             return response;
// // // //           }
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Error refreshing access token:', error);
// // // //       }

// // // //       // If refreshing fails, log out the user
// // // //       await logoutBackendAction(); // Ensure TokenRefresh is valid before calling logout
// // // //       const response = NextResponse.redirect(new URL('/login', request.url));
// // // //       response.cookies.delete('accessToken');
// // // //       response.cookies.delete('refreshToken');
// // // //       return response;
// // // //     }

// // // //     // Case 3: If no token at all (null token), redirect to login
// // // //     if (!token) {
// // // //       console.log("No access token, redirecting to login...");
// // // //       const response = NextResponse.redirect(new URL('/login', request.url));
// // // //       response.cookies.delete('accessToken');
// // // //       response.cookies.delete('refreshToken');
// // // //       return response;
// // // //     }

// // // //     // Case 4: Token is valid, proceed to the route
// // // //     console.log("Token is valid, proceeding to the brother...");
// // // //     return NextResponse.next();
// // // //   }

// // // //   return NextResponse.next();
// // // // }

// // // // // Helper function to check if the token is expired
// // // // function isTokenExpired(token: string): boolean {
// // // //   try {
// // // //     const decodedToken = JSON.parse(atob(token.split('.')[1]));
// // // //     const currentTime = Math.floor(Date.now() / 1000);
// // // //     return decodedToken.exp < currentTime;
// // // //   } catch (error) {
// // // //     console.error('Error decoding token:', error);
// // // //     return true;
// // // //   }
// // // // }
// // // import { NextResponse } from 'next/server';
// // // import { NextRequest } from 'next/server';
// // // import { getAccessTokenFromCookies, getRefreshTokenFromCookies } from './data/services/get-token';
// // // import { refreshAccessToken } from './data/services/refresh-service';
// // // import { logoutBackendAction } from './data/actions/auth-actions';

// // // const protectedRoutes = ['/brother']; // Protected routes

// // // export async function middleware(request: NextRequest) {
// // //   const currentPath = request.nextUrl.pathname;
// // //   const token = await getAccessTokenFromCookies(); // Retrieve the access token
// // //   const TokenRefresh = await getRefreshTokenFromCookies(); // Retrieve the refresh token

// // //   // Case 1: If the user is trying to access a protected route
// // //   if (protectedRoutes.some(route => currentPath.startsWith(route))) {
    
// // //     // Case 2a: No access token and no refresh token (logged out)
// // //     if (!token && !TokenRefresh) {
// // //       await logoutBackendAction(); // Perform logout action
// // //       const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
// // //       return response;
// // //     }

// // //     // Case 2b: Access token is expired, try refreshing it
// // //     if (token && isTokenExpired(token)) {
// // //       try {
// // //         if (TokenRefresh) {
// // //           const newToken = await refreshAccessToken(); // Attempt to refresh the token
// // //           if (newToken) {
// // //             // If successful, set the new access token in cookies and redirect
// // //             const response = NextResponse.redirect(request.url);
// // //             response.cookies.set('accessToken', newToken, { path: '/' });
// // //             console.log("Access token refreshed, redirecting...");
// // //             return response;
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error('Error refreshing access token:', error);
// // //       }

// // //       // If refresh fails, log out the user
// // //       await logoutBackendAction();
// // //       const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
// // //       response.cookies.delete('accessToken');
// // //       response.cookies.delete('refreshToken');
// // //       return response;
// // //     }

// // //     // Case 2c: No access token at all (even if the refresh token exists), redirect to login
// // //     if (!token) {
// // //       console.log("No access token, redirecting to login...");
// // //       const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
// // //       response.cookies.delete('accessToken');
// // //       response.cookies.delete('refreshToken');
// // //       return response;
// // //     }

// // //     // Case 3: Token is valid, proceed to the route
// // //     console.log("Token is valid, proceeding to the brother...");
// // //     return NextResponse.next();
// // //   }

// // //   // If the route is not protected, proceed with the request
// // //   return NextResponse.next();
// // // }

// // // // Helper function to check if the token is expired
// // // function isTokenExpired(token: string): boolean {
// // //   try {
// // //     const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token
// // //     const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
// // //     return decodedToken.exp < currentTime; // Check if token is expired
// // //   } catch (error) {
// // //     console.error('Error decoding token:', error);
// // //     return true; // Consider the token expired if decoding fails
// // //   }
// // // }
// // import { NextResponse } from 'next/server';
// // import { NextRequest } from 'next/server';
// // import { getAccessTokenFromCookies, getRefreshTokenFromCookies } from './data/services/get-token';
// // import { refreshAccessToken } from './data/services/refresh-service';
// // import { logoutBackendAction } from './data/actions/auth-actions';

// // const protectedRoutes = ['/brother']; // Protected routes

// // export async function middleware(request: NextRequest) {
// //   const currentPath = request.nextUrl.pathname;
// //   const token = await getAccessTokenFromCookies(); // Retrieve the access token
// //   const TokenRefresh = await getRefreshTokenFromCookies(); // Retrieve the refresh token

// //   // Case 1: If both the access token and refresh token exist and user is trying to access /login,
// //   // redirect them to the brother
// //   if (token && TokenRefresh && currentPath === '/login') {
// //     console.log("Both tokens exist, redirecting to the brother...");
// //     return NextResponse.redirect(new URL('/brother', request.url)); // Redirect to the brother
// //   }

// //   // If the route is protected (like /brother)
// //   if (protectedRoutes.some(route => currentPath.startsWith(route))) {
    
// //     // Case 2a: No access token and no refresh token (logged out)
// //     if (!token && !TokenRefresh) {
// //       await logoutBackendAction(); // Perform logout action
// //       const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
// //       return response;
// //     }

// //     // Case 2b: Access token is expired, try refreshing it
// //     if (token && isTokenExpired(token)) {
// //       try {
// //         if (TokenRefresh) {
// //           const newToken = await refreshAccessToken(); // Attempt to refresh the token
// //           if (newToken) {
// //             // If successful, set the new access token in cookies and redirect
// //             const response = NextResponse.redirect(request.url);
// //             response.cookies.set('accessToken', newToken, { path: '/' });
// //             console.log("Access token refreshed, redirecting...");
// //             return response;
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error refreshing access token:', error);
// //       }

// //       // If refresh fails, log out the user
// //       await logoutBackendAction();
// //       const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
// //       response.cookies.delete('accessToken');
// //       response.cookies.delete('refreshToken');
// //       return response;
// //     }

// //     // Case 2c: No access token at all (even if the refresh token exists), redirect to login
// //     if (!token) {
// //       console.log("No access token, redirecting to login...");
// //       const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
// //       response.cookies.delete('accessToken');
// //       response.cookies.delete('refreshToken');
// //       return response;
// //     }

// //     // Case 3: Token is valid, proceed to the route
// //     console.log("Token is valid, proceeding to the brother...");
// //     return NextResponse.next();
// //   }

// //   // If the route is not protected (e.g., public pages), proceed with the request
// //   return NextResponse.next();
// // }

// // // Helper function to check if the token is expired
// // function isTokenExpired(token: string): boolean {
// //   try {
// //     const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token
// //     const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
// //     return decodedToken.exp < currentTime; // Check if token is expired
// //   } catch (error) {
// //     console.error('Error decoding token:', error);
// //     return true; // Consider the token expired if decoding fails
// //   }
// // }
// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import { getAccessTokenFromCookies, getRefreshTokenFromCookies } from './data/services/get-token';
// import { refreshAccessToken } from './data/services/refresh-service';
// import { logoutBackendAction } from './data/actions/auth-actions';

// const protectedRoutes = ['/brother'];

// export async function middleware(request: NextRequest) {
//   const currentPath = request.nextUrl.pathname;
//   const token = await getAccessTokenFromCookies(); // Retrieve the access token
//   const TokenRefresh = await getRefreshTokenFromCookies(); // Retrieve the refresh token

//   // Case 1: If both the access token and refresh token exist and the user is trying to access /login,
//   // redirect them to the brother
//   if (token && TokenRefresh && currentPath === '/login') {
//     console.log("Both tokens exist, redirecting to the brother...");
//     return NextResponse.redirect(new URL('/brother', request.url)); // Redirect to the brother
//   }

//   // If the route is protected (like /brother)
//   if (protectedRoutes.some(route => currentPath.startsWith(route))) {

//     // Case 2a: No access token and no refresh token (logged out)
//     if (!token && !TokenRefresh) {
//       await logoutBackendAction(); // Perform logout action
//       const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
//       return response;
//     }

//     // Case 2b: Access token is expired, try refreshing it
//     if (token && isTokenExpired(token)) {
//       try {
//         if (TokenRefresh) {
//           // Wait for the token refresh to complete
//           const newToken = await refreshAccessToken(); // Pass refresh token to refresh access token
//           if (newToken) {
//             // If successful, set the new access token in cookies and redirect to the same route
//             const response = NextResponse.redirect(request.url);
//             response.cookies.set('accessToken', newToken, { path: '/' });
//             console.log("Access token refreshed, redirecting...");
//             return response;
//           }
//         }
//       } catch (error) {
//         console.error('Error refreshing access token:', error);
//       }

//       // // If refresh fails, log out the user
//       // await logoutBackendAction();
//       // const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
//       // response.cookies.delete('accessToken');
//       // response.cookies.delete('refreshToken');
//       // return response;
//     }

//     // Case 2c: No access token at all (even if the refresh token exists), redirect to login
//     if (!token) {
//       console.log("No access token, redirecting to login...");
//       const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
//       response.cookies.delete('accessToken');
//       response.cookies.delete('refreshToken');
//       return response;
//     }

//     // Case 3: Token is valid, proceed to the route
//     console.log("Token is valid, proceeding to the brother...");
//     return NextResponse.next();
//   }

//   // If the route is not protected (e.g., public pages), proceed with the request
//   return NextResponse.next();
// }

// // Helper function to check if the token is expired
// function isTokenExpired(token: string): boolean {
//   try {
//     const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token
//     const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
//     return decodedToken.exp < currentTime; // Check if token is expired
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return true; // Consider the token expired if decoding fails
//   }
// }
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAccessTokenFromCookies, getRefreshTokenFromCookies } from './data/services/token/get-token';
import { refreshAccessToken } from './data/services/token/refresh-service';
import { logoutBackendAction } from './data/actions/auth-actions';

const protectedRoutes = ['/brother'];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const token = await getAccessTokenFromCookies();
  const TokenRefresh = await getRefreshTokenFromCookies();

  // Case 1: If both access and refresh tokens exist, but user is trying to access /login
  if (token && TokenRefresh && currentPath === '/login') {
    console.log("Both tokens exist, redirecting to the brother...");
    return NextResponse.redirect(new URL('/brother', request.url)); // Redirect to brother if already authenticated
  }

  // If the route is protected (like /brother)
  if (protectedRoutes.some(route => currentPath.startsWith(route))) {

    // Case 2: No tokens or invalid tokens
    if (!token && !TokenRefresh) {
      console.log("No tokens, logging out...");
      await logoutBackendAction(); // Log out user
      console.log("No tokens, logging out... 2");

      const response = NextResponse.redirect(new URL('/login', request.url));
      return response;
    }

    // Case 3: If the access token is expired, attempt to refresh it
    if (token && isTokenExpired(token)) {
      // // If the token is expired, set a cookie to notify the client to reload the page
      // const response = NextResponse.next();

      // // Set a cookie indicating token is expired
      // response.cookies.set('token_expired', 'true', { path: '/', httpOnly: false, maxAge: 60 * 60 });  // Set it to 1 hour
      try {

        if (TokenRefresh) {
          const newToken = await refreshAccessToken(); // Refresh the token
          console.log("testnewtoken", newToken)
          if (newToken) {
            // Set the new access token in cookies
            const response = NextResponse.next();
            // response.cookies.set('accessToken', newToken.accessToken, { path: '/' });
            // response.cookies.set('testaccess_token', newToken.accessToken, { path: '/', secure: process.env.NODE_ENV === 'production',
            //   sameSite: 'strict', });

            console.log("Access token refreshed successfully, proceeding...");
            return response; // Proceed with the request after refreshing token
          }
        }
      } catch (error) {
        console.error('Error refreshing access token:', error);
      }

      // // If the refresh fails, log out the user
      // console.log("Refresh failed, logging out...");
      // await logoutBackendAction(); // Log out user
      // const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
      // response.cookies.delete('accessToken');
      // response.cookies.delete('refreshToken');
      // return response;
    }

    // Case 4: If the refresh token is expired, attempt to refresh it
    if (TokenRefresh && isTokenExpired(TokenRefresh)) {
      const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;

    }


    // Case 5: If no access token at all (check if the refresh token exists), redirect to login
    if (!token) {
      try {

        if (TokenRefresh) {
          const newToken = await refreshAccessToken(); // Refresh the token
          console.log("testnewtoken", newToken)
          if (newToken) {
            // Set the new access token in cookies
            const response = NextResponse.next();
            // response.cookies.set('accessToken', newToken.accessToken, { path: '/' });
            // response.cookies.set('testaccess_token', newToken.accessToken, { path: '/', secure: process.env.NODE_ENV === 'production',
            //   sameSite: 'strict', });

            console.log("Access token refreshed successfully, proceeding...");
            return response; // Proceed with the request after refreshing token
          }
        } else {
          console.log("No access token, redirecting to login...");
      const response = NextResponse.redirect(new URL('/login', request.url)); // Redirect to login
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
        }
      } catch (error) {
        console.error('Error refreshing access token:', error);
      }

    }

    // Case 6: Token is valid, proceed to the route
    console.log("Token is valid, proceeding to the brother...");
    return NextResponse.next();
  }

  // If the route is not protected (e.g., public pages), proceed with the request
  return NextResponse.next();
}

// Helper function to check if the token is expired
function isTokenExpired(token: string): boolean {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return decodedToken.exp < currentTime; // Check if token is expired
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Consider the token expired if decoding fails
  }
}
