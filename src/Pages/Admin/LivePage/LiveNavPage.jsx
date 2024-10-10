import React, { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const LiveNavPage = () => {
       const location = useLocation();
       const navigate = useNavigate();

       // Redirect to 'upcoming' if the current path is '/dashboard_admin/live' or '/dashboard_admin/live/'
       useEffect(() => {
              if (location.pathname === '/dashboard_admin/live' || location.pathname === '/dashboard_admin/live/') {
                     navigate('upcoming'); // Navigate to 'upcoming' when at '/live' path
              }
       }, [location.pathname, navigate]);

       return (
              <>
                     <nav className="flex items-center w-full justify-center gap-8">
                            <NavLink
                                   to="upcoming"
                                   className={({ isActive }) =>
                                          isActive
                                                 ? "text-2xl font-medium border-b-4 border-mainColor pb-2 text-mainColor"
                                                 : "text-2xl font-medium pb-2 text-mainColor"
                                   }
                            >
                                   Upcoming
                            </NavLink>
                            <NavLink
                                   to="history"
                                   className={({ isActive }) =>
                                          isActive
                                                 ? "text-2xl font-medium border-b-4 border-mainColor pb-2 text-mainColor"
                                                 : "text-2xl font-medium pb-2 text-mainColor"
                                   }
                            >
                                   History
                            </NavLink>
                     </nav>
              </>
       );
};

export default LiveNavPage;
