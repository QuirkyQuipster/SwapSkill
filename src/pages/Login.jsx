import React from 'react';

function Login() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-yellow-300">Login</h2>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-blue-600 dark:bg-yellow-400 text-white dark:text-black py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-yellow-500 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
