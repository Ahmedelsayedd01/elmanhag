// import React from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../Context/Auth';

// const ProtectedRoute = ({ allowedRoles }) => {

//        const location = useLocation();
//        const auth = useAuth();

//        console.log('Auth userRoute:', auth.user);

//        if (!auth.user) {
//               return <Navigate to="/authentication/login" state={{ from: location }} replace />;
//        }

//        const userRoles = (auth.user.roles || []).map(role => role.toLowerCase());
//        const hasPermission = allowedRoles
//               .map(role => role.toLowerCase())
//               .some(role => userRoles.includes(role));
//        console.log("userRoles", userRoles)

//        if (!hasPermission) {
//               return <Navigate to="/unauthorized" state={{ from: location }} replace />;
//        }

//        return <Outlet />;
// };

// export default ProtectedRoute;
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
       console.log("auth.user", auth.user.role)
       console.log("userRoles", userRoles)
       console.log("hasPermission", hasPermission)

       if (!hasPermission) {
              // return window.location.href = "https://elmanhag.com";

              if (auth.user.role === "supAdmin") {
                     console.log('1')
                     return <Navigate to={'/dashboard_admin'} />;
                     // return window.location.href = "https://login.elmanhag.shop/dashboard_admin";
              } else if (auth.user.role === "student") {
                     console.log('2')
                     return <Navigate to={'/dashboard'} />;
                     // return window.location.href = "https://login.elmanhag.shop/dashboard";
              } else if (auth.user.role === "affilate") {
                     console.log('3')
                     return <Navigate to={'/dashboard_affilate'} />;

              } else if (auth.user.role === "teacher") {
                     console.log('4')
                     return <Navigate to={'/dashboard_teacher'} />;
              } else {
                     console.log('5')
                     return window.location.href = "https://elmanhag.com";

              }
       }
       // if (location.pathname == 'login.elmanhag.shop') {
       //        return window.location.href = "https://elmanhag.com";
       // }

       return <Outlet />;
};

export default ProtectedRoute;
