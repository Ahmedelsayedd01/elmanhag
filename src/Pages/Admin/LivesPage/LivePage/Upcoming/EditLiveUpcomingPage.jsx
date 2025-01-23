import React, { useRef, useState, useEffect, useContext } from 'react';
import InputCustom from '../../../../../Components/InputCustom';
import { Button } from '../../../../../Components/Button';
import DropDownMenu from '../../../../../Components/DropDownMenu';
import MultipleChoiceMenu from '../../../../../Components/MultipleChoiceMenu';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CheckBox from '../../../../../Components/CheckBox';
import Loading from '../../../../../Components/Loading';
import HeaderPageSection from '../../../../../Components/HeaderPageSection';
import { useAuth } from '../../../../../Context/Auth';

const LiveUpcomingPage = () => {

  const auth = useAuth();
  const { liveId } = useParams();
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
  const [price, setPrice] = useState('');

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

  const [liveIncluded, setLiveIncluded] = useState(null);
  const [liveFixed, setLiveFixed] = useState(null);

  const dropdownEducationRef = useRef();
  const dropdownSemesterRef = useRef();
  const dropdownCategoryRef = useRef();
  const dropdownSubjectRef = useRef();
  const dropdownTeacherRef = useRef();
  const dropdownDayRef = useRef();
  const dropdownStatusRef = useRef();

  useEffect(() => {
    const fetchAnotherData = async () => {
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
          console.log('fetchAnotherData', response.data);

          setEducationData([
            ...response.data.education,
            { id: 'notfound', name: 'Together' } // Add a unique key if needed
          ]);

          setCategoryData(response.data.category);
          setSubjectData(response.data.subjects);
          setAllSubjects(response.data.subjects);
          setTeacherData(response.data.teachers);
          // filterSubjects(selectEducationId, selectSemesterName, selectCategoryId);
        }
      } catch (error) {
        console.error("Error fetching Lives data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnotherData();
  }, []); // Added dependency array to rerun when token changes

  useEffect(() => {
    const fetchEdit = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/live/${liveId}`, {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        });

        if (response.status === 200) {
          console.log('response live', response);

          const data = response.data.live;

          setName(data.name || '');
          setUrl(data.link || '');
          setStartTime(data.from || '');
          setEndTime(data.to || '');
          setDate(data.date || '');
          setSelectDay(data.day || '');
          setSelectStatus(data.paid === 1 ? "Paid" : "Free"); // Updated this logic
          setPrice(data.price || 0);
          setLiveIncluded(data?.inculded || 0); // Fixed typo
          setLiveFixed(data?.fixed || 0); // Fixed typo

          const nameSemester = data.subject.semester;
          setSelectSemester(nameSemester[0].toUpperCase() + nameSemester.slice(1));
          setSelectSemesterName(nameSemester);

          // setSelectEducation(data.education.name);
          // setSelectEducationId(data.education.id);

          if (data.education) {
            setSelectEducation(data.education.name);
            setSelectEducationId(data.education.id);
          } else {
            setSelectEducation('Together');
            setSelectEducationId('notfound');
          }

          setSelectCategory(data.category.name);
          setSelectCategoryId(data.category.id);

          setSelectSubject(data.subject.name);
          setSelectSubjectId(data.subject.id);

          const nameTeacher = data.teacher.name;
          setSelectTeacher(nameTeacher[0].toUpperCase() + nameTeacher.slice(1));
          setSelectTeacherId(data.teacher.id);

        } else {
          console.log('response live error');
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsLoading(false);
      }
    };
    filterSubjects(selectEducationId, selectSemesterName, selectCategoryId);
    fetchEdit();
  }, []); // Added dependencies

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
      setSelectSubject(filteredSubjects.length > 1 ? 'Select Subject' : filteredSubjects[0].name);
      setSelectSubjectId(filteredSubjects.length > 1 ? [] : filteredSubjects[0].id);
      setSubjectData(filteredSubjects);
    }

    console.log('semesterName:', semesterName);
    console.log('categoryId:', categoryId);
    console.log('educationId:', educationId);

    // Debugging logs
    console.log('filteredSubjects:', filteredSubjects);
  };

  // const filterSubjects = (educationId, semesterName, categoryId) => {
  //   setSelectSubject('Select Subject');
  //   setSelectSubjectId('');
  //   setSubjectData([]);

  //   let filteredSubjects = [...allSubjects]; // Use the original subject data list

  //   if (educationId) {
  //     filteredSubjects = filteredSubjects.filter(subject => subject.education_id === educationId);
  //   }

  //   if (semesterName && categoryId) {
  //     filteredSubjects = filteredSubjects.filter(subject =>
  //       subject.semester.toLowerCase() === semesterName.toLowerCase() &&
  //       subject.category_id === categoryId
  //     );
  //   } else if (semesterName) {
  //     filteredSubjects = filteredSubjects.filter(subject =>
  //       subject.semester.toLowerCase() === semesterName.toLowerCase()
  //     );
  //   } else if (categoryId) {
  //     filteredSubjects = filteredSubjects.filter(subject =>
  //       subject.category_id === categoryId
  //     );
  //   }

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

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (!name) return auth.toastError('Please Enter Name.');
    if (!url) return auth.toastError('Please Enter Live Link.');
    if (!startTime) return auth.toastError('Please Enter StartTime.');
    if (!endTime) return auth.toastError('Please Enter EndTime.');
    if (!selectCategoryId) return auth.toastError('Please Select Category.');
    if (!selectEducationId) return auth.toastError('Please Select Education.');
    if (!selectSubjectId) return auth.toastError('Please Select Subject.');
    if (!selectTeacherId) return auth.toastError('Please Select Teacher.');
    if (!date) return auth.toastError('Please Enter Date.');
    if (!selectDay) return auth.toastError('Please Enter Day.');
    if (!selectStatus) return auth.toastError('Please Enter Status.');

    setIsLoading(true);

    try {
      // Ensure the time has the proper format H:i:s
      const formattedStartTime = startTime.length === 5 ? startTime + ":00" : startTime;
      const formattedEndTime = endTime.length === 5 ? endTime + ":00" : endTime;

      const formattedStart = new Date(`1970-01-01T${formattedStartTime}`).toLocaleTimeString('en-GB', { hour12: false });
      const formattedEnd = new Date(`1970-01-01T${formattedEndTime}`).toLocaleTimeString('en-GB', { hour12: false });

      let priceEdit = null; // Change to let as the value will be reassigned
      if (selectStatus === 'Paid') {
        priceEdit = parseInt(price);
      } else {
        priceEdit = 0;
      }

      // Prepare the JSON payload
      const payload = {
        name,
        link: url,
        from: formattedStart,
        to: formattedEnd,
        date,
        day: selectDay,
        category_id: parseInt(selectCategoryId),
        teacher_id: parseInt(selectTeacherId),
        subject_id: parseInt(selectSubjectId),
        paid: selectStatus === 'Paid' ? 1 : 0,
        price: priceEdit,
        inculded: liveIncluded,
        fixed: liveFixed,
        education_id: selectEducationId === "notfound" ? ' ' : selectEducationId, // Send null if no education is selected
      };

      console.log('Payload:', payload); // Debugging log for payload

      // Send the PUT request with JSON data
      const response = await axios.put(
        `http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/live/update/${liveId}`, // liveId from useParams
        payload, // Send payload as JSON
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            'Content-Type': 'application/json', // Required for JSON
          },
        }
      );

      if (response.status === 200) {
        auth.toastSuccess('Live Updated successfully!');
        handleGoBack();
      } else {
        auth.toastError('Failed to update Live.');
      }
    } catch (error) {
      console.log(error.response); // Log the full response for debugging
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


  // if (isLoading) {
  //   return (
  //     <div className="w-1/4 h-full flex items-start justify-center m-auto mt-36">
  //       <Loading />
  //     </div>
  //   )
  // }

  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Edit Live" />
      {isLoading ? <>
        <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
          <Loading />
        </div>
      </> :
        <form className="w-full flex flex-col items-center justify-center gap-y-3" onSubmit={handleSubmitEdit}>
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
                minDate={false}
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
                <CheckBox handleClick={handleIncludedClick} checked={liveIncluded} />
              </div>
            </div>

            <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
              <span className="text-2xl text-thirdColor font-medium">Fixed:</span>
              <div>
                <CheckBox handleClick={handleFixedClick} checked={liveFixed} />
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
            <button type='button' onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
          </div>
        </form>
      }
    </>
  )
}

export default LiveUpcomingPage