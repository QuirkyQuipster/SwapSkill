import React, { useState } from 'react';

function Login() {
  const [view, setView] = useState('login'); // 'login', 'signup', 'forgot'

  const renderForm = () => {
    switch (view) {
      case 'login':
        return (
          <>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <div className="text-right text-sm">
              <button onClick={() => setView('forgot')} className="link">
                Forgot password?
              </button>
            </div>
            <button className="submit-button">Log In</button>
            <div className="mt-4 text-sm text-center">
              New here?{" "}
              <button onClick={() => setView('signup')} className="link font-medium">
                Create an account
              </button>
            </div>
          </>
        );

      case 'signup':
        return (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <button className="submit-button">Sign Up</button>
            <div className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <button onClick={() => setView('login')} className="link font-medium">
                Log In
              </button>
            </div>
          </>
        );

      case 'forgot':
        return (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field"
            />
            <button className="submit-button">Reset Password</button>
            <div className="mt-4 text-sm text-center">
              Remembered your password?{" "}
              <button onClick={() => setView('login')} className="link font-medium">
                Log In
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-yellow-300 capitalize">
          {view === 'login' ? 'Login' : view === 'signup' ? 'Sign Up' : 'Forgot Password'}
        </h2>
        <form className="flex flex-col gap-4">{renderForm()}</form>
      </div>
    </div>
  );
}

export default Login;
