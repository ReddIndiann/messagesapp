'use server'
import { cookies } from 'next/headers';

// Function to save data to cookies
// export const saveToCookies = (key: string, value: any, expiresInDays: number = 1): void => {
//   const cookieStore = cookies();
//   cookieStore.set({
//     name: key,
//     value: JSON.stringify(value),
//     expires: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000), // Expires in the specified number of days
//   });
// };
// export const createAuthCookie = async () => {
//   cookies().set("userAuth", "myToken", { secure: true });
// };
// Function to get data from cookies
export const getFromCookies = (key: string): any | null => {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get(key);
  return cookieValue ? JSON.parse(cookieValue.value) : null;
};
export const deleteAuthCookie = async () => {
  cookies().delete("signInResponse");
};
export const saveToCookies = async () => {
  cookies().set("signInResponse", "myToken", { secure: true });
};
// Function to delete a cookie
// export const deleteCookie = (key: string): void => {
//   const cookieStore = cookies();
//   cookieStore.delete({
//     name: key,
//    // Set an empty value
//   // Expire immediately
//   });
// };
