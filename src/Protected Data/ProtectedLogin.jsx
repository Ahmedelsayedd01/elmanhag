// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../Context/Auth';

// const ProtectedLogin = () => {
//        const auth = useAuth();

//        console.log("Current user:", auth.user);

//        if (auth.user) {
//               // Redirect to home if the user is authenticated
//               return <Navigate to="/" replace />;
//        }

//        return <Outlet />;
// }

// export default ProtectedLogin;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const ProtectedLogin = () => {
       const auth = useAuth();

       console.log("Current user:", auth.user);

       if (auth.user) {
              //        // Redirect to external site if the user is authenticated
              //        window.location.href = "https://elmanhag.com";
              //        return null; // You should return null because the component should not render anything after redirecting.
              // }
              // if (auth.user.role == "supAdmin") {
              //        // Redirect to external site if the user is authenticated
              //        window.location.href = "https://login.elmanhag.shop/dashboard_admin";
              //        return null; // You should return null because the component should not render anything after redirecting.
              // }
              // if (auth.user.role == "student") {
              //        // Redirect to external site if the user is authenticated
              //        window.location.href = "https://login.elmanhag.shop/dashboard";
              //        return null; // You should return null because the component should not render anything after redirecting.
              // }
              // if (auth.user) {
              // Check the user's role and redirect accordingly
              // if (auth.user.role === "supAdmin") {
              //        window.location.href = "https://login.elmanhag.shop/dashboard_admin";
              //        return null; // Stop rendering after redirection
              // } else if (auth.user.role === "student") {
              //        window.location.href = "https://login.elmanhag.shop/dashboard";
              //        return null; // Stop rendering after redirection
              // } else {
              //        // Default redirection for authenticated users without specific roles
              //        window.location.href = "https://elmanhag.com";
              //        return null;
              // }
              if (auth.user.role === "supAdmin") {
                     return <Navigate to={'/dashboard_admin'} />;
                     // return window.location.href = "https://login.elmanhag.shop/dashboard_admin";
              } else if (auth.user.role === "student") {
                     return <Navigate to={'/dashboard'} />;
                     // return window.location.href = "https://login.elmanhag.shop/dashboard";
              } else if (auth.user.role === "affilate") {
                     return <Navigate to={'/dashboard_affilate'} />;
              } else {
                     return window.location.href = "https://elmanhag.com";

              }
       }


       return <Outlet />;
};

export default ProtectedLogin;
