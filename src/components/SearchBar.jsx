import React from 'react';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      className="w-full px-4 py-2 border rounded mb-6"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
