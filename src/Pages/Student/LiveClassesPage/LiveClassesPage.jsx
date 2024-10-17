// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Loading from '../../../Components/Loading';
// import { useAuth } from '../../../Context/Auth';
// import axios from 'axios';
// import { Button } from '../../../Components/Button';
// import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
// import {
//   format,
//   addMonths,
//   getDaysInMonth,
//   eachDayOfInterval,
//   startOfMonth,
//   getYear,
//   getMonth,
//   getDate,
//   isSameDay,
//   differenceInDays, // Add the missing import
// } from 'date-fns';
// import { arSA } from 'date-fns/locale'; // Arabic Saudi locale for formatting month names
// import { ar } from 'date-fns/locale'; // Import the Arabic locale for date-fns
// import { Warning } from 'postcss';


// const formatMonthYear = (date) => format(date, 'MMMM yyyy', { locale: arSA });

// const LiveClassesPage = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [liveData, setLiveData] = useState([]); // Store live data from API
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [dayOffset, setDayOffset] = useState(0); // Tracks the current 7-day offset
  // const [filteredData, setFilteredData] = useState([]); // Filtered data based on selected day
  // const [selectedDay, setSelectedDay] = useState(new Date()); // Track the selected day
  // const auth = useAuth();
  // const navigate = useNavigate();
  // const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  // const [modalMessage, setModalMessage] = useState(''); // Control modal message

  // const [isWorningOpen, setIsWorningOpen] = useState(false); // Control modal visibility
  // const [warningMessage, setWarningMessage] = useState(''); // Control modal message
  

//   const daysInMonth = getDaysInMonth(currentDate);
//   const currentMonth = getMonth(currentDate) + 1; // Months are 0-indexed
//   const currentYear = getYear(currentDate);

//   // const weekDays = ['السبت', 'الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعه'];

//   // const prevDays = () => {
//   //   const today = new Date();
//   //   const currentDayOfMonth = getDate(today);
  
//   //   if (currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()) {
//   //     // Check if the previous week would include days before today
//   //     if (dayOffset <= Math.floor((currentDayOfMonth - 1) / 7) * 7) {
//   //       return; // Prevent going back further than the current week
//   //     }
//   //   }
  
//   //   if (dayOffset === 0) {
//   //     const prevMonth = addMonths(currentDate, -1);
//   //     setCurrentDate(prevMonth);
//   //     setDayOffset(Math.max(getDaysInMonth(prevMonth) - 7, 0));
//   //   } else {
//   //     setDayOffset(Math.max(dayOffset - 7, 0));
//   //   }
//   // };

//   // const nextDays = () => {
//   //   if (dayOffset + 7 >= daysInMonth) {
//   //     const nextMonth = addMonths(currentDate, 1);
//   //     setCurrentDate(nextMonth);
//   //     setDayOffset(0);
//   //   } else {
//   //     setDayOffset(dayOffset + 7);
//   //   }
//   // };

//   // // const visibleDays = eachDayOfInterval({
//   // //   start: new Date(currentYear, currentMonth - 1, dayOffset + 1),
//   // //   end: new Date(currentYear, currentMonth - 1, Math.min(dayOffset + 7, daysInMonth)),
//   // // });
//   // const visibleDays = eachDayOfInterval({
//   //   start: new Date(currentYear, currentMonth - 1, getDate(new Date()) + dayOffset), // Start from the current day
//   //   end: new Date(currentYear, currentMonth - 1, Math.min(getDate(new Date()) + dayOffset + 6, daysInMonth)), // Show the next 7 days starting from today
//   // });
  

//   // const handleDayClick = (day) => {
//   //   setSelectedDay(day); // Update the selected day state
//   //   const filtered = liveData.filter((item) => isSameDay(new Date(item.date), day));
//   //   setFilteredData(filtered);
//   // };



// // Generate dynamic weekdays based on the visibleDays
// const getWeekDays = (visibleDays) => {
//   return visibleDays.map((day) => format(day, 'eeee', { locale: ar }));
// };

// const prevDays = () => {
//   const today = new Date();
//   const currentDayOfMonth = getDate(today);

//   if (currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()) {
//     if (dayOffset <= Math.floor((currentDayOfMonth - 1) / 7) * 7) {
//       return; // Prevent going back further than the current week
//     }
//   }

//   if (dayOffset === 0) {
//     const prevMonth = addMonths(currentDate, -1);
//     setCurrentDate(prevMonth);
//     setDayOffset(Math.max(getDaysInMonth(prevMonth) - 7, 0));
//   } else {
//     setDayOffset(Math.max(dayOffset - 7, 0));
//   }
// };

