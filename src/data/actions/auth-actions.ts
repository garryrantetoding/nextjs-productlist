"use server";
import { cookies } from 'next/headers';
import { z } from "zod";
import { redirect } from "next/navigation";
import { registerUserService } from "../services/auth-service";
// import { useRouter } from 'next/router';  // Make sure you're importing useRouter
import CryptoJS from "crypto-js";
import { LogoutBackend } from '../services/token/refresh-service';


// const router = useRouter();

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// Registration Schema
const schemaRegister = z.object({
  name: z.string().min(3, {
    message: "Username must contain at least 3 characters", // Custom error message
  }).max(20, {
    message: "Username must be between 3 and 20 characters", // Custom error message for max length
  }),
  password: z.string()
  .refine((val) => val.length >= 6 && /[a-z]/.test(val) && /[A-Z]/.test(val) && /\d/.test(val) && /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: "Password is invalid. See requirements below:",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  
});

// zodErrors: {
//   username: [null],
//   email: [null],
//   password: ["Registration failed. Password is not strong enough."],},
// message: "Registration failed. Password is not strong enough.",
// isSubmitted: true,
// };

// // Example function to encrypt the password
// const encryptPassword = (password: string) => {
//   const encryptedPassword = CryptoJS.AES.encrypt(password, 'your-secret-key').toString();
//   return encryptedPassword;
// };

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

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }
  
  
  // Encrypt the password here
  const encryptedPassword = encryptPassword(validatedFields.data.password);

  // Replace password with the encrypted password in the payload
  const registerData = {
    ...validatedFields.data,
    password: encryptedPassword,
  };


  try {
    // Call the registerUserService to make the API request for user registration
    const responseData = await registerUserService(registerData);
    // console.log("Registration Response:", responseData);
    
    if (responseData?.accessToken && responseData?.refreshToken) {
      // Store tokens in cookies (fix argument type)
      const cookieStore = await cookies();
      cookieStore.set('accessToken', responseData.accessToken, config);
      cookieStore.set('refreshToken', responseData.refreshToken, config);

      // Redirect to dashboard after successful registration
   
      // // Use router.push() for client-side redirection
      // router.push("/dashboard");  // This is the correct client-side redirect
      
      return {
        ...prevState,
        message: "Registration successful!", 
        data: responseData,
        isSubmitted: true,
      };
    } else if (responseData?.zodmessage === "Registration failed. Username already exists."){
      return {
        ...prevState,
        zodErrors: {
          name: ["Registration failed. Username already exists."],
          email: [null],
          password: [null],
        },
        message: null,
        isSubmitted: true,
      };
    }

    else if (responseData?.zodmessage === "Registration failed. Email is already registered.") {
      return {
      ...prevState,
      zodErrors: {
        name: [null],
        email: ["Registration failed. Email is already registered."],
        password: [null],
      },
      message: null,
      isSubmitted: true,
    };}
   
    else {
      return {
        ...prevState,
        zodErrors: {
          name: [null],
          email: [null],
          password: ["Registration failed. Password is not strong enough."],},
        message: "Registration failed. Password is not strong enough.",
        isSubmitted: true,
      };
    }
  } catch (error: any) {
    console.error("Error in registerUserAction:", error);
    return {
      ...prevState,
      zodErrors: null,
      message: `An unexpected error occurred. ${error?.message || ''}`,
      isSubmitted: true,
    };
  }
}

import { loginUserService } from "../services/auth-service";
import { getRefreshTokenFromCookies } from '../services/token/get-token';

