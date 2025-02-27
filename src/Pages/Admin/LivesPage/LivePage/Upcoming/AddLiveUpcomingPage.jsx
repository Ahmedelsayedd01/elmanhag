import React, { useRef, useState, useEffect } from 'react';
import InputCustom from '../../../../../Components/InputCustom';
import { Button } from '../../../../../Components/Button';
import { useAuth } from '../../../../../Context/Auth';
import DropDownMenu from '../../../../../Components/DropDownMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBox from '../../../../../Components/CheckBox';
import Loading from '../../../../../Components/Loading';
import HeaderPageSection from '../../../../../Components/HeaderPageSection';

const AddLiveUpcomingPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState(null);
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');

  const [selectEducation, setSelectEducation] = useState('Select Education');
  const [selectEducationId, setSelectEducationId] = useState('');
  const [openSelectEducation, setOpenSelectEducation] = useState(false);

  const [selectSemester, setSelectSemester] = useState('Select Semester');
  const [selectSemesterName, setSelectSemesterName] = useState('');
  const [openSelectSemester, setOpenSelectSemester] = useState(false);

  const [selectCategory, setSelectCategory] = useState('Select Category');
  const [selectCategoryId, setSelectCategoryId] = useState('');
  const [openSelectCategory, setOpenSelectCategory] = useState(false);

  const [selectSubject, setSelectSubject] = useState('Select Subject');
  const [selectSubjectId, setSelectSubjectId] = useState('');
  const [openSelectSubject, setOpenSelectSubject] = useState(false);

  const [selectTeacher, setSelectTeacher] = useState('Select Teacher');
  const [selectTeacherId, setSelectTeacherId] = useState('');
  const [openSelectTeacher, setOpenSelectTeacher] = useState(false);

  const [selectDay, setSelectDay] = useState('Select Day');
  const [selectDayName, setSelectDayName] = useState('');
  const [openSelectDay, setOpenSelectDay] = useState(false);

  const [selectStatus, setSelectStatus] = useState('Free');
  const [openSelectStatus, setOpenSelectStatus] = useState(false);

  const [liveIncluded, setLiveIncluded] = useState(0);
  const [liveFixed, setLiveFixed] = useState(0);

  const dropdownEducationRef = useRef();
  const dropdownSemesterRef = useRef();
  const dropdownCategoryRef = useRef();
  const dropdownSubjectRef = useRef();
  const dropdownTeacherRef = useRef();
  const dropdownDayRef = useRef();
  const dropdownStatusRef = useRef();


  useEffect(() => {
    const fetchLives = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/live",
          {
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log('response3', response.data);
          setData(response.data.live);
          setEducationData([
            ...response.data.education,
            { id: 'notfound', name: 'Together' } // Or use some unique key generator
          ]);

          setCategoryData(response.data.category);
          setAllSubjects(response.data.subjects);
          setSubjectData(response.data.subjects);
          setTeacherData(response.data.teachers);
        }
      } catch (error) {
        console.error("Error fetching Lives data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLives(); // Fetch lives initially and whenever livesChanged changes
  }, []); // Add livesChanged or any other necessary dependency


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

  const filterSubjects = (educationId, semesterName, categoryId) => {
    //Reset state
    setSelectSubject('Select Subject');
    setSelectSubjectId('');
    setSubjectData([]);

    let filteredSubjects = allSubjects; // Start with all subjects

    console.log(filteredSubjects);

    // If both semesterName and categoryId are empty, filter only by educationId
    if (!semesterName && !categoryId) {
      if (educationId !== 'notfound') {
        filteredSubjects = filteredSubjects.filter(subject =>
          subject.education_id === parseInt(educationId)
        );
      } else {
        filteredSubjects = filteredSubjects.filter(subject =>
          subject.education_id === null || subject.education_id === undefined
        );
      }
    }

    else if (semesterName && !categoryId) {
      if (educationId) {
        if (educationId !== 'notfound') {
          filteredSubjects = filteredSubjects.filter(subject =>
            subject.semester.toLowerCase() === semesterName.toLowerCase() &&
            subject.education_id === parseInt(educationId)
          );
        } else {
          filteredSubjects = filteredSubjects.filter(subject =>
            subject.semester.toLowerCase() === semesterName.toLowerCase() &&
            subject.education_id === null || subject.education_id === undefined
          );
        }
      }
      else {
        filteredSubjects = filteredSubjects.filter(subject =>
          subject.semester.toLowerCase() === semesterName.toLowerCase()
        )
      }
    }


    else if (!semesterName && categoryId) {
      if (educationId) {
        if (educationId !== 'notfound') {
          filteredSubjects = filteredSubjects.filter(subject =>
            subject.category_id === categoryId &&
            subject.education_id === parseInt(educationId)
          );
        } else {
          filteredSubjects = filteredSubjects.filter(subject =>
            subject.category_id === categoryId &&
            subject.education_id === null || subject.education_id === undefined
          );
        }
      }
      else {
        filteredSubjects = filteredSubjects.filter(subject =>
          subject.category_id === categoryId
        )
      }
    }

    else if (semesterName && categoryId) {
      if (educationId) {
        if (educationId !== 'notfound') {
          filteredSubjects = filteredSubjects.filter(subject =>
            subject.semester.toLowerCase() === semesterName.toLowerCase() &&
            subject.category_id === categoryId &&
            subject.education_id === parseInt(educationId)
          );
        } else {
          filteredSubjects = filteredSubjects.filter(subject =>
            subject.semester.toLowerCase() === semesterName.toLowerCase() &&
            subject.category_id === categoryId &&
            subject.education_id === null || subject.education_id === undefined
          );
        }
      }
      else {
        filteredSubjects = filteredSubjects.filter(subject =>
          subject.semester.toLowerCase() === semesterName.toLowerCase() &&
          subject.category_id === categoryId
        )
      }
    }

    //Check if no subjects match the filters
    if (filteredSubjects.length === 0) {
      setSubjectData([{ id: 'Not Found', name: 'Not Found' }]);
    } else {
      setSelectSubject(filteredSubjects.length >= 1 ? 'Select Subject' : filteredSubjects[0].name);
      setSelectSubjectId(filteredSubjects.length >= 1 ? [] : filteredSubjects[0].id);
      setSubjectData(filteredSubjects);
    }

    console.log('semesterName:', semesterName);
    console.log('categoryId:', categoryId);
    console.log('educationId:', educationId);
    console.log('selectSubjectId:', selectSubjectId);

    // Debugging logs
    console.log('filteredSubjects:', filteredSubjects);
  };


  // const filterSubjects = (educationId, semesterName, categoryId) => {
  //   setSelectSubject('Select Subject');
  //   setSelectSubjectId('');
  //   setSubjectData([]);

  //   let filteredSubjects = [...allSubjects]; // Start with all subjects

  //   // Filter by educationId if provided
  //   // if (educationId) {
  //   //   filteredSubjects = filteredSubjects.filter(subject => subject.education_id === educationId);
  //   // }

  //     // Filter by semesterName if provided
  //   if (semesterName) {
  //     filteredSubjects = filteredSubjects.filter(subject =>
  //       subject.semester.toLowerCase() === semesterName.toLowerCase()
  //     );
  //   }

  //   // Filter by educationId if provided
  //   if (educationId !== 'notfound') {
  //     filteredSubjects = filteredSubjects.filter(subject => 
  //       subject.education_id === parseInt(educationId)
  //     );
  //   } else {
  //     filteredSubjects = filteredSubjects.filter(subject => 
  //       subject.education_id === null || subject.education_id === undefined
  //     );
  //   }



  //   // // Filter by semester and category if both are provided
  //   // if (semesterName && categoryId) {
  //   //   filteredSubjects = filteredSubjects.filter(subject =>
  //   //     subject.semester.toLowerCase() === semesterName.toLowerCase() &&
  //   //     subject.category_id === categoryId
  //   //   );
  //   // }
  //   // // Filter by semester if only semesterName is provided
  //   // else if (semesterName) {
  //   //   filteredSubjects = filteredSubjects.filter(subject =>
  //   //     subject.semester.toLowerCase() === semesterName.toLowerCase()
  //   //   );
  //   // }
  //   // // Filter by category if only categoryId is provided
  //   // else if (categoryId) {
  //   //   filteredSubjects = filteredSubjects.filter(subject =>
  //   //     subject.category_id === categoryId
  //   //   );
  //   // }

  //   // Check if no subjects match the filters
  //   if (filteredSubjects.length === 0) {
  //     setSubjectData([{ id: 'Not Found', name: 'Not Found' }]);
  //   } else {
  //     setSelectSubject(filteredSubjects.length > 1 ? 'Select Subject' : filteredSubjects[0].name);
  //     setSelectSubjectId(filteredSubjects.length > 1 ? [] : filteredSubjects[0].id);

  //     setSubjectData(filteredSubjects);
  //   }

  //   // Debugging logs
  //   console.log('semesterName:', semesterName);
  //   console.log('categoryId:', categoryId);
  //   console.log('educationId:', educationId);
  //   console.log('filteredSubjects:', filteredSubjects);
  // };




  // const handleSelectEducation = (e) => {
  //   const inputElement = e.currentTarget.querySelector('.inputVal');
  //   const selectedOptionName = e.currentTarget.textContent.trim();
  //   const selectedOptionValue = inputElement ? inputElement.value : '';

  //   if (selectedOptionValue === 'null') {
  //     setSelectEducationId(null);
  //   } else {
  //     setSelectEducationId(parseInt(selectedOptionValue));
  //   }
  //   setSelectEducation(selectedOptionName);
  //   setOpenSelectEducation(false);

  //   // Filter subjects based on the selected education, semester, and category
  //   // filterSubjects(selectedOptionValue);
  //   // const filterr = allSubjects.filter((s) => s.education_id === selectedOptionValue)
  //   // console.log('filterr', filterr)
  //   filterSubjects(parseInt(selectedOptionValue), selectSemesterName, selectCategoryId);
  // };

  const handleSelectEducation = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';

    // Check if the selected option value is 'notfound'
    if (selectedOptionValue === 'notfound') {
      setSelectEducationId('notfound');
    } else {
      setSelectEducationId(parseInt(selectedOptionValue)); // Set id or null if not a number
    }
    console.log("selected", selectedOptionValue)

    setSelectEducation(selectedOptionName); // Set selected education name
    setOpenSelectEducation(false); // Close the select dropdown

    // Filter subjects based on the selected education, semester, and category
    filterSubjects(selectedOptionValue, selectSemesterName, selectCategoryId);
  };


  // const handleSelectEducation = (e) => {
  //   const inputElement = e.currentTarget.querySelector('.inputVal');
  //   const selectedOptionName = e.currentTarget.textContent.trim();
  //   const selectedOptionValue = inputElement ? inputElement.value : '';

  //   // Parse selectedOptionValue as integer or handle null/empty case
  //   let educationId = selectedOptionValue === 'null' || selectedOptionValue === '' ? null : parseInt(selectedOptionValue);

  //   setSelectEducationId(educationId);
  //   setSelectEducation(selectedOptionName);
  //   setOpenSelectEducation(false);

  //   // Check if educationId is valid before filtering
  //   const filteredSubjectss = subjectData.filter((subject) => subject.education_id === educationId);
  //   console.log('SubjectData', subjectData);
  //   console.log('Filtered Subjectss:', filteredSubjectss);

  //   setSubjectData(filteredSubjectss)

  //   // if (educationId !== null) {
  //   // } else {
  //   //   console.log('No valid educationId selected.');
  //   // }
  // };


  const handleSelectSemester = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';

    setSelectSemester(selectedOptionName);
    setSelectSemesterName(selectedOptionValue);
    setOpenSelectSemester(false);

    // Filter subjects based on the selected education, semester, and category
    filterSubjects(selectEducationId, selectedOptionValue, selectCategoryId);
  };


  const handleSelectCategory = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : null;

    setSelectCategory(selectedOptionName);
    setSelectCategoryId(parseInt(selectedOptionValue));
    setOpenSelectCategory(false);

    // Filter subjects based on the selected education, semester, and category
    filterSubjects(selectEducationId, selectSemesterName, parseInt(selectedOptionValue));
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
    setSelectDayName(selectedOptionName);
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

  const handleIncludedClick = (e) => {
    const isChecked = e.target.checked;
    setLiveIncluded(isChecked ? 1 : 0);
  };
  const handleFixedClick = (e) => {
    const isChecked = e.target.checked;
    setLiveFixed(isChecked ? 1 : 0);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {

    if (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target) &&
      dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target) &&
      dropdownEducationRef.current && !dropdownEducationRef.current.contains(event.target) &&
      dropdownSubjectRef.current && !dropdownSubjectRef.current.contains(event.target) &&
      dropdownTeacherRef.current && !dropdownTeacherRef.current.contains(event.target) &&
      dropdownDayRef.current && !dropdownDayRef.current.contains(event.target) &&
      dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target)
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
    if (!selectEducationId) {
      auth.toastError('Please Select Education.');
      return;
    }
    if (!selectSemesterName) {
      auth.toastError('Please Select Semester.');
      return;
    }
    if (!selectCategoryId) {
      auth.toastError('Please Select Category.');
      return;
    }
    if (selectSubjectId.length === 0) {
      auth.toastError('Please Select Subject.');
      return;
    }
    if (!selectTeacherId) {
      auth.toastError('Please Select Teacher.');
      return;
    }
    if (!selectDayName) {
      auth.toastError('Please Select Day.');
      return;
    }
    if (!startDate) {
      auth.toastError('Please Select Start Date.');
      return;
    }
    if (!startTime) {
      auth.toastError('Please Enter Start Time.');
      return;
    }
    if (!endTime) {
      auth.toastError('Please Enter End Time.');
      return;
    }
    if (!selectStatus) {
      auth.toastError('Please Enter Status.');
      return;
    }

    if (parseInt(liveFixed) === 1 && !endDate) {
      auth.toastError('Please Select End Date.');
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
      formData.append('date', startDate);
      formData.append('day', selectDayName);
      formData.append('teacher_id', selectTeacherId);
      formData.append('subject_id', selectSubjectId);
      formData.append('paid', selectStatus === 'Paid' ? 1 : 0);
      formData.append('price', price || 0);
      formData.append('inculded', liveIncluded);
      formData.append('fixed', liveFixed);
      formData.append('category_id', selectCategoryId);

      // Handle education_id appropriately
      formData.append('education_id', selectEducationId === 'notfound' ? ' ' : selectEducationId);

      if (parseInt(liveFixed) === 1) {
        formData.append('end_date', endDate);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      // try {
      const response = await axios.post(' http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/live/add', formData, {
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
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Add Live" />
      {isLoading ? <>
        <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
          <Loading />
        </div>
      </> :
        <form className="w-full flex flex-col items-center justify-center gap-y-3" onSubmit={handleSubmit}>
          <div className="w-full flex flex-wrap items-center justify-start gap-3">
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                placeholder="Name"
                value={name}
                required={false}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                placeholder="Live Link"
                value={url}
                required={false}
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
                // stateoption={subjectData.length > 1 ? selectSubject : 'Not Found'}
                openMenu={openSelectSubject}
                options={subjectData.length === 0 ? [{ id: 'Not Found', name: 'Not Found' }] : subjectData}
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
              <DropDownMenu
                ref={dropdownStatusRef}
                handleOpen={handleOpenSelectStatus}
                handleOpenOption={handleSelectStatus}
                stateoption={selectStatus}
                openMenu={openSelectStatus}
                options={paidData}
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <span className='text-thirdColor font-semibold text-xl pl-1'>Start Date</span>
              <InputCustom
                type="date"
                placeholder="Start Date"
                value={startDate}
                required={false}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {liveFixed === 1 && (
              <>
                <div className="lg:w-[30%] sm:w-full">
                  <span className='text-thirdColor font-semibold text-xl pl-1'>End Date</span>
                  <InputCustom
                    type="date"
                    placeholder="End Date"
                    value={endDate}
                    required={false}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </>

            )}
            <div className="lg:w-[30%] sm:w-full">
              <span className='text-thirdColor font-semibold text-xl pl-1'>Time From</span>
              <InputCustom
                type="time"
                placeholder="Time From"
                value={startTime}
                required={false}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <span className='text-thirdColor font-semibold text-xl pl-1'>Time To</span>
              <InputCustom
                type="time"
                placeholder="Time To"
                value={endTime}
                required={false}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            {/* Conditionally Render Price Input */}
            {selectStatus === 'Paid' && (
              <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                  type="number"
                  placeholder="Price"
                  value={price}
                  required={false}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            )}
            <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
              <span className="text-2xl text-thirdColor font-medium">Included:</span>
              <div>
                <CheckBox checked={liveIncluded} handleClick={handleIncludedClick} />
              </div>
            </div>

            <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
              <span className="text-2xl text-thirdColor font-medium">Fixed:</span>
              <div>
                <CheckBox checked={liveFixed} handleClick={handleFixedClick} />
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
      }
    </>
  )
}

export default AddLiveUpcomingPage

