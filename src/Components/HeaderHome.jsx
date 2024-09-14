import React from 'react'
import Logo from '../Assets/Images/logoBlack'
import { Link, useNavigate } from 'react-router-dom'
import LinksHomeDS from './LinksHomeDS'
import { useAuth } from '../Context/Auth'

const HeaderHome = () => {
       const auth = useAuth();
       const navigate = useNavigate();

       const handleLogout = () => {
              auth.logout();
       }
       const handleGoBack = () => {
              navigate(-1, { replace: true });
              localStorage.removeItem("sidebarState")
       }
       return (
              <>
                     <div className="w-11/12 m-auto flex flex-row-reverse items-center justify-between">

                            <div className="w-1/5 flex items-center justify-center">
                                   <Link to={"/"}><Logo Width={200} Height={110} /></Link>
                            </div>
                            <div className="w-2/5 flex items-center justify-center"><LinksHomeDS /></div>
                            <div className="w-1/4 flex flex-row-reverse items-center justify-between">
                                   {/* {auth.user &&
                                          <button className="px-4 py-3 text-2xl  text-secoundColor bg-mainColor rounded-2xl" onClick={() => auth.logout()}>تسجيل الخروج</button>
                                   } */}
                                   {!auth.user ? <>
                                          <Link to={"/authentication/signup"} className="px-4 py-3 text-2xl  text-secoundColor bg-mainColor rounded-2xl">انشاء حساب </Link>
                                          <Link to={"/authentication/login"} className="px-3 text-xl text-mainColor font-primaryeMedium rounded-2xl">تسجيل الدخول</Link>
                                   </> : <><button type='button' className="px-4 py-3 mx-auto text-2xl  text-secoundColor bg-mainColor rounded-2xl" onClick={handleLogout}>Log Out</button>
                                          <Link to="/dashboard_admin" type='button' className="px-4 py-3 mx-auto text-2xl  text-secoundColor bg-mainColor rounded-2xl" onClick={handleGoBack}>Dashboard</Link>
                                   </>
                                   }
                            </div>
                     </div>
              </>
       )
}

export default HeaderHome