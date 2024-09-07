import React, { useRef, useState ,useEffect} from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import DropDownMenu from '../../../Components/DropDownMenu';
import MultipleChoiceMenu from '../../../Components/MultipleChoiceMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBox from '../../../Components/CheckBox';

const AddLivePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [subjectData, setSubjectData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [daysData, setDaysData] = useState([
    { name: 'Saturday' },
    { name: 'Sunday' },
    { name: 'Monday' },
    { name: 'Tuesday' },
    { name: 'Wednesday' },
    { name: 'Thursday' },
    { name: 'Friday' },
  ]);
  const [paidData, setPaidData] = useState([{ name: 'Free' }, { name: 'Paid' }]);


  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(0);

  const [selectSubject, setSelectSubject] = useState('Select Subject');
  const [selectSubjectId, setSelectSubjectId] = useState([]);
  const [openSelectSubject, setOpenSelectSubject] = useState(false);

  const [selectTeacher, setSelectTeacher] = useState('Select Teacher');
  const [selectTeacherId, setSelectTeacherId] = useState(null);
  const [openSelectTeacher, setOpenSelectTeacher] = useState(false);

  const [selectDay, setSelectDay] = useState('Select Day');
  const [openSelectDay, setOpenSelectDay] = useState(false);

  const [selectStatus, setSelectStatus] = useState('Free');
  const [openSelectStatus, setOpenSelectStatus] = useState(false);

  const [liveIncluded, setLiveIncluded] = useState(0);

  const dropdownSubjectRef = useRef();
  const dropdownTeacherRef = useRef();
  const dropdownDayRef = useRef();
  const dropdownStatusRef=useRef();

  useEffect(() => {
    const StorageLiveData = JSON.parse(localStorage.getItem('LivesData'));

    setSubjectData(StorageLiveData.subjects);
    setTeacherData(StorageLiveData.teachers);
  }, []);

  const handleOpenSelectSubject = () => {
    setOpenSelectSubject(!openSelectSubject);
    setOpenSelectTeacher(false);
    setOpenSelectDay(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectTeacher = () => {
    setOpenSelectSubject(false);
    setOpenSelectTeacher(!openSelectTeacher);
    setOpenSelectDay(false);
    setOpenSelectStatus(false);
    setOpenSelectSubject(false);
  };

  const handleOpenSelectDay = () => {
    setOpenSelectSubject(false);
    setOpenSelectTeacher(false);
    setOpenSelectDay(!openSelectDay);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectStatus = () => {
    setOpenSelectSubject(false);
    setOpenSelectTeacher(false);
    setOpenSelectDay(false);
    setOpenSelectStatus(!openSelectStatus);
  };

  const handleSelectSubject = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : null;
    setSelectSubject(selectedOptionName);
    setSelectSubjectId(parseInt(selectedOptionValue));
    setOpenSelectSubject(false);
    console.log('Selected Subject:', selectedOptionName);
    console.log('Subject ID:', selectedOptionValue);
  };

  const handleSelectTeacher = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
    setSelectTeacher(selectedOptionName);
    setSelectTeacherId(selectedOptionValue);
    setOpenSelectTeacher(false);
    console.log('Selected Teacher:', selectedOptionName);
    console.log('Teacher ID:', selectedOptionValue);
  };

  const handleSelectDay = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    setSelectDay(selectedOptionName);
    setOpenSelectDay(false);
    console.log('Selected Day:', selectedOptionName);
  };

  const handleSelectStatus = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    // const selectedOptionValue = inputElement ?inputElement.value : '';
    setSelectStatus(selectedOptionName);
    // setSelectEducationId(parseInt(selectedOptionValue));
    setOpenSelectStatus(false);
    console.log('Selected Paid:', selectedOptionName);
    // console.log('Paid ID:', selectedOptionValue);
  };

  const handleClick = (e) => {
    const isChecked = e.target.checked;
    setLiveIncluded(isChecked ? 1 : 0);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
            document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
      if (dropdownSubjectRef.current && !dropdownSubjectRef.current.contains(event.target) &&
          dropdownTeacherRef.current && !dropdownTeacherRef.current.contains(event.target)&&
          dropdownDayRef.current &&  !dropdownDayRef.current.contains(event.target)&&
          dropdownStatusRef.current &&  !dropdownStatusRef.current.contains(event.target)
      ) {
          setOpenSelectSubject(false);
          setOpenSelectTeacher(false);
          setOpenSelectDay(false);
          setOpenSelectStatus(false);
      }
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      auth.toastError('Please Enter Name.');
      return;
    }
    if (!startTime) {
      auth.toastError('Please Enter StartTime.');
      return;
    }
    if (!endTime) {
      auth.toastError('Please Enter EndTime.');
      return;
    }
    if (!selectSubjectId) {
      auth.toastError('Please Select Subject.');
      return;
    }
    if (!selectTeacherId) {
      auth.toastError('Please Select Teacher.');
      return;
    }
    if (!date) {
      auth.toastError('Please Enter Date.');
      return;
    }
    if (!selectDay) {
      auth.toastError('Please Enter Day.');
      return;
    }
    if (!selectStatus) {
      auth.toastError('Please Enter Status.');
      return;
    }

     // Convert time to H:i:s format
      const formattedStartTime = startTime ? `${startTime}:00` : '';
      const formattedEndTime = endTime ? `${endTime}:00` : '';
      
    setIsLoading(true);
    try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('from', formattedStartTime);
    formData.append('to', formattedEndTime);
    formData.append('date', date);
    formData.append('day', selectDay);
    formData.append('teacher_id', selectTeacherId);
    formData.append('subject_id', selectSubjectId);
    formData.append('paid', selectStatus ==="Paid"? 1:0);
    formData.append('price', price || 0);
    formData.append('inculded', liveIncluded);

    for (let pair of formData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]); 
    }
    
    // try {
        const response = await axios.post(' https://bdev.elmanhag.shop/admin/live/add', formData, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        auth.toastSuccess('Live added successfully!');
        handleGoBack();
      } else {
              auth.toastError('Failed to add Live.');
      }
      } catch (error) {
        console.log(error.response); // Log the full response for debugging
        console.log(error.response.data.errors);
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

  return (
    <form className="w-full flex flex-col items-center justify-center gap-y-3" onSubmit={handleSubmit}>
    <div className="w-full flex flex-wrap items-center justify-start gap-3">
      <div className="lg:w-[30%] sm:w-full">
        <InputCustom
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <h1>Time From</h1>
        <InputCustom
          type="time"
          placeholder="Time From"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
      <h1>Time To</h1>
        <InputCustom
          type="time"
          placeholder="Time To"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <DropDownMenu
          ref={dropdownSubjectRef}
          handleOpen={handleOpenSelectSubject}
          handleOpenOption={handleSelectSubject}
          stateoption={selectSubject}
          openMenu={openSelectSubject}
          options={subjectData}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <DropDownMenu
          ref={dropdownTeacherRef}
          handleOpen={handleOpenSelectTeacher}
          handleOpenOption={handleSelectTeacher}
          stateoption={selectTeacher}
          openMenu={openSelectTeacher}
          options={teacherData}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <InputCustom
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <DropDownMenu
          ref={dropdownDayRef}
          handleOpen={handleOpenSelectDay}
          handleOpenOption={handleSelectDay}
          stateoption={selectDay}
          openMenu={openSelectDay}
          options={daysData}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
        <DropDownMenu
          ref={dropdownStatusRef}
          handleOpen={handleOpenSelectStatus}
          handleOpenOption={handleSelectStatus}
          stateoption={selectStatus}
          openMenu={openSelectStatus}
          options={paidData}
        />
      </div>
         {/* Conditionally Render Price Input */}
         {selectStatus === 'Paid' && (   
          <div className="lg:w-[30%] sm:w-full">
          <InputCustom
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
        </div>
      )}
      <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
            <span className="text-2xl text-thirdColor font-medium">Included:</span>
            <div>
              <CheckBox checked={liveIncluded} handleClick={handleClick} />
            </div>
        </div>
      
    </div>
    {/* Buttons */}
    <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
        <div className="flex items-center justify-center w-72">
              <Button
                      type="submit"
                      Text="Done"
                      BgColor="bg-mainColor"
                      Color="text-white"
                      Width="full"
                      Size="text-2xl"
                      px="px-28"
                      rounded="rounded-2xl"
                      // stateLoding={isLoading}
              />
        </div>
        <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
      </div>
    </form>
  )
}

export default AddLivePage
