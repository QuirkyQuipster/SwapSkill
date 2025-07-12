import React from 'react';

import { useState } from 'react';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(isRegister ? `Registered as ${form.name}` : `Logged in as ${form.email}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-700">{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" />
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-2">{isRegister ? 'Register' : 'Login'}</button>
        </form>
        <div className="mt-2 text-center text-sm text-blue-600 cursor-pointer hover:underline" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : 'New user? Register'}
        </div>
      </div>
    </div>
  );
}

export default Login;
