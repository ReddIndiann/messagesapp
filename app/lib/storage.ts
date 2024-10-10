'use server'
import { cookies } from 'next/headers';

// Function to save data to cookies (for server-side usage)
export const saveToCookies = async (): Promise<void> => {
  // Directly store the token as a plain string
  cookies().set("signInResponse", "myToken",
     { secure: process.env.NODE_ENV === "production",
       httpOnly: true ,
    
      });
};

// Function to get data from cookies
export const getFromCookies = (key: string): string | null => {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get(key);
  return cookieValue ? cookieValue.value : null;  // No JSON.parse needed
};

// Function to delete the authentication cookie
export const deleteAuthCookie = async (): Promise<void> => {
  cookies().delete("signInResponse");
};
