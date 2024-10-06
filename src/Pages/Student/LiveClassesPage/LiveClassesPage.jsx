import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';
import { Button } from '../../../Components/Button';
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
  isSameDay,
  differenceInDays, // Add the missing import
} from 'date-fns';
import { arSA } from 'date-fns/locale'; // Arabic Saudi locale for formatting month names

const formatMonthYear = (date) => format(date, 'MMMM yyyy', { locale: arSA });

const LiveClassesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [liveData, setLiveData] = useState([]); // Store live data from API
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayOffset, setDayOffset] = useState(0); // Tracks the current 7-day offset
  const [filteredData, setFilteredData] = useState([]); // Filtered data based on selected day
  const [selectedDay, setSelectedDay] = useState(new Date()); // Track the selected day
  const auth = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Control modal message

  const daysInMonth = getDaysInMonth(currentDate);
  const currentMonth = getMonth(currentDate) + 1; // Months are 0-indexed
  const currentYear = getYear(currentDate);

  const weekDays = ['السبت', 'الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعه'];

  const prevDays = () => {
    const today = new Date();
    const currentDayOfMonth = getDate(today);
  
    if (currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()) {
      // Check if the previous week would include days before today
      if (dayOffset <= Math.floor((currentDayOfMonth - 1) / 7) * 7) {
        return; // Prevent going back further than the current week
      }
    }
  
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

  // const visibleDays = eachDayOfInterval({
  //   start: new Date(currentYear, currentMonth - 1, dayOffset + 1),
  //   end: new Date(currentYear, currentMonth - 1, Math.min(dayOffset + 7, daysInMonth)),
  // });
  const visibleDays = eachDayOfInterval({
    start: new Date(currentYear, currentMonth - 1, getDate(new Date()) + dayOffset), // Start from the current day
    end: new Date(currentYear, currentMonth - 1, Math.min(getDate(new Date()) + dayOffset + 6, daysInMonth)), // Show the next 7 days starting from today
  });
  

  const handleDayClick = (day) => {
    setSelectedDay(day); // Update the selected day state
    const filtered = liveData.filter((item) => isSameDay(new Date(item.date), day));
    setFilteredData(filtered);
  };

  const formatTimeToArabic = (time) => {
    const [hours, minutes] = time.split(':'); // Split time into hours and minutes
    let hoursIn12Hour = parseInt(hours, 10); // Convert hours to integer
    const ampm = hoursIn12Hour >= 12 ? 'م' : 'ص'; // Determine م or ص
    hoursIn12Hour = hoursIn12Hour % 12 || 12; // Convert to 12-hour format
    return `${String(hoursIn12Hour).padStart(2, '0')}:${minutes} ${ampm}`; // Return formatted time
  };
  
  

  useEffect(() => {
    const today = new Date();
    const startOfCurrentMonth = startOfMonth(today);
    const diff = differenceInDays(today, startOfCurrentMonth);
    const currentWeekOffset = Math.floor(diff / 7) * 7;
    setDayOffset(currentWeekOffset);
    setSelectedDay(today); // Highlight the current day by default
  }, []);

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

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
        console.log(response.data);
        setLiveData(response.data.live); // Store live data

        // Automatically filter data for the current day
        const today = new Date();
        const filtered = response.data.live.filter((item) => isSameDay(new Date(item.date), today));
        setFilteredData(filtered); // Filter data by the current day
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

  const handleAttendanceClick = async (id,live) => {
    setIsLoading(true);
    console.log("live is :",live,live.link)
    try {
      const response = await axios.post(
        `https://bdev.elmanhag.shop/student/subscription/check/${id}`, {},
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log("Response status:", response.status);
      console.log("Response data:", response);
  
      if (response.status === 200 && response.data.success) {
        console.log('Success:', response.data);
        window.open(live.link, '_blank', 'noopener noreferrer');
      }
    } catch (error) {
      console.log('Error response:', error.response); 
  
      // Check if the error response contains the 'faild' message
      if (error.response && error.response.data && error.response.data.faild) {
        const faildMessage = error.response.data.faild;
  
        // Set the Arabic message if the returned message matches
        if (faildMessage === 'You must buy live first') {
          setModalMessage('يجب شراء اللايف'); // Arabic message for the modal
        } else {
          setModalMessage(faildMessage); // Set the original error message if it's different
        }
  
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
  

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full p-7 mt-8 s:p-3">
      {/* Month Navigation */}
      <div className="flex justify-between items-center">
        <FaRegArrowAltCircleRight onClick={prevDays} className="text-red-500 text-2xl cursor-pointer" />
        <span className="text-lg font-bold text-red-500">
          {formatMonthYear(currentDate)}
        </span>
        <FaRegArrowAltCircleLeft onClick={nextDays} className="text-red-500 text-2xl cursor-pointer" />
      </div>

      {/* Days of the Week with Dates of the Month */}
      <div className="grid grid-cols-7 gap-2 mt-4 text-center">
        {visibleDays.map((day, index) => (
          <div key={index} className="flex gap-5 flex-col font-bold text-red-500">
            {/* Display weekday */}
            <div className='lg:text-lg sm:text-xs'>{weekDays[getDate(day) % 7]}</div>
            {/* Display day of the month */}
            <div
              onClick={() => handleDayClick(day)}
              className={`p-2 text-sm rounded-lg cursor-pointer 
                ${isSameDay(day, selectedDay) ? 'bg-red-200 text-red-700 font-bold' : 'bg-gray-100'}`}
            >
              {getDate(day)}
            </div>
          </div>
        ))}
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

            <div>
              <div className="flex gap-5 justify-around bg-[#EBEBEB] p-6 rounded-l-lg h-full mr-10">
                <div>
                  <img src={live.teacher?.image_link} alt={live.teacher?.name}/>
                </div>
                <div>
                <p className='text-xl text-mainColor font-semibold'><strong className='text-black text-xl font-medium'>الوقت:</strong> {formatTimeToArabic(live.from)} : {formatTimeToArabic(live.to)}</p>

                  <p className='text-xl'><strong>المعلم:</strong> {live.teacher?.name}</p>
                  <p className='text-xl'><strong>المادة:</strong> {live.subject?.name}</p>
                </div>
                <div>
                  <img src={live.subject?.cover_photo_url} alt={live.subject?.name} className='w-16 h-14'/>
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
                      handleClick={() => handleAttendanceClick(live.id,live)}
                      stateLoding={isLoading}
                      // stateLoading={isLoading}
                      // onClick={() => handleAttendanceClick(live.id, live.live_link)} // Wrap with arrow function
                      />
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-mainColor text-xl font-semibold text-center">لا توجد بيانات لهذا اليوم</h1>
        )}
      </div>
    </div>
  );
};

export default LiveClassesPage;
