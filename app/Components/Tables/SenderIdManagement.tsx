import React, { useState, useEffect } from 'react';

type SenderItem = {
  id: number;
  name: string;
  userId: number;
  purpose: string;
  status: 'pending' | 'approved' | string;
  createdAt: string;
  updatedAt: string;
};

type TableComponentProps = {
  section: 'pending' | 'approved' | string;
  userId: number | null;
};

const TableComponent: React.FC<TableComponentProps> = ({ section, userId }) => {
  const [data, setData] = useState<SenderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId === null) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/senders');
        const result = await response.json();
        const filteredData = result.filter((item: any) => item.status === section);
        const formattedData = filteredData.map((item: any) => ({
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

    fetchData();
  }, [section, userId]);

  const handleStatusChange = async (id: number, newStatus: 'approved' | 'pending') => {
    try {
      const response = await fetch(`http://localhost:5000/senders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh data after status update
      const updatedData = data.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      setData(updatedData);
    } catch (error) {
      console.error('Error updating status:', error);
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
      data.map((item, index) => (
        <tr key={index} className="border-t">
          <td className="py-4 px-4 text-gray-500 border-b">{item.id}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.name}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.purpose}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.status}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.createdAt}</td>
          <td className="py-4 px-4 text-gray-500 border-b">{item.updatedAt}</td>
          <td className="py-4 px-4 text-gray-500 border-b">
            {section === 'pending' && (
              <button
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                onClick={() => handleStatusChange(item.id, 'approved')}
              >
                Approve
              </button>
            )}
            {section === 'approved' && (
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleStatusChange(item.id, 'pending')}
              >
                Disapprove
              </button>
            )}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={7} className="py-4 px-4 text-center text-gray-500 border-b">
          No Data Available
        </td>
      </tr>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {section === 'pending' ? 'Pending Sender IDs' : 'Approved Sender IDs'}
      </h2>
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead className="bg-gray-100 text-slate-600">
          <tr>
            <th className="py-2 px-4 text-left border-b">ID</th>
            <th className="py-2 px-4 text-left border-b">Name</th>
            <th className="py-2 px-4 text-left border-b">Purpose</th>
            <th className="py-2 px-4 text-left border-b">Status</th>
            <th className="py-2 px-4 text-left border-b">Created At</th>
            <th className="py-2 px-4 text-left border-b">Updated At</th>
            <th className="py-2 px-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderTableContent()}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
