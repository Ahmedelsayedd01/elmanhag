import React, { useRef, useState, useEffect, useContext } from 'react';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import DropDownMenu from '../../../Components/DropDownMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBox from '../../../Components/CheckBox';
import { ButtonAdd } from '../../../Components/Button';
import { Link } from 'react-router-dom';
import Loading from '../../../Components/Loading';
import TextTitle from '../../../Components/TextTitle'
import { NavLink } from 'react-router-dom'
import { HomeWorkDataContext } from '../../../Layouts/Admin/EditHomeWorkLayout';

const EditHomeWorkPage = () => {
  const homeworkEdit = useContext(HomeWorkDataContext);
  const navigate = useNavigate();
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [homeWorkData, setHomeWorkData] = useState(null);
  const [homeWorks, setHomeWorks] = useState(null);
  const [activeSection, setActiveSection] = useState('HWInfo');

  const [semesterData, setSemesterData] = useState([{ name: 'first' }, { name: 'second' }]);
  const [lessonData, setLessonData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [allLessons, setAllLessons] = useState([]); // Store all subjects initially
  const [allChapters, setAllChapters] = useState([]); // Store all subjects initially
  const [allSubjects, setAllSubjects] = useState([]); // Store all subjects initially
  const [categoryData, setCategoryData] = useState([]);
  const [HWData, setHWData] = useState([{ name: 'H.W1' }, { name: 'H.W2' }, { name: 'H.W3' }]);
  const [homeWorkLevel, setHomeWorkLevel] = useState([{ name: 'A' }, { name: 'B' }, { name: 'C' }]);
  const [homeWorkActive, setHomeWorkActive] = useState(0);

  useEffect(() => {
    const StorageHWData = JSON.parse(localStorage.getItem('AllhomeWork'));

    setChapterData(StorageHWData?.chapters || []);
    setLessonData(StorageHWData?.lessons || []);
    setCategoryData(StorageHWData?.categories || []);
    setSubjectData(StorageHWData?.subjects || []);
  }, []);

  useEffect(() => {
    if (homeworkEdit) {
      setSelectHW(homeworkEdit.title || '');
      setSelectSemester(homeworkEdit.semester || '');
      // setCoverPhoto(homeworkEdit.chapter_id || '');
      // setDemoVideo(homeworkEdit.lesson_id|| '');
      setSelectHomeWorkLevel(homeworkEdit.difficulty || '');
      setMark(homeworkEdit.mark || '');
      setPass(homeworkEdit.pass || '')
      setHomeWorkActive(homeworkEdit.status || false)

      if (categoryData !== null) {
        const filteredCategoryHW = categoryData.find(
          (category) => category.id === homeworkEdit.category_id
        );
        if (filteredCategoryHW) {
          setSelectCategory(filteredCategoryHW.name);
          setSelectCategoryId(filteredCategoryHW.id);
        }
        else {
          setSelectCategory('Select By Category');
          setSelectCategoryId(null);
        }
      }

      if (subjectData !== null) {
        const filteredSubjectHW = subjectData.find(
          (subject) => subject.id === homeworkEdit.subject_id
        );
        if (filteredSubjectHW) {
          setSelectSubject(filteredSubjectHW.name);
          setSelectSubjectId(filteredSubjectHW.id);
        }
        else {
          setSelectSubject('Select By Subject');
          setSelectSubjectId(null);
        }
      }

      if (chapterData !== null) {
        const filteredChapterHW = chapterData.find(
          (chapter) => chapter.id === homeworkEdit.chapter_id
        );
        if (filteredChapterHW) {
          setSelectChapter(filteredChapterHW.name);
          setSelectChapterId(filteredChapterHW.id);
        }
        else {
          setSelectChapter('Select By Chapter');
          setSelectChapterId(null);
        }
      }

      if (lessonData !== null) {
        const filteredLessonHW = lessonData.find(
          (lesson) => lesson.id === homeworkEdit.lesson_id
        );
        if (filteredLessonHW) {
          setSelectLesson(filteredLessonHW.name);
          setSelectLessonId(filteredLessonHW.id);
        }
        else {
          setSelectLesson('Select By Lesson');
          setSelectLessonId(null);
        }
      }

      const updateQuestGroups = homeworkEdit.question_groups || [];
      setQuestGroups(updateQuestGroups.map(group => ({
        // ...group,
        titleInput: group.name,
        displayedQuestions: group.questions || [], // Ensure questions are included
        selectedQuestions: group.questions,
        QuestGroupType: '',
        QuestGroupLevel: ''
      })));

      console.log(questGroups)


    }
  }, [homeworkEdit]);

  const [selectSemester, setSelectSemester] = useState('Select By Semester');
  const [selectSemesterId, setSelectSemesterId] = useState(null);
  const [openSelectSemester, setOpenSelectSemester] = useState(false);

  const [selectChapter, setSelectChapter] = useState('Select By Chapter');
  const [selectChapterId, setSelectChapterId] = useState(null);
  const [openSelectChapter, setOpenSelectChapter] = useState(false);

  const [pass, setPass] = useState('');

  const [selectCategory, setSelectCategory] = useState('Select By Category');
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [openSelectCategory, setOpenSelectCategory] = useState(false);

  const [selectLesson, setSelectLesson] = useState('Select By Lesson');
  const [selectLessonId, setSelectLessonId] = useState(null);
  const [openSelectLesson, setOpenSelectLesson] = useState(false);

  const [mark, setMark] = useState('');

  const [selectSubject, setSelectSubject] = useState('Select By Subject');
  const [selectSubjectId, setSelectSubjectId] = useState(null);
  const [openSelectSubject, setOpenSelectSubject] = useState(false);

  const [selectHomeWorkLevel, setSelectHomeWorkLevel] = useState('Select By Difficulty');
  const [selectHomeWorkLevelId, setSelectHomeWorkLevelId] = useState(null);
  const [openSelectHomeWorkLevel, setOpenSelectHomeWorkLevel] = useState(false);

  const [selectHW, setSelectHW] = useState('Select By H.W');
  const [selectHWId, setSelectHWId] = useState(null);
  const [openSelectHW, setOpenSelectHW] = useState(false);

  const dropdownSemesterRef = useRef(null);
  const dropdownLessonRef = useRef(null);
  const dropdownChapterRef = useRef(null);
  const dropdownSubjectRef = useRef(null);
  const dropdownCategoryRef = useRef(null);
  const dropdownHWRef = useRef(null);
  const dropdownHomeWorkLevelRef = useRef(null);

    // Function to filter subjects by semester, category, or both
    const filterSubjects = (semesterName, categoryId) => {
      let filteredSubjects = allSubjects; // Start with all subjects
  
      // If both semester and category are selected, filter by both
      if (semesterName && categoryId) {
        filteredSubjects = filteredSubjects.filter(subject => 
          subject.semester.toLowerCase() === semesterName.toLowerCase() && 
          subject.category_id === categoryId
        ) ;
      }
      // If only the semester is selected, filter by semester
      else if (semesterName) {
        filteredSubjects = filteredSubjects.filter(subject => 
          subject.semester.toLowerCase() === semesterName.toLowerCase()
        );
      }
      // If only the category is selected, filter by category
      else if (categoryId) {
        filteredSubjects = filteredSubjects.filter(subject => 
          subject.category_id === categoryId
        );
      }
      setSubjectData(filteredSubjects);
      console.log(filteredSubjects)
    };
  
    // Function to filter chapters by subject
    const filterChapters = (subjectId) => {
      let filteredChapters = allChapters; // Start with all subjects
  
      // If both semester and category are selected, filter by both
      if (subjectId) {
        filteredChapters = filteredChapters.filter(chapter => 
          chapter.subject_id=== subjectId
        ) ;
      }
      setChapterData(filteredChapters);
      console.log(filteredChapters)
    };
  
      // Function to filter lessons by chapters 
      const filterLessons = (chapterId) => {
        let filteredLessons = allLessons; // Start with all subjects
    
        // If both semester and category are selected, filter by both
        if (chapterId) {
          filteredLessons= filteredLessons.filter(lesson => 
            lesson.chapter_id === chapterId
          ) ;
        }
        setLessonData(filteredLessons);
        console.log(filteredLessons)
      };

  const handleOpenSelectSemester = () => {
    setOpenSelectSemester(!openSelectSemester);
    setOpenSelectLesson(false);
    setOpenSelectHW(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectHomeWorkLevel(false);
  };

  const handleOpenSelectChapter = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHW(false);
    setOpenSelectChapter(!openSelectChapter);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectHomeWorkLevel(false);
  };

  const handleOpenSelectCategory = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHW(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(!openSelectCategory);
    setOpenSelectHomeWorkLevel(false);
  };

  const handleOpenSelectLesson = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(!openSelectLesson);
    setOpenSelectHW(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectHomeWorkLevel(false);
  };

  const handleOpenSelectHW = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHW(!openSelectHW);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectHomeWorkLevel(false);
  };

  const handleOpenSelectSubject = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHW(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(!openSelectSubject);
    setOpenSelectCategory(false);
    setOpenSelectHomeWorkLevel(false);
  };
  const handleOpenSelectHomeWorkLevel = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHW(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectHomeWorkLevel(!openSelectHomeWorkLevel);
  };

  const handleSelectSemester = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setSelectSemester(selectedOptionName);
    setSelectSemesterId(parseInt(selectedOptionValue));
    setOpenSelectSemester(false);
    console.log('Selected Semester:', selectedOptionName);
    console.log('Semester ID:', selectedOptionValue);

    // Filter subjects based on the new semester and existing category
    filterSubjects(selectedOptionName, selectCategoryId);
  };

  const handleSelectLesson = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setSelectLesson(selectedOptionName);
    setSelectLessonId(parseInt(selectedOptionValue));
    setOpenSelectLesson(false);
    console.log('Selected Lesson:', selectedOptionName);
    console.log('Lesson ID:', selectedOptionValue);
  };

  const handleSelectChapter = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setSelectChapter(selectedOptionName);
    setSelectChapterId(parseInt(selectedOptionValue));
    setOpenSelectChapter(false);
    console.log('Selected Chapter:', selectedOptionName);
    console.log('Chapter ID:', selectedOptionValue);

    filterLessons(parseInt(selectedOptionValue))
  };

  const handleSelectSubject = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setSelectSubject(selectedOptionName);
    setSelectSubjectId(parseInt(selectedOptionValue));
    setOpenSelectSubject(false);
    console.log('Selected Subject:', selectedOptionName);
    console.log('Subject ID:', selectedOptionValue);

    filterChapters(parseInt(selectedOptionValue))
  };

  const handleSelectCategory = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setSelectCategory(selectedOptionName);
    setSelectCategoryId(parseInt(selectedOptionValue));
    setOpenSelectCategory(false);
    console.log('Selected Category:', selectedOptionName);
    console.log('Category ID:', selectedOptionValue);
  };

  const handleSelectHW = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setSelectHW(selectedOptionName);
    setSelectHWId(parseInt(selectedOptionValue));
    setOpenSelectHW(false);
    console.log('Selected HW:', selectedOptionName);
    console.log('HW ID:', selectedOptionValue);
  };

  const handleSelectHomeWorkLevel = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setSelectHomeWorkLevel(selectedOptionName);
    setSelectHomeWorkLevelId(parseInt(selectedOptionValue));
    setOpenSelectHomeWorkLevel(false);
    console.log('Selected HomeWorkLevel:', selectedOptionName);
    console.log('HomeWorkLevel ID:', selectedOptionValue);
  };

  const handleClickOutside = (event) => {
    if (
      (dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target)) &&
      (dropdownLessonRef.current && !dropdownLessonRef.current.contains(event.target)) &&
      (dropdownChapterRef.current && !dropdownChapterRef.current.contains(event.target)) &&
      (dropdownSubjectRef.current && !dropdownSubjectRef.current.contains(event.target)) &&
      (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target)) &&
      (dropdownHWRef.current && !dropdownHWRef.current.contains(event.target))
      // (dropdownQuestTypeRef.current && !dropdownQuestTypeRef.current.contains(event.target))&&
      // (dropdownQuestLevelRef.current && !dropdownQuestLevelRef.current.contains(event.target))
    ) {
      setOpenSelectSemester(false);
      setOpenSelectLesson(false);
      setOpenSelectChapter(false);
      setOpenSelectSubject(false);
      setOpenSelectCategory(false);
      setOpenSelectHW(false);
      // openQuestGroupType(false);
      // openQuestGroupLevel(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = (e) => {
    const isChecked = e.target.checked;
    setHomeWorkActive(isChecked ? 1 : 0);
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const handleNext = () => {
    setActiveSection('Question');
  };

  /* Question Group Section */
  const [questionsData, setQuestionsData] = useState([]);
  const [questGroups, setQuestGroups] = useState([]);
  const [filters, setFilters] = useState({ type: '', difficulty: '' });
  const [initialButtonVisible, setInitialButtonVisible] = useState(true);
  const [questType, setQuestType] = useState([{ name: 'text' }, { name: 'audio' }, { name: 'image' }]);
  const [questLevel, setQuestLevel] = useState([{ name: 'A' }, { name: 'B' }, { name: 'C' }]);

  const dropdownQuestTypeRef = useRef(null);
  const dropdownQuestLevelRef = useRef(null);

  const [displayedQuestions, setDisplayedQuestions] = useState([]);


  useEffect(() => {
    const storageQuestionData = JSON.parse(localStorage.getItem('QuestionsData'));
    setQuestionsData(storageQuestionData);
    console.log(questionsData)
  }, []);

  useEffect(() => {
    setDisplayedQuestions(questionsData); // Initialize displayedQuestions
  }, [questionsData]);

  const handleSelectQuestGroupType = (index, e) => {
    const selectedOptionName = e.currentTarget.textContent.trim();
    const newGroups = [...questGroups];
    newGroups[index].QuestGroupType = selectedOptionName;
    setQuestGroups(newGroups);
    console.log(newGroups[index].QuestGroupType)
  };

  const handleSelectQuestGroupLevel = (index, e) => {
    const selectedOptionName = e.currentTarget.textContent.trim();
    const newGroups = [...questGroups];
    newGroups[index].QuestGroupLevel = selectedOptionName;
    setQuestGroups(newGroups);
    console.log(newGroups[index].QuestGroupLevel)
  };

  // Handle input change for question group title
  const handleTitleInputChange = (index, event) => {
    const newQuestGroups = [...questGroups];
    newQuestGroups[index].titleInput = event.target.value;
    setQuestGroups(newQuestGroups);
    console.log(newQuestGroups[index].titleInput)
  };

  const handleOpen = (index, dropdownIndex) => {
    const newGroups = [...questGroups];
    if (dropdownIndex === 1) {
      newGroups[index].openQuestGroupType = !newGroups[index].openQuestGroupType;
      newGroups[index].openQuestGroupLevel = false;
    } else if (dropdownIndex === 2) {
      newGroups[index].openQuestGroupLevel = !newGroups[index].openQuestGroupLevel;
      newGroups[index].openQuestGroupType = false;
    }
    setQuestGroups(newGroups);
  };

  const handleAddQuestionToGroup = (groupIndex, question) => {
    const newGroups = [...questGroups];
    if (!newGroups[groupIndex].selectedQuestions.some(q => q.id === question.id)) {
      newGroups[groupIndex].selectedQuestions.push(question);
      setQuestGroups(newGroups);
    }
  };

  const handleRemoveQuestionFromGroup = (groupIndex, question) => {
    const newGroups = [...questGroups];
    newGroups[groupIndex].selectedQuestions = newGroups[groupIndex].selectedQuestions.filter(q => q.id !== question.id);
    setQuestGroups(newGroups);
  };

  // Handle adding the first question group
  const handleAddFirstGroup = () => {
    setInitialButtonVisible(false);
    setQuestGroups([...questGroups, { titleInput: '', QuestGroupType: '', QuestGroupLevel: '', displayedQuestions: questionsData, selectedQuestions: [], openQuestGroupType: false, openQuestGroupLevel: false }]);
  };

  // Handle adding a new question group
  const handleAddGroup = () => {
    setQuestGroups([...questGroups, { titleInput: '', QuestGroupType: '', QuestGroupLevel: '', displayedQuestions: questionsData, selectedQuestions: [], openQuestGroupType: false, openQuestGroupLevel: false }]);
  };

  // Filter questions based on selected type and level
  const applyFilter = (index, event) => {
    const newGroups = [...questGroups];
    const group = newGroups[index];
    const type = newGroups[index].QuestGroupType;
    const level = newGroups[index].QuestGroupLevel;

    console.log(type, level)

    const filteredQuestions = questionsData.filter(question =>
      // (type === '' || question.question_type === type) &&
      // (level === '' || question.difficulty === level)
      (group.QuestGroupType === '' || question.question_type === group.QuestGroupType) &&
      (group.QuestGroupLevel === '' || question.difficulty === group.QuestGroupLevel)
    );
    newGroups[index].displayedQuestions = filteredQuestions;
    console.log(filteredQuestions)
    setDisplayedQuestions(newGroups);
    // setDisplayedQuestions(filteredQuestions);
  };


  const handleEditSubmit = async (homeWorkID, event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Validation checks
    if (!selectHW) {
      auth.toastError('Please Enter Homework Title.');
      return;
    }
    if (!selectSemester) {
      auth.toastError('Please Select Semester.');
      return;
    }
    if (!selectCategoryId) {
      auth.toastError('Please Select Category.');
      return;
    }
    if (!selectSubjectId) {
      auth.toastError('Please Select Subject.');
      return;
    }
    if (!selectChapterId) {
      auth.toastError('Please Select Chapter.');
      return;
    }
    if (!selectLessonId) {
      auth.toastError('Please Select Lesson.');
      return;
    }
    if (!selectHomeWorkLevel) {
      auth.toastError('Please Select Homework Difficulty.');
      return;
    }
    if (!mark) {
      auth.toastError('Please Enter Mark.');
      return;
    }
    if (!pass) {
      auth.toastError('Please Enter Passing Mark.');
      return;
    }

    // Check if each group has at least one question
    for (let i = 0; i < questGroups.length; i++) {
      if (questGroups[i].selectedQuestions.length === 0) {
        auth.toastError(`Please Enter Questions for Group ${i + 1}.`);
        return;
      }
    }
    setIsLoading(true);
    try {
      // Construct query parameters manually
      let params = new URLSearchParams({
        title: selectHW,
        semester: selectSemester,
        category_id: selectCategoryId,
        subject_id: selectSubjectId,
        chapter_id: selectChapterId,
        lesson_id: selectLessonId,
        difficulty: selectHomeWorkLevel,
        mark: parseInt(mark),
        pass: parseInt(pass),
        status: homeWorkActive ? 1 : 0,
      });

      // Adding groups and questions to the query parameters
      questGroups.forEach((group, groupIndex) => {
        params.append(`groups[${groupIndex}]`, group.titleInput);
        group.selectedQuestions.forEach((question, questionIndex) => {
          params.append(`questions[${groupIndex}][${questionIndex}]`, question.id);
        });
      });

      // To print params in a readable format
      console.log('Submitted Parameters:');
      params.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });


      const response = await axios.put(`https://bdev.elmanhag.shop/admin/homework/update/${homeWorkID}?${params}`, {}, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });

      if (response.status === 200) {
        auth.toastSuccess('HomeWork Updated successfully!');
        handleGoBack();
      } else {
        auth.toastError('Failed to update HomeWork.');
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
      {/* Buttons to switch between sections */}
      <div className='w-full flex justify-start gap-3 p-3'>
        <button
          className={`w-1/6 text-center text-xl font-medium ${activeSection === 'HWInfo' ? 'p-3 text-mainColor border-b-8 border-mainColor rounded' : 'p-3 text-thirdColor'
            }`}
          onClick={() => setActiveSection('HWInfo')}
        >
          H.W Info
        </button>
        <button
          className={`w-1/6 text-center text-xl font-medium ${activeSection === 'Question' ? 'p-3 text-mainColor border-b-8 border-mainColor rounded' : 'p-3 text-thirdColor'
            }`}
          onClick={() => setActiveSection('Question')}
        >
          Questions
        </button>
      </div>

      <form onSubmit={(event) => handleEditSubmit(homeworkEdit.id, event)}>

        {/* Conditional rendering based on activeSection */}
        {activeSection === 'HWInfo' && (
          <div id="HWInfo" className="w-full flex flex-col items-center justify-center gap-y-3">
            <div className="w-full flex flex-wrap items-center justify-start gap-3">
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
                  ref={dropdownChapterRef}
                  handleOpen={handleOpenSelectChapter}
                  handleOpenOption={handleSelectChapter}
                  stateoption={selectChapter}
                  openMenu={openSelectChapter}
                  options={chapterData}
                />
              </div>
              <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                  type="text"
                  placeholder="Pass"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
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
                  ref={dropdownLessonRef}
                  handleOpen={handleOpenSelectLesson}
                  handleOpenOption={handleSelectLesson}
                  stateoption={selectLesson}
                  openMenu={openSelectLesson}
                  options={lessonData}
                />
              </div>
              <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                  type="text"
                  placeholder="Mark"
                  value={mark}
                  onChange={(e) => setMark(e.target.value)}
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
                  ref={dropdownHomeWorkLevelRef}
                  handleOpen={handleOpenSelectHomeWorkLevel}
                  handleOpenOption={handleSelectHomeWorkLevel}
                  stateoption={selectHomeWorkLevel}
                  openMenu={openSelectHomeWorkLevel}
                  options={homeWorkLevel}
                />
              </div>
              <div className="lg:w-[30%] sm:w-full">
                <DropDownMenu
                  ref={dropdownHWRef}
                  handleOpen={handleOpenSelectHW}
                  handleOpenOption={handleSelectHW}
                  stateoption={selectHW}
                  openMenu={openSelectHW}
                  options={HWData}
                />
              </div>
              <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                <span className="text-2xl text-thirdColor font-medium">Active:</span>
                <div>
                  <CheckBox checked={homeWorkActive} handleClick={handleClick} />
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
              <div className="flex items-center justify-center w-72">
                <Button
                  type="button"
                  Text="Next"
                  BgColor="bg-mainColor"
                  Color="text-white"
                  Width="full"
                  Size="text-2xl"
                  px="px-28"
                  rounded="rounded-2xl"
                  handleClick={handleNext}
                />
              </div>
              <button onClick={handleGoBack} className="text-2xl text-mainColor">
                Cancel
              </button>
            </div>
          </div>
        )}

        {activeSection === 'Question' && (
          <div id="Question" className="w-full">
            {/* Initial Button to add the first question group
{initialButtonVisible && (
  <div className="sm:w-full flex justify-center mx-auto">
    <ButtonAdd Text="Add Question Group" handleClick={handleAddFirstGroup} />
  </div>
)} */}

            {/* Render the question groups */}
            {/* {!initialButtonVisible && ( */}
            <>
              {questGroups.map((group, index) => (
                <div className="w-full flex flex-col items-center p-4 gap-4 m-4 rounded-lg" key={index}>
                  <TextTitle text="MCQ" />
                  <div className="w-full flex flex-wrap items-center justify-start gap-3">
                    <div className="lg:w-[25%] sm:w-full">
                      <InputCustom
                        type="text"
                        placeholder="Question Group Title"
                        value={group.titleInput}
                        onChange={(event) => handleTitleInputChange(index, event)}
                      />
                    </div>
                    <div className="lg:w-[25%] sm:w-full">
                      <DropDownMenu
                        ref={dropdownQuestTypeRef}
                        stateoption={group.QuestGroupType || 'Select Type'}
                        openMenu={group.openQuestGroupType}
                        handleOpen={() => handleOpen(index, 1)}
                        handleOpenOption={(e) => handleSelectQuestGroupType(index, e)}
                        options={questType}
                      />
                    </div>
                    <div className="lg:w-[25%] sm:w-full">
                      <DropDownMenu
                        ref={dropdownQuestLevelRef}
                        stateoption={group.QuestGroupLevel || 'Select Difficulty'}
                        openMenu={group.openQuestGroupLevel}
                        handleOpen={() => handleOpen(index, 2)}
                        handleOpenOption={(e) => handleSelectQuestGroupLevel(index, e)}
                        options={questLevel}
                      />
                    </div>

                    <div className="flex items-center justify-center w-72">
                      <Button
                        Text="Filter"
                        BgColor="bg-mainColor"
                        Color="text-white"
                        Width="full"
                        Size="text-2xl"
                        px="px-28"
                        rounded="rounded-2xl"
                        handleClick={(e) => applyFilter(index, e)}
                      />
                    </div>
                  </div>

                  {/* Questions and Selected Questions Tables */}
                  <div className="w-full flex items-center justify-between mt-4 overflow-x-auto gap-12">
                    {/* Available Questions Table */}
                    <table className="w-full sm:min-w-0 border">
                      <thead>
                        <tr className="border-b-2">
                          <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                          <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Question</th>
                          <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Difficulty</th>
                          <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {group.displayedQuestions.map((question, qIndex) => (
                          <tr className="w-full border-b-2" key={question.id}>
                            <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                              {qIndex + 1}
                            </td>
                            <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                              <span className="text-mainColor text-xl border-b-2 border-mainColor font-semibold">
                                <Link to={`question/${question.id}`} state={{ id: question.id }}>View</Link>
                              </span>
                            </td>
                            <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                              {question?.difficulty || 'Null'}
                            </td>
                            <td className="min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center">
                              <button
                                className="text-mainColor text-xl border-b-2 border-mainColor font-semibold"
                                onClick={() => handleAddQuestionToGroup(index, question)}
                              >
                                Add
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Selected Questions Table */}
                    <table className="w-full sm:min-w-0 border">
                      <thead>
                        <tr className="border-b-2">
                          <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                          <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Question</th>
                          <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Difficulty</th>
                          <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {group.selectedQuestions.map((question, qIndex) => (
                          <tr className="w-full border-b-2" key={question.id}>
                            <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                              {qIndex + 1}
                            </td>
                            <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                              <span className="text-mainColor text-xl border-b-2 border-mainColor font-semibold">
                                <Link to={`question/${question.id}`} state={{ id: question.id }}>View</Link>
                              </span>
                            </td>
                            <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                              {question?.difficulty || 'Null'}
                            </td>
                            <td className="min-w-[100px] sm:w-1/12 lg:w-1/12 py-2 text-center">
                              <button
                                className="text-mainColor text-xl border-b-2 border-mainColor font-semibold"
                                onClick={() => handleRemoveQuestionFromGroup(index, question)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
              <div className="w-full flex justify-center gap-4 mt-6">
                <ButtonAdd Text="Add Question Group" handleClick={handleAddGroup} />
              </div>

              {/* Buttons */}
              <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                <div className="flex items-center justify-center w-72">
                  <button
                    type="submit"
                    className="bg-mainColor text-white text-2xl p-3 px-28 rounded-2xl"
                  >
                    Submit
                  </button>
                </div>
                <button className="text-2xl text-mainColor">
                  Preview H.W
                </button>
              </div>
            </>
            {/* )} */}
          </div>
        )}

      </form>

    </>
  )
}

export default EditHomeWorkPage