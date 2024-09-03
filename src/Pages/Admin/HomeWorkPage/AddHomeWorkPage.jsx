import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import { ButtonAdd } from '../../../Components/Button';
import { Button } from '../../../Components/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDownMenu from '../../../Components/DropDownMenu';
import Loading from '../../../Components/Loading';
import InputCustom from '../../../Components/InputCustom';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../../Components/CheckBox';
import TextTitle from '../../../Components/TextTitle'
import { NavLink } from 'react-router-dom'


const AddHomeWorkPage = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [homeWorkData, setHomeWorkData] = useState(null);
  const [homeWorks, setHomeWorks] = useState(null);
  const [activeSection, setActiveSection] = useState('HWInfo');

  const [semesterData, setSemesterData] = useState([{ name: 'First' }, { name: 'Second' }]);
  const [lessonData, setLessonData] = useState([]);
  const [chapterData, setChapterData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [HWData, setHWData] = useState([{ name: 'H.W 1' }, { name: 'H.W 2' },{name: 'H.W 3'}]);
  const [homeWorkActive, setHomeWorkActive] = useState(false);

  useEffect(() => {
    const StorageHWData = JSON.parse(localStorage.getItem('AllhomeWork'));

    setChapterData(StorageHWData?.chapters || []);
    setLessonData(StorageHWData?.lessons || []);
    setCategoryData(StorageHWData?.categories || []);
    setSubjectData(StorageHWData?.subjects || []);
  }, []);

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

  const [selectHW, setSelectHW] = useState('Select By H.W');
  const [selectHWId, setSelectHWId] = useState(null);
  const [openSelectHW, setOpenSelectHW] = useState(false);

  // const [questGroupTitle, setQuestGroupTitle] = useState('');
  // const [questionTypeData, setQuestionTypeData] = useState('');

  // const [questGroupTypeData, setQuestGroupTypeData]= useState([]);
  // const [selectQuestGroupType, setSelectQuestGroupType] = useState('Select Type');
  // const [questGroupTypeId, setQuestGroupTypeId] = useState(null);
  // const [openSelectQuestGroupType, setOpenSelectQuestGroupType] = useState(false);

  // const [questLevel, setQuestLevel] = useState([{ name: 'A' }, { name: 'B' },{ name: 'C' }]);
  // const [selectQuestLevel, setSelectQuestLevel] = useState('Select Difficulty');
  // const [openSelectQuestLevel, setOpenSelectQuestLevel] = useState(false);

  const dropdownSemesterRef = useRef(null);
  const dropdownLessonRef = useRef(null);
  const dropdownChapterRef = useRef(null);
  const dropdownSubjectRef = useRef(null);
  const dropdownCategoryRef = useRef(null);
  const dropdownHWRef= useRef(null);

  const handleOpenSelectSemester = () => {
    setOpenSelectSemester(!openSelectSemester);
    setOpenSelectLesson(false);
    setOpenSelectHW(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectChapter = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHW(false);
    setOpenSelectChapter(!openSelectChapter);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectCategory = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHW(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(!openSelectCategory);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectLesson = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(!openSelectLesson);
    setOpenSelectHW(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectHW = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHW(!openSelectHW);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectSubject= () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHW(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(!openSelectSubject);
    setOpenSelectCategory(false);
    setOpenSelectStatus(false);
  };

  const handleSelectSemester = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ?inputElement.value : '';
    setSelectSemester(selectedOptionName);
    setSelectSemesterId(parseInt(selectedOptionValue));
    setOpenSelectSemester(false);
    console.log('Selected Semester:', selectedOptionName);
    console.log('Semester ID:', selectedOptionValue);
  };

  const handleSelectLesson = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ?inputElement.value : '';
    setSelectLesson(selectedOptionName);
    setSelectLessonId(parseInt(selectedOptionValue));
    setOpenSelectLesson(false);
    console.log('Selected Lesson:', selectedOptionName);
    console.log('Lesson ID:', selectedOptionValue);
  };

  const handleSelectChapter = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ?inputElement.value : '';
    setSelectChapter(selectedOptionName);
    setSelectChapterId(parseInt(selectedOptionValue));
    setOpenSelectChapter(false);
    console.log('Selected Chapter:', selectedOptionName);
    console.log('Chapter ID:', selectedOptionValue);
  };

  const handleSelectSubject = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ?inputElement.value : '';
    setSelectSubject(selectedOptionName);
    setSelectSubjectId(parseInt(selectedOptionValue));
    setOpenSelectSubject(false);
    console.log('Selected Subject:', selectedOptionName);
    console.log('Subject ID:', selectedOptionValue);
  };

  const handleSelectCategory = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ?inputElement.value : '';
    setSelectCategory(selectedOptionName);
    setSelectCategoryId(parseInt(selectedOptionValue));
    setOpenSelectCategory(false);
    console.log('Selected Category:', selectedOptionName);
    console.log('Category ID:', selectedOptionValue);
  };

  const handleSelectHW = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ?inputElement.value : '';
    setSelectHW(selectedOptionName);
    setSelectHWId(parseInt(selectedOptionValue));
    setOpenSelectHW(false);
    console.log('Selected HW:', selectedOptionName);
    console.log('HW ID:', selectedOptionValue);
  };

  const handleClickOutside = (event) => {
    if (
      (dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target))&&
      (dropdownLessonRef.current && !dropdownLessonRef.current.contains(event.target))&&
      (dropdownChapterRef.current && !dropdownChapterRef.current.contains(event.target))&&
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

  // const [questionGroups, setQuestionGroups] = useState([]);
  // const [initialButtonVisible, setInitialButtonVisible] = useState(true);

  // const handleAddFirstGroup = () => {
  //   setInitialButtonVisible(false);
  //   setQuestionGroups((prevGroups) => [...prevGroups, prevGroups.length]);
  // };

  // const handleAddGroup = () => {
  //   setQuestionGroups((prevGroups) => [...prevGroups, prevGroups.length]);
  // };

    /* Question Group Section */
  // State to manage multiple Groups form
  const [questGroups, setQuestGroups] = useState([]);
  const [initialButtonVisible, setInitialButtonVisible] = useState(true);
 
  const dropdownQuestTypeRef= useRef(null);
  const dropdownQuestLevelRef= useRef(null);

  const handleAddFirstGroup = () => {
    setInitialButtonVisible(false);
    setQuestGroups([...questGroups, { titleInput: '', QuestGroupType: '', QuestGroupLevel: '', openQuestGroupType: false, openQuestGroupLevel: false }]);
  };

  const handleAddGroup = () => {
    setQuestGroups([...questGroups, { titleInput: '', QuestGroupType: '', QuestGroupLevel: '', openQuestGroupType: false, openQuestGroupLevel: false }]);
  };

  // Dropdown options for demonstration
  const options1 = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
  ];

  const options2 = [
    { id: 'A', name: 'Option A' },
    { id: 'B', name: 'Option B' },
  ];

  const handleTitleInputChange = (index, event) => {
    const newGroup = [...questGroups];
    newGroup[index].titleInput = event.target.value;
    setQuestGroups(newGroup);
  };

  const handleSelectQuestGroupType = (index, e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
  
    const newGroup = [...questGroups];
    newGroup[index].QuestGroupType = selectedOptionName;
    setQuestGroups(newGroup);
  
    console.log('Selected QuestGroupType:', selectedOptionName);
    console.log('QuestGroupType ID:', selectedOptionValue);
  };

  const handleSelectQuestGroupLevel = (index, e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
  
    const newGroup = [...questGroups];
    newGroup[index].QuestGroupLevel = selectedOptionName;
    setQuestGroups(newGroup);
  
    console.log('Selected QuestGroupLevel:', selectedOptionName);
    console.log('QuestGroupLevel ID:', selectedOptionValue);
  };

  const handleOpen = (index, dropdownIndex) => {
    const newGroup = [...questGroups];
    if (dropdownIndex === 1) {
      newGroup[index].openQuestGroupType = !newGroup[index].openQuestGroupType;
      newGroup[index].openQuestGroupLevel = false; // Close the other dropdown if open
    } else if (dropdownIndex === 2) {
      newGroup[index].openQuestGroupLevel = !newGroup[index].openQuestGroupLevel;
      newGroup[index].openQuestGroupType = false; // Close the other dropdown if open
    }
    setQuestGroups(newGroup);
  };

  


  return (
    <>
  {/* Buttons to switch between sections */}
  <div className='w-full flex justify-start gap-3 p-3'>
        <button
          className={`w-1/6 text-center text-xl font-medium ${
            activeSection === 'HWInfo' ? 'p-3 text-mainColor border-b-8 border-mainColor rounded' : 'p-3 text-thirdColor'
          }`}
          onClick={() => setActiveSection('HWInfo')}
        >
          H.W Info
        </button>
        <button
          className={`w-1/6 text-center text-xl font-medium ${
            activeSection === 'Question' ? 'p-3 text-mainColor border-b-8 border-mainColor rounded' : 'p-3 text-thirdColor'
          }`}
          onClick={() => setActiveSection('Question')}
        >
          Questions
        </button>
  </div>

    {/* Conditional rendering based on activeSection */}
    {activeSection === 'HWInfo' && (
        <form id="HWInfo" className="w-full flex flex-col items-center justify-center gap-y-3">
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
                type="submit"
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
        </form>
      )}

    {activeSection === 'Question' && (
        <form id="Question" className='w-full'>
          {/* Initial Button to add the first question group */}
          {initialButtonVisible && (
            <div className="sm:w-full flex justify-center mx-auto">
            <ButtonAdd Text="Add Question Group" handleClick={handleAddFirstGroup} />
            </div>
          )}

          {/* Render the question groups */}
          {!initialButtonVisible && (
            <>
              {questGroups.map((group, index) => (
                <div key={index} className="w-full flex flex-col items-center p-4 gap-4p-4 m-4 rounded-lg">
                  <TextTitle text="MCQ" />
                  <div className="w-full flex flex-wrap items-center justify-start gap-3">
                  <div className="lg:w-[30%] sm:w-full">
                    {/* <InputCustom
                      type="text"
                      placeholder="question Group Title"
                      value={questGroupTitle}
                      onChange={(e) => setQuestGroupTitle(e.target.value)}
                    /> */}
                    <InputCustom
                      type="text"
                      placeholder="question Group Title"
                      value={group.titleInput}
                      onChange={(event) => handleTitleInputChange(index, event)}
                    />
                  </div>
                  <div className="lg:w-[30%] sm:w-full">
                    <DropDownMenu
                      ref={dropdownQuestTypeRef}
                      stateoption={group.QuestGroupType || 'Select an option'}  // Display selected option or default text
                      openMenu={group.openQuestGroupType}  // Manage dropdown open/close state
                      handleOpen={() => handleOpen(index, 1)}  // Toggle dropdown visibility
                      handleOpenOption={(e) => handleSelectQuestGroupType(index, e)}  // Use specific handler for dropdown 1
                      options={options1}  // Options for the first dropdown
                    />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                  {/* <DropDownMenu
                    handleOpen={QuestGroupLevel}
                    handleOpenOption={handleSelectQuestGroupLevel}
                    stateoption={selectQuestLevel}
                    openMenu={openSelectQuestLevel}
                    options={questLevel}
                  /> */}
                  <DropDownMenu
                    ref={dropdownQuestLevelRef}
                    stateoption={group.QuestGroupLevel || 'Select an option'}  // Display selected option or default text
                    openMenu={group.openQuestGroupLevel}  // Manage dropdown open/close state
                    handleOpen={() => handleOpen(index, 2)}  // Toggle dropdown visibility
                    handleOpenOption={(e) => handleSelectQuestGroupLevel(index, e)}  // Use specific handler for dropdown 1
                    options={options2}  // Options for the second dropdown
                  />
                </div>

        <div className="w-full flex items-center justify-between mt-4 overflow-x-auto gap-12">
          <table className="w-full sm:min-w-0 border">
                <thead>
                        <tr className="border-b-2">
                              <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Question</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Difficulty</th>
                              <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                        </tr>
                </thead>
          </table>

          <table className="w-full sm:min-w-0 border">
                <thead>
                        <tr className="border-b-2">
                              <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Question</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Difficulty</th>
                              <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                        </tr>
                </thead>
          </table>
      </div>
                  </div>
                </div>
              ))}

              {/* Button at the bottom to add more question groups */}
              <div className="sm:w-full flex mx-auto m-4">
                <ButtonAdd Text="Add Question Group" handleClick={handleAddGroup} />
              </div>
            </>
          )}

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
        </form>
    )}
     
    </>
  )
}

export default AddHomeWorkPage