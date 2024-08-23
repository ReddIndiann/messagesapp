import React, { useState, useEffect } from 'react';

type CampaignHistoryItem = {
  name: string;
  totalRecipients: number;
  senderId: number;
  dateTime: string;
  totalCreditUsed: number;
  walletBalanceUsed: number;
};

type DeliveryReportItem = {
  id: number;
  recipients: string;
  senderId: number;
  userId: number;
  content: string;
  messageType: string;
  recursion: string;
  createdAt: string;
  updatedAt: string;
};

type UserReportItems = {
  id: number;
  username: string;
  email: string;
  userId: number;
  number: string;
  role: string;
  walletbalance: number;
  creditalance: number;
  createdAt: string;
  updatedAt: string;
};

type TableComponentProps = {
  section: 'campaignHistory' | 'deliveryReport' | 'usersreport';
  userId: number | null;
};

const TableComponent: React.FC<TableComponentProps> = ({ section, userId }) => {
  const [data, setData] = useState<CampaignHistoryItem[] | DeliveryReportItem[] | UserReportItems[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId === null) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        const campresponse = await fetch(`http://localhost:5000/send-messages/user/${userId}`);
        const campresult = await campresponse.json();
        const userresponse = await fetch(`http://localhost:5000/auth`);
        const userresult = await userresponse.json();

        if (section === 'campaignHistory') {
          const formattedData = campresult.map((item: any) => ({
            name: item.content,
            totalRecipients: 1, // Placeholder
            senderId: item.senderId,
            dateTime: new Date(item.createdAt).toLocaleString(),
            totalCreditUsed: 0, // Placeholder
            walletBalanceUsed: 0, // Placeholder
          }));
          setData(formattedData);
        } else if (section === 'deliveryReport') {
          const formattedData = campresult.map((item: any) => ({
            id: item.id,
            recipients: item.recipients,
            senderId: item.senderId,
            content: item.content,
            messageType: item.messageType,
            createdAt: new Date(item.createdAt).toLocaleString(),
          }));
          setData(formattedData);
        } else if (section === 'usersreport') {
          const formattedData = userresult.map((item: any) => ({
            id: item.id,
            username: item.username, // Updated to match the API field
            email: item.email,
            number: item.number,
            role: item.role,
            walletbalance: item.walletbalance,
            creditalance: item.creditalance,
            createdAt: new Date(item.createdAt).toLocaleString(),
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [section, userId]);

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

    if (section === 'campaignHistory') {
      return (data as CampaignHistoryItem[]).length > 0 ? (
        (data as CampaignHistoryItem[]).map((item, index) => (
          <tr key={index} className="border-t">
            <td className="py-4 px-4 text-gray-500 border-b">{item.name}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.totalRecipients}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.senderId}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.dateTime}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.totalCreditUsed}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.walletBalanceUsed}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} className="py-4 px-4 text-center text-gray-500 border-b">
            No Data Available
          </td>
        </tr>
      );
    } else if (section === 'deliveryReport') {
      return (data as DeliveryReportItem[]).length > 0 ? (
        (data as DeliveryReportItem[]).map((item, index) => (
          <tr key={index} className="border-t">
            <td className="py-4 px-4 text-gray-500 border-b">{item.id}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.recipients}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.senderId}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.createdAt}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.content}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.messageType}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} className="py-4 px-4 text-center text-gray-500 border-b">
            No Data Available
          </td>
        </tr>
      );
    } else if (section === 'usersreport') {
      return (data as UserReportItems[]).length > 0 ? (
        (data as UserReportItems[]).map((item, index) => (
          <tr key={index} className="border-t">
            <td className="py-4 px-4 text-gray-500 border-b">{item.id}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.username}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.email}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.number}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.role}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.walletbalance}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.creditalance}</td>
            <td className="py-4 px-4 text-gray-500 border-b">{item.createdAt}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={8} className="py-4 px-4 text-center text-gray-500 border-b">
            No Data Available
          </td>
        </tr>
      );
    }

    return null;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {section === 'campaignHistory' ? 'SMS Campaign History' : section === 'deliveryReport' ? 'Delivery Report' : 'User Report'}
      </h2>
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead className="bg-gray-100 text-slate-600">
          <tr>
            {section === 'campaignHistory' ? (
              <>
                <th className="py-2 px-4 text-left border-b">Name</th>
                <th className="py-2 px-4 text-left border-b">Total Recipients</th>
                <th className="py-2 px-4 text-left border-b">Sender ID</th>
                <th className="py-2 px-4 text-left border-b">Date and Time</th>
                <th className="py-2 px-4 text-left border-b">Total Credit Used</th>
                <th className="py-2 px-4 text-left border-b">Wallet Balance Used</th>
              </>
            ) : section === 'deliveryReport' ? (
              <>
                <th className="py-2 px-4 text-left border-b">ID</th>
                <th className="py-2 px-4 text-left border-b">Recipients</th>
                <th className="py-2 px-4 text-left border-b">Sender ID</th>
                <th className="py-2 px-4 text-left border-b">Created At</th>
                <th className="py-2 px-4 text-left border-b">Content</th>
                <th className="py-2 px-4 text-left border-b">Message Type</th>
              </>
            ) : section === 'usersreport' ? (
              <>
                <th className="py-2 px-4 text-left border-b">ID</th>
                <th className="py-2 px-4 text-left border-b">Username</th>
                <th className="py-2 px-4 text-left border-b">Email</th>
                <th className="py-2 px-4 text-left border-b">Number</th>
                <th className="py-2 px-4 text-left border-b">Role</th>
                <th className="py-2 px-4 text-left border-b">Wallet Balance</th>
                <th className="py-2 px-4 text-left border-b">Credit Balance</th>
                <th className="py-2 px-4 text-left border-b">Created At</th>
              </>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {renderTableContent()}
        </tbody>
      </table>
      {section === 'campaignHistory' && (
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm">
            1
          </button>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
