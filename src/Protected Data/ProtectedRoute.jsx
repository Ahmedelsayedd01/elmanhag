import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const ProtectedRoute = ({ allowedRoles }) => {
       
       const location = useLocation();
       const auth = useAuth();

       console.log('Auth userRoute:', auth.user);

       if (!auth.user) {
              return <Navigate to="/authentication/login" state={{ from: location }} replace />;
       }

       const userRoles = (auth.user.roles || []).map(role => role.toLowerCase());
       const hasPermission = allowedRoles
              .map(role => role.toLowerCase())
              .some(role => userRoles.includes(role));
       console.log("userRoles", userRoles)

       if (!hasPermission) {
              return <Navigate to="/unauthorized" state={{ from: location }} replace />;
       }

       return <Outlet />;
};

export default ProtectedRoute;
