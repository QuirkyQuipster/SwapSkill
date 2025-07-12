import React from 'react';

function BrowseSkills() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">Browse Skills</h2>
        <input className="w-full px-4 py-2 border rounded mb-6" placeholder="Search by skill..." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example user cards */}
          <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-500">A</div>
              <div>
                <div className="font-semibold">Alex Doe</div>
                <div className="text-sm text-gray-500">Photoshop, Excel</div>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition self-end">Request Swap</button>
          </div>
          <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-500">B</div>
              <div>
                <div className="font-semibold">Bella Smith</div>
                <div className="text-sm text-gray-500">Python, Design</div>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition self-end">Request Swap</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseSkills;
