import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

type PackageItem = {
  id: number;
  name: string;
  type: string;
  price: number;
  rate: number;
  smscount: number;
  expiry: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type TableComponentProps = {
  userId: number | null;
};

export type TableComponentRef = {
  refreshData: () => void;
};

const TableComponent = forwardRef<TableComponentRef, TableComponentProps>(({ userId }, ref) => {
  const [data, setData] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  const fetchData = async () => {
    if (userId === null) return;

    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/packages`);
      const formattedData = response.data.map((item: PackageItem) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleString(),
        updatedAt: new Date(item.updatedAt).toLocaleString(),
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  useImperativeHandle(ref, () => ({
    refreshData: fetchData,
  }));

  const deletePackage = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/packages/${id}`);
      setData(prevData => prevData.filter(item => item.id !== id));
      Swal.fire('Deleted!', 'The package has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting package:', error);
      Swal.fire('Error!', 'There was a problem deleting the package.', 'error');
    }
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deletePackage(id);
      }
    });
  };

  // Open Edit Modal and populate fields with the selected package data
  const openEditModal = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
    setIsEditModalOpen(true);
  };

  // Close the modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPackage(null);
  };

  const handleEditSubmit = async () => {
    if (!selectedPackage) return;

    try {
      await axios.put(`${apiUrl}/packages/${selectedPackage.id}`, selectedPackage);
      Swal.fire('Updated!', 'Package has been updated.', 'success');
      fetchData(); // Refresh data after edit
      closeEditModal();
    } catch (error) {
      console.error('Error updating package:', error);
      Swal.fire('Error!', 'There was a problem updating the package.', 'error');
    }
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={6} className="py-4 px-4 text-center text-gray-500 border-b">
            Loading...
          </td>
        </tr>
      );
    }

    return data.length > 0 ? (
      data.map((item) => (
        <tr key={item.id} className="border-t">
          <td className="py-4 px-4 text-gray-500 border-b">{item.name}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.type}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.price}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.smscount}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.updatedAt}</td>
          <td className="py-4 px-4 text-gray-500 border-b">
            <button onClick={() => openEditModal(item)} className="text-blue-500 hover:text-blue-700 mr-2">
              <FiEdit size={24} />
            </button>
            <button onClick={() => confirmDelete(item.id)} className="text-red-500 hover:text-red-700">
              <FiTrash2 size={24} />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={6} className="py-4 px-4 text-center text-gray-500 border-b">
          No Data Available
        </td>
      </tr>
    );
  };

  const renderEditModal = () => {
    if (!selectedPackage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-medium mb-4 text-black">Edit Package</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={selectedPackage.name}
              onChange={(e) => setSelectedPackage({ ...selectedPackage, name: e.target.value })}
            />
            <label className="block text-gray-700 mb-2" htmlFor="type">
              Type
            </label>
            <input
              id="type"
              type="text"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={selectedPackage.type}
              onChange={(e) => setSelectedPackage({ ...selectedPackage, type: e.target.value })}
            />
            <label className="block text-gray-700 mb-2" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={selectedPackage.price}
              onChange={(e) => setSelectedPackage({ ...selectedPackage, price: Number(e.target.value) })}
            />
            <label className="block text-gray-700 mb-2" htmlFor="smscount">
              SMS Count
            </label>
            <input
              id="smscount"
              type="number"
              className="w-full p-2 border border-gray-300 rounded text-black"
              value={selectedPackage.smscount}
              onChange={(e) => setSelectedPackage({ ...selectedPackage, smscount: Number(e.target.value) })}
            />
          </div>

          <div className="flex justify-end">
            <button className="bg-gray-100 text-gray-800 py-2 px-4 rounded mr-2" onClick={closeEditModal}>
              Cancel
            </button>
            <button className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500" onClick={handleEditSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Packages</h2>
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead className="bg-gray-100 text-slate-600">
          <tr>
            <th className="py-2 px-4 text-left border-b">Name</th>
            <th className="py-2 px-4 text-left border-b">Type</th>
            <th className="py-2 px-4 text-left border-b">Price</th>
            <th className="py-2 px-4 text-left border-b">SMS Count</th>
            <th className="py-2 px-4 text-left border-b">Date Updated</th>
            <th className="py-2 px-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>{renderTableContent()}</tbody>
      </table>

      {isEditModalOpen && renderEditModal()}
    </div>
  );
});

TableComponent.displayName = 'TableComponent';

export default TableComponent;
