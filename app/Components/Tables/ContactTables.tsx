import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faPlus, faFileExport } from '@fortawesome/free-solid-svg-icons';

const ContactsTables = () => {
  return (
    <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
      {/* Contacts Table */}
      <div className="w-full lg:w-1/2">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="font-bold text-xl text-gray-700">Contacts (2)</h2>
          <div className="flex space-x-3">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-300 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span>Add Contact</span>
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center">
              <FontAwesomeIcon icon={faFileExport} className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Mobile</th>
                <th className="py-3 px-4 text-left font-semibold">Groups</th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50 transition duration-200">
                <td className="py-4 px-4 text-gray-700">Daniel Odoi</td>
                <td className="py-4 px-4 text-gray-700">0536690447</td>
                <td className="py-4 px-4 text-gray-700">list</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-3 items-center">
                    <button className="text-blue-500 hover:text-blue-700 transition duration-200">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-700 transition duration-200">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition duration-200">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Groups Table */}
      <div className="w-full lg:w-1/2">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="font-bold text-xl text-gray-700">Groups (2)</h2>
          <div className="flex space-x-3">
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300 flex items-center">
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              <span>Add Group</span>
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 flex items-center">
              <FontAwesomeIcon icon={faFileExport} className="mr-2" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Group Name</th>
                <th className="py-3 px-4 text-left font-semibold">Member Count</th>
                <th className="py-3 px-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50 transition duration-200">
                <td className="py-4 px-4 text-gray-700">Friends</td>
                <td className="py-4 px-4 text-gray-700">0 members</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-3 items-center">
                    <button className="text-blue-500 hover:text-blue-700 transition duration-200">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-700 transition duration-200">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition duration-200">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="border-t hover:bg-gray-50 transition duration-200">
                <td className="py-4 px-4 text-gray-700">list</td>
                <td className="py-4 px-4 text-gray-700">1 member</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-3 items-center">
                    <button className="text-blue-500 hover:text-blue-700 transition duration-200">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-700 transition duration-200">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition duration-200">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactsTables;