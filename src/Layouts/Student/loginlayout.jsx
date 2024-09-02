import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
  // Replace this state with your actual login status logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-10 flex items-center justify-center">
        {/* Sidebar with banner image */}
        <img
          src="/assets/Images/banarlogin.png"
          alt="Banner"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
          <h2 className='text-center text-5xl font-bold text-red-700 mb-8'>مرحبا ياشباب!</h2>
          <div className="flex justify-center gap-6 mb-8">
            <NavLink
              to="/login"
              className={({ isActive }) => `py-3 px-6 rounded-lg transition-colors ${isLoggedIn ? 'bg-red-600 text-white hover:bg-red-800' : 'bg-white text-red-600 border border-red-600 hover:bg-red-100'} ${isActive ? 'bg-red-700 text-white' : ''}`}
            >
              تسجيل الدخول
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => `py-3 px-6 rounded-lg transition-colors ${isLoggedIn ? 'bg-red-600 text-white hover:bg-red-800' : 'bg-white text-red-600 border border-red-600 hover:bg-red-100'} ${isActive ? 'bg-red-700 text-white' : ''}`}
            >
              إنشاء حساب
            </NavLink>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
