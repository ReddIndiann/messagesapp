'use server';
import { cookies } from 'next/headers';

// Save data to cookies (for server-side usage)
export const saveToCookies = async (token: string): Promise<void> => {
  cookies().set("signInResponse", token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60, 
  });
};

// Get data from cookies
export const getFromCookies = (key: string): string | null => {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get(key);
  return cookieValue ? cookieValue.value : null;
};

// Delete authentication cookie
export const deleteAuthCookie = async (): Promise<void> => {
  cookies().delete("signInResponse");
};
