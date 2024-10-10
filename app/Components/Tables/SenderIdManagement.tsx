import React, { useState, useEffect } from 'react';
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi'; // Importing toggle icons

type ApiKeyItem = {
  id: number;
  name: string;
  userId: number;
  purpose: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type TableComponentProps = {
  userId: number | null;
};
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const TableComponent: React.FC<TableComponentProps> = ({ userId }) => {
  const [data, setData] = useState<ApiKeyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (userId === null) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/senders`);
      const result = await response.json();
      const formattedData = result.map((item: ApiKeyItem) => ({
        id: item.id,
        name: item.name,
        userId: item.userId,
        purpose: item.purpose,
        status: item.status,
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

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      await fetch(`${apiUrl}/senders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const toggleStatus = (id: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'approved' ? 'disapproved' : 'approved' }
          : item
      )
    );
    const newStatus = data.find((item) => item.id === id)?.status === 'approved' ? 'disapproved' : 'approved';
    updateStatus(id, newStatus || 'disabled');
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
          <td className="py-4 px-4 text-gray-500 border-b">{item.purpose}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.createdAt}</td>
          <td className="py-4 px-4 text-gray-500 border-b">
            {/* Toggle icon with click handler */}
            <div className="flex items-center">
              <span className="mr-2">{item.status}</span>
              <button onClick={() => toggleStatus(item.id)}>
                {item.status === 'approved' ? (
                  <FiToggleRight size={30} color="green" />
                ) : (
                  <FiToggleLeft size={30} color="red" />
                )}
              </button>
            </div>
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">API Keys</h2>
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead className="bg-gray-100 text-slate-600">
          <tr>
            <th className="py-2 px-4 text-left border-b">Name</th>
            <th className="py-2 px-4 text-left border-b">purpose</th>
            <th className="py-2 px-4 text-left border-b">Date Updated</th>
            <th className="py-2 px-4 text-left border-b">Status</th>
          </tr>
        </thead>
        <tbody>{renderTableContent()}</tbody>
      </table>
    </div>
  );
};

export default TableComponent;
