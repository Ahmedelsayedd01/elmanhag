import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CurriculaIcon from '../../../Components/Icons/StudentIcons/CurriculaIcon'
import DutiesIcon from '../../../Components/Icons/StudentIcons/DutiesIcon'
import MonthsReviewsIcon from '../../../Components/Icons/StudentIcons/MonthsReviewsIcon'
import SolveExamsIcon from '../../../Components/Icons/StudentIcons/SolveExamsIcon'

const StudentHomePage = () => {
       const [isActiveCurricula, setIsActiveCurricula] = useState(false);
       const [isActiveDuties, setIsActiveDuties] = useState(false);
       const [isActiveMonthsReviews, setIsActiveMonthsReviews] = useState(false);
       const [isActiveSolveExams, setIsActiveSolveExams] = useState(false);

       return (
              <div className="flex gap-5 p-4 flex-wrap justify-center">

              <div className={`w-56 min-h-36 overflow-hidden p-3 flex flex-col items-center justify-start bg-mainColor rounded-xl`}>
              <NavLink to="curricula">
                     <span className='w-full flex justify-center text-xl text-secoundColor font-medium'>
                            <CurriculaIcon isActive={isActiveCurricula} Width="64" Height="64"/>
                     </span>
                     <span className='w-full mt-3 text-center text-5xl text-secoundColor font-medium'>
                            المناهج
                     </span>
              </NavLink>
              </div>
                     
              <div className={`w-56 min-h-36 overflow-hidden p-3 flex flex-col items-center justify-start bg-mainColor rounded-xl`}>
              <NavLink to="duties">
                     <span className='w-full flex justify-center text-xl text-secoundColor font-medium'>
                            <DutiesIcon isActive={isActiveDuties} Width="64" Height="64"/>
                     </span>
                     <span className='w-full mt-3 text-center text-5xl text-secoundColor font-medium'>
                            الواجبات
                     </span>
              </NavLink>
              </div>

              <div className={`w-56 min-h-36 overflow-hidden p-3 flex flex-col items-center justify-start bg-mainColor rounded-xl`}>
              <NavLink to="months_reviews">
                     <span className='w-full flex justify-center text-xl text-secoundColor font-medium'>
                            <MonthsReviewsIcon isActive={isActiveMonthsReviews} Width="64" Height="64"/>
                     </span>
                     <span className='w-full mt-3 text-center text-5xl text-secoundColor font-medium'>
                            المراجعات
                     </span>
              </NavLink>
              </div>

              <div className={`w-56 min-h-36 overflow-hidden p-3 flex flex-col items-center justify-start bg-mainColor rounded-xl`}>
              <NavLink to="solve_exams">
                     <span className='w-full flex justify-center text-xl text-secoundColor font-medium'>
                            <SolveExamsIcon isActive={isActiveSolveExams} Width="64" Height="64"/>
                     </span>
                     <span className='w-full mt-3 text-center text-5xl text-secoundColor font-medium'>
                            الامتحانات
                     </span>
              </NavLink>
              </div>
              </div>
       )
}

export default StudentHomePage