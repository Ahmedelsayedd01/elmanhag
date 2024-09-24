// import React from 'react'
// import SidebarStudent from '../../Components/SidebarStudent'
// import NavbarStudent from '../../Components/NavbarStudent'
// import { Outlet } from 'react-router-dom'

// const LayoutStudent = () => {
//        return (
//               <>
//                      <div className="relative flex gap-x-4 directionAR">
//                             <SidebarStudent />
//                             <div className="contentSection w-4/5 min-h-screen">
//                                    {/* <HeaderStudent /> */}
//                                    <NavbarStudent />
//                                    <div className="pr-5">
//                                           <Outlet />
//                                    </div>
//                             </div>
//                      </div>
//               </>
//        )
// }

// export default LayoutStudent
import React from 'react';
import SidebarStudent from '../../Components/SidebarStudent';
import NavbarStudent from '../../Components/NavbarStudent';
import { Outlet } from 'react-router-dom';
import { RiMenu2Fill, RiCloseFill } from 'react-icons/ri'; // Importing the menu and close icons
import { useState } from 'react';

const LayoutStudent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="relative flex gap-x-4 directionAR">
                {/* Fixed Menu Icon for Small Screens */}
                <div className="relative top-4 z-20 lg:hidden">
                    <button
                        onClick={toggleSidebar}
                        className="text-black p-2 focus:outline-none"
                    >
                        {isSidebarOpen ? (
                            <RiCloseFill className="w-8 h-8 mr-auto " color='black' />
                        ) : (
                            <RiMenu2Fill className="w-8 h-8" color='black'/>
                        )}
                    </button>
                </div>

                {/* Sidebar that overlays the content on small screens */}
                <SidebarStudent isOpen={isSidebarOpen} />
                <div className={`contentSection md:w-full sm:w-full lg:w-4/5 min-h-screen transition-opacity ${isSidebarOpen ? 'opacity-50' : 'opacity-100'}`}>
                    {/* <HeaderStudent /> */}
                    <NavbarStudent />
                    <div className="pr-5">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LayoutStudent;
