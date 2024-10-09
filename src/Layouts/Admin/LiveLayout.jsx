import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { Outlet, useLocation } from 'react-router-dom'
import { LiveNavPage } from '../../Pages/AllPages'

const LiveLayout = () => {
       const location = useLocation();
       console.log('location', location);

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
