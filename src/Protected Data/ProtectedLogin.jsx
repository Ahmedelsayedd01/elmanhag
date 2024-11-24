import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth';


const ProtectedLogin = () => {
       const auth = useAuth();
       const navigate = useNavigate();

       console.log("Current user:", auth.user);

       if (auth.user) {
              if (auth.user.role === "supAdmin") {
                     console.log('1')
                     return <Navigate to={'/dashboard_admin'} />;
              } else if (auth.user.role === "student") {
                     console.log('2')
                     return <Navigate to={'/dashboard'} />;
              } else if (auth.user.role === "affilate") {
                     console.log('3')
                     return <Navigate to={'/dashboard_affilate'} />;
              } else {
                     console.log('4')
                     return window.location.href = "https://elmanhag.com";
              }
       }

       return <Outlet />; // Only render Outlet if no user is authenticated
};

export default ProtectedLogin;
