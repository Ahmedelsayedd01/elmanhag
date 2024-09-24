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
import { Outlet } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const ProtectedLogin = () => {
       const auth = useAuth();

       console.log("Current user:", auth.user);

       // if (auth.user) {
       //        // Redirect to external site if the user is authenticated
       //        window.location.href = "https://elmanhag.com/";
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
       if (auth.user) {
              const { role } = auth.user;

              console.log('roleProo', role)
              if (role === "supAdmin" || role === "admin") {
                     window.location.href = "https://login.elmanhag.shop/dashboard_admin";
              } else if (role === "student") {
                     window.location.href = "https://login.elmanhag.shop/dashboard";
              } else {
                     // Redirect to a default site if role doesn't match
                     window.location.href = "https://elmanhag.com/";
              }
       }


       return <Outlet />;
};

export default ProtectedLogin;
