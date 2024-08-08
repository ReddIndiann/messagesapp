import React from 'react';

const BundleOptions = () => {
  const bundles = [
    { title: 'Expiry', description: 'Optimal For Most Business That Send A Lot Of Bulk SMS Packages', price: 'GHS 10.00', type: 'Monthly Bundle' },
    { title: 'Non-Expiry', description: 'Optimal For Most Business That Send A Lot Of Bulk SMS Packages', price: 'GHS 20.00', type: 'No Expiry' },
    { title: 'Special', description: 'Best Value for High Volume SMS Needs', price: 'GHS 50.00', type: 'Special Bundle' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {bundles.map((bundle, index) => (
        <div key={index} className="border rounded-md p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-orange-500">{bundle.title}</h3>
          <p className="text-sm text-gray-600 mt-2">{bundle.description}</p>
          <p className="text-sm text-gray-400 mt-1">{bundle.type}</p>
          <div className="mt-4">
            <p className="text-2xl font-bold">{bundle.price}</p>
          </div>
          <button className="mt-6 bg-orange-500 text-white py-2 px-4 rounded-md w-full">
            Buy
          </button>
        </div>
      ))}
    </div>
  );
};

export default BundleOptions;
