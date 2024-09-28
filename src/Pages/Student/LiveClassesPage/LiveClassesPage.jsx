// import React, { useEffect, useState } from 'react'; 
// import { useNavigate, useLocation } from 'react-router-dom';
// import Loading from '../../../Components/Loading';
// import { useAuth } from '../../../Context/Auth';

// import axios from 'axios';
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
//   differenceInDays,
//   isSameDay,
// } from 'date-fns';
// import { arSA } from 'date-fns/locale'; // Arabic Saudi locale for formatting month names

// // Utility function to format the month and year
// const formatMonthYear = (date) => format(date, 'MMMM yyyy', { locale: arSA });

// // Sample Fake Data (Mock Data for the Calendar)
// const fakeData = [
//   { id: 1, image:'C:/Users/user/Pictures/Camera Roll/th.jpeg' ,day: 2, teacher: 'محمد حسن', subject: 'اللغة العربية', time: '01:00 م - 02:00 م', date: '2024-09-27' },
//   { id: 2, image:'C:/Users/user/Pictures/Camera Roll/th.jpeg' , day: 3, teacher: 'محمد علي', subject: 'الرياضيات', time: '02:00 م - 03:00 م', date: '2024-09-28' },
//   { id: 3,image:'C:/Users/user/Pictures/Camera Roll/th.jpeg' , day: 5, teacher: 'أحمد محمد', subject: 'العلوم', time: '10:00 ص - 11:00 ص', date: '2024-09-28' },
//   { id: 4,image:'C:/Users/user/Pictures/Camera Roll/th.jpeg' , day: 26, teacher: 'يوسف إبراهيم', subject: 'التاريخ', time: '01:00 م - 02:00 م', date: '2024-10-06' },
//   { id: 5, day: 28, teacher: 'خالد عمر', subject: 'الجغرافيا', time: '10:00 ص - 11:00 ص', date: '2024-10-05' },
//   // Add more data as needed
// ];

// // CalendarFilter component
// const LiveClassesPage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const [liveData, setLiveData] = useState(false);

//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [dayOffset, setDayOffset] = useState(0); // Tracks the current 7-day offset
//   const [filteredData, setFilteredData] = useState(fakeData); // Initialize with all data

//   const daysInMonth = getDaysInMonth(currentDate);
//   const currentMonth = getMonth(currentDate) + 1; // Months are 0-indexed
//   const currentYear = getYear(currentDate);

//   // Days of the week (one letter)
//   const weekDays = ['السبت', 'الاحد', 'الاثنين','الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعه'];

//   // Function to go to the previous 7 days
//   const prevDays = () => {
//     if (dayOffset === 0) {
//       // Move to the last days of the previous month
//       const prevMonth = addMonths(currentDate, -1);
//       setCurrentDate(prevMonth);
//       setDayOffset(Math.max(getDaysInMonth(prevMonth) - 7, 0));
//     } else {
//       setDayOffset(Math.max(dayOffset - 7, 0));
//     }
//   };

//   // Function to go to the next 7 days
//   const nextDays = () => {
//     if (dayOffset + 7 >= daysInMonth) {
//       // Move to the next month
//       const nextMonth = addMonths(currentDate, 1);
//       setCurrentDate(nextMonth);
//       setDayOffset(0);
//     } else {
//       setDayOffset(dayOffset + 7);
//     }
//   };

//   // Get visible days for the current week (7 days)
//   const visibleDays = eachDayOfInterval({
//     start: new Date(currentYear, currentMonth - 1, dayOffset + 1),
//     end: new Date(currentYear, currentMonth - 1, Math.min(dayOffset + 7, daysInMonth)),
//   });

//   // Function to handle day click and filter data based on selected day
//   const handleDayClick = (day) => {
//     // Set filtered data based on selected day
//     const filtered = fakeData.filter((item) => isSameDay(new Date(item.date), day));
//     setFilteredData(filtered);
//   };

