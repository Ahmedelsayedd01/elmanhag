import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Logo from "../../Assets/Images/logoBlack"
import TextTitle from '../../Components/TextTitle';

const Authentication = () => {
       const loaction = useLocation()
       console.log(location)
       // const [isActiveLogin, setIsActiveLogin] = useState(false);
       // const [isActiveSignUP, setIsActiveSignUP] = useState(true);
       // const [isActiveAffilate, setIsActiveAffilate] = useState(false);

       // const handleClickLogin = () => {
       //        setIsActiveLogin(!isActiveLogin);
       //        setIsActiveSignUP(false);
       // };
       // const handleClickSignUp = () => {
       //        setIsActiveSignUP(!isActiveSignUP);
       //        setIsActiveLogin(false);
       // };
       // const handleClickAffilate = () => {
       //        setIsActiveSignUP(false);
       //        setIsActiveLogin(false);
       //        setIsActiveAffilate(true);
       // };

       return (
              <>
                     <div className="flex flex-col xl:flex-row  items-center justify-center lg:justify-between w-full h-screen">
                            <div className={`${location.pathname === '/authentication/login' ? 'flex' : 'sm:hidden'} xl:flex items-center justify-center w-6/12`}>
                                   <Logo Height="250" Width="100%" />
                            </div>
                            <div className="flex items-center justify-center w-full xl:w-6/12 h-full">
                                   <div className="justify-center flex flex-col items-center h-full gap-2 w-10/12">
                                          <Outlet />
                                   </div>
                            </div>
                     </div>
              </>
       );
}

export default Authentication;
