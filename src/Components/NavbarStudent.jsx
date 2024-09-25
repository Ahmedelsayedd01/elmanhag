// import React, { useState, useEffect } from "react";
// import { IoSearch } from 'react-icons/io5';
// import { Button } from "./Button";
// import { useAuth } from "../Context/Auth";
// import { Link, useNavigate } from 'react-router-dom'

// const NavbarStudent = () => {
//     const auth = useAuth();
//     const [userName, setUserName] = useState('');
//     const [userImage, setUserImage] = useState('');
//     const [studentEducation, setStudentEducation] = useState('');
//     const [studentCategory, setStudentCategory] = useState('');
//     const [studentJob, setStudentJob] = useState('');
//     const [educationData, setEducationData] = useState('');
//     const [categoryData, setCategoryData] = useState('');
//     const [JobData, setJobData] = useState('');

//     const [educationName, setEducationName] = useState('');
//     const [categoryName, setCategoryName] = useState('');
//     const [jobName, setJobName] = useState('');

//       // Fetch data from API
//         const fetchStudentDetails = async () => {
//           try {
//             const response = await fetch('https://bdev.elmanhag.shop/student/setting/view');
//             const data = await response.json();

//             // Debugging: Log the response to check the structure
//             console.log('Fetched Data:', data);

//             // Ensure the data is an array or handle it as per the structure
//             setEducationData(Array.isArray(data.education) ? data.education : []);
//             setCategoryData(Array.isArray(data.category) ? data.category : []);
//             setJobData(Array.isArray(data.studentJobs) ? data.studentJobs : []);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };

//     useEffect(() => {
//         fetchStudentDetails();
//     }, []);

//     // Set user information from the auth context
//     useEffect(() => {
//         if (auth.user) {
//             setUserName(auth.user.name || '');
//             setUserImage(auth.user.image_link || '')
//             setStudentEducation(auth.user.education_id || '');
//             setStudentCategory(auth.user.category_id || '');
//             setStudentJob(auth.user.sudent_jobs_id || '');
//         }
//     }, [auth.user]);

//     // Match and find names for education, category, and job
//     useEffect(() => {
//         if (studentEducation && educationData.length > 0) {
//             const education = educationData.find(item => item.id === studentEducation);
//             setEducationName(education ?  capitalizeFirstLetter(education.name) : 'Education not found');
//         }

//         if (studentCategory && categoryData.length > 0) {
//             const category = categoryData.find(item => item.id === studentCategory);
//             setCategoryName(category ?  capitalizeFirstLetter(category.name) : 'Category not found');
//         }

//         if (studentJob && JobData.length > 0) {
//             const job = JobData.find(item => item.id === studentJob);
//             setJobName(job ? capitalizeFirstLetter(job.job) : 'Job not found');
//         }
//     }, [studentEducation, studentCategory, studentJob, educationData, categoryData, JobData]);

//     console.log('userName', userName)
//     console.log('userEducation', educationName)
//     console.log('userCategory', categoryName)
//     console.log('userJob', jobName)

//      // Utility function to capitalize the first letter of a string
//      const capitalizeFirstLetter = (string) => {
//         if (!string) return '';
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     };

//     const navigate = useNavigate();

//        const handleLogout = () => {
//               auth.logout();
//               navigate("/authentication/login", { replace: true });
//        }

//     return (
//         <main className="bg-white p-4 flex flex-col items-center">
//             <div className="flex items-center justify-between w-full max-w-6xl">
//                 <div className="flex w-full justify-between">
//                     <div className="flex gap-2">
//                         <img src={userImage} alt="userImage" className="w-[72px] h-[72px] bg-[#E8E8E8] rounded-full" />
//                             <div>
//                             <h3 className="text-red-500 bg-white p-2 rounded-md text-2xl font-bold">
//                             مرحباً بك {jobName} {userName}
//                             </h3>
//                             <p className="text-lg text-gray-600 mr-3">{categoryName}</p>
//                             </div>
//                     </div>
//                     {/* <p className="text-lg text-gray-500">{educationName}</p> */}
//                     <div className="flex gap-5">
//                         <Link to="My_Subscriptions">
//                             <button type='button' className="px-6 py-3 mx-auto text-3xl text-secoundColor bg-mainColor rounded-2xl">اشتراكاتي</button>
//                         </Link>
//                          {/* <button type='button' className="px-4 py-3 mx-auto text-2xl  text-secoundColor bg-mainColor rounded-2xl" onClick={handleLogout}>Log Out</button> */}
//                     </div>
//                 </div>
//                 <div className="flex items-center">
//                     <div className="ml-4">
                        // {auth.user ? (
                        //     // Buttons can be conditionally rendered here if needed
                        //     <>
                        //     </>
                        // ) : (
                        //     <>
                        //         <Button color="primary" Text='إنشاء حساب' className="mr-2" />
                        //         <Button color="primary" Text='تسجيل دخول' />
                        //     </>
                        // )}
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default NavbarStudent;


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

    // Fetch data from API
    const fetchStudentDetails = async () => {
        try {
            const response = await fetch('https://bdev.elmanhag.shop/student/setting/view');
            const data = await response.json();
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
            setJobName(job ? capitalizeFirstLetter(job.job) : 'Job not found');
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
                    <div className="hidden lg:flex">
                        <Link to="My_Subscriptions">
                            <button type='button' className="px-4 py-2 text-2xl text-secoundColor bg-mainColor rounded-2xl lg:px-6 lg:py-3">اشتراكاتي</button>
                        </Link>
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
