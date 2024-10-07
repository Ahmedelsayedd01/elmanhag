import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonAdd } from '../../../../Components/Button';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { useAuth } from '../../../../Context/Auth';
import axios from 'axios';
import InputCustom from '../../../../Components/InputCustom';
import CheckBox from '../../../../Components/CheckBox';
import { RadioCheck } from '../../../../Components/RadioCheck';
import { RadioCheckGroup } from '../../../../Components/RadioCheck';

const AddQuestionPage = () => {
       const auth = useAuth();
       const semesterRef = useRef();
       const categoryRef = useRef();
       const subjectRef = useRef();
       const chapterRef = useRef();
       const lessonRef = useRef();

       const questionTypeRef = useRef();
       const difficultyRef = useRef();

       const answerTypeRef = useRef();

       const imageRef = useRef(null);
       const audioRef = useRef(null);

       const [stateData, setStateData] = useState(3);

       const [semesterState, setSemesterState] = useState('Select Semester');
       const [categoryState, setCategoryState] = useState('Select Category');
       const [subjectState, setSubjectState] = useState('Select Subject');
       const [chapterState, setChapterState] = useState('Select Chapter');
       const [lessonState, setLessonState] = useState('Select Lesson');

       const [questionTypeState, setQuestionTypeState] = useState('Select Question Type');
       const [difficultyState, setDifficultyState] = useState('Select Difficulty');

       const [answerTypeState, setAnswerTypeState] = useState('Select Answer Type');

       const [semesterId, setSemesterId] = useState('');
       const [categoryId, setCategoryId] = useState('');
       const [subjectId, setSubjectId] = useState('');
       const [chapterId, setChapterId] = useState('');
       const [lessonId, setLessonId] = useState('');

       const [allSubjects, setAllSubjects] = useState(null);
       const [allChapters, setAllChapters] = useState(null);
       const [allLessons, setAllLessons] = useState(null);

       const [semesters, setSemesters] = useState([{ name: 'first' }, { name: 'second' }]);
       const [categories, setCategories] = useState([]);
       const [subjects, setSubjects] = useState([]);
       const [chapters, setChapters] = useState([]);
       const [lessons, setLessons] = useState([]);

       const [questionImageFile, setQuestionImageFile] = useState();
       const [questionImage, setQuestionImage] = useState('');

       const [questionAudioFile, setQuestionAudioFile] = useState();
       const [questionAudio, setQuestionAudio] = useState('');

       const [questionsType, setQuestionsType] = useState([]);
       const [difficulties, setDifficulties] = useState([{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }]);

       const [answerTypes, setAnswerTypes] = useState([{ name: 'Mcq' }, { name: 'T/F' }, { name: 'Join' }, { name: 'Complete' }]);

       const [semester, setSemester] = useState('');
       const [category, setCategory] = useState('');
       const [subject, setSubject] = useState('');
       const [chapter, setChapter] = useState('');
       const [lesson, setLesson] = useState('');

       const [questionType, setQuestionType] = useState('');
       const [difficulty, setDifficulty] = useState('');
       const [questionActive, setQuestionActive] = useState(false)


       const [questionVal, setQuestionVal] = useState('');

       const [answerType, setAnswerType] = useState('');


       const [openSemester, setOpenSemester] = useState(false);
       const [openCategory, setOpenCategory] = useState(false);
       const [openSubject, setOpenSubject] = useState(false);
       const [openChapter, setOpenChapter] = useState(false);
       const [openLesson, setOpenLesson] = useState(false);

       const [openQuestionType, setOpenQuestionType] = useState(false);
       const [openDifficulty, setOpenDifficulty] = useState(false);

       const [openAnswerTypes, setOpenAnswerTypes] = useState(false);

       // const [isCheckedTrue, setIsCheckedTrue] = useState(false);
       // const [isCheckedFalse, setIsCheckedFalse] = useState(false);

       const [options] = useState([{ value: 'true', label: 'True' },
       { value: 'false', label: 'False' }]);

       const [optionsGroup, setOptionsGroup] = useState([
              { value: 'a', label: 'A_', answer: '' },
              { value: 'b', label: 'B_', answer: '' },
              { value: 'c', label: 'C_', answer: '' },
              { value: 'd', label: 'D_', answer: '' },
       ]);
       const [answerComplete, setAnswerComplete] = useState([''])

       const [selectBoolean, setSelectBoolean] = useState(null); // Manage selected option
       const [selectRightAnswer, setSelectRightAnswer] = useState(null); // Manage selected option
       const [allAnswer, setAllAnswer] = useState(null); // Manage selected option



       /* Fetch Category && Subjects */
       const fetchCategoryAndSubjects = async () => {
              try {
                     const response = await axios.get('https://bdev.elmanhag.shop/admin/subject', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setCategories(response.data.categories);
                            setAllSubjects(response.data.subjects);
                            console.log('response Category & Subjects', response)
                     }
              } catch (error) {
                     console.error('Error fetching Subjects data:', error);
              }
       };
       /* Fetch Chapter && Lesson */
       const fetchChapterAndLessonAndQuestionsType = async () => {
              try {
                     const response = await axios.get('https://bdev.elmanhag.shop/admin/question', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setAllChapters(response.data.chapter);
                            setAllLessons(response.data.lesson);
                            setQuestionsType(response.data.question_types);
                            console.log('response Chapter && Lessons && Questions Type', response)
                     }
              } catch (error) {
                     console.error('Error fetching Subjects data:', error);
              }
       };

       useEffect(() => {
              fetchCategoryAndSubjects();
              fetchChapterAndLessonAndQuestionsType();
              console.log('categories', categories)
              console.log('subjects', allSubjects)
              console.log('chapters', allChapters)
              console.log('lessons', allLessons)
              console.log('questionsType', questionsType)
       }, [])




       const handleOpenSemester = () => {
              setOpenSemester(!openSemester);
              setOpenCategory(false);
              setOpenSubject(false);
              setOpenChapter(false);
              setOpenLesson(false);
              setOpenQuestionType(false)
              setOpenDifficulty(false)
              setOpenAnswerTypes(false)
       }

       const handleOpenCategory = () => {
              setOpenSemester(false);
              setOpenCategory(!openCategory);
              setOpenSubject(false);
              setOpenChapter(false);
              setOpenLesson(false);
              setOpenQuestionType(false)
              setOpenDifficulty(false)
              setOpenAnswerTypes(false)
       }
       const handleOpenSubject = () => {
              setOpenSemester(false);
              setOpenCategory(false);
              setOpenSubject(!openSubject);
              setOpenChapter(false);
              setOpenLesson(false);
              setOpenAnswerTypes(false)
       }
       const handleOpenChapter = () => {
              setOpenSemester(false);
              setOpenCategory(false);
              setOpenSubject(false);
              setOpenChapter(!openChapter);
              setOpenLesson(false);
              setOpenQuestionType(false)
              setOpenDifficulty(false)
              setOpenAnswerTypes(false)
       }
       const handleOpenLesson = () => {
              setOpenSemester(false);
              setOpenCategory(false);
              setOpenSubject(false);
              setOpenChapter(false);
              setOpenLesson(!openLesson);
              setOpenQuestionType(false)
              setOpenDifficulty(false)
              setOpenAnswerTypes(false)
       }
       const handleOpenQuestionType = () => {
              setOpenSemester(false);
              setOpenCategory(false);
              setOpenSubject(false);
              setOpenChapter(false);
              setOpenLesson(false);
              setOpenQuestionType(!openQuestionType)
              setOpenDifficulty(false)
              setOpenAnswerTypes(false)
       }

       const handleOpenDifficulty = () => {
              setOpenSemester(false);
              setOpenCategory(false);
              setOpenSubject(false);
              setOpenChapter(false);
              setOpenLesson(false);
              setOpenQuestionType(false)
              setOpenDifficulty(!openDifficulty)
              setOpenAnswerTypes(false)
       }
       const handleOpenAnswerTypes = () => {
              setOpenSemester(false);
              setOpenCategory(false);
              setOpenSubject(false);
              setOpenChapter(false);
              setOpenLesson(false);
              setOpenQuestionType(false)
              setOpenDifficulty(false)
              setOpenAnswerTypes(!openAnswerTypes)
       }

       const handleSemester = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setSemesterState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setSemester(selectedOptionName);
              setSemesterId(parseInt(selectedOptionValue));
              setOpenSemester(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleCategory = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

              const subjectsData = allSubjects.find((subject) => subject.category_id == selectedOptionValue)

              setSubjects([subjectsData])
              console.log('subjectsData', subjectsData)

              setCategoryState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setCategory(selectedOptionName);
              setCategoryId(parseInt(selectedOptionValue));
              setOpenCategory(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleSubject = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

              const chaptersData = allChapters.find((chapter) => chapter.subject_id == selectedOptionValue)

              setChapters([chaptersData])
              console.log('chaptersData', chaptersData)

              setSubjectState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setSubject(selectedOptionName);
              setSubjectId(parseInt(selectedOptionValue));
              setOpenSubject(false);



              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleChapter = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

              const lessonsData = allLessons.find((lesson) => lesson.chapter_id == selectedOptionValue)

              setLessons([lessonsData])
              console.log('lessonsData', lessonsData)

              setChapterState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setChapter(selectedOptionName);
              setChapterId(parseInt(selectedOptionValue));
              setOpenChapter(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleLesson = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setLessonState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setLesson(selectedOptionName);
              setLessonId(parseInt(selectedOptionValue));
              setOpenLesson(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleQuestionType = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setQuestionTypeState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setQuestionType(selectedOptionName);
              // setLessonId(parseInt(selectedOptionValue));
              setOpenQuestionType(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };
       const handleDifficulty = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setDifficultyState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setDifficulty(selectedOptionName);
              // setLessonId(parseInt(selectedOptionValue));
              setOpenDifficulty(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };
       const handleAnswerTypes = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setAnswerTypeState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setAnswerType(selectedOptionName);
              setOpenAnswerTypes(false);

              console.log('options:', options);
              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleImageClick = () => {
              if (imageRef.current) {
                     imageRef.current.click(); // Trigger a click on the hidden file input
              }
       };

       const handleImageChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setQuestionImageFile(file); // Set file object for upload
                     setQuestionImage(file.name); // Display file name in the text input
              }
       };
       const handleAudioClick = () => {
              if (audioRef.current) {
                     audioRef.current.click(); // Trigger a click on the hidden file input
              }
       };

       const handleAudioChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setQuestionAudioFile(file); // Set file object for upload
                     setQuestionAudio(file.name); // Display file name in the text input
              }
       };

       const handleClick = (e) => {
              const isChecked = e.target.checked;
              setQuestionActive(isChecked ? 1 : 0);
       };

       const handleCheck = (value) => {
              setSelectBoolean(value)
              console.log('Selected Option:', value);
       }
       const handleSelectAnswer = (value) => {
              setSelectRightAnswer(value)
              console.log('Selectedss Option:', value);
       }

       // const handleAllAnswer = (value) => {
       //        setAllAnswer(value)
       //        console.log('Selectedss answer:', value);
       // }

       const handleAllAnswer = (answers) => {
              setAllAnswer(answers)
              console.log('All answers:', answers); // Log all answers
       };

       // Function to handle adding a new answer option
       const handleAddAnswer = () => {
              const nextValue = String.fromCharCode(97 + optionsGroup.length); // Generate the next value (e, f, etc.)
              const newAnswer = { value: nextValue, label: `${nextValue.toUpperCase()}_`, answer: '' };
              setOptionsGroup([...optionsGroup, newAnswer]); // Add the new answer to the array
       };

       const handleAddAnswerComplete = () => {
              setAnswerComplete([...answerComplete, '']); // Add a new empty string for the new input
       };

       const handleAnswerComplete = (index, value) => {
              const newAnswers = [...answerComplete];
              newAnswers[index] = value; // Update the value for the specific index
              setAnswerComplete(newAnswers); // Set the new state

              console.log('newAnswers', newAnswers)
       };

       const handleClickNext = (e) => {
              e.preventDefault();

              if (stateData === 1) {

                     if (!semester) {
                            auth.toastError("Please Select Semester")
                            return;
                     }
                     if (!category) {
                            auth.toastError("Please Select Category")
                            return;
                     }
                     if (!subject) {
                            auth.toastError("Please Select Subject")
                            return;
                     }
                     if (!chapter) {
                            auth.toastError("Please Select Chapter")
                            return;
                     }
                     if (!lesson) {
                            auth.toastError("Please Select Lesson")
                            return;
                     }
                     setStateData(stateData + 1)
              }

              if (stateData === 2) {

                     if (!questionType) {
                            auth.toastError("Please Choose Question Type")
                            return;
                     }
                     if (!difficulty) {
                            auth.toastError("Please Enter Difficulty")
                            return;
                     }
                     if (questionType == 'text' && !questionVal) {
                            auth.toastError("Please Enter Write The Question")
                            return;

                     }
                     if (questionType == 'audio' && !questionAudio) {
                            auth.toastError("Please Enter Question Audio")
                            return;

                     }
                     if (questionType == 'image' && !questionImage) {
                            auth.toastError("Please Enter Question Image")
                            return;

                     }

                     setStateData(stateData + 1)
              }
       };
       const handleClickPrev = () => {
              setStateData(stateData - 1)
       };

       const handleClickOutside = (event) => {
              const refs = [
                     semesterRef,
                     categoryRef,
                     subjectRef,
                     chapterRef,
                     lessonRef,
                     questionTypeRef,
                     difficultyRef,
                     answerTypeRef
              ];

              const isClickInsideAny = refs.some(
                     (ref) => ref.current && ref.current.contains(event.target)
              );

              // If the click is outside all of the elements
              if (!isClickInsideAny) {
                     setOpenSemester(false);
                     setOpenCategory(false);
                     setOpenSubject(false);
                     setOpenChapter(false);
                     setOpenLesson(false);
                     setOpenQuestionType(false);
                     setOpenDifficulty(false);
                     setOpenAnswerTypes(false);
              }
       };

       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);



       const handleQuestionAdd = () => { }
       return (
              <>
                     <form onSubmit={handleQuestionAdd} className="w-full flex flex-col items-start justify-center gap-4">
                            <div className="w-full flex flex-wrap items-center justify-center mt-4">
                                   <div className="sm:w-full xl:w-1/3 flex items-center justify-center ">
                                          <span className={`${stateData === 1 ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor '} text-3xl font-semibold py-1`}>
                                                 Question Info
                                          </span>
                                   </div>
                                   <div className="sm:w-full xl:w-1/3 flex items-center justify-center ">
                                          <span className={`${stateData === 2 ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor '} text-3xl font-semibold py-1`}>
                                                 Question Details
                                          </span>
                                   </div>
                                   <div className="sm:w-full xl:w-1/3 flex items-center justify-center">
                                          <span className={`${stateData === 3 ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor '} text-3xl font-semibold py-1`}>
                                                 Answers
                                          </span>
                                   </div>
                            </div>
                            {/* State 1 */}
                            {stateData === 1 &&
                                   (
                                          <div className="w-full flex flex-wrap justify-start gap-4">

                                                 <div className="sm:w-full xl:w-[30%]">
                                                        <DropDownMenu
                                                               ref={semesterRef}
                                                               handleOpen={handleOpenSemester}
                                                               handleOpenOption={handleSemester}
                                                               stateoption={semesterState}
                                                               openMenu={openSemester}
                                                               options={semesters || []}
                                                        />
                                                 </div>
                                                 <div className="sm:w-full xl:w-[30%]">
                                                        <DropDownMenu
                                                               ref={categoryRef}
                                                               handleOpen={handleOpenCategory}
                                                               handleOpenOption={handleCategory}
                                                               stateoption={categoryState}
                                                               openMenu={openCategory}
                                                               options={categories || []}
                                                        />
                                                 </div>
                                                 <div className="sm:w-full xl:w-[30%]">
                                                        <DropDownMenu
                                                               ref={subjectRef}
                                                               handleOpen={handleOpenSubject}
                                                               handleOpenOption={handleSubject}
                                                               stateoption={subjects.length > 0 ? subjectState : "No Subjects Available"}
                                                               openMenu={openSubject}
                                                               options={subjects || []}
                                                        />
                                                 </div>
                                                 <div className="sm:w-full xl:w-[30%]">
                                                        <DropDownMenu
                                                               ref={chapterRef}
                                                               handleOpen={handleOpenChapter}
                                                               handleOpenOption={handleChapter}
                                                               stateoption={chapters.length > 0 ? chapterState : "No Chapters Available"}
                                                               openMenu={openChapter}
                                                               options={chapters || []}
                                                        />
                                                 </div>
                                                 <div className="sm:w-full xl:w-[30%]">
                                                        <DropDownMenu
                                                               ref={lessonRef}
                                                               handleOpen={handleOpenLesson}
                                                               handleOpenOption={handleLesson}
                                                               stateoption={lessons.length > 0 ? lessonState : "No Lessons Available"}
                                                               openMenu={openLesson}
                                                               options={lessons || []}
                                                        />
                                                 </div>
                                          </div>
                                   )
                            }
                            {/* State 2 */}
                            {stateData === 2 &&
                                   (
                                          <div className="w-full flex flex-wrap justify-start gap-4">

                                                 <div className="sm:w-full xl:w-[30%]">
                                                        <DropDownMenu
                                                               ref={difficultyRef}
                                                               handleOpen={handleOpenDifficulty}
                                                               handleOpenOption={handleDifficulty}
                                                               stateoption={difficultyState}
                                                               openMenu={openDifficulty}
                                                               options={difficulties || []}
                                                        />
                                                 </div>
                                                 <div className="sm:w-full xl:w-[30%]">
                                                        <DropDownMenu
                                                               ref={questionTypeRef}
                                                               handleOpen={handleOpenQuestionType}
                                                               handleOpenOption={handleQuestionType}
                                                               stateoption={questionTypeState}
                                                               openMenu={openQuestionType}
                                                               options={questionsType || []}
                                                        />
                                                 </div>
                                                 {questionType == 'text' && (
                                                        <div className="sm:w-full xl:w-[30%]">
                                                               <InputCustom type={"text"} placeholder={"Write The Question"} value={questionVal} onChange={(e) => setQuestionVal(e.target.value)} />
                                                        </div>
                                                 )}
                                                 {questionType == 'image' && (
                                                        <div className="lg:w-[30%] sm:w-full">
                                                               <InputCustom
                                                                      type="text"
                                                                      source="upload"
                                                                      placeholder="Upload Image"
                                                                      value={questionImage}
                                                                      readonly={true}
                                                                      onClick={handleImageClick}
                                                               />
                                                               <input
                                                                      ref={imageRef}
                                                                      type="file"
                                                                      className="hidden"
                                                                      onChange={handleImageChange}
                                                               />
                                                        </div>
                                                 )
                                                 }
                                                 {questionType == 'audio' &&
                                                        (<div className="lg:w-[30%] sm:w-full">
                                                               <InputCustom
                                                                      type="text"
                                                                      source="upload"
                                                                      placeholder="Upload Audio"
                                                                      value={questionAudio}
                                                                      readonly={true}
                                                                      onClick={handleAudioClick}
                                                               />
                                                               <input
                                                                      ref={audioRef}
                                                                      type="file"
                                                                      className="hidden"
                                                                      onChange={handleAudioChange}
                                                               />
                                                        </div>)
                                                 }
                                                 <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                                                        <span className="text-2xl text-thirdColor font-medium">Active:</span>
                                                        <div>
                                                               <CheckBox handleClick={handleClick} />
                                                        </div>
                                                 </div>
                                          </div>
                                   )
                            }
                            {/* State 3 */}
                            {stateData === 3 &&
                                   (
                                          <div className="w-full flex flex-col justify-start gap-4">

                                                 <div className="sm:w-full xl:w-[30%]">
                                                        <DropDownMenu
                                                               ref={answerTypeRef}
                                                               handleOpen={handleOpenAnswerTypes}
                                                               handleOpenOption={handleAnswerTypes}
                                                               stateoption={answerTypeState}
                                                               openMenu={openAnswerTypes}
                                                               options={answerTypes || []}
                                                        />
                                                 </div>
                                                 <div className="w-full ml-3 my-4 flex items-center justify-start">
                                                        {answerType === 'T/F' && (
                                                               <>
                                                                      <div className="flex flex-col">
                                                                             <RadioCheck options={options} check={handleCheck} />
                                                                      </div>
                                                               </>
                                                        )}

                                                        {answerType == 'Mcq' && (
                                                               <>
                                                                      <div className="w-full">
                                                                             <RadioCheckGroup radioGroup={optionsGroup} check={handleSelectAnswer} allAnswer={handleAllAnswer} />

                                                                             <div className="w-2/12">
                                                                                    <ButtonAdd
                                                                                           Text={"Add More"}
                                                                                           isWidth={true}
                                                                                           BgColor={"white"}
                                                                                           Color={"mainColor"}
                                                                                           Size={"xl"}
                                                                                           handleClick={handleAddAnswer}
                                                                                    />
                                                                             </div>
                                                                      </div>
                                                               </>
                                                        )}
                                                        {answerType == 'Complete' && (
                                                               <div className='w-full flex flex-wrap items-center justify-start gap-4'>
                                                                      {answerComplete.map((answer, index) => (
                                                                             <div key={index} className="sm:w-full xl:w-[30%]">
                                                                                    <InputCustom
                                                                                           type="text"
                                                                                           placeholder="Answer"
                                                                                           value={answer || ''} // Set the current answer from the array
                                                                                           onChange={(e) => handleAnswerComplete(index, e.target.value)} // Pass index and value
                                                                                    />
                                                                             </div>
                                                                      ))}
                                                                      <div className="w-2/12">
                                                                             <ButtonAdd
                                                                                    Text={"Add More"}
                                                                                    isWidth={true}
                                                                                    BgColor={"white"}
                                                                                    Color={"mainColor"}
                                                                                    Size={"xl"}
                                                                                    handleClick={handleAddAnswerComplete}
                                                                             />
                                                                      </div>
                                                               </div>
                                                        )}
                                                        {answerType == 'Join' && (
                                                               'Join'
                                                        )}
                                                 </div>
                                          </div>
                                   )
                            }

                            <div className="w-full flex justify-between">
                                   {stateData === 1 &&
                                          (
                                                 <>
                                                        <div className="w-full text-end">
                                                               <Button Text="Next" handleClick={handleClickNext} />
                                                        </div>

                                                 </>
                                          )
                                   }
                                   {stateData === 2 &&
                                          (
                                                 <>
                                                        <div className="w-full flex items-center justify-between">
                                                               <Button Text="Prev" handleClick={handleClickPrev} />
                                                               <Button Text="Next" handleClick={handleClickNext} />
                                                        </div>
                                                 </>
                                          )
                                   }
                                   {stateData === 3 &&
                                          (
                                                 <>
                                                        <div className="mb-4 w-full flex items-center justify-between">
                                                               <Button Text="Prev" handleClick={handleClickPrev} />
                                                               <Button Text="Add" handleClick={handleQuestionAdd} />
                                                        </div>
                                                 </>
                                          )
                                   }


                            </div>
                            {/* .
                            <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-maintext-mainColor rounded-2xl">Add</button>
                            <button type="button" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-maintext-mainColor rounded-2xl">Cancle</button> */}
                     </form >
              </>
       )
}

export default AddQuestionPage