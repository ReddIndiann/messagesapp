import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { FiToggleLeft, FiToggleRight, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

type ApiKeyItem = {
  id: number;
  name: string;
  userId: number;
  keyvalue: string;
  status: string;
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
  const [data, setData] = useState<ApiKeyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (userId === null) return;

    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/apikeys/user/${userId}`);
      const formattedData = response.data.map((item: ApiKeyItem) => ({
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

  const toggleStatus = async (id: number) => {
    const item = data.find(item => item.id === id);
    if (!item) return;

    const newStatus = item.status === 'enabled' ? 'disabled' : 'enabled';
    try {
      await axios.put(`${apiUrl}/apikeys/${id}`, { status: newStatus });
      setData(prevData => prevData.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteApiKey = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/apikeys/${id}`);
      setData(prevData => prevData.filter(item => item.id !== id));
      Swal.fire('Deleted!', 'Your API key has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting API key:', error);
      Swal.fire('Error!', 'There was a problem deleting the API key.', 'error');
    }
  };

  const confirmDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteApiKey(id); // Call the delete function only if confirmed
      }
    });
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={5} className="py-4 px-4 text-center text-gray-500 border-b">
            Loading...
          </td>
        </tr>
      );
    }

    return data.length > 0 ? (
      data.map((item) => (
        <tr key={item.id} className="border-t">
          <td className="py-4 px-4 text-gray-500 border-b">{item.name}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.keyvalue}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.updatedAt}</td>
          <td className="py-4 px-4 text-gray-500 border-b">
            <div className="flex items-center">
              <span className="mr-2">{item.status}</span>
              <button onClick={() => toggleStatus(item.id)}>
                {item.status === 'enabled' ? (
                  <FiToggleRight size={30} color="green" />
                ) : (
                  <FiToggleLeft size={30} color="red" />
                )}
              </button>
            </div>
          </td>
          <td className="py-4 px-4 text-gray-500 border-b">
            <button onClick={() => confirmDelete(item.id)} className="text-red-500 hover:text-red-700">
              <FiTrash2 size={24} />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={5} className="py-4 px-4 text-center text-gray-500 border-b">
          No Data Available
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">API Keys</h2>
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead className="bg-gray-100 text-slate-600">
          <tr>
            <th className="py-2 px-4 text-left border-b">Name</th>
            <th className="py-2 px-4 text-left border-b">Key Value</th>
            <th className="py-2 px-4 text-left border-b">Date Updated</th>
            <th className="py-2 px-4 text-left border-b">Status</th>
            <th className="py-2 px-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>{renderTableContent()}</tbody>
      </table>
    </div>
  );
});

TableComponent.displayName = 'TableComponent';

export default TableComponent;
