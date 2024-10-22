import React, { useState } from "react";
import {CurriculaIcon} from "./Icons/All_Icons";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

import { useAuth } from "../Context/Auth";
import { Link, useNavigate } from 'react-router-dom'

const MenuSideTeacher = () => {
    const [isActiveCurricula, setIsActiveCurricula] = useState(false);

       const auth = useAuth();
       const navigate = useNavigate();
       const handleLogout = () => {
              auth.logout();
              navigate("/authentication/login", { replace: true });
       }

       const handleClickCurricula = () => {
              setIsActiveCurricula(false);
       };


       return (
              <>
                     <div className="w-full h-full flex justify-end">
                            <div className="MenuSide w-5/6 flex flex-col items-start gap-y-2">
                                   <NavLink to="curricula" onClick={handleClickCurricula} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <CurriculaIcon isActive={isActiveCurricula} />
                                          <span>موادي</span>
                                   </NavLink>             
                            </div>
                     </div>
              </>
       );
};

export default MenuSideTeacher;
