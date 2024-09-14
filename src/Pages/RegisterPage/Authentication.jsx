import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Logo from "../../Assets/Images/logoBlack"
import TextTitle from '../../Components/TextTitle';

const Authentication = () => {
       const loaction = useLocation()
       // console.log(location)
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
                     <div className="flex flex-col lg:flex-row  items-center justify-center lg:justify-between w-full h-screen">

                            <div className="flex items-center justify-center w-full xl:w-6/12 h-full">
                                   <div className={`${location.pathname == "/authentication/login" ? 'xl:justify-center' : 'xl:justify-start'} flex flex-col items-center h-full gap-2 w-10/12`}>
                                          <TextTitle text={'Hello guys!'} color={'mainColor'} font={'medium'} />
                                          {/* {isActiveAffilate ?
                                                 ('') : (

                                                        <nav className="flex items-center w-full justify-center gap-8 mt-4">
                                                               <NavLink to={"signup"} className={isActiveSignUP ? "text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-xl" : "text-2xl font-medium px-6 py-3 text-mainColor"} onClick={handleClickSignUp}>Sing up</NavLink>
                                                               <NavLink to={"login"} className={isActiveLogin ? "text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-xl" : "text-2xl font-medium px-6 py-3 text-mainColor"} onClick={handleClickLogin}>Log in</NavLink>
                                                        </nav>
                                                 )} */}
                                          <Outlet />
                                          {loaction.pathname == "/authentication/signup" ?
                                                 <NavLink to={"signup_affilate"} className="w-full text-center text-2xl font-medium text-mainColor border-4 border-mainColor px-6 py-3  rounded-2xl">Sign As Affilate</NavLink>
                                                 : null}

                                   </div>
                            </div>
                            <div className="hidden xl:flex items-center justify-center w-6/12">
                                   <Logo Height='250' Width={'100%'} />
                            </div>
                     </div >
              </>
       );
}

export default Authentication;
