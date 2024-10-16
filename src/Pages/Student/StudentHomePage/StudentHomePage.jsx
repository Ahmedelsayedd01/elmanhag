import React, { useState } from "react";
import { NavLink ,Link} from "react-router-dom";
import CurriculaIcon from '../../../Components/Icons/StudentIcons/CurriculaIcon';
import DutiesIcon from '../../../Components/Icons/StudentIcons/DutiesIcon';
import MonthsReviewsIcon from '../../../Components/Icons/StudentIcons/MonthsReviewsIcon';
import SolveExamsIcon from '../../../Components/Icons/StudentIcons/SolveExamsIcon';
import LiveClassesIcon from '../../../Components/Icons/StudentIcons/LiveClassesIcon'
import FinalReviewsIcon from '../../../Components/Icons/StudentIcons/FinalReviewsIcon'
import AndroidIcon from "../../../Components/AndroidIcon";
import AppleIcon from "../../../Components/AppleIcon";
import { Button } from '../../../Components/Button';

import { DiAndroid, DiApple } from "react-icons/di";

const StudentHomePage = () => {
    const [isActiveCurricula, setIsActiveCurricula] = useState(false);
    const [isActiveDuties, setIsActiveDuties] = useState(false);
    const [isActiveMonthsReviews, setIsActiveMonthsReviews] = useState(false);
    const [isActiveSolveExams, setIsActiveSolveExams] = useState(false);
    const [isActiveFinalReviews, setIsActiveFinalReviews] = useState(false);

    const [isWarningOpen, setIsWarningOpen] = useState(false);
     const warningMessage = "قريبا !";

    const showWarning = () => {
      setIsWarningOpen(true);
  };

  const handleCloseWarning = () => {
      setIsWarningOpen(false);
  };

  const handleDownload = () => {
      const link = document.createElement("a");
      link.href = "/app.apk";  // Correct path to the APK
      link.download = "app.apk";  // Name of the file when downloaded
      link.click();
  };

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
                            مراجعات شهور
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
{/* 
                <div>

                </div> */}
            <div className="flex gap-5">
                    <button style={{ cursor: "pointer" }} onClick={handleDownload}>
                                    <div className="flex gap-5 bg-[#F6F6F6] px-7 py-4 justify-center items-center">
                                        <h1 className="text-mainColor font-semibold">Google Store</h1>
                                        <div>
                                            <AndroidIcon />
                                        </div>
                                    </div>
                    </button>

                    <button onClick={showWarning}>
                            <div className="flex gap-5 bg-[#F6F6F6] px-7 py-4 justify-center items-center cursor-pointer">
                                <h1 className="text-mainColor font-semibold">App Store</h1>
                                <div>
                                    <AppleIcon />
                                </div>
                            </div>
                    </button>
            </div>

             {/* Warning Modal */}
             {isWarningOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:mr-10">
                    <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
                        <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">{warningMessage}</h2>
                        <div className="flex justify-end gap-4 sm:gap-2">
                            <Button
                                Text="حسنا"
                                Width="auto"
                                BgColor="bg-gray-300"
                                Color="text-black"
                                handleClick={handleCloseWarning} // Close modal when clicked
                            />
                        </div>
                    </div>
                </div>
            )}

            </div>
        </>
    );
};

export default StudentHomePage;
