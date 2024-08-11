import React from 'react'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import { Outlet } from 'react-router-dom'

const LayoutAdmin = () => {
       return (
              <>
                     <div className="w-full flex justify-between">
                            <Sidebar width="w-2/12" />
                            <div className="w-10/12  min-h-screen overflow-hidden">
                                   <Navbar />
                                   <div className="bg-thirdBgColor w-full h-full">
                                          <div className="w-[95%] mx-auto h-full">
                                                 <Outlet />
                                          </div>
                                   </div>
                            </div>
                     </div>
              </>
       )
}

export default LayoutAdmin