// const nextDays = () => {
//   if (dayOffset + 7 >= daysInMonth) {
//     const nextMonth = addMonths(currentDate, 1);
//     setCurrentDate(nextMonth);
//     setDayOffset(0);
//   } else {
//     setDayOffset(dayOffset + 7);
//   }
// };

// // Calculate visible days
// const visibleDays = eachDayOfInterval({
//   start: new Date(currentYear, currentMonth - 1, getDate(new Date()) + dayOffset),
//   end: new Date(currentYear, currentMonth - 1, Math.min(getDate(new Date()) + dayOffset + 6, daysInMonth)),
// });

// // Dynamically generate weekdays in Arabic
// const weekDays = getWeekDays(visibleDays);

// const handleDayClick = (day) => {
//   setSelectedDay(day); // Update the selected day state
//   const filtered = liveData.filter((item) => isSameDay(new Date(item.date), day));
//   setFilteredData(filtered);
// };

  // const formatTimeToArabic = (time) => {
  //   const [hours, minutes] = time.split(':'); // Split time into hours and minutes
  //   let hoursIn12Hour = parseInt(hours, 10); // Convert hours to integer
  //   const ampm = hoursIn12Hour >= 12 ? 'م' : 'ص'; // Determine م or ص
  //   hoursIn12Hour = hoursIn12Hour % 12 || 12; // Convert to 12-hour format
  //   return `${String(hoursIn12Hour).padStart(2, '0')}:${minutes} ${ampm}`; // Return formatted time
  // };
  
  

//   useEffect(() => {
//     const today = new Date();
//     const startOfCurrentMonth = startOfMonth(today);
//     const diff = differenceInDays(today, startOfCurrentMonth);
//     const currentWeekOffset = Math.floor(diff / 7) * 7;
//     setDayOffset(currentWeekOffset);
//     setSelectedDay(today); // Highlight the current day by default
//   }, []);

  // const handleGoBack = () => {
  //   navigate(-1, { replace: true });
  // };

  // const fetchLive = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get('https://bdev.elmanhag.shop/student/subscription', {
  //       headers: {
  //         Authorization: `Bearer ${auth.user.token}`,
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //     });

  //     if (response.status === 200) {
  //       console.log(response.data);
  //       setLiveData(response.data.live); // Store live data

  //       // Automatically filter data for the current day
  //       const today = new Date();
  //       const filtered = response.data.live.filter((item) => isSameDay(new Date(item.date), today));
  //       setFilteredData(filtered); // Filter data by the current day
  //     }
  //   } catch (error) {
  //     const errorMessages = error?.response?.data?.errors;
  //     let errorMessageString = 'Error occurred';
  //     if (errorMessages) {
  //       errorMessageString = Object.values(errorMessages).flat().join(' ');
  //     }
  //     auth.toastError('Error', errorMessageString);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchLive();
  // }, [auth.user.token]);

