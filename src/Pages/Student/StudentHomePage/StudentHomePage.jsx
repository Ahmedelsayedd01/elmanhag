import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CurriculaIcon from '../../../Components/Icons/StudentIcons/CurriculaIcon';
import DutiesIcon from '../../../Components/Icons/StudentIcons/DutiesIcon';
import MonthsReviewsIcon from '../../../Components/Icons/StudentIcons/MonthsReviewsIcon';
import SolveExamsIcon from '../../../Components/Icons/StudentIcons/SolveExamsIcon';
import LiveClassesIcon from '../../../Components/Icons/StudentIcons/LiveClassesIcon'
import FinalReviewsIcon from '../../../Components/Icons/StudentIcons/FinalReviewsIcon'

import { DiAndroid, DiApple } from "react-icons/di";

const StudentHomePage = () => {
    const [isActiveCurricula, setIsActiveCurricula] = useState(false);
    const [isActiveDuties, setIsActiveDuties] = useState(false);
    const [isActiveMonthsReviews, setIsActiveMonthsReviews] = useState(false);
    const [isActiveSolveExams, setIsActiveSolveExams] = useState(false);
    const [isActiveFinalReviews, setIsActiveFinalReviews] = useState(false);

    return (
        <>
            {/* Main cards section */}
            <div className="flex flex-wrap lg:gap-7 gap-3 p-3 justify-center">
                <div className="w-full sm:w-2/5 min-h-36 overflow-hidden p-3 flex flex-col items-center justify-center bg-mainColor rounded-xl transition-transform hover:scale-105">
                    <NavLink to="curricula">
                        <span className="w-full flex justify-center text-xl text-secoundColor font-medium">
                            <CurriculaIcon isActive={isActiveCurricula} Width="56" Height="56" />
                        </span>
                        <span className="w-full mt-3 text-center text-secoundColor text-xl md:text-3xl font-medium">
                            المناهج
                        </span>
                    </NavLink>
                </div>

                <div className="w-full sm:w-2/5 min-h-36 overflow-hidden p-3 flex flex-col items-center justify-center bg-mainColor rounded-xl transition-transform hover:scale-105">
                    <NavLink to="duties">
                        <span className="w-full flex justify-center text-xl text-secoundColor font-medium">
                            <DutiesIcon isActive={isActiveDuties} Width="56" Height="56" />
                        </span>
                        <span className="w-full mt-3 text-center text-secoundColor text-xl md:text-3xl font-medium">
                            الواجبات
                        </span>
                    </NavLink>
                </div>

                <div className="w-full sm:w-2/5 min-h-36 overflow-hidden p-3 flex flex-col items-center justify-center bg-mainColor rounded-xl transition-transform hover:scale-105">
                    <NavLink to="live_classes">
                        <span className="w-full flex justify-center text-xl text-secoundColor font-medium">
                            <LiveClassesIcon isActive={isActiveSolveExams} Width="56" Height="56" />
                        </span>
                        <span className="w-full mt-3 text-center text-secoundColor text-xl md:text-3xl font-medium">
                            حصص لايف
                        </span>
                    </NavLink>
                </div>

                <div className="w-full sm:w-2/5 min-h-36 overflow-hidden p-3 flex flex-col items-center justify-center bg-mainColor rounded-xl transition-transform hover:scale-105">
                    <NavLink to="months_reviews">
                        <span className="w-full flex justify-center text-xl text-secoundColor font-medium">
                            <MonthsReviewsIcon isActive={isActiveMonthsReviews} Width="56" Height="56" />
                        </span>
                        <span className="w-full mt-3 text-center text-secoundColor text-xl md:text-3xl font-medium">
                            المراجعات
                        </span>
                    </NavLink>
                </div>

                <div className="w-full sm:w-2/5  min-h-36 overflow-hidden p-3 flex flex-col items-center justify-center bg-mainColor rounded-xl transition-transform hover:scale-105">
                    <NavLink to="solve_exams">
                        <span className="w-full flex justify-center text-xl text-secoundColor font-medium">
                            <SolveExamsIcon isActive={isActiveSolveExams} Width="56" Height="56" />
                        </span>
                        <span className="w-full mt-3 text-center text-secoundColor text-xl md:text-3xl font-medium">
                            الامتحانات
                        </span>
                    </NavLink>
                </div>

                <div className="w-full sm:w-2/5  min-h-36 overflow-hidden p-3 flex flex-col items-center justify-center bg-mainColor rounded-xl transition-transform hover:scale-105">
                    <NavLink to="final_reviews">
                        <span className="w-full flex justify-center text-xl text-secoundColor font-medium">
                            <FinalReviewsIcon isActive={isActiveFinalReviews} Width="56" Height="56" />
                        </span>
                        <span className="w-full mt-3 text-center text-secoundColor text-xl md:text-3xl font-medium">
                          مراجعه نهائيه
                        </span>
                    </NavLink>
                </div>
            </div>

            {/* Download App Section */}
            <div className="mt-12 text-center">
                <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-mainColor">حمل التطبيق الان</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    {/* Android Download */}
                    <div className="w-36 sm:w-44 h-36 sm:h-44 bg-black rounded-full shadow-lg flex flex-col items-center justify-center hover:scale-110 transform transition duration-300 ease-in-out cursor-pointer">
                        <DiAndroid className="text-5xl sm:text-6xl text-white" />
                        <span className="block mt-3 text-white text-lg sm:text-xl">Android</span>
                    </div>

                    {/* iOS Download */}
                    <div className="w-36 sm:w-44 h-36 sm:h-44 bg-black rounded-full shadow-lg flex flex-col items-center justify-center hover:scale-110 transform transition duration-300 ease-in-out cursor-pointer">
                        <DiApple className="text-5xl sm:text-6xl text-white" />
                        <span className="block mt-3 text-white text-lg sm:text-xl">iOS</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentHomePage;
