import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { Outlet } from 'react-router-dom'
import { ComplaintsNavPage } from '../../Pages/AllPages'

const ComplaintsLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center h-full gap-y-4">
                            <TitleHeader text={"Complaints && Suggestions"} />
                            <ComplaintsNavPage />
                            <Outlet />
                     </div>
              </>
       )
}

export default ComplaintsLayout