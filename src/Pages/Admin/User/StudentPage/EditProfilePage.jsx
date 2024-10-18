import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../../../Components/Button';

const EditProfilePage = () => {
       const { profileStudentId } = useParams()

       const [tap, setTap] = useState('profile');
       const [stateTap, setStateTap] = useState(1);


       const handleClickPrev = () => {
              setStateTap(stateTap - 1)
       };
       const handleClickNext = () => {
              setStateTap(stateTap + 1)
       };


       const handleQuestionAdd = async (e) => {
              e.preventDefault();

              // Validate answerType
              if (!answerType) {
                     auth.toastError('Please Select Answer Type.');
                     return;
              }


              setIsLoading(true);

              const formData = new FormData();

              // Question Info
              // formData.append('semester', semester);
              // formData.append('category_id', categoryId);
              // formData.append('subject_id', subjectId);
              // formData.append('chapter_id', chapterId);
              // formData.append('lesson_id', lessonId);


              try {
                     const response = await axios.post('https://bdev.elmanhag.shop/admin/question/add', formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                                   'Content-Type': 'multipart/form-data',
                            },
                     });

                     if (response.status === 200) {
                            console.log('Response:', response);
                            auth.toastSuccess('Question added successfully!');
                            handleGoBack();
                     } else {
                            auth.toastError('Failed to add Question.');
                     }
              } catch (error) {
                     const errorMessages = error?.response?.data.errors;
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
                     <form onSubmit={handleQuestionAdd} className="w-full flex flex-col items-start justify-center gap-4">
                            <div className="w-full flex flex-wrap items-center justify-center mt-4">
                                   <div className="sm:w-full xl:w-1/3 flex items-center justify-center ">
                                          <span className={`${stateTap === 1 ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor '} text-3xl font-semibold py-1`}>
                                                 Profile
                                          </span>
                                   </div>
                                   <div className="sm:w-full xl:w-1/3 flex items-center justify-center ">
                                          <span className={`${stateTap === 2 ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor '} text-3xl font-semibold py-1`}>
                                                 Parent
                                          </span>
                                   </div>
                                   {/* <div className="sm:w-full xl:w-1/3 flex items-center justify-center">
                                          <span className={`${stateData === 3 ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor '} text-3xl font-semibold py-1`}>
                                                 Answers
                                          </span>
                                   </div> */}
                            </div>
                            {/* State 1 */}
                            {stateTap === 1 &&
                                   (
                                          // <div className="w-full flex flex-wrap justify-start gap-4">

                                          //        <div className="sm:w-full xl:w-[30%]">
                                          //               <DropDownMenu
                                          //                      ref={semesterRef}
                                          //                      handleOpen={handleOpenSemester}
                                          //                      handleOpenOption={handleSemester}
                                          //                      stateoption={semesterState}
                                          //                      openMenu={openSemester}
                                          //                      options={semesters || []}
                                          //               />
                                          //        </div>
                                          //        <div className="sm:w-full xl:w-[30%]">
                                          //               <DropDownMenu
                                          //                      ref={categoryRef}
                                          //                      handleOpen={handleOpenCategory}
                                          //                      handleOpenOption={handleCategory}
                                          //                      stateoption={categoryState}
                                          //                      openMenu={openCategory}
                                          //                      options={categories || []}
                                          //               />
                                          //        </div>
                                          //        <div className="sm:w-full xl:w-[30%]">
                                          //               <DropDownMenu
                                          //                      ref={subjectRef}
                                          //                      handleOpen={handleOpenSubject}
                                          //                      handleOpenOption={handleSubject}
                                          //                      stateoption={subjects.length > 0 ? subjectState : "No Subjects Available"}
                                          //                      openMenu={openSubject}
                                          //                      options={subjects || []}
                                          //               />
                                          //        </div>
                                          //        <div className="sm:w-full xl:w-[30%]">
                                          //               <DropDownMenu
                                          //                      ref={chapterRef}
                                          //                      handleOpen={handleOpenChapter}
                                          //                      handleOpenOption={handleChapter}
                                          //                      stateoption={chapters.length > 0 ? chapterState : "No Chapters Available"}
                                          //                      openMenu={openChapter}
                                          //                      options={chapters || []}
                                          //               />
                                          //        </div>
                                          //        <div className="sm:w-full xl:w-[30%]">
                                          //               <DropDownMenu
                                          //                      ref={lessonRef}
                                          //                      handleOpen={handleOpenLesson}
                                          //                      handleOpenOption={handleLesson}
                                          //                      stateoption={lessons.length > 0 ? lessonState : "No Lessons Available"}
                                          //                      openMenu={openLesson}
                                          //                      options={lessons || []}
                                          //               />
                                          //        </div>
                                          // </div>
                                          profileStudentId
                                   )
                            }

                            <div className="w-full flex justify-between">
                                   {stateTap === 1 &&
                                          (
                                                 <>
                                                        <div className="w-full text-end">
                                                               <Button Text="Next" handleClick={handleClickNext} />
                                                        </div>

                                                 </>
                                          )
                                   }
                                   {stateTap === 2 &&
                                          (
                                                 <>
                                                        <div className="w-full flex items-center justify-between">
                                                               <Button Text="Prev" handleClick={handleClickPrev} />
                                                               <Button Text="Edit" handleClick={handleQuestionAdd} />
                                                               {/* <Button Text="Next" handleClick={handleClickNext} /> */}
                                                        </div>
                                                 </>
                                          )
                                   }


                            </div>
                            {/* .
                            <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-maintext-mainColor rounded-2xl">Add</button>
                            <button type="button" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-maintext-mainColor rounded-2xl">Cancle</button> */}
                     </form>
              </>
       )
}

export default EditProfilePage