//   // Scroll to the week that contains the current day when the component mounts
//   useEffect(() => {
//     const today = new Date();
//     const startOfCurrentMonth = startOfMonth(today);
//     const diff = differenceInDays(today, startOfCurrentMonth); // Difference between today and the first day of the month
//     const currentWeekOffset = Math.floor(diff / 7) * 7; // Find which week (group of 7 days) contains today
//     setDayOffset(currentWeekOffset); // Set the offset to the week that contains the current day

//   }, []);

//   const fetchLive = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get('https://bdev.elmanhag.shop/student/subscription', {
//         headers: {
//           Authorization: `Bearer ${auth.user.token}`,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         console.log(response.data);
//         setLiveData(response.data.live)    
//       }
//     } catch (error) {
//       const errorMessages = error?.response?.data?.errors;
//       let errorMessageString = 'Error occurred';
//       if (errorMessages) {
//         errorMessageString = Object.values(errorMessages).flat().join(' ');
//       }
//       auth.toastError('Error', errorMessageString);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLive();
//     console.log("live",liveData)
//   }, [auth.user.token]);


//   if (isLoading) {
//     return (
//       <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full p-7 mt-8">
//       {/* Month Navigation */}
//       <div className="flex justify-between items-center">
//         <FaRegArrowAltCircleRight onClick={prevDays} className="text-red-500 text-2xl cursor-pointer" />
//         <span className="text-lg font-bold text-red-500">
//           {formatMonthYear(currentDate)} {/* Display formatted month and year */}
//         </span>
//         <FaRegArrowAltCircleLeft onClick={nextDays} className="text-red-500 text-2xl cursor-pointer" />
//       </div>

//       {/* Days of the Week */}
//       <div className="grid grid-cols-7 gap-2 mt-4 text-center">
//         {weekDays.map((day, index) => (
//           <div key={index} className="font-bold text-red-500">{day}</div>
//         ))}
//       </div>

//       {/* Days of the Month (Visible 7 days) */}
//       <div className="grid grid-cols-7 gap-2 mt-2 text-center">
//         {visibleDays.map((day, index) => (
//           <div
//             key={index}
//             onClick={() => handleDayClick(day)}
//             className={`p-2 text-sm bg-gray-100 rounded-lg cursor-pointer`}
//           >
//             {getDate(day)}
//           </div>
//         ))}
//       </div>

//       {/* Filtered Data Display */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-y-5">
//       {liveData.length > 0 ? (
//         liveData.map((live) => (
//           <div key={live.id} className="rounded-lg shadow-md bg-mainColor lg:w-4/5 s:w-full">
//             <div className="flex gap-5 justify-around bg-[#EBEBEB] p-6 rounded-l-lg h-full mr-5">
//               <div>
//                 <img src={live.teacher?.image_link} alt={live.teacher?.name} />
//               </div>

//               <div>
//                 <p className='text-xl'><strong>المعلم:</strong> {live.teacher?.name}</p>
//                 <p className='text-xl'><strong>المادة:</strong> {live.subject?.name}</p>
//                 {/* <p><strong>الوقت:</strong> {live.time}</p> */}
//                 {/* <p><strong>التاريخ:</strong> {live.date}</p> */}
//               </div>

//               <div>
//               <img src={live.subject?.cover_photo_url} alt={live.subject?.name} />
//               </div>

//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500 text-center">لا توجد بيانات لهذا اليوم</p>
//       )}
// </div>


//       </div>
//   );
// };

// export default LiveClassesPage;


import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import {
  format,
  addMonths,
  getDaysInMonth,
  eachDayOfInterval,
  startOfMonth,
  getYear,
  getMonth,
  getDate,
  differenceInDays,
  isSameDay,
} from 'date-fns';
import { arSA } from 'date-fns/locale'; // Arabic Saudi locale for formatting month names

const formatMonthYear = (date) => format(date, 'MMMM yyyy', { locale: arSA });

const LiveClassesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [liveData, setLiveData] = useState([]); // Store live data from API
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayOffset, setDayOffset] = useState(0); // Tracks the current 7-day offset
  const [filteredData, setFilteredData] = useState([]); // Initialize with filtered data
  const auth = useAuth();

  const daysInMonth = getDaysInMonth(currentDate);
  const currentMonth = getMonth(currentDate) + 1; // Months are 0-indexed
  const currentYear = getYear(currentDate);

  const weekDays = ['السبت', 'الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعه'];

  const prevDays = () => {
    if (dayOffset === 0) {
      const prevMonth = addMonths(currentDate, -1);
      setCurrentDate(prevMonth);
      setDayOffset(Math.max(getDaysInMonth(prevMonth) - 7, 0));
    } else {
      setDayOffset(Math.max(dayOffset - 7, 0));
    }
  };

  const nextDays = () => {
    if (dayOffset + 7 >= daysInMonth) {
      const nextMonth = addMonths(currentDate, 1);
      setCurrentDate(nextMonth);
      setDayOffset(0);
    } else {
      setDayOffset(dayOffset + 7);
    }
  };

  const visibleDays = eachDayOfInterval({
    start: new Date(currentYear, currentMonth - 1, dayOffset + 1),
    end: new Date(currentYear, currentMonth - 1, Math.min(dayOffset + 7, daysInMonth)),
  });

  const handleDayClick = (day) => {
    const filtered = liveData.filter((item) => isSameDay(new Date(item.date), day));
    setFilteredData(filtered);
  };

  useEffect(() => {
    const today = new Date();
    const startOfCurrentMonth = startOfMonth(today);
    const diff = differenceInDays(today, startOfCurrentMonth);
    const currentWeekOffset = Math.floor(diff / 7) * 7;
    setDayOffset(currentWeekOffset);
  }, []);

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
        console.log(response.data)
        setLiveData(response.data.live); // Store live data
        setFilteredData(response.data.live); // Initially show all data
      }
    } catch (error) {
      const errorMessages = error?.response?.data?.errors;
      let errorMessageString = 'Error occurred';
      if (errorMessages) {
        errorMessageString = Object.values(errorMessages).flat().join(' ');
      }
      auth.toastError('Error', errorMessageString);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLive();
  }, [auth.user.token]);

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full p-7 mt-8">
      {/* Month Navigation */}
      <div className="flex justify-between items-center">
        <FaRegArrowAltCircleRight onClick={prevDays} className="text-red-500 text-2xl cursor-pointer" />
        <span className="text-lg font-bold text-red-500">
          {formatMonthYear(currentDate)}
        </span>
        <FaRegArrowAltCircleLeft onClick={nextDays} className="text-red-500 text-2xl cursor-pointer" />
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 gap-2 mt-4 text-center">
        {weekDays.map((day, index) => (
          <div key={index} className="font-bold text-red-500">{day}</div>
        ))}
      </div>

      {/* Days of the Month */}
      <div className="grid grid-cols-7 gap-2 mt-2 text-center">
        {visibleDays.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className="p-2 text-sm bg-gray-100 rounded-lg cursor-pointer"
          >
            {getDate(day)}
          </div>
        ))}
      </div>

      {/* Filtered Data Display */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-y-5">
        {filteredData.length > 0 ? (
          filteredData.map((live) => (
            <div key={live.id} className="rounded-lg shadow-md bg-mainColor lg:w-4/5 s:w-full">
              <div className="flex gap-5 justify-around bg-[#EBEBEB] p-6 rounded-l-lg h-full mr-5">
                <div>
                  <img src={live.teacher?.image_link} alt={live.teacher?.name} />
                </div>
                <div>
                  <p className='text-xl'><strong>المعلم:</strong> {live.teacher?.name}</p>
                  <p className='text-xl'><strong>المادة:</strong> {live.subject?.name}</p>
                </div>
                <div>
                  <img src={live.subject?.cover_photo_url} alt={live.subject?.name} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">لا توجد بيانات لهذا اليوم</p>
        )}
      </div>
    </div>
  );
};

export default LiveClassesPage;