//   // const handleAttendanceClick = async (id,live) => {
//   //   setIsLoading(true);
//   //   console.log("live is :",live,live.link)
//   //   try {
//   //     const response = await axios.post(
//   //       `https://bdev.elmanhag.shop/student/subscription/check/${id}`, {},
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${auth.user.token}`,
//   //           'Content-Type': 'application/json',
//   //         },
//   //       }
//   //     );
  
//   //     console.log("Response status:", response.status);
//   //     console.log("Response data:", response);
  
//   //     if (response.status === 200 && response.data.success) {
//   //       console.log('Success:', response.data);
//   //       window.open(live.link, '_blank', 'noopener noreferrer');
//   //     }
//   //   } catch (error) {
//   //     console.log('Error response:', error.response); 
  
//   //     // Check if the error response contains the 'faild' message
//   //     if (error.response && error.response.data && error.response.data.faild) {
//   //       const faildMessage = error.response.data.faild;
  
//   //       // Set the Arabic message if the returned message matches
//   //       if (faildMessage === 'You must buy live first') {
//   //         setModalMessage('يجب شراء اللايف'); // Arabic message for the modal
//   //       } else {
//   //         setModalMessage(faildMessage); // Set the original error message if it's different
//   //       }
  
//   //       setIsModalOpen(true); // Open the modal
//   //     } else {
//   //       // Handle other possible errors (e.g., validation errors)
//   //       const errorMessages = error?.response?.data?.errors;
//   //       let errorMessageString = 'Error occurred';
//   //       if (errorMessages) {
//   //         errorMessageString = Object.values(errorMessages).flat().join(' ');
//   //       }
//   //       auth.toastError('Error', errorMessageString);
//   //     }
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
  
//   // const handleAttendanceClick = async (id, live) => {
//   //   setIsLoading(true);
//   //   console.log("live is:", live, live.link);
  
//   //   try {
//   //     const currentTime = new Date(); // Get the current time
//   //     const fromTime = new Date(live.from); // Convert fromTime to a Date object
//   //     const toTime = new Date(live.to); // Convert toTime to a Date object
  
//   //     // Calculate the time difference in milliseconds
//   //     const diffFromTime = (fromTime - currentTime) / (1000 * 60); // Difference in minutes
//   //     const diffToTime = (currentTime - toTime) / (1000 * 60); // Difference in minutes
  
//   //     // Check if the current time is more than 30 minutes before the live start time
//   //     if (diffFromTime > 30) {
//   //       setModalMessage('الحدث لم يبدأ بعد. الرجاء العودة لاحقًا.'); // Arabic message for "Event hasn't started yet"
//   //       setIsModalOpen(true);
//   //       return;
//   //     }
  
//   //     // Check if the live session has already ended
//   //     if (diffToTime > 0) {
//   //       setModalMessage('انتهى الحدث. لا يمكنك الانضمام بعد الآن.'); // Arabic message for "Event has ended"
//   //       setIsModalOpen(true);
//   //       return;
//   //     }
  
//   //     // Proceed with API call if time conditions are met
//   //     const response = await axios.post(
//   //       `https://bdev.elmanhag.shop/student/subscription/check/${id}`, {},
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${auth.user.token}`,
//   //           'Content-Type': 'application/json',
//   //         },
//   //       }
//   //     );
  
//   //     console.log("Response status:", response.status);
//   //     console.log("Response data:", response);
  
//   //     if (response.status === 200 && response.data.success) {
//   //       console.log('Success:', response.data);
//   //       window.open(live.link, '_blank', 'noopener noreferrer');
//   //     }
//   //   } catch (error) {
//   //     console.log('Error response:', error.response);
  
//   //     // Check if the error response contains the 'faild' message
//   //     if (error.response && error.response.data && error.response.data.faild) {
//   //       const faildMessage = error.response.data.faild;
  
//   //       // Set the Arabic message if the returned message matches
//   //       if (faildMessage === 'You must buy live first') {
//   //         setModalMessage('يجب شراء اللايف'); // Arabic message for the modal
//   //       } else {
//   //         setModalMessage(faildMessage); // Set the original error message if it's different
//   //       }
  
//   //       setIsModalOpen(true); // Open the modal
//   //     } else {
//   //       // Handle other possible errors (e.g., validation errors)
//   //       const errorMessages = error?.response?.data?.errors;
//   //       let errorMessageString = 'Error occurred';
//   //       if (errorMessages) {
//   //         errorMessageString = Object.values(errorMessages).flat().join(' ');
//   //       }
//   //       auth.toastError('Error', errorMessageString);
//   //     }
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

  // const handleAttendanceClick = async (id, live) => {
  //   setIsLoading(true);
  //   console.log("live is:", live, live.link);
  
  //   try {
  //     const currentTime = new Date(); // Get the current date and time
  
  //     // Helper function to create a Date object with today's date and a given time (HH:MM:SS)
  //     const parseTime = (timeString) => {
  //       const [hours, minutes, seconds] = timeString.split(':').map(Number);
  //       const date = new Date();
  //       date.setHours(hours, minutes, seconds, 0); // Set hours, minutes, and seconds
  //       return date;
  //     };
  
  //     const fromTime = parseTime(live.from); // Convert fromTime to a Date object
  //     const toTime = parseTime(live.to); // Convert toTime to a Date object
  
  //     // Calculate the time difference in minutes
  //     const diffFromTime = (fromTime - currentTime) / (1000 * 60); // Difference in minutes
  //     const diffToTime = (currentTime - toTime) / (1000 * 60); // Difference in minutes
  
  //     // Check if the current time is more than 30 minutes before the live start time
  //     if (diffFromTime > 30) {
  //       setWarningMessage('اللايف لم يبدأ بعد. الرجاء العودة لاحقًا قبل الموعد بعشر دقائق'); // Arabic message for "Event hasn't started yet"
  //       setIsWorningOpen(true); // Open the warning modal
  //       setIsLoading(false); // Stop loading
  //       return; // Exit the function, prevent API call
  //     }
  
  //     // Check if the live session has already ended
  //     if (diffToTime > 0) {
  //       setWarningMessage('انتهى اللايف. لا يمكنك الانضمام بعد الآن.'); // Arabic message for "Event has ended"
  //       setIsWorningOpen(true); // Open the warning modal
  //       setIsLoading(false); // Stop loading
  //       return; // Exit the function, prevent API call
  //     }
  
  //     // Proceed with API call if time conditions are met
  //     const response = await axios.post(
  //       `https://bdev.elmanhag.shop/student/subscription/check/${id}`, {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${auth.user.token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  
  //     console.log("Response status:", response.status);
  //     console.log("Response data:", response);
  
  //     if (response.status === 200 && response.data.success) {
  //       console.log('Success:', response.data);
  //       window.open(live.link, '_blank', 'noopener noreferrer');
  //     }
  //   } catch (error) {
  //     console.log('Error response:', error.response);
  
  //     // Check if the error response contains the 'faild' message
  //     if (error.response && error.response.data && error.response.data.faild) {
  //       const faildMessage = error.response.data.faild;
  
  //       // Set the Arabic message if the returned message matches
  //       if (faildMessage === 'You must buy live first') {
  //         setModalMessage('يجب شراء اللايف'); // Arabic message for the modal
  //       } else {
  //         setModalMessage(faildMessage); // Set the original error message if it's different
  //       }
  
  //       setIsModalOpen(true); // Open the modal
  //     } else {
  //       // Handle other possible errors (e.g., validation errors)
  //       const errorMessages = error?.response?.data?.errors;
  //       let errorMessageString = 'Error occurred';
  //       if (errorMessages) {
  //         errorMessageString = Object.values(errorMessages).flat().join(' ');
  //       }
  //       auth.toastError('Error', errorMessageString);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  
  
