import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import BrowseSkills from './pages/BrowseSkills';
import SwapRequests from './pages/SwapRequests';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/SignUp';


function App() {
  // Simulate role (replace with context/localStorage later)
  const userRole = localStorage.getItem("userRole") || "user"; // or "admin"

  const linkClass = ({ isActive }) =>
    `hover:text-blue-600 dark:hover:text-yellow-300 transition ${
      isActive ? "font-bold text-blue-600 dark:text-yellow-300" : ""
    }`;

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {/* NAVBAR */}
        <nav className="bg-white dark:bg-gray-900 shadow flex items-center justify-between px-8 py-4 mb-8">
          <div className="flex gap-6 items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-yellow-300">Skill Swap</span>
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/profile" className={linkClass}>Profile</NavLink>
            <NavLink to="/browse" className={linkClass}>Browse Skills</NavLink>
            <NavLink to="/swaps" className={linkClass}>Swap Requests</NavLink>
            {userRole === "admin" && (
              <NavLink to="/admin" className={linkClass}>Admin</NavLink>
            )}
            <NavLink to="/login" className={linkClass}>Login</NavLink>
          </div>

          {/* Theme Toggle Button */}
          <div className="relative group">
            <button
              className="bg-blue-600 dark:bg-gray-700 text-white dark:text-yellow-300 px-4 py-2 rounded-full shadow hover:bg-blue-700 dark:hover:bg-gray-600 transition font-semibold flex items-center gap-2"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {document.body.classList.contains('dark') ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
            </button>
            <span className="absolute right-0 top-full mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
              Toggle Theme
            </span>
          </div>
        </nav>

        {/* ROUTES */}
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/browse" element={<BrowseSkills />} />
            <Route path="/swaps" element={<SwapRequests />} />
            {userRole === "admin" ? (
              <Route path="/admin" element={<AdminDashboard />} />
            ) : (
              <Route path="/admin" element={<Navigate to="/" />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// ICONS
function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M6.05 6.05L4.636 4.636m12.728 0l-1.414 1.414M6.05 17.95l-1.414 1.414" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
         strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0112 21.75
              c-5.385 0-9.75-4.365-9.75-9.75
              0-4.272 2.712-7.897 6.498-9.252
              a.75.75 0 01.927.927
              A7.501 7.501 0 0019.5 12
              a.75.75 0 01.927.927
              c-.355 1.272-.927 2.463-1.675 3.575z" />
    </svg>
  );
}

export default App;
