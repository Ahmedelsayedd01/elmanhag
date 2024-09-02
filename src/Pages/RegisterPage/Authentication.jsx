import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Logo from "../../Assets/Images/logoBlack"
import TextTitle from '../../Components/TextTitle';

const Authentication = () => {
       const [isActiveLogin, setIsActiveLogin] = useState(false);
       const [isActiveSignUP, setIsActiveSignUP] = useState(true);
       const [isActiveAffilliate, setIsActiveAffilliate] = useState(false);

       const handleClickLogin = () => {
              setIsActiveLogin(!isActiveLogin);
              setIsActiveSignUP(false);
       };
       const handleClickSignUp = () => {
              setIsActiveSignUP(!isActiveSignUP);
              setIsActiveLogin(false);
       };
       const handleClickAffilliate = () => {
              setIsActiveSignUP(false);
              setIsActiveLogin(false);
              setIsActiveAffilliate(true);
       };

       return (
              <>
                     <div className="flex flex-col lg:flex-row  items-center justify-center lg:justify-between w-full h-screen">

                            <div className="flex items-center justify-center w-full lg:w-6/12 h-full">
                                   <div className="flex flex-col items-center justify-start h-5/6 gap-8 w-10/12">
                                          <TextTitle text={'Hello guys!'} color={'mainColor'} font={'medium'} />
                                          {isActiveAffilliate ?
                                                 ('') : (

                                                        <nav className="flex items-center w-full justify-center gap-8 mt-4">
                                                               <NavLink to={"signup"} className={isActiveSignUP ? "text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-xl" : "text-2xl font-medium px-6 py-3 text-mainColor"} onClick={handleClickSignUp}>Sing up</NavLink>
                                                               <NavLink to={"login"} className={isActiveLogin ? "text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-xl" : "text-2xl font-medium px-6 py-3 text-mainColor"} onClick={handleClickLogin}>Log in</NavLink>
                                                        </nav>
                                                 )}
                                          <Outlet />
                                          <NavLink to={"signup_affiliate"} className={isActiveAffilliate ? "hidden text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-xl" : "text-2xl font-medium px-6 py-3 text-mainColor"} onClick={handleClickAffilliate}>Sign As Affilliate</NavLink>
                                   </div>
                            </div>
                            <div className="hidden lg:flex items-center justify-center w-6/12">
                                   <Logo Height='250' />
                            </div>
                     </div >
              </>
       );
}

export default Authentication;
