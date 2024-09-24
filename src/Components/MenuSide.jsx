import React, { useState } from "react";

import {
       CurriculaIcon,
       DutiesIcon,
       FinalReviewsIcon,
       HomeIcon,
       LiveClassesIcon,
       MonthsReviewsIcon,
       ProfileStudentIcon,
       SolveExamsIcon,
} from "./Icons/All_Icons";
import { NavLink } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

import { useAuth } from "../Context/Auth";
import { Link, useNavigate } from 'react-router-dom'
import { LuClipboardList } from "react-icons/lu";

const MenuSide = () => {
       const [isActiveHome, setIsActiveHome] = useState(false);
       const [isActiveCurricula, setIsActiveCurricula] = useState(false);
       const [isActiveDuties, setIsActiveDuties] = useState(false);
       const [isActiveLiveClasses, setIsActiveLiveClasses] = useState(false);
       const [isActiveMonthsReviews, setIsActiveMonthsReviews] = useState(false);
       const [isActiveFinalReviews, setIsActiveFinalReviews] = useState(false);
       const [isActiveSolveExams, setIsActiveSolveExams] = useState(false);
       const [isActiveProfileStudent, setIsActiveProfileStudent] = useState(false);
       const [isActiveSubscription, setIsActiveSubscription] = useState(false);
       const [isActiveLogout, setIsActiveLogout] = useState(false);

       const auth = useAuth();
       const navigate = useNavigate();
       const handleLogout = () => {
              auth.logout();
              navigate("/authentication/login", { replace: true });
       }

       const handleClickHome = () => {
              setIsActiveHome(true);
              setIsActiveCurricula(false);
              setIsActiveDuties(false);
              setIsActiveLiveClasses(false);
              setIsActiveMonthsReviews(false);
              setIsActiveFinalReviews(false);
              setIsActiveSolveExams(false);
              setIsActiveProfileStudent(false);
              setIsActiveLogout(false)
       };
       const handleClickCurricula = () => {
              setIsActiveHome(false);
              setIsActiveCurricula(true);
              setIsActiveDuties(false);
              setIsActiveLiveClasses(false);
              setIsActiveMonthsReviews(false);
              setIsActiveFinalReviews(false);
              setIsActiveSolveExams(false);
              setIsActiveProfileStudent(false);
              setIsActiveLogout(false)
       };
       const handleClickDuties = () => {
              setIsActiveDuties(true);
              setIsActiveHome(false);
              setIsActiveCurricula(false);
              setIsActiveLiveClasses(false);
              setIsActiveMonthsReviews(false);
              setIsActiveFinalReviews(false);
              setIsActiveSolveExams(false);
              setIsActiveProfileStudent(false);
              setIsActiveLogout(false)
       };
       const handleClickLiveClasses = () => {
              setIsActiveLiveClasses(true);
              setIsActiveHome(false);
              setIsActiveCurricula(false);
              setIsActiveDuties(false);
              setIsActiveMonthsReviews(false);
              setIsActiveFinalReviews(false);
              setIsActiveSolveExams(false);
              setIsActiveProfileStudent(false);
              setIsActiveLogout(false)
       };
       const handleClickMonthsReviews = () => {
              setIsActiveMonthsReviews(true);
              setIsActiveHome(false);
              setIsActiveCurricula(false);
              setIsActiveDuties(false);
              setIsActiveLiveClasses(false);
              setIsActiveFinalReviews(false);
              setIsActiveSolveExams(false);
              setIsActiveProfileStudent(false);
              setIsActiveLogout(false)
       };
       const handleClickFinalReviews = () => {
              setIsActiveFinalReviews(true);
              setIsActiveHome(false);
              setIsActiveCurricula(false);
              setIsActiveDuties(false);
              setIsActiveLiveClasses(false);
              setIsActiveMonthsReviews(false);
              setIsActiveSolveExams(false);
              setIsActiveProfileStudent(false);
              setIsActiveLogout(false)
       };
       const handleClickSolveExams = () => {
              setIsActiveSolveExams(true);
              setIsActiveHome(false);
              setIsActiveCurricula(false);
              setIsActiveDuties(false);
              setIsActiveLiveClasses(false);
              setIsActiveMonthsReviews(false);
              setIsActiveFinalReviews(false);
              setIsActiveProfileStudent(false);
              setIsActiveLogout(false)
       };
       const handleClickProfileStudent = () => {
              setIsActiveProfileStudent(true);
              setIsActiveSolveExams(false);
              setIsActiveHome(false);
              setIsActiveCurricula(false);
              setIsActiveDuties(false);
              setIsActiveLiveClasses(false);
              setIsActiveMonthsReviews(false);
              setIsActiveFinalReviews(false);
              setIsActiveLogout(false)
       };

       // const handleClickLogout = () => {
              // setIsActiveProfileStudent(false);
              // setIsActiveSolveExams(false);
              // setIsActiveHome(false);
              // setIsActiveCurricula(false);
              // setIsActiveDuties(false);
              // setIsActiveLiveClasses(false);
              // setIsActiveMonthsReviews(false);
              // setIsActiveFinalReviews(false);
              // setIsActiveLogout(true)
       // };

       const handleClickSubscriptions =() =>{
              setIsActiveProfileStudent(false);
              setIsActiveSolveExams(false);
              setIsActiveHome(false);
              setIsActiveCurricula(false);
              setIsActiveDuties(false);
              setIsActiveLiveClasses(false);
              setIsActiveMonthsReviews(false);
              setIsActiveFinalReviews(false);
              setIsActiveSubscription(true)
              setIsActiveLogout(false)
       }

       return (
              <>
                     <div className="w-full h-full mb-8 flex justify-end">
                            <div className="MenuSide w-5/6 flex flex-col items-start gap-y-2">
                                   <NavLink to="/dashboard" onClick={handleClickHome} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium ">
                                          <HomeIcon isActive={isActiveHome} />
                                          <span>الرئيسيه</span>
                                   </NavLink>
                                   <NavLink to="curricula" onClick={handleClickCurricula} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <CurriculaIcon isActive={isActiveCurricula} />
                                          <span>مناهج</span>
                                   </NavLink>
                                   <NavLink to="duties" onClick={handleClickDuties} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <DutiesIcon isActive={isActiveDuties} />
                                          <span>واجبات</span>
                                   </NavLink>
                                   <NavLink to="live_classes" onClick={handleClickLiveClasses} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <LiveClassesIcon isActive={isActiveLiveClasses} />
                                          <span>حصص لايف</span>
                                   </NavLink>
                                   <NavLink to="months_reviews" onClick={handleClickMonthsReviews} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <MonthsReviewsIcon isActive={isActiveMonthsReviews} />
                                          <span>مراجعات شهور </span>
                                   </NavLink>
                                   <NavLink to="final_reviews" onClick={handleClickFinalReviews} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <FinalReviewsIcon isActive={isActiveFinalReviews} />
                                          <span>مراجعه نهائيه</span>
                                   </NavLink>
                                   <NavLink to="solve_exams" onClick={handleClickSolveExams} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <SolveExamsIcon isActive={isActiveSolveExams} />
                                          <span>حل امتحانات</span>
                                   </NavLink>
                                   <NavLink to="My_Subscriptions"  onClick={handleClickSubscriptions} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <SolveExamsIcon />
                                          <span>اشتراكاتي</span>
                                   </NavLink>
                                   <NavLink to="complaint_suggestion" onClick={handleClickProfileStudent} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <LuClipboardList size={23} style={{ strokeWidth: 2 }} isActive={isActiveProfileStudent} />
                                          <span>الاقتراحات و الشكاوي</span>
                                   </NavLink>
                                   <NavLink to="profile" onClick={handleClickProfileStudent} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <ProfileStudentIcon isActive={isActiveProfileStudent} />
                                          <span>حسابى</span>
                                   </NavLink>
                                   <NavLink onClick={handleLogout } className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <CiLogout size={23} style={{ strokeWidth: 2 }} />
                                          <span>تسجيل الخروج</span>
                                   </NavLink>
                            </div>
                     </div>
              </>
       );
};

export default MenuSide;
