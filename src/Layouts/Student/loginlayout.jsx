import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-96 p-5 bg-white rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default Layout;