const schemaLogin = z.object({
  name: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    name: formData.get("name"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

   // Encrypt the password for login
   const encryptedPassword = encryptPassword(validatedFields.data.password);
// console.log("testpassword", encryptedPassword)
  // // Replace password with the encrypted password in the payload
  // const loginData = {
  //   validatedFields.data.username
  //   password: encryptedPassword,
  // };

  try {
    const responseData = await loginUserService({
      ...validatedFields.data,
      password: encryptedPassword, // Use the encrypted password
    }
    );
    // console.log(responseData); // Log the responseData to check the response
    
    if (responseData?.accessToken && responseData?.refreshToken) {
      // Store tokens in cookies (fix argument type)
      const cookieStore = await cookies();
      cookieStore.set('accessToken', responseData.accessToken, {
        httpOnly: true,
        path: '/',
      });
      cookieStore.set('refreshToken', responseData.refreshToken, {
        httpOnly: true,
        path: '/',
      });

      return { 
        message: "Login Successful!", 
        data: responseData 
      };
    } else if (responseData?.zodmessage === `Login failed. Username ${validatedFields.data.name} does not exist.`){
      return {
        ...prevState,
        zodErrors: {
          name: [`Name ${validatedFields.data.name} does not exist.`],
          password: null,
        },
        message: null,
      };
    } else if (responseData?.zodmessage === "Login failed. Incorrect password."){
      return {
        ...prevState,
        zodErrors: {
          name: null,
          password: ["Incorrect password."],
        },
        message: null,
      };
    } else {
      return {
        ...prevState,
        zodErrors: null,
        message: "Login failed. Invalid credentials or server error.",
      };
    }
  } catch (error: any) {
    console.error("Error in loginUserAction:", error); 
    return {
      ...prevState,
      zodErrors: null,
      message: `An unexpected error occurred. ${error?.message || ''}`,
    };
  }
}

// export async function logoutAction() {
// const TokenRefresh = await getRefreshTokenFromCookies();
// try {
// const deletebackendtoken =  await LogoutBackend(TokenRefresh); // Logout the user on the backend

// }
//   // Get the cookie store
//   const cookieStore = await cookies();

//   // Delete the cookies for accessToken and refreshToken
//   cookieStore.set('accessToken', '', { path: '/', expires: new Date(0) });
//   cookieStore.set('refreshToken', '', { path: '/', expires: new Date(0) });

//   // Redirect to the login page after logout
//   redirect("/login");
// }

export async function logoutAction() {
  const TokenRefresh = await getRefreshTokenFromCookies(); // Get the refresh token from cookies

  try {
    // Logout the user from the backend
    if (TokenRefresh) {
      const deleteBackendToken = await LogoutBackend(); // Call the logout API
      if (deleteBackendToken) {
        console.log("Logout successful on the backend.");

  // Get the cookie store
  const cookieStore = await cookies();

  // Delete the cookies for accessToken and refreshToken
  cookieStore.set('accessToken', '', { path: '/', expires: new Date(0) });
  cookieStore.set('refreshToken', '', { path: '/', expires: new Date(0) });

  // Redirect to the login page after logout
  //  redirect("/login");
      } else {
        console.error("Logout failed on the backend.");
      }
    }
  } catch (error) {
    console.error("Error logging out from backend:", error);
  }

}



export async function logoutBackendAction() {
  const TokenRefresh = await getRefreshTokenFromCookies(); // Get the refresh token from cookies

  if (!TokenRefresh) {
    console.error("No refresh token found, can't log out.");
  // Get the cookie store
  const cookieStore = await cookies();
  // Delete the cookies for accessToken and refreshToken
  cookieStore.set('accessToken', '', { path: '/', expires: new Date(0) });
  cookieStore.set('refreshToken', '', { path: '/', expires: new Date(0) });

  }

  try {
    // Logout the user from the backend
    const deleteBackendToken = await LogoutBackend(); // Call the logout API
    if (deleteBackendToken) {
      console.log("Logout successful on the backend. 2");

      // Get the cookie store
      const cookieStore = await cookies();

      // Delete the cookies for accessToken and refreshToken
      cookieStore.set('accessToken', '', { path: '/', expires: new Date(0) });
      cookieStore.set('refreshToken', '', { path: '/', expires: new Date(0) });

      // Do not redirect here, let the middleware handle the redirect
    } else {
      console.error("Logout failed on the backend.");
    }
  } catch (error) {
    console.error("Error logging out from backend:", error);
  }
}



