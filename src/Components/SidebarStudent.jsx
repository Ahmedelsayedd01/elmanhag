import React from "react";
import LogoWhite from "../Assets/Images/logoWhite.jsx"
import MenuSide from "./MenuSide.jsx";
const SidebarStudent = () => {
       return (
              <>
                     <aside className="w-1/5 fixed h-screen right-0 overflow-hidden flex flex-col items-center bg-mainColor gap-y-6">
                            <div className="h-1/5 mt-2">
                                   <LogoWhite Width="100%" />
                            </div>
                            <MenuSide />
                     </aside>
              </>
       );
};

export default SidebarStudent;
