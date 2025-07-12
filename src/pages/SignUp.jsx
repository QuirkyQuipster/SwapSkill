import React from 'react';

function Signup() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600 dark:text-yellow-300">Create Account</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Create Password"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
          />
          <input
            type="text"
            placeholder="Location (Optional)"
            className="input-field"
          />
          <button
            type="submit"
            className="submit-button bg-green-600 hover:bg-green-700 dark:bg-yellow-400 dark:hover:bg-yellow-500 text-white dark:text-black"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          Already registered?{" "}
          <a href="/login" className="link font-medium">
            Log in here
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
