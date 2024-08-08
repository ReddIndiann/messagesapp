import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus, faFileExport } from '@fortawesome/free-solid-svg-icons';

const ContactsTables = () => {
  return (
    <div className="flex space-x-6">
      <div className="w-1/2">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="font-semibold text-base text-slate-500">Contacts (2)</h2>
          <div className="flex space-x-2">
          <button className="bg-orange-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600 flex items-center">
              
              <span className="hidden md:inline">Export</span>
            </button>
            <button className="text-orange-500 font-semibold text-sm px-3 py-1 rounded hover:bg-blue-600 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              <span className="hidden md:inline">Add New Contact</span>
            </button>
           
          </div>
        </div>
        <table className="min-w-full bg-white border-collapse mx-auto text-sm">
          <thead className="bg-gray-100 text-slate-600">
            <tr>
              <th className="py-2 px-4 text-left border-b">Name</th>
              <th className="py-2 px-4 text-left border-b">Mobile</th>
              <th className="py-2 px-4 text-left border-b">Groups</th>
              <th className="py-2 px-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50">
              <td className="py-4 px-4 text-gray-500 border-b text-xs">Daniel Odoi</td>
              <td className="py-4 px-4 text-gray-500 border-b text-xs">0536690447</td>
              <td className="py-4 px-4 text-gray-500 border-b text-xs">list</td>
              <td className="py-4 px-4 border-b">
                <div className="flex space-x-2 items-center">
                  <button className="text-gray-500 text-xs hover:text-blue-500">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-gray-500 text-xs hover:text-yellow-500">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-gray-500 text-xs hover:text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-1/2">
        <div className="mb-4 flex justify-between items-center">
        <h2 className="font-semibold text-base text-slate-500">Contacts (2)</h2>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              <span className="hidden md:inline">Add New Group</span>
            </button>
            <button className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600 flex items-center">
              <FontAwesomeIcon icon={faFileExport} className="mr-1" />
              <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white border-collapse mx-auto text-sm">
          <thead className="bg-gray-100 text-slate-600">
            <tr>
              <th className="py-2 px-4 text-left border-b">Group Name</th>
              <th className="py-2 px-4 text-left border-b">Member Count</th>
              <th className="py-2 px-4 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t hover:bg-gray-50">
              <td className="py-4 px-4 text-gray-500 border-b text-xs">Friends</td>
              <td className="py-4 px-4 text-gray-500 border-b text-xs">0 members</td>
              <td className="py-4 px-4 border-b">
                <div className="flex space-x-2 items-center">
                  <button className="text-gray-500 text-xs hover:text-blue-500">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-gray-500 text-xs hover:text-yellow-500">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-gray-500 text-xs hover:text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-t hover:bg-gray-50">
              <td className="py-4 px-4 text-gray-500 border-b text-xs">list</td>
              <td className="py-4 px-4 text-gray-500 border-b text-xs">1 member</td>
              <td className="py-4 px-4 border-b">
                <div className="flex space-x-2 items-center">
                  <button className="text-gray-500 text-xs hover:text-blue-500">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="text-gray-500 text-xs hover:text-yellow-500">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="text-gray-500 text-xs hover:text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsTables;
