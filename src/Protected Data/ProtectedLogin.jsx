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

       if (auth.user) {
              // Redirect to external site if the user is authenticated
              window.location.href = "https://elmanhag.com/";
              return null; // You should return null because the component should not render anything after redirecting.
       }

       return <Outlet />;
};

export default ProtectedLogin;
