// lib/fetchBundles.ts
import axios from 'axios';

// Define the expected structure of the bundle data based on your API response
interface Bundle {
  userId: number;
  packageId: number;
  package_name: string;
  expiry: string;
  type: string;
  status: string;
  creditscore: number;
  User: {
    id: number;
    username: string;
  };
  Package: {
    id: number;
    name: string;
  };
}

// Define the structure of the response from the server
interface FetchBundlesResponse {
  bundles: Bundle[];
  creditScores: {
    expiry: number;
    nonExpiry: number;
    bonus: number;
    combinedExpiryNonExpiry: number;
  };
}

// Async function to fetch bundle history by user ID
export const fetchBundleHistory = async (userId: number): Promise<FetchBundlesResponse> => {
  try {
    const response = await axios.get<FetchBundlesResponse>(`http://localhost:5000/bundle/usertype/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bundle data:', error);
    throw error; // Rethrow the error so it can be handled by the calling code
  }
};