//   if (isLoading) {
//     return (
//       <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full p-7 mt-8 s:p-3">
//       {/* Month Navigation */}
      // <div className="flex justify-between items-center">
      //   <FaRegArrowAltCircleRight onClick={prevDays} className="text-red-500 text-2xl cursor-pointer" />
      //   <span className="text-lg font-bold text-red-500">
      //     {formatMonthYear(currentDate)}
      //   </span>
      //   <FaRegArrowAltCircleLeft onClick={nextDays} className="text-red-500 text-2xl cursor-pointer" />
      // </div>

//       {/* Days of the Week with Dates of the Month */}
//       <div className="grid grid-cols-7 gap-2 mt-4 text-center">
//         {visibleDays.map((day, index) => (
//           <div key={index} className="flex gap-5 flex-col font-bold text-red-500">
//             {/* Display weekday */}
//             <div className='lg:text-lg sm:text-xs'>{weekDays[getDate(day) % 7]}</div>
//             {/* Display day of the month */}
//             <div
//               onClick={() => handleDayClick(day)}
//               className={`p-2 text-sm rounded-lg cursor-pointer 
//                 ${isSameDay(day, selectedDay) ? 'bg-red-200 text-red-700 font-bold' : 'bg-gray-100'}`}
//             >
//               {getDate(day)}
//             </div>
//           </div>
//         ))}
//       </div>


//       {/* Filtered Data Display */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-y-5">
//         {filteredData.length > 0 ? (
//           filteredData.map((live) => (
            
//             <div key={live.id} className="rounded-lg shadow-md bg-mainColor lg:w-4/5 s:w-full">
//               {/* Error Modal */}
//               {isModalOpen && (
//               <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:mr-10">
//                 <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
//                   <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">{modalMessage}</h2>
//                   <div className="flex justify-end gap-4 sm:gap-2">
//                     <Link to="/dashboard/subscriptions/plansMethod" state={{ plan:live, planType: "Live session"}}>
//                       <Button Text="اشترك الان" Width="auto" BgColor="bg-mainColor" Color="text-white" />
//                     </Link>
//                     <Button Text="حاول لاحقا" Width="auto" BgColor="bg-gray-300" Color="text-black" handleClick={handleGoBack} />
//                   </div>
//                 </div>
//               </div>
//               )}

// {isWorningOpen && (
//               <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:mr-10">
//                 <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
//                   <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">{warningMessage}</h2>
//                   <div className="flex justify-end gap-4 sm:gap-2">
//                     <Button Text="حسنا" Width="auto" BgColor="bg-gray-300" Color="text-black" handleClick={handleGoBack} />
//                   </div>
//                 </div>
//               </div>
//     )}

//             <div>
//               <div className="flex gap-5 justify-around bg-[#EBEBEB] p-6 rounded-l-lg h-full mr-10">
//                 <div>
//                   <img src={live.teacher?.image_link} alt={live.teacher?.name}/>
//                 </div>
//                 <div>
//                 <p className='text-xl text-mainColor font-semibold'><strong className='text-black text-xl font-medium'>الوقت:</strong> {formatTimeToArabic(live.from)} : {formatTimeToArabic(live.to)}</p>

