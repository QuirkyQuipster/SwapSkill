import React from 'react';

function SwapRequests() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-green-700">Swap Requests</h2>
        <div className="bg-white shadow rounded p-4 mb-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">Alex Doe</span> requested <span className="font-semibold">Python</span>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">Accept</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Reject</button>
              <button className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition">Delete</button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">Bella Smith</span> requested <span className="font-semibold">Excel</span>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">Accept</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Reject</button>
              <button className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapRequests;
