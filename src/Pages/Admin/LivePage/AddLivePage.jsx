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
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');

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

  // const handleSelectStatus = (e) => {
  //   const inputElement = e.currentTarget.querySelector('.inputVal');
  //   const selectedOptionName = e.currentTarget.textContent.trim();
  //   const selectedOptionValue = inputElement ?inputElement.value : '';
  //   setSelectEducation(selectedOptionName);
  //   setSelectEducationId(parseInt(selectedOptionValue));
  //   setOpenSelectEducation(false);
  //   console.log('Selected Education:', selectedOptionName);
  //   console.log('Education ID:', selectedOptionValue);
  // };

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




  return (
    <form className="w-full flex flex-col items-center justify-center gap-y-3">
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
          // handleOpenOption={handleSelectStatus}
          stateoption={selectStatus}
          openMenu={openSelectStatus}
          // options={statusData}
        />
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

