import React from 'react'
import LinksSidebar from './LinksSidebar'
import Logo from "../Assets/Images/logoBlack"
const Sidebar = () => {
       return (
              <div className="relative w-4/12 lg:w-3/12 xl:w-2/12 border-r-2 overflow-hidden flex items-center justify-center bg-white gap-y-6">

                     <aside className="fixed top-0  z-10 h-screen flex flex-col items-center gap-y-2">
                            <div className="w-full flex items-center justify-center mt-2">
                                   <Logo Width={"100%"} Height={80} />
                            </div>
                            <LinksSidebar />
                     </aside>
              </div>
       )
}

export default Sidebar