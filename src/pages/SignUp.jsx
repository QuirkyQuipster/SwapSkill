import React from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-yellow-300">Create Account</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Create Password"
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Location (Optional)"
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="py-2 px-4 rounded font-semibold shadow bg-blue-600 hover:bg-blue-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-black transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 dark:text-yellow-400 hover:underline font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
