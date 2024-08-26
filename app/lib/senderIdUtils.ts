// src/lib/senderIdUtils.ts

// Function to fetch sender IDs for a user
export const fetchSenderIds = async (userId: number) => {
  try {
    const response = await fetch(`http://localhost:5000/senders/user/${userId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Failed to fetch sender IDs');
    }

    return data; // Return the fetched sender IDs
  } catch (err: any) {
    console.error('Error fetching sender IDs:', err.message || 'An error occurred');
    throw err;
  }
};



// src/lib/senderIdUtils.ts

// Function to fetch sender IDs and split them into approved and pending
export const fetchallSenderIds = async () => {
  try {
    const response = await fetch(`http://localhost:5000/senders/user/`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Failed to fetch sender IDs');
    }

    return data; // Return the fetched sender IDs
  } catch (err: any) {
    console.error('Error fetching sender IDs:', err.message || 'An error occurred');
    throw err;
  }
};


// Function to delete a sender ID
export const deleteSenderId = async (senderId: number) => {
  try {
    const response = await fetch(`http://localhost:5000/senders/${senderId}`, { method: 'DELETE' });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Failed to delete Sender ID');
    }
 
    return data; // Return a success message or the deleted item details
  } catch (err: any) {
    console.error('Error deleting sender ID:', err.message || 'An error occurred');
    throw err;
  }
};

// Function to register a new Sender ID
export const registerSenderId = async (senderID: string, userId: number, purpose: string) => {
  try {
    const response = await fetch('http://localhost:5000/senders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: senderID,
        userId,
        purpose,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to register Sender ID');
    }

    return response.json(); // Return the response data
  } catch (err: any) {
    console.error('Error registering Sender ID:', err.message || 'An error occurred');
    throw err;
  }
};
