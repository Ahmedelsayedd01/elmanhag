import React, { useEffect } from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LiveNavPage } from '../../Pages/AllPages'

const LiveLayout = () => {
       const location = useLocation();
       const navigate = useNavigate();
       console.log('location', location);


       useEffect(() => {
              if (location.pathname === '/dashboard_admin/live' || location.pathname === '/dashboard_admin/live/') {
                     navigate('upcoming'); // Navigate to 'upcoming' when at '/live' path
              }
       }, [location.pathname, navigate]);

       return (
              <>
                     <div className="flex flex-col items-center gap-y-4">
                            {(location.pathname === '/dashboard_admin/live/upcoming' || location.pathname === '/dashboard_admin/live/history') && (
                                   <>
                                          <TitleHeader text={"Live"} spaceBottom={0} />
                                          <LiveNavPage />
                                   </>
                            )}
                            <Outlet />
                     </div>
              </>
       );
}

export default LiveLayout;
