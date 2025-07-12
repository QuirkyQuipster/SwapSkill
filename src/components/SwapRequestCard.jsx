import React from 'react';

export default function SwapRequestCard({ request, onAccept, onReject, onDelete }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col gap-2 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold">{request.name}</span> requested <span className="font-semibold">{request.skill}</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition" onClick={onAccept}>Accept</button>
          <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition" onClick={onReject}>Reject</button>
          <button className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
