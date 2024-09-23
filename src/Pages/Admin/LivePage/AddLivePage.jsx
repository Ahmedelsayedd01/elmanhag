import React, { useRef, useState ,useEffect} from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import DropDownMenu from '../../../Components/DropDownMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBox from '../../../Components/CheckBox';

const AddLivePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [educationData, setEducationData] = useState([]);
  const [semesterData, setSemesterData] = useState([{ name: 'First' }, { name: 'Second' }]);
  const [categoryData, setCategoryData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]); // Store all subjects initially
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
  const [url, setUrl] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(0);

  const [selectEducation, setSelectEducation] = useState('Select Education');
  const [selectEducationId, setSelectEducationId] = useState(null);
  const [openSelectEducation, setOpenSelectEducation] = useState(false);

  const [selectSemester, setSelectSemester] = useState('Select Semester');
  const [selectSemesterName, setSelectSemesterName] = useState(null);
  const [openSelectSemester, setOpenSelectSemester] = useState(false);

  const [selectCategory, setSelectCategory] = useState('Select Category');
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [openSelectCategory, setOpenSelectCategory] = useState(false);

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

  const dropdownEducationRef=useRef();
  const dropdownSemesterRef = useRef();
  const dropdownCategoryRef = useRef();
  const dropdownSubjectRef = useRef();
  const dropdownTeacherRef = useRef();
  const dropdownDayRef = useRef();
  const dropdownStatusRef=useRef();

  useEffect(() => {
    const StorageLiveData = JSON.parse(localStorage.getItem('LivesData'));
    setEducationData([...StorageLiveData.education, { id: 'null', name: 'Together' }]);
    setCategoryData(StorageLiveData.category);
    setSubjectData(StorageLiveData.subjects);
    setAllSubjects(StorageLiveData.subjects)
    setTeacherData(StorageLiveData.teachers);
  }, []);


  const filterSubjects = (semesterName, categoryId, educationId) => {
    let filteredSubjects = allSubjects; // Start with all subjects
  
    // Filter by semester
    if (semesterName) {
      filteredSubjects = filteredSubjects.filter(subject => 
        subject.semester.toLowerCase() === semesterName.toLowerCase()
      );
    }
    // Filter by category
    if (categoryId) {
      filteredSubjects = filteredSubjects.filter(subject => 
        subject.category_id === categoryId
      );
    }
    // Filter by educationId
    if (educationId === null) {
      filteredSubjects = filteredSubjects.filter(subject => subject.education_id === null);
    } else if (educationId) {
      filteredSubjects = filteredSubjects.filter(subject => subject.education_id === parseInt(educationId));
    }
   
  // Handle the combination of categoryId and educationId (including null educationId)
  if (categoryId) {
    if (educationId === null) {
      filteredSubjects = filteredSubjects.filter(subject => 
        subject.education_id === null && subject.category_id === categoryId
      );
    } else if (educationId) {
      filteredSubjects = filteredSubjects.filter(subject => 
        subject.education_id === parseInt(educationId) && subject.category_id === categoryId
      );
    }}

     // Handle the combination of semesterName and educationId (including null educationId)
  if (semesterName) {
    if (educationId === null) {
      filteredSubjects = filteredSubjects.filter(subject => 
        subject.semester.toLowerCase() === semesterName.toLowerCase() && subject.education_id === null
      );
    } else if (educationId) {
      filteredSubjects = filteredSubjects.filter(subject => 
        subject.semester.toLowerCase() === semesterName.toLowerCase() && subject.education_id === parseInt(educationId)
      );
    }
  }

  // Handle the combination of categoryId and semesterName
  if (categoryId && semesterName) {
    filteredSubjects = filteredSubjects.filter(subject => 
      subject.category_id === categoryId && subject.semester.toLowerCase() === semesterName.toLowerCase()
    );
  }

   // All three filters (categoryId, educationId, semesterName)
   if (categoryId && semesterName && educationId !== undefined) {
    filteredSubjects = filteredSubjects.filter(subject => 
      subject.category_id === categoryId &&
      subject.semester.toLowerCase() === semesterName.toLowerCase() &&
      (educationId === null ? subject.education_id === null : subject.education_id === parseInt(educationId))
    );
  }
  
    // Set the filtered data
    setSubjectData(filteredSubjects);
    console.log(filteredSubjects);
  };
  
  const handleOpenSelectEducation = () => {
    setOpenSelectEducation(!openSelectEducation)
    setOpenSelectCategory(false)
    setOpenSelectSemester(false)
    setOpenSelectSubject(false);
    setOpenSelectTeacher(false);
    setOpenSelectDay(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectSemester = () => {
    setOpenSelectSemester(!openSelectSemester);
    setOpenSelectCategory(false)
    setOpenSelectEducation(false)
    setOpenSelectSubject(false);
    setOpenSelectTeacher(false);
    setOpenSelectDay(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectCategory = () => {
    setOpenSelectCategory(!openSelectCategory)
    setOpenSelectEducation(false)
    setOpenSelectSemester(false)
    setOpenSelectSubject(false);
    setOpenSelectTeacher(false);
    setOpenSelectDay(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectSubject = () => {
    setOpenSelectEducation(false)
    setOpenSelectSemester(false)
    setOpenSelectCategory(false);
    setOpenSelectSubject(!openSelectSubject);
    setOpenSelectTeacher(false);
    setOpenSelectDay(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectTeacher = () => {
    setOpenSelectEducation(false)
    setOpenSelectSemester(false)
    setOpenSelectCategory(false);
    setOpenSelectSubject(false);
    setOpenSelectTeacher(!openSelectTeacher);
    setOpenSelectDay(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectDay = () => {
    setOpenSelectEducation(false)
    setOpenSelectSemester(false)
    setOpenSelectCategory(false);
    setOpenSelectSubject(false);
    setOpenSelectTeacher(false);
    setOpenSelectDay(!openSelectDay);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectStatus = () => {
    setOpenSelectEducation(false)
    setOpenSelectSemester(false)
    setOpenSelectCategory(false);
    setOpenSelectSubject(false);
    setOpenSelectTeacher(false);
    setOpenSelectDay(false);
    setOpenSelectStatus(!openSelectStatus);
  };

  const handleSelectEducation = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
  
    // Set the selected option name (for UI display)
    setSelectEducation(selectedOptionName);
    console.log('Selected Education:', selectedOptionName);
    let educationId = null;
    // Check if the selected value is 'null' or a valid number
    if (selectedOptionValue === 'null') {
      educationId = null;  // Set to null when the option is 'null'
      console.log('Education ID:', educationId);
    } else {
      educationId = parseInt(selectedOptionValue);  // Parse the selected value to an integer
      console.log('Education ID:', educationId);
    }
    // Update the state for selected education ID
    setSelectEducationId(educationId);
    // Close the select dropdown
    setOpenSelectEducation(false);
    // Ensure the correct `selectEducationId` is passed to filterSubjects
    filterSubjects(selectSemesterName, selectCategoryId, educationId); 
  }; 

  const handleSelectSemester = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
    setSelectSemester(selectedOptionName);
    setSelectSemesterName(selectedOptionValue);
    setOpenSelectSemester(false);
    console.log('Selected Semester:', selectedOptionName);
    // console.log('Semester ID:', selectedOptionValue);

    // Filter subjects based on the new semester and existing category
    filterSubjects(selectedOptionName, selectCategoryId ,selectEducationId);
  };

  const handleSelectCategory = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : null;
    setSelectCategory(selectedOptionName);
    setSelectCategoryId(parseInt(selectedOptionValue));
    setOpenSelectCategory(false);
    console.log('Selected Category:', selectedOptionName);
    console.log('Category ID:', selectedOptionValue);

    // Filter subjects based on the new semester and existing category
    filterSubjects(selectSemesterName, parseInt(selectedOptionValue) ,selectEducationId);
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
    const selectedOptionValue = inputElement ? inputElement.value : null;
    setSelectTeacher(selectedOptionName);
    setSelectTeacherId(parseInt(selectedOptionValue));
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
    
      if (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target) &&
          dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target)&&
          dropdownEducationRef.current &&  !dropdownEducationRef.current.contains(event.target)&&
          dropdownSubjectRef.current && !dropdownSubjectRef.current.contains(event.target) &&
          dropdownTeacherRef.current && !dropdownTeacherRef.current.contains(event.target)&&
          dropdownDayRef.current &&  !dropdownDayRef.current.contains(event.target)&&
          dropdownStatusRef.current &&  !dropdownStatusRef.current.contains(event.target)
      ) {
          setOpenSelectEducation(false);
          setOpenSelectSemester(false);
          setOpenSelectCategory(false);
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
    if (!url) {
      auth.toastError('Please Enter Live Link.');
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
    if (!selectCategoryId) {
      auth.toastError('Please Select Category.');
      return;
    }
    // if (selectEducationId === null || selectEducationId === 'null') {
    //   auth.toastError('Please Select Education.');
    //   return;
    // }    
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
    formData.append('link', url);
    formData.append('from', formattedStartTime);
    formData.append('to', formattedEndTime);
    formData.append('date', date);
    formData.append('day', selectDay);
    formData.append('teacher_id', selectTeacherId);
    formData.append('subject_id', selectSubjectId);
    formData.append('paid', selectStatus ==="Paid"? 1:0);
    formData.append('price', price || 0);
    formData.append('inculded', liveIncluded);
    formData.append('category_id', selectCategoryId);
    // formData.append('education_id', selectEducationId);

    // Handle education_id appropriately
    if (selectEducationId === null) {
      formData.append('education_id', null); // Send as string 'null'
    } else {
      formData.append('education_id', selectEducationId);
    }

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
        <InputCustom
          type="text"
          placeholder="Live Link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownEducationRef}
            handleOpen={handleOpenSelectEducation}
            handleOpenOption={handleSelectEducation}
            stateoption={selectEducation}
            openMenu={openSelectEducation}
            options={educationData}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownSemesterRef}
            handleOpen={handleOpenSelectSemester}
            handleOpenOption={handleSelectSemester}
            stateoption={selectSemester}
            openMenu={openSelectSemester}
            options={semesterData}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownCategoryRef}
            handleOpen={handleOpenSelectCategory}
            handleOpenOption={handleSelectCategory}
            stateoption={selectCategory}
            openMenu={openSelectCategory}
            options={categoryData}
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
        <InputCustom
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

