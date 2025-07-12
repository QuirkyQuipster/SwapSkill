import React from 'react';

export default function ProfilePhoto({ photo, onChange }) {
  return (
    <label className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-500 cursor-pointer overflow-hidden">
      {photo ? (
        <img src={photo} alt="Profile" className="w-full h-full object-cover rounded-full" />
      ) : (
        'Photo'
      )}
      <input type="file" accept="image/*" className="hidden" onChange={onChange} />
    </label>
  );
}
