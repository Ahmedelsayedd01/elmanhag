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


const MenuSide = () => {
       const [isActiveHome, setIsActiveHome] = useState(true);
       const [isActiveCurricula, setIsActiveCurricula] = useState(false);
       const [isActiveDuties, setIsActiveDuties] = useState(false);
       const [isActiveLiveClasses, setIsActiveLiveClasses] = useState(false);
       const [isActiveMonthsReviews, setIsActiveMonthsReviews] = useState(false);
       const [isActiveFinalReviews, setIsActiveFinalReviews] = useState(false);
       const [isActiveSolveExams, setIsActiveSolveExams] = useState(false);
       const [isActiveProfileStudent, setIsActiveProfileStudent] = useState(false);

       const handleClickHome = () => {
              setIsActiveHome(true);
              setIsActiveCurricula(false);
              setIsActiveDuties(false);
              setIsActiveLiveClasses(false);
              setIsActiveMonthsReviews(false);
              setIsActiveFinalReviews(false);
              setIsActiveSolveExams(false);
              setIsActiveProfileStudent(false);
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
       };
       return (
              <>
                     <div className="w-full h-full mb-8 flex justify-end">
                            <div className="MenuSide w-5/6 flex flex-col items-start gap-y-4">
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
                                   <NavLink to="profile" onClick={handleClickProfileStudent} className="w-full flex px-0 py-2 items-center justify-start gap-x-5 text-secoundColor text-xl font-medium">
                                          <ProfileStudentIcon isActive={isActiveProfileStudent} />
                                          <span>حسابى</span>
                                   </NavLink>
                            </div>
                     </div>
              </>
       );
};

export default MenuSide;
