import React from "react";
import LogoWhite from "../Assets/Images/logoWhite.jsx"
import MenuSideTeacher from "./MenuSideTeacher.jsx";
const SidebarTeacher = ({ isOpen }) => {
       return (
              <>
                     <aside
                            className={`scrollSec fixed lg:w-1/5 sm:w-4/5 z-10 h-screen right-0 overflow-y-auto flex flex-col items-center bg-mainColor gap-y-3 transition-transform transform ${
                                   isOpen ? "translate-x-0" : "translate-x-full"
                            } lg:translate-x-0`}
                            >
                            <div className="h-1/6 mt-2">
                                   <LogoWhite Width="100%" />
                            </div>
                            <MenuSideTeacher />
                     </aside>
              </>
       );
};

export default SidebarTeacher;