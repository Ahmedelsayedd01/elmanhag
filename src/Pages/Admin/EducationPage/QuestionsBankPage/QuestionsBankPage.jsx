import React, { useEffect, useRef, useState } from 'react'
import DropDownMenu from '../../../../Components/DropDownMenu'
import axios from 'axios';
import { useAuth } from '../../../../Context/Auth';
import Loading from '../../../../Components/Loading';
import { ButtonAdd } from '../../../../Components/Button';
import { Link } from 'react-router-dom';
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import { Wroning } from '../../../../Components/Icons/All_Icons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const QuestionsBankPage = () => {
       const dropdownSemesterRef = useRef();
       const auth = useAuth();
       const [questions, setQuestions] = useState(null);
       const [semesters, setSemesters] = useState(null);
       const [selectedOptionSemester, setSelectedOptionSemester] = useState('Filter By Semester');
       const [openSemester, setOpenSemester] = useState(false);

       const [questionsChanged, setQuestionsChanged] = useState(false);
       const [isDeleting, setIsDeleting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);

       const [isLoading, setIsLoading] = useState(false);

       const fetchQuestions = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get('https://bcknd.elmanhag.com/admin/question', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setQuestions(response.data.questions);
                            console.log('response', response)
                     }
              } catch (error) {
                     console.error('Error fetching questions data:', error);
              } finally {
                     setIsLoading(false);
              }
       };

       useEffect(() => {
              fetchQuestions();
       }, [questionsChanged]);



       const handleOpenSemester = () => {
              setOpenSemester(!openSemester);
       };
       const handleOptionSemester = (e) => {
              setSelectedOptionSemester(e.target.innerText);
              setOpenSemester(false);
       };


       const handleOpenDialog = (questionId) => {
              setOpenDialog(questionId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleClickOutside = (event) => {
              if (
                     (dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target))
              ) {
                     setOpenSemester(false);
              }
       };
       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const handleDelete = async (questionId, questionName) => {
              setIsDeleting(true);
              const success = await deleteQuestion(questionId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess(`question ${questionName} deleted successfully!`);
                     setQuestionsChanged(!questionsChanged)
              } else {
                     auth.toastSuccess(`Failed to delete question ${questionName}.`);
              }
       };

       const deleteQuestion = async (questionId, authToken) => {
              try {
                     const response = await axios.delete(`https://bcknd.elmanhag.com/admin/question/delete/${questionId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('question deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to delete question:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting question:', error);
                     return false;
              }
       };

       if (isLoading) {
              return (
                     <div className="w-1/4 flex items-start mt-[10%] justify-center h-full m-auto">
                            <Loading />
                     </div>
              );
       }

       if (!questions) {
              return (
                     <>
                            <div className='text-mainColor text-2xl font-bold w-full h-full flex flex-col gap-y-3 items-center mt-52'>
                                   <span>No Questions data available</span>
                                   <Link to="add">
                                          <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} Size={"xl"} />
                                   </Link>
                            </div>
                     </>
              )

       }
       return (
              <>
                     {/* <div>
                            <div className="w-full flex flex-wrap items-center gap-4">
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownSemesterRef}
                                                 handleOpen={handleOptionSemester}
                                                 handleOpenOption={handleOptionSemester}
                                                 stateoption={selectedOptionSemester}
                                                 openMenu={openSemester}
                                                 options={semesters || []}
                                          />
                                   </div>
                            </div>
                            <div className="">
                                   
                            </div>
                     </div> */}
                     <div className="w-full">
                            <div className="w-full flex flex-wrap items-center justify-start gap-4">
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownSemesterRef}
                                                 handleOpen={handleOpenSemester}
                                                 handleOpenOption={handleOptionSemester}
                                                 stateoption={selectedOptionSemester}
                                                 openMenu={openSemester}
                                                 options={semesters || []}
                                          />
                                   </div>
                                   {/* <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownCategoryRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenCategory}
                                                 handleOpenOption={handleOptionCategory}
                                                 stateoption={selectedOptionCategory}
                                                 openMenu={openCategory}
                                                 options={subject.category || []}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownStatusRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenStatus}
                                                 handleOpenOption={handleOptionStatus}
                                                 stateoption={selectedOptionStatus}
                                                 openMenu={openStatus}
                                                 options={subject.status || []}
                                          />
                                   </div> */}

                                   <div className="sm:w-full xl:w-1/12 xl:text-left">
                                          <Link to="add">
                                                 <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} Size={"xl"} />
                                          </Link>
                                   </div>
                            </div>
                            <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                                   <table className="table-auto w-full sm:min-w-0">
                                          <thead>
                                                 <tr className="w-full border-b-2">
                                                        {['#', 'Question', 'Type', 'Semester', 'Category', 'Subject', 'Chapter', 'Lesson', 'Difficulty', 'Status', 'Action'].map((heading, index) => (
                                                               <th key={index} className="min-w-[80px] sm:w-auto text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">
                                                                      {heading}
                                                               </th>
                                                        ))}
                                                 </tr>
                                          </thead>
                                          <tbody>
                                                 {questions.map((question, index) => (
                                                        <tr className="w-full border-b-2" key={question.id}>
                                                               <td className="min-w-[80px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      {index + 1}
                                                               </td>
                                                               <td className="min-w-[150px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      <span className="text-mainColor border-b-2 border-mainColor font-semibold">
                                                                             <Link to={`question/${question.id}`} state={question.id}>View</Link>
                                                                      </span>
                                                               </td>
                                                               <td className="min-w-[120px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      {question?.question_type || '-'}
                                                               </td>
                                                               <td className="min-w-[120px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      {question?.semester || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      {question.category?.name || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      {question.subject?.name || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      {question.chapter?.name || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      {question.lesson?.name || '-'}
                                                               </td>
                                                               <td className="min-w-[150px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      {question?.difficulty || '-'}
                                                               </td>
                                                               <td className="min-w-[120px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      {question?.status == 1 ? (
                                                                             <span className="bg-green-500 px-4 py-2 rounded-xl text-white">Active</span>
                                                                      ) : (
                                                                             <span className="bg-mainColor px-4 py-2 rounded-xl text-white">Disabled</span>
                                                                      )}
                                                               </td>
                                                               <td className="min-w-[100px] py-2 text-center text-thirdColor text-xs sm:text-sm lg:text-base overflow-hidden">
                                                                      <div className="flex items-center justify-center gap-x-3">
                                                                             <Link to={`edit/${question.id}`} state={question.id}>
                                                                                    <EditIcon />
                                                                             </Link>
                                                                             <button type="button" onClick={() => handleOpenDialog(question.id)}>
                                                                                    <DeleteIcon />
                                                                             </button>
                                                                             {/* {openDialog === question.id && (
                                                                                    <Dialog open={true} onClose={handleCloseDialog}>
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 flex items-center justify-center">
                                                                                                  <DialogPanel className="bg-white rounded-lg shadow-xl sm:w-full sm:max-w-lg">
                                                                                                         <div className="px-4 py-5 sm:p-6">
                                                                                                                <Wroning Width="28" Height="28" aria-hidden="true" />
                                                                                                                <h3 className="text-lg text-center font-semibold text-gray-900">You will delete this question</h3>
                                                                                                         </div>
                                                                                                         <div className="px-4 py-3 sm:flex sm:flex-row-reverse">
                                                                                                                <button
                                                                                                                       type="button"
                                                                                                                       onClick={() => handleDelete(question.id)}
                                                                                                                       disabled={isDeleting}
                                                                                                                       className="w-full bg-mainColor px-6 py-3 text-sm font-semibold text-white rounded-md sm:w-auto"
                                                                                                                >
                                                                                                                       {isDeleting ? <Loading /> : 'Delete'}
                                                                                                                </button>
                                                                                                                <button
                                                                                                                       type="button"
                                                                                                                       onClick={handleCloseDialog}
                                                                                                                       className="mt-3 w-full bg-white px-6 py-3 text-sm font-medium text-gray-900 sm:mt-0 sm:w-auto"
                                                                                                                >
                                                                                                                       Cancel
                                                                                                                </button>
                                                                                                         </div>
                                                                                                  </DialogPanel>
                                                                                           </div>
                                                                                    </Dialog>
                                                                             )} */}
                                                                             {openDialog === question.id && (
                                                                                    <Dialog open={true} onClose={handleCloseDialog} className="relative z-10">
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                         <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                                                                <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                                                       <Wroning Width='28' Height='28' aria-hidden="true" />
                                                                                                                       <div className="flex items-center">
                                                                                                                              <div className="mt-2 text-center">
                                                                                                                                     <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                                                                                                                            You will delete  {`question ${question?.subject?.name}` || "this question"}
                                                                                                                                     </DialogTitle>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              data-autofocus
                                                                                                                              onClick={handleCloseDialog}
                                                                                                                              className=" rounded-md bg-white px-6 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                                                                                                       >
                                                                                                                              Cancel
                                                                                                                       </button>
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={() => handleDelete(question.id, question?.subject?.name)}
                                                                                                                              disabled={isDeleting}
                                                                                                                              className="w-24 bg-red-500 text-white text-sm font-medium px-6 py-3 rounded-lg mr-3 flex items-center justify-center"
                                                                                                                       >
                                                                                                                              {isDeleting ? <div className='w-6'><Loading /></div> : 'Delete'}
                                                                                                                       </button>
                                                                                                                </div>
                                                                                                         </DialogPanel>
                                                                                                  </div>
                                                                                           </div>
                                                                                    </Dialog>
                                                                             )}
                                                                      </div>
                                                               </td>
                                                        </tr>
                                                 ))}
                                          </tbody>
                                   </table>
                            </div>

                     </div>

              </>
       )
}

export default QuestionsBankPage