//                   <p className='text-xl'><strong>المعلم:</strong> {live.teacher?.name}</p>
//                   <p className='text-xl'><strong>المادة:</strong> {live.subject?.name}</p>
//                 </div>
//                 <div>
//                   <img src={live.subject?.cover_photo_url} alt={live.subject?.name} className='w-16 h-14'/>
//                 </div>
//                 </div>
//                 <div className='mr-10 rounded-2xl border-mainColor'>
//                 <Button
//                     type='submit'
//                       Text=" حضور"
//                       BgColor="bg-mainColor"
//                       Color="text-white"
//                       Width="full"
//                       Size="text-2xl"
//                       px="px-3"
//                       rounded="rounded-2xl"
//                       handleClick={() => handleAttendanceClick(live.id,live)}
//                       stateLoding={isLoading}
//                       // stateLoading={isLoading}
//                       // onClick={() => handleAttendanceClick(live.id, live.live_link)} // Wrap with arrow function
//                       />
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <h1 className="text-mainColor text-xl font-semibold text-center">لا توجد بيانات لهذا اليوم</h1>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LiveClassesPage;


import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isBefore, isSameDay, isWithinInterval, addWeeks, subWeeks, isSameWeek } from 'date-fns';
import { arSA } from 'date-fns/locale';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../Context/Auth';
import { Button } from '../../../Components/Button';

const LiveClassesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [liveData, setLiveData] = useState([]); // Store live data from API
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on selected day
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date()); // Track the selected day

  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Control modal message
  const [isWorningOpen, setIsWorningOpen] = useState(false); // Control modal visibility
  const [warningMessage, setWarningMessage] = useState(''); // Control modal message

  const today = new Date();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGoBack = () => {
    console.log("done")
    navigate(-1, { replace: true });
  };

  const formatTimeToArabic = (time) => {
    const [hours, minutes] = time.split(':'); // Split time into hours and minutes
    let hoursIn12Hour = parseInt(hours, 10); // Convert hours to integer
    const ampm = hoursIn12Hour >= 12 ? 'م' : 'ص'; // Determine م or ص
    hoursIn12Hour = hoursIn12Hour % 12 || 12; // Convert to 12-hour format
    return `${String(hoursIn12Hour).padStart(2, '0')}:${minutes} ${ampm}`; // Return formatted time
  };

  // Fetch live data
  const fetchLive = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://bdev.elmanhag.shop/student/subscription', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        const liveSessions = response.data.live;
        console.log(liveSessions);
        setLiveData(liveSessions);
        filterLiveSessions(liveSessions, selectedDay); // Initial filter
      }
    } catch (error) {
      console.error('Error fetching live data:', error);
      auth.toastError('Error', 'Unable to fetch live data');
    } finally {
      setIsLoading(false);
    }
  };

  const filterLiveSessions = (liveSessions, selectedDay) => {
    const currentTime = new Date();
    const today = new Date(); // Represents the current day
  
    const filtered = liveSessions.filter((live) => {
      const liveDate = new Date(live.date);
  
      // Extract hours and minutes from live.from and live.to
      const [toHours, toMinutes] = live.to.split(":");
      const [fromHours, fromMinutes] = live.from.split(":");
  
      // Create `fromTime` and `toTime` based on the time of the session
      const fromTime = new Date(selectedDay);
      fromTime.setHours(fromHours, fromMinutes, 0);
  
      const toTime = new Date(selectedDay);
      toTime.setHours(toHours, toMinutes, 0);
  
      // Extract hours and minutes from current time
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
  
      // Compare only the time part (hours and minutes)
      const fromTimeOnly = fromHours * 60 + parseInt(fromMinutes);
      const toTimeOnly = toHours * 60 + parseInt(toMinutes);
      const currentTimeOnly = currentHours * 60 + currentMinutes;
  
      // For debugging: Check the constructed times
      console.log("fromTime:", fromTime);
      console.log("toTime:", toTime);
      console.log("currentTime:", currentTime);
      console.log("currentTimeOnly:", currentTimeOnly, "toTimeOnly:", toTimeOnly);
  
      // Skip expired sessions
      if (live.date === "Expired") {
        return false;
      }
  
      // Check if selectedDay is today
      if (isSameDay(today, selectedDay)) {
        // Compare only the time part for today's session
        if (currentTimeOnly > toTimeOnly) {
          console.log("Session has already ended today:", liveDate);
          return false;
        }
      }
  
      // Non-recurring sessions (fixed === 0): Show only on the selected day
      if (live.fixed === 0) {
        return isSameDay(liveDate, selectedDay);
      }

        // Recurring sessions (fixed === 1): Check if they are in the interval for the selected day
        if (live.fixed === 1) {
        const startDate = new Date(live.date); // Start of the live session's interval
        const endDate = new Date(live.end_date); // End of the live session's interval
        // return isWithinInterval(selectedDay, { start: startDate, end: endDate});

        // Get the day name from selectedDay
        const selectedDayName = selectedDay.toLocaleString('en-US', { weekday: 'long' }); // 'Wednesday', etc.
        console.log("Selected Day Name:", selectedDayName, "Live Day:", live.day);
        
        // Check if selectedDay's day name is the same as live.day
        const isSelectedDaySameAsLiveDay = selectedDayName === live.day;
      
      // Check if live.day is within the start and end dates
      const isLiveDayInInterval = isWithinInterval(selectedDay, { start: startDate, end: endDate });

      // Return true if both conditions are met
      return isSelectedDaySameAsLiveDay && isLiveDayInInterval;
      }
  
      return false; // Default case
    });
  
    setFilteredData(filtered);
    console.log(filtered);
  };
  
  
  useEffect(() => {
    fetchLive();
  }, [auth.user.token]);

  useEffect(() => {
    filterLiveSessions(liveData, selectedDay);
  }, [liveData, selectedDay]);

  const prevWeek = () => {
    if (!isSameWeek(currentDate, today)) {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const handleDateClick = (date) => {
    if (isBefore(date, today) || !isSameDay(date, today)) {
      setSelectedDay(date); // Update selected day
      filterLiveSessions(liveData, date); // Filter sessions based on the selected day
    }
  };

  const generateWeekDates = () => {
    const startDate = startOfWeek(currentDate, { locale: arSA });
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const handleAttendanceClick = async (id, live) => { 
    setIsLoading(true);
    console.log("live is:", live, live.link);
  
    try {
      const currentTime = new Date(); // Get the current date and time
  
      // Helper function to create a Date object with today's date and a given time (HH:MM:SS)
      const parseTime = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, seconds, 0); // Set hours, minutes, and seconds
        return date;
      };
  
      // Create a date object for the live session date
      const liveDate = new Date(live.date); // Ensure live.date is in a valid format (ISO string)
      const fromTime = parseTime(live.from); // Convert fromTime to a Date object
      const toTime = parseTime(live.to); // Convert toTime to a Date object
  
      // Set the live session's date for 'from' and 'to' times
      fromTime.setFullYear(liveDate.getFullYear(), liveDate.getMonth(), liveDate.getDate());
      toTime.setFullYear(liveDate.getFullYear(), liveDate.getMonth(), liveDate.getDate());
  
      // First, check if the user has purchased the live session
      const purchaseResponse = await axios.post(
        `https://bdev.elmanhag.shop/student/subscription/check/${id}`, {},
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log("Purchase Response status:", purchaseResponse.status);
      console.log("Purchase Response data:", purchaseResponse.data);
  
      if (purchaseResponse.status !== 200 || !purchaseResponse.data.success) {
        // Handle if the user hasn't purchased the live session
        setModalMessage('يجب شراء اللايف'); // Arabic message for "You must buy live first"
        setIsModalOpen(true); // Open the modal
        setIsLoading(false);
        return; // Exit the function
      }
  
      // Now that we know the user has purchased, proceed with date checks
      const diffFromTime = (fromTime - currentTime) / (1000 * 60); // Difference in minutes
      const diffToTime = (currentTime - toTime) / (1000 * 60); // Difference in minutes
  
      const isSameDay = selectedDay.toDateString() === currentTime.toDateString();
      console.log(selectedDay.toDateString() , currentTime.toDateString())
      
      if (isSameDay) {
        // If today is the live date, check if the live session has ended
        if (diffToTime > 0) {
          setWarningMessage('انتهى اللايف. لا يمكنك الانضمام بعد الآن.'); // Event has ended
          setIsWorningOpen(true);
          setIsLoading(false);
          return;
        }
  
        // If the live session starts in more than 30 minutes
        if (diffFromTime > 30) {
          setWarningMessage('اللايف لم يبدأ بعد. الرجاء العودة لاحقًا قبل الموعد بعشر دقائق'); // Event hasn't started yet
          setIsWorningOpen(true);
          setIsLoading(false);
          return;
        }
  
        // If the live session starts within 30 minutes, go to the link directly
        window.open(live.link, '_blank', 'noopener noreferrer');
  
      } else {
        // If the live session is in the future
        if (selectedDay > currentTime) {
          setWarningMessage('الرجاء الدخول قبل الموعد بعشر دقائق'); // Please enter before the appointment 10 minutes
          setIsWorningOpen(true);
          setIsLoading(false);
          return;
        }
      }
    } catch (error) {
      console.log('Error response:', error.response);
  
      // Handle any errors that occurred during the API call
      if (error.response && error.response.data && error.response.data.faild) {
        const faildMessage = error.response.data.faild;
  
        // Set the Arabic message if the returned message matches
        setModalMessage(faildMessage); // Use the faild message if present
        setIsModalOpen(true); // Open the modal
      } else {
        // Handle other possible errors (e.g., validation errors)
        const errorMessages = error?.response?.data?.errors;
        let errorMessageString = 'Error occurred';
        if (errorMessages) {
          errorMessageString = Object.values(errorMessages).flat().join(' ');
        }
        auth.toastError('Error', errorMessageString);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseWorning = () => {
    setIsWorningOpen(false)
  }
  


  
  // const handleAttendanceClick = async (id, live) => {
  //   setIsLoading(true);
  //   console.log("live is:", live, live.link);
  
  //   try {
  //     const currentTime = new Date(); // Get the current date and time
  
  //     // Helper function to create a Date object with today's date and a given time (HH:MM:SS)
  //     const parseTime = (timeString) => {
  //       const [hours, minutes, seconds] = timeString.split(':').map(Number);
  //       const date = new Date();
  //       date.setHours(hours, minutes, seconds, 0); // Set hours, minutes, and seconds
  //       return date;
  //     };
  
  //     const fromTime = parseTime(live.from); // Convert fromTime to a Date object
  //     const toTime = parseTime(live.to); // Convert toTime to a Date object
  
  //     // Calculate the time difference in minutes
  //     const diffFromTime = (fromTime - currentTime) / (1000 * 60); // Difference in minutes
  //     const diffToTime = (currentTime - toTime) / (1000 * 60); // Difference in minutes
  
  //     // Check if the current time is more than 30 minutes before the live start time
  //     if (diffFromTime > 30) {
  //       setWarningMessage('اللايف لم يبدأ بعد. الرجاء العودة لاحقًا قبل الموعد بعشر دقائق'); // Arabic message for "Event hasn't started yet"
  //       setIsWorningOpen(true); // Open the warning modal
  //       setIsLoading(false); // Stop loading
  //       return; // Exit the function, prevent API call
  //     }
  
  //     // Check if the live session has already ended
  //     if (diffToTime > 0) {
  //       setWarningMessage('انتهى اللايف. لا يمكنك الانضمام بعد الآن.'); // Arabic message for "Event has ended"
  //       setIsWorningOpen(true); // Open the warning modal
  //       setIsLoading(false); // Stop loading
  //       return; // Exit the function, prevent API call
  //     }
  
  //     // Proceed with API call if time conditions are met
  //     const response = await axios.post(
  //       `https://bdev.elmanhag.shop/student/subscription/check/${id}`, {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${auth.user.token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  
  //     console.log("Response status:", response.status);
  //     console.log("Response data:", response);
  
  //     if (response.status === 200 && response.data.success) {
  //       console.log('Success:', response.data);
  //       window.open(live.link, '_blank', 'noopener noreferrer');
  //     }
  //   } catch (error) {
  //     console.log('Error response:', error.response);
  
  //     // Check if the error response contains the 'faild' message
  //     if (error.response && error.response.data && error.response.data.faild) {
  //       const faildMessage = error.response.data.faild;
  
  //       // Set the Arabic message if the returned message matches
  //       if (faildMessage === 'You must buy live first') {
  //         setModalMessage('يجب شراء اللايف'); // Arabic message for the modal
  //       } else {
  //         setModalMessage(faildMessage); // Set the original error message if it's different
  //       }
  
  //       setIsModalOpen(true); // Open the modal
  //     } else {
  //       // Handle other possible errors (e.g., validation errors)
  //       const errorMessages = error?.response?.data?.errors;
  //       let errorMessageString = 'Error occurred';
  //       if (errorMessages) {
  //         errorMessageString = Object.values(errorMessages).flat().join(' ');
  //       }
  //       auth.toastError('Error', errorMessageString);
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  

  return (
    <>
      <div className="w-full p-4 bg-white shadow-lg rounded-lg" dir="rtl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={prevWeek}
            disabled={isSameWeek(currentDate, today)}
            className={`bg-gray-200 p-2 rounded ${isSameWeek(currentDate, today) ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-300'}`}
          >
            <FaRegArrowAltCircleRight size={24} className="text-red-500 text-2xl cursor-pointer" />
          </button>
          <h2 className="text-lg font-bold text-red-500">
            {format(currentDate, 'MMMM yyyy', { locale: arSA })}
          </h2>
          <button onClick={nextWeek} className="p-2 rounded hover:bg-red-100">
            <FaRegArrowAltCircleLeft size={24} className="text-red-500 text-2xl cursor-pointer" />
          </button>
        </div>

        {/* Days of the Week */}
        {/* <div className="grid grid-cols-7 gap-2 text-center font-bold lg:text-lg sm:text-xs">
          {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
            <div key={day} className="text-gray-600">{day}</div>
          ))}
        </div> */}

        {/* Dates for the Current Week */}
        {/* <div className="grid grid-cols-7 gap-2 mt-4">
          {generateWeekDates().map(date => {
            const isToday = isSameDay(date, today);
            const isPastDate = isBefore(date, today);

            return (
              <div
                key={date}
                onClick={() => handleDateClick(date)}
                className={`p-2 text-center rounded-full cursor-pointer ${isPastDate ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:bg-gray-200'} ${isToday ? 'bg-mainColor text-white' : ''}`}
                style={{ pointerEvents: isPastDate ? 'none' : 'auto' }}
              >
                {format(date, 'd')}
              </div>
            );
          })}
        </div> */}

<div className="grid grid-cols-7 gap-1 lg:gap-2 text-center font-semibold lg:text-lg md:text-lg sm:text-xs">
  {generateWeekDates().map((date) => (
    <button
      key={date.toString()}
      onClick={() => handleDateClick(date)}
      className={`p-1 lg:p-2 rounded-lg cursor-pointer 
        ${isSameDay(date, selectedDay) ? 'bg-mainColor text-white' : 'bg-gray-200'} 
        ${isBefore(date, today) && !isSameDay(date, today) ? 'cursor-not-allowed opacity-50' : ''}`} // Apply opacity only to past dates
      disabled={isBefore(date, today) && !isSameDay(date, today)} // Disable past dates except today
    >
      {format(date, 'EEEE', { locale: arSA })}<br />
      {format(date, 'd', { locale: arSA })}
    </button>
  ))}
</div>

      </div>

      {/* Filtered Data Display */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-y-5">
        {filteredData.length > 0 ? (
          filteredData.map((live) => (
            <div key={live.id} className="rounded-lg shadow-md bg-mainColor lg:w-4/5 s:w-full">

              {/* Error Modal */}
              {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:mr-10">
                <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
                  <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">{modalMessage}</h2>
                  <div className="flex justify-end gap-4 sm:gap-2">
                    <Link to="/dashboard/subscriptions/plansMethod" state={{ plan:live, planType: "Live session"}}>
                      <Button Text="اشترك الان" Width="auto" BgColor="bg-mainColor" Color="text-white" />
                    </Link>
                    <Button Text="حاول لاحقا" Width="auto" BgColor="bg-gray-300" Color="text-black" handleClick={handleGoBack} />
                  </div>
                </div>
              </div>
              )}

            {isWorningOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:mr-10">
                <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
                  <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">{warningMessage}</h2>
                  <div className="flex justify-end gap-4 sm:gap-2">
                    <Button Text="حسنا" Width="auto" BgColor="bg-mainColor" Color="text-white" handleClick={handleCloseWorning} />
                  </div>
                </div>
              </div>
            )}

              <div>
                <div className="flex gap-5 justify-around bg-[#EBEBEB] p-6 rounded-l-lg h-full mr-10">
                  <div>
                    <img src={live.teacher?.image_link} alt={live.teacher?.name} />
                  </div>
                  <div>
                    <p className='text-xl text-mainColor font-semibold'><strong className='text-black text-xl font-medium'>الوقت:</strong> {formatTimeToArabic(live.from)} : {formatTimeToArabic(live.to)}</p>
                    <p className='text-xl'><strong>المعلم:</strong> {live.teacher?.name}</p>
                    <p className='text-xl'><strong>المادة:</strong> {live.subject?.name}</p>
                  </div>
                  <div>
                    <img src={live.subject?.cover_photo_url} alt={live.subject?.name} className='w-16 h-14' />
                  </div>
                </div>
                <div className='mr-10 rounded-2xl border-mainColor'>
                  <Button
                    type='submit'
                    Text=" حضور"
                    BgColor="bg-mainColor"
                    Color="text-white"
                    Width="full"
                    Size="text-2xl"
                    px="px-3"
                    rounded="rounded-2xl"
                    handleClick={() => handleAttendanceClick(live.id, live)}
                    // stateLoding={isLoading}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
         <div className='w-full text-center'>
          <h1 className="text-mainColor text-2xl font-semibold">لا توجد حصص متاحة في هذا اليوم</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default LiveClassesPage;
