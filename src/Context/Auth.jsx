import React, { createContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify styles
// Create a context
const AuthContext = createContext();

// Provide the context
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const [sidebar, setSidebar] = useState(null);

  // Sync user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      setSidebar(null); // Reset sidebar state when the user logs out
    }
  }, [user]);


  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setSidebar(null);
    // localStorage.removeItem("sidebarState")
    // localStorage.removeItem("students")
    // localStorage.removeItem("Categories")
    // localStorage.removeItem("subjects")
    // localStorage.removeItem("Countries")

  };
  const toastSuccess = (text) => {
    toast.success(text);

  };
  const toastError = (text) => {
    toast.error(text);

  };

  return (
    <AuthContext.Provider value={{ user, sidebar, login, logout, toastSuccess, toastError }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return React.useContext(AuthContext);
};
