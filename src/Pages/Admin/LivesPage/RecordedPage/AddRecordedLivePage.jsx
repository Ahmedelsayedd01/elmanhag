import React, { useRef, useState, useEffect } from 'react';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBox from '../../../../Components/CheckBox';
import Loading from '../../../../Components/Loading';
import HeaderPageSection from '../../../../Components/HeaderPageSection';

const AddRecordedLivePage = () => {
       const auth = useAuth();
       const navigate = useNavigate();
       const [isLoading, setIsLoading] = useState(false);

       const [data, setData] = useState(null);

       const [semesterData, setSemesterData] = useState([{ name: 'first' }, { name: 'second' }]);
       const [educationData, setEducationData] = useState([]);
       const [categoryData, setCategoryData] = useState([]);
       const [chapterData, setChapterData] = useState([]);
       const [lessonData, setLessonData] = useState([]);
       const [subjectData, setSubjectData] = useState([]);

       const [educations, setEducations] = useState([]);
       const [categories, setCategories] = useState([]);
       const [chapters, setChapters] = useState([]);
       const [lessons, setLessons] = useState([]);
       const [subjects, setSubjects] = useState([]);


       const [paidData, setPaidData] = useState([{ name: 'Free' }, { name: 'Paid' }]);


       const [name, setName] = useState('');
       const [description, setDescription] = useState('');


       const [educationState, setEducationState] = useState('Select Education');
       const [semesterState, setSemesterState] = useState('Select Semester');
       const [categoryState, setCategoryState] = useState('Select Category');
       const [subjectState, setSubjectState] = useState('Select Subject');
       const [chapterState, setChapterState] = useState('Select Chapter');
       const [lessonState, setLessonState] = useState('Select Lesson');


       const [selectEducationName, setSelectEducationName] = useState('');
       const [selectEducationId, setSelectEducationId] = useState('');
       const [openSelectEducation, setOpenSelectEducation] = useState(false);

       const [selectSemesterName, setSelectSemesterName] = useState('');
       const [openSelectSemester, setOpenSelectSemester] = useState(false);

       const [selectCategoryName, setSelectCategoryName] = useState('');
       const [selectCategoryId, setSelectCategoryId] = useState('');
       const [openSelectCategory, setOpenSelectCategory] = useState(false);

       const [selectChapterName, setSelectChapterName] = useState('');
       const [selectChapterId, setSelectChapterId] = useState('');
       const [openSelectChapter, setOpenSelectChapter] = useState(false);

       const [selectLessonName, setSelectLessonName] = useState('');
       const [selectLessonId, setSelectLessonId] = useState('');
       const [openSelectLesson, setOpenSelectLesson] = useState(false);

       const [selectSubjectName, setSelectSubjectName] = useState('');
       const [selectSubjectId, setSelectSubjectId] = useState('');
       const [openSelectSubject, setOpenSelectSubject] = useState(false);

       const [LiveVideoRecorded, setLiveVideoRecorded] = useState('');
       const [LiveVideoRecordedFile, setLiveVideoRecordedFile] = useState(null);


       const [selectStatus, setSelectStatus] = useState('Free');
       const [openSelectStatus, setOpenSelectStatus] = useState(false);

       const [liveRecordedStatus, setLiveRecordedStatus] = useState(0);

       const liveVideoRecordedRef = useRef();
       const dropdownEducationRef = useRef();
       const dropdownSemesterRef = useRef();
       const dropdownCategoryRef = useRef();
       const dropdownChapterRef = useRef();
       const dropdownLessonRef = useRef();
       const dropdownSubjectRef = useRef();
       const dropdownStatusRef = useRef();


       useEffect(() => {
              const fetchRecordedLives = async () => {
                     setIsLoading(true);
                     try {
                            const response = await axios.get(
                                   "https://bdev.elmanhag.shop/admin/live",
                                   {
                                          headers: {
                                                 Authorization: `Bearer ${auth.user.token}`,
                                          },
                                   }
                            );
                            if (response.status === 200) {
                                   console.log('All Live', response.data);
                                   setData(response.data.live);
                                   setEducationData([
                                          ...response.data.education,
                                          { id: 'notfound', name: 'Together' } // Or use some unique key generator
                                   ]);

                                   setCategoryData(response.data.category);
                                   setSubjectData(response.data.subjects);
                                   setChapterData(response.data.chapters);
                                   setLessonData(response.data.lessons);
                            }
                     } catch (error) {
                            console.error("Error fetching Lives data:", error);
                     } finally {
                            setIsLoading(false);
                     }
              };
              fetchRecordedLives(); // Fetch lives initially and whenever livesChanged changes
       }, []); // Add livesChanged or any other necessary dependency


       const handleOpenSelectEducation = () => {
              setOpenSelectEducation(!openSelectEducation)
              setOpenSelectCategory(false)
              setOpenSelectSemester(false)
              setOpenSelectChapter(false)
              setOpenSelectLesson(false)
              setOpenSelectSubject(false);
              setOpenSelectStatus(false);
       };

       const handleOpenSelectSemester = () => {
              setOpenSelectSemester(!openSelectSemester);
              setOpenSelectCategory(false)
              setOpenSelectEducation(false)
              setOpenSelectChapter(false)
              setOpenSelectLesson(false)
              setOpenSelectSubject(false);
              setOpenSelectStatus(false);
       };

       const handleOpenSelectCategory = () => {
              setOpenSelectCategory(!openSelectCategory)
              setOpenSelectEducation(false)
              setOpenSelectSemester(false)
              setOpenSelectChapter(false)
              setOpenSelectLesson(false)
              setOpenSelectSubject(false);
              setOpenSelectStatus(false);
       };
       const handleOpenSelectChapter = () => {
              setOpenSelectChapter(!openSelectChapter);
              setOpenSelectEducation(false)
              setOpenSelectSemester(false)
              setOpenSelectCategory(false)
              setOpenSelectLesson(false);
              setOpenSelectSubject(false);
              setOpenSelectStatus(false);
       };
       const handleOpenSelectLesson = () => {
              setOpenSelectLesson(!openSelectLesson)
              setOpenSelectCategory(false)
              setOpenSelectEducation(false)
              setOpenSelectSemester(false)
              setOpenSelectChapter(false)
              setOpenSelectSubject(false);
              setOpenSelectStatus(false);
       };

       const handleOpenSelectSubject = () => {
              setOpenSelectSubject(!openSelectSubject);
              setOpenSelectEducation(false)
              setOpenSelectSemester(false)
              setOpenSelectCategory(false);
              setOpenSelectChapter(false)
              setOpenSelectLesson(false)
              setOpenSelectStatus(false);
       };

       const handleOpenSelectStatus = () => {
              setOpenSelectStatus(!openSelectStatus);
              setOpenSelectEducation(false)
              setOpenSelectSemester(false)
              setOpenSelectCategory(false)
              setOpenSelectChapter(false)
              setOpenSelectLesson(false)
              setOpenSelectSubject(false)
       };

       // const filterSubjects = (educationId, semesterName, categoryId) => {
       //        //Reset state
       //        setSelectSubject('Select Subject');
       //        setSelectSubjectId('');
       //        setSubjectData([]);

       //        let filteredSubjects = subjects; // Start with all subjects

       //        console.log(filteredSubjects);

       //        // If both semesterName and categoryId are empty, filter only by educationId
       //        if (!semesterName && !categoryId) {
       //               if (educationId !== 'notfound') {
       //                      filteredSubjects = filteredSubjects.filter(subject =>
       //                             subject.education_id === parseInt(educationId)
       //                      );
       //               } else {
       //                      filteredSubjects = filteredSubjects.filter(subject =>
       //                             subject.education_id === null || subject.education_id === undefined
       //                      );
       //               }
       //        }

       //        else if (semesterName && !categoryId) {
       //               if (educationId) {
       //                      if (educationId !== 'notfound') {
       //                             filteredSubjects = filteredSubjects.filter(subject =>
       //                                    subject.semester.toLowerCase() === semesterName.toLowerCase() &&
       //                                    subject.education_id === parseInt(educationId)
       //                             );
       //                      } else {
       //                             filteredSubjects = filteredSubjects.filter(subject =>
       //                                    subject.semester.toLowerCase() === semesterName.toLowerCase() &&
       //                                    subject.education_id === null || subject.education_id === undefined
       //                             );
       //                      }
       //               }
       //               else {
       //                      filteredSubjects = filteredSubjects.filter(subject =>
       //                             subject.semester.toLowerCase() === semesterName.toLowerCase()
       //                      )
       //               }
       //        }


       //        else if (!semesterName && categoryId) {
       //               if (educationId) {
       //                      if (educationId !== 'notfound') {
       //                             filteredSubjects = filteredSubjects.filter(subject =>
       //                                    subject.category_id === categoryId &&
       //                                    subject.education_id === parseInt(educationId)
       //                             );
       //                      } else {
       //                             filteredSubjects = filteredSubjects.filter(subject =>
       //                                    subject.category_id === categoryId &&
       //                                    subject.education_id === null || subject.education_id === undefined
       //                             );
       //                      }
       //               }
       //               else {
       //                      filteredSubjects = filteredSubjects.filter(subject =>
       //                             subject.category_id === categoryId
       //                      )
       //               }
       //        }

       //        else if (semesterName && categoryId) {
       //               if (educationId) {
       //                      if (educationId !== 'notfound') {
       //                             filteredSubjects = filteredSubjects.filter(subject =>
       //                                    subject.semester.toLowerCase() === semesterName.toLowerCase() &&
       //                                    subject.category_id === categoryId &&
       //                                    subject.education_id === parseInt(educationId)
       //                             );
       //                      } else {
       //                             filteredSubjects = filteredSubjects.filter(subject =>
       //                                    subject.semester.toLowerCase() === semesterName.toLowerCase() &&
       //                                    subject.category_id === categoryId &&
       //                                    subject.education_id === null || subject.education_id === undefined
       //                             );
       //                      }
       //               }
       //               else {
       //                      filteredSubjects = filteredSubjects.filter(subject =>
       //                             subject.semester.toLowerCase() === semesterName.toLowerCase() &&
       //                             subject.category_id === categoryId
       //                      )
       //               }
       //        }

       //        //Check if no subjects match the filters
       //        if (filteredSubjects.length === 0) {
       //               setSubjectData([{ id: 'Not Found', name: 'Not Found' }]);
       //        } else {
       //               setSelectSubject(filteredSubjects.length >= 1 ? 'Select Subject' : filteredSubjects[0].name);
       //               setSelectSubjectId(filteredSubjects.length >= 1 ? [] : filteredSubjects[0].id);
       //               setSubjectData(filteredSubjects);
       //        }

       //        console.log('semesterName:', semesterName);
       //        console.log('categoryId:', categoryId);
       //        console.log('educationId:', educationId);
       //        console.log('selectSubjectId:', selectSubjectId);

       //        // Debugging logs
       //        console.log('filteredSubjects:', filteredSubjects);
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

              setEducationState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setSelectEducationName(selectedOptionName); // Set selected education name
              setOpenSelectEducation(false); // Close the select dropdown

              // Filter subjects based on the selected education, semester, and category

              // filterSubjects(selectedOptionValue, selectSemesterName, selectCategoryId);
       };


       const handleSemester = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setSemesterState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setSelectSemesterName(selectedOptionName);
              setOpenSelectSemester(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleCategory = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

              const subjectsData = subjectData.filter((subject) => subject.category_id == selectedOptionValue)

              setSubjects(subjectsData)
              console.log('subjectsData', subjectsData)

              setCategoryState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setSelectCategoryName(selectedOptionName);
              setSelectCategoryId(parseInt(selectedOptionValue));
              setOpenSelectCategory(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleSubject = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

              const chaptersData = chapterData.filter((chapter) => chapter.subject_id == selectedOptionValue)

              setChapters(chaptersData)
              console.log('chaptersData', chaptersData)

              setSubjectState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setSubjectState(selectedOptionName);
              setSelectSubjectId(parseInt(selectedOptionValue));
              setOpenSelectSubject(false);



              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleChapter = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

              const lessonsData = lessonData.filter((lesson) => lesson.chapter_id == selectedOptionValue)

              setLessons(lessonsData)
              console.log('lessonsData', lessonsData)

              setChapterState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setSelectChapterName(selectedOptionName);
              setSelectChapterId(parseInt(selectedOptionValue));
              setOpenSelectChapter(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleLesson = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setLessonState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setSelectLessonName(selectedOptionName);
              setSelectLessonId(parseInt(selectedOptionValue));
              setOpenSelectLesson(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
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

       const handleLiveRecordedStatus = (e) => {
              const isChecked = e.target.checked;
              setLiveRecordedStatus(isChecked ? 1 : 0);
       };

       const handleInputClick = (ref) => {
              if (ref.current) {
                     ref.current.click();
              }
       };

       const handleLiveVideoRecordedFileChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setLiveVideoRecordedFile(file);
                     setLiveVideoRecorded(file.name);
              }
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
                     dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target)
              ) {
                     setOpenSelectEducation(false);
                     setOpenSelectSemester(false);
                     setOpenSelectCategory(false);
                     setOpenSelectSubject(false);
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
              if (!description) {
                     auth.toastError('Please Enter Description.');
                     return;
              }
              if (!LiveVideoRecordedFile) {
                     auth.toastError('Please Enter The Video.');
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

              setIsLoading(true);
              try {
                     const formData = new FormData();
                     formData.append('name', name);
                     formData.append('description', description);
                     formData.append('semester', selectSemesterName);
                     formData.append('video', LiveVideoRecordedFile);
                     formData.append('category_id', selectCategoryId);
                     formData.append('chapter_id', selectChapterId);
                     formData.append('lesson_id', selectLessonId);
                     formData.append('subject_id', selectSubjectId);
                     formData.append('paid', selectStatus === 'Paid' ? 1 : 0);
                     formData.append('active', liveRecordedStatus);

                     // // Handle education_id appropriately
                     // formData.append('education_id', selectEducationId === 'notfound' ? ' ' : selectEducationId);

                     const response = await axios.post(' https://bdev.elmanhag.shop/admin/recordedLive/add', formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            auth.toastSuccess('Recorded Live added successfully!');
                            handleGoBack();
                     } else {
                            auth.toastError('Failed to add Recorded Live.');
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
                     <HeaderPageSection handleClick={handleGoBack} name="Add Recorded Live" />
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
                                                        placeholder="Description"
                                                        value={description}
                                                        required={false}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <InputCustom
                                                        type="text"
                                                        upload={true}
                                                        paddinRight='pr-2'
                                                        placeholder="Live Video"
                                                        value={LiveVideoRecorded}
                                                        readonly={true}
                                                        onClick={() => handleInputClick(liveVideoRecordedRef)}
                                                 />
                                                 <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={handleLiveVideoRecordedFileChange}
                                                        ref={liveVideoRecordedRef}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={dropdownEducationRef}
                                                        handleOpen={handleOpenSelectEducation}
                                                        handleOpenOption={handleSelectEducation}
                                                        stateoption={educationState}
                                                        openMenu={openSelectEducation}
                                                        options={educationData || []}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={dropdownSemesterRef}
                                                        handleOpen={handleOpenSelectSemester}
                                                        handleOpenOption={handleSemester}
                                                        stateoption={semesterData.length > 0 ? semesterState : "No Semesters Available"}
                                                        openMenu={openSelectSemester}
                                                        options={semesterData || []}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={dropdownCategoryRef}
                                                        handleOpen={handleOpenSelectCategory}
                                                        handleOpenOption={handleCategory}
                                                        stateoption={categoryData.length > 0 ? categoryState : "No categories Available"}
                                                        openMenu={openSelectCategory}
                                                        options={categoryData || []}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={dropdownSubjectRef}
                                                        handleOpen={handleOpenSelectSubject}
                                                        handleOpenOption={handleSubject}
                                                        stateoption={subjects.length > 0 ? subjectState : "No Subjects Available"}
                                                        openMenu={openSelectSubject}
                                                        options={subjects || []}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={dropdownChapterRef}
                                                        handleOpen={handleOpenSelectChapter}
                                                        handleOpenOption={handleChapter}
                                                        stateoption={chapters.length > 0 ? chapterState : "No Chapters Available"}
                                                        openMenu={openSelectChapter}
                                                        options={chapters || []}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={dropdownLessonRef}
                                                        handleOpen={handleOpenSelectLesson}
                                                        handleOpenOption={handleLesson}
                                                        stateoption={lessons.length > 0 ? lessonState : "No Lessons Available"}
                                                        openMenu={openSelectLesson}
                                                        options={lessons || []}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={dropdownStatusRef}
                                                        handleOpen={handleOpenSelectStatus}
                                                        handleOpenOption={handleSelectStatus}
                                                        stateoption={paidData.length > 0 ? selectStatus : "No Paid Available"}
                                                        openMenu={openSelectStatus}
                                                        options={paidData || []}
                                                 />
                                          </div>

                                          <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                                                 <span className="text-2xl text-thirdColor font-medium">Active:</span>
                                                 <div>
                                                        <CheckBox checked={liveRecordedStatus} handleClick={handleLiveRecordedStatus} />
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

export default AddRecordedLivePage

