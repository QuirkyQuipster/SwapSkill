import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import BrowseSkills from './pages/BrowseSkills';
import SwapRequests from './pages/SwapRequests';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import api from './services/api';

function AppContent() {
  const { user, logout, isAuthenticated, loading } = useUser();
  const [demoMode, setDemoMode] = useState(false);

  // Check if we're in demo mode
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await api.healthCheck();
        setDemoMode(false);
      } catch (error) {
        setDemoMode(true);
      }
    };
    checkBackend();
  }, []);

  const linkClass = ({ isActive }) =>
    `hover:text-white dark:hover:text-yellow-300 transition-all duration-300 px-4 py-2 rounded-lg ${
      isActive ? "bg-white/20 text-white dark:text-yellow-300 font-semibold" : "text-white/80 dark:text-gray-300"
    }`;

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 transition-all duration-300">
      {/* Demo Mode Banner */}
      {demoMode && (
        <div className="glass-dark border-b border-yellow-400/30">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-center text-yellow-300 text-sm">
              <span className="mr-2 text-lg">🎭</span>
              <span className="font-medium">Demo Mode:</span>
              <span className="ml-1">Running with mock data. Install Node.js and start the backend for full functionality.</span>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="glass backdrop-blur-lg shadow-2xl flex items-center justify-between px-8 py-6 mb-8">
        <div className="flex gap-6 items-center">
          <span className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
            Skill Swap
          </span>
          <NavLink to="/" className={linkClass}>Home</NavLink>
          
          {/* Always show Browse Skills */}
          <NavLink to="/browse" className={linkClass}>Browse Skills</NavLink>
          
          {/* Show other nav items based on authentication */}
          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className={linkClass}>Profile</NavLink>
              <NavLink to="/swaps" className={linkClass}>Swap Requests</NavLink>
              {user?.role === "admin" && (
                <NavLink to="/admin" className={linkClass}>Admin</NavLink>
              )}
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink to="/signup" className={linkClass}>Sign Up</NavLink>
            </>
          )}
        </div>

        {/* Theme Toggle Button */}
        <div className="relative group">
          <button
            className="btn-primary flex items-center gap-2"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {document.body.classList.contains('dark') ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
            <span className="hidden sm:inline">Theme</span>
          </button>
          <span className="absolute right-0 top-full mt-2 px-3 py-1 glass text-white text-xs rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
            Toggle Theme
          </span>
        </div>

        {/* Logout button for authenticated users */}
        {isAuthenticated && (
          <button 
            onClick={logout}
            className="ml-4 hover:text-red-300 transition-all duration-300 px-4 py-2 rounded-lg border border-red-400/30 hover:border-red-400 hover:bg-red-400/10"
          >
            Logout
          </button>
        )}
      </nav>

      {/* ROUTES */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseSkills />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/swaps" element={isAuthenticated ? <SwapRequests /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
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
