import React from 'react'
import { LivePage } from '../../Pages/AllPages'
import TitleHeader from '../../Components/TitleHeader'

const LiveLayout = () => {
       return (
              <>
              <div className="flex flex-col items-center gap-y-4">
                     <TitleHeader text={"Live"} spaceBottom={3} />
                     <LivePage />
              </div>
              </> 
       )
}

export default LiveLayout


