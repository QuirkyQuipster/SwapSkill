import React from 'react';

function SwapRequests() {
  const requests = [
    { name: 'Alex Doe', skill: 'Photoshop', status: 'Pending' },
    { name: 'Bella Smith', skill: 'Python', status: 'Accepted' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-yellow-300">Your Swap Requests</h2>
        <div className="space-y-4">
          {requests.map((req, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{req.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{req.skill}</div>
              </div>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  req.status === 'Accepted'
                    ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200'
                }`}
              >
                {req.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SwapRequests;
