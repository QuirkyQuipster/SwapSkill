import React from 'react';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-xl text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 dark:text-yellow-300 mb-4">Welcome to Skill Swap!</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
          Connect, learn, and grow by swapping skills with others. Create your profile, list your skills, and request swaps. Give feedback and build your reputation!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 dark:bg-gray-700 rounded p-4">
            <h2 className="text-xl font-bold text-blue-600 dark:text-yellow-300 mb-2">Features</h2>
            <ul className="text-left text-gray-700 dark:text-gray-200 list-disc list-inside">
              <li>Create and manage your profile</li>
              <li>List skills you offer and want</li>
              <li>Search and connect with others</li>
              <li>Send and accept swap requests</li>
              <li>Rate and give feedback after swaps</li>
              <li>Set your availability and privacy</li>
            </ul>
          </div>
          <div className="bg-purple-50 dark:bg-gray-700 rounded p-4 flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold text-purple-600 dark:text-yellow-300 mb-2">Get Started</h2>
            <a href="/login" className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition mb-2">Register / Login</a>
            <span className="text-gray-600 dark:text-gray-300 text-sm">Already have an account? Log in to start swapping!</span>
          </div>
        </div>
        <div className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
          <span>Skill Swap is a community-driven platform for collaborative learning.</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
