import React from 'react'
import SidebarStudent from '../../Components/SidebarStudent'
import NavbarStudent from '../../Components/NavbarStudent'
import { Outlet } from 'react-router-dom'

const LayoutStudent = () => {
       return (
              <>
                     <div className="relative flex gap-x-4 directionAR">
                            <SidebarStudent />
                            <div className="contentSection w-4/5 min-h-screen">
                                   {/* <HeaderStudent /> */}
                                   <NavbarStudent />
                                   <div className="pr-5">
                                          <Outlet />
                                   </div>
                            </div>
                     </div>
              </>
       )
}

export default LayoutStudent
