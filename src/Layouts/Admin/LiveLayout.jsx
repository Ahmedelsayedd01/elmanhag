import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { Outlet } from 'react-router-dom'
import { LiveNavPage } from '../../Pages/AllPages'

const LiveLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center gap-y-4">
                            <TitleHeader text={"Live"} spaceBottom={0} />
                            {/* <LivePage /> */}
                            <LiveNavPage />
                            <Outlet />
                     </div>
              </>
       )
}

export default LiveLayout


