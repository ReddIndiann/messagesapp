import React, { useState, useEffect } from 'react';
import { updateUserById } from '@/app/lib/userlib';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

type EditUserProps = {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
};

const EditUser: React.FC<EditUserProps> = ({ isOpen, onClose, user }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [role, setRole] = useState<string>('User');
  const [walletbalance, setWalletbalance] = useState<number>(0);
  const [creditbalance, setCreditbalance] = useState<number>(0);
  const MySwal = withReactContent(Swal); // Initialize SweetAlert with React integration

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setNumber(user.number);
      setRole(user.role);
      setWalletbalance(user.walletbalance);
      setCreditbalance(user.creditbalance); // Corrected typo
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSave = async () => {
    if (user) {
      const updatedUserData = {
        username,
        email,
        number,
        role,
        walletbalance,
        creditbalance,
      };

      try {
        const updatedUser = await updateUserById(user.id, updatedUserData);
        console.log('User updated successfully:', updatedUser);

        // Show SweetAlert for success
        MySwal.fire({
          title: 'Success!',
          text: 'User updated successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });

        onClose(); // Close the modal after successful save
      } catch (error) {
        console.error('Error updating user:', error);

        // Show SweetAlert for error
        MySwal.fire({
          title: 'Error!',
          text: 'There was an error updating the user. Please try again.',
          icon: 'error',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl text-gray-700 font-semibold mb-4">Edit User</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full border text-gray-700 border-gray-300 px-3 py-2 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border text-gray-700 border-gray-300 px-3 py-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Number</label>
            <input
              type="text"
              className="w-full border text-gray-700 border-gray-300 px-3 py-2 rounded"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              className="w-full border text-gray-700 border-gray-300 px-3 py-2 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Wallet Balance</label>
            <input
              type="number"
              className="w-full border text-gray-700 border-gray-300 px-3 py-2 rounded"
              value={walletbalance}
              onChange={(e) => setWalletbalance(Number(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Credit Balance</label>
            <input
              type="number"
              className="w-full border text-gray-700 border-gray-300 px-3 py-2 rounded"
              value={creditbalance}
              onChange={(e) => setCreditbalance(Number(e.target.value))}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
