import React, { useState, useEffect } from "react";
import { IoSearch } from 'react-icons/io5';
import { Button } from "./Button";
import { useAuth } from "../Context/Auth";
import { Link, useNavigate } from 'react-router-dom';

const NavbarStudent = () => {
    const auth = useAuth();
    const [userName, setUserName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [studentEducation, setStudentEducation] = useState('');
    const [studentCategory, setStudentCategory] = useState('');
    const [studentJob, setStudentJob] = useState('');
    const [educationData, setEducationData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [JobData, setJobData] = useState([]);
    const [educationName, setEducationName] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [jobName, setJobName] = useState('');
    const [gender, setGender] = useState('');

    // Fetch data from API
    const fetchStudentDetails = async () => {
        try {
            const response = await fetch('https://bdev.elmanhag.shop/student/setting/view');
            const data = await response.json();
            // console.log(data)
            setEducationData(Array.isArray(data.education) ? data.education : []);
            setCategoryData(Array.isArray(data.category) ? data.category : []);
            setJobData(Array.isArray(data.studentJobs) ? data.studentJobs : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchStudentDetails();
    }, []);

    useEffect(() => {
        if (auth.user) {
            setUserName(auth.user.name || '');
            setUserImage(auth.user.image_link || '');
            setStudentEducation(auth.user.education_id || '');
            setStudentCategory(auth.user.category_id || '');
            setStudentJob(auth.user.sudent_jobs_id || '');
            setGender(auth.user.gender)
        }
    }, [auth.user]);

    useEffect(() => {
        if (studentEducation && educationData.length > 0) {
            const education = educationData.find(item => item.id === studentEducation);
            setEducationName(education ? capitalizeFirstLetter(education.name) : 'Education not found');
        }

        if (studentCategory && categoryData.length > 0) {
            const category = categoryData.find(item => item.id === studentCategory);
            setCategoryName(category ? capitalizeFirstLetter(category.name) : 'Category not found');
        }

        if (studentJob && JobData.length > 0) {
            const job = JobData.find(item => item.id === studentJob);

            if (job) {
                if (gender === 'male') {
                    setJobName(capitalizeFirstLetter(job.title_male));
                } else if (gender === 'female') {
                    setJobName(capitalizeFirstLetter(job.title_female));
                } else {
                    setJobName(capitalizeFirstLetter(job.job)); // Default if gender is not male or female
                }
            } else {
                setJobName('Job not found');
            }
        }

    }, [studentEducation, studentCategory, studentJob, educationData, categoryData, JobData]);

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate("/authentication/login", { replace: true });
    }

    return (
        <main className="bg-white p-4 flex flex-col items-center">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl">
                <div className="flex w-full justify-between items-center">
                    <div className="flex gap-2 items-center lg:mr-0 sm:mr-10">
                        <img src={userImage} alt="userImage" className="w-[72px] h-[72px] bg-[#E8E8E8] rounded-full" />
                        <div className="text-center lg:text-left">
                            <h3 className="text-red-500 bg-white p-2 rounded-md text-l lg:text-2xl font-bold">
                                مرحباً بك {jobName} {userName}
                            </h3>
                            <p className="text-lg text-gray-600 text-right">{categoryName}</p>
                        </div>
                    </div>
                    <div className="w-4/12 sm:hidden lg:flex items-center justify-center gap-4">
                        {auth.user.role == 'student' && (
                            <Link to="subscriptions">
                                <button type='button' className=" w-full px-4 py-2 text-2xl text-secoundColor bg-mainColor rounded-2xl lg:px-28 lg:py-3 hover:bg-hoverColor">
                                    اشتراكاتي
                                </button>
                            </Link>
                        )}

                    </div>
                    <div className="w-4/12 lg:flex items-center justify-center gap-4">
                        {auth.user.role == 'affilate' && (
                            <button type='button' onClick={handleLogout} className="w-full px-4 py-2 text-2xl text-secoundColor bg-mainColor rounded-2xl lg:px-6 lg:py-3 hover:bg-hoverColor">
                                تسجيل خروج
                            </button>
                        )}
                    </div>
                    <div className="w-4/12 lg:flex items-center justify-center gap-4">
                        {auth.user.role == 'parent' && (
                            <button type='button' onClick={handleLogout} className="w-full px-4 py-2 text-2xl text-secoundColor bg-mainColor rounded-2xl lg:px-6 lg:py-3 hover:bg-hoverColor">
                                تسجيل خروج
                            </button>
                        )}
                    </div>

                </div>
                <div className="flex items-center mt-4 lg:mt-0">
                    <div className="ml-4">
                        {auth.user ? (
                            // Buttons can be conditionally rendered here if needed
                            <>
                            </>
                        ) : (
                            <>
                                <Button color="primary" Text='إنشاء حساب' className="mr-2" />
                                <Button color="primary" Text='تسجيل دخول' />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NavbarStudent;
