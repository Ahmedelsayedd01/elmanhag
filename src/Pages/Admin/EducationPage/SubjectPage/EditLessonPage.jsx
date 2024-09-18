import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../Context/Auth';
import CheckBox from '../../../../Components/CheckBox';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import Loading from '../../../../Components/Loading';

const EditLessonPage = () => {
       const auth = useAuth()
       const navigate = useNavigate();
       const location = useLocation()
       const lessonId = location.state;

       const [lessonEditData, setLessonEditData] = useState(null);

       const [lessonNameEn, setLessonNameEn] = useState('');
       const [lessonNameAr, setLessonNameAr] = useState('');
       const [lessonOrder, setLessonOrder] = useState();
       const [lessonDescription, setLessonDescription] = useState('');

       const [lessonDripContent, setLessonDripContent] = useState();
       const [lessonFree, setLessonFree] = useState();
       const [lessonActive, setLessonActive] = useState();
       const [lessonMaterialsActive, setLessonMaterialsActive] = useState();

       const [isLoading, setIsLoading] = useState(false);

       const fetchEditLesson = async () => {
              try {

                     const response = await axios.get(`https://bdev.elmanhag.shop/admin/lesson/${lessonId}`, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            console.log('responsesss', response)
                            const data = response.data.lesson;
                            console.log('responsesssdata', response.data.lesson)
                            console.log('data', data)
                            setLessonEditData(data)
                            setLessonNameEn(data.name)
                            setLessonNameAr(data.name)
                            setLessonOrder(data.order)
                            setLessonDescription(data.description)
                            setLessonDripContent(data.drip_content)
                            setLessonFree(data.paid)
                            // { data.paid == 0 ? setLessonFree(1) : setLessonFree(0) }
                            setLessonActive(data.status)
                            setLessonMaterialsActive(data.switch)
                     }
              } catch (error) {

                     console.error('Error fetching lesson:', error);
              }
       }

       useEffect(() => {
              fetchEditLesson()
       }, [])


       const handleDripContentClick = (e) => {
              const isChecked = e.target.checked;

              setLessonDripContent(isChecked ? 1 : 0);
       };

       const handleFreeClick = (e) => {
              // const isChecked = e.target.checked;
              // console.log(isChecked)
              { lessonFree === 1 ? setLessonFree(0) : lessonFree === 0 ? setLessonFree(1) : null }
              console.log('lessonFreeAfter', lessonFree)
              // setLessonFree(isChecked ? 0 : 1);
              console.log('lessonFreeBefore', lessonFree)
       };
       useEffect(() => {

              console.log('lessonFreeeff', lessonFree)
       }, [lessonFree])

       // const handlePaidClick = (e) => {
       //        const isChecked = e.target.checked;
       //        setLessonPaid(isChecked ? 1 : 0);
       // };

       const handleActiveClick = (e) => {
              const isChecked = e.target.checked;
              setLessonActive(isChecked ? 1 : 0);
       };
       const handleMaterialsActiveClick = (e) => {
              const isChecked = e.target.checked;
              setLessonMaterialsActive(isChecked ? 1 : 0);
       };


       const handleSubmitEdit = async (e) => {
              e.preventDefault();
              setIsLoading(true);
              const updateLesson = {
                     'name': lessonNameEn,
                     'ar_name': lessonNameAr,
                     'description': lessonDescription,
                     'paid': lessonFree,
                     'status': lessonActive,
                     'order': parseInt(lessonOrder),
                     'drip_content': lessonDripContent,
                     'switch': lessonMaterialsActive,
              }
              try {

                     const response = await axios.put(`https://bdev.elmanhag.shop/admin/lesson/update/${lessonId}`, updateLesson, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            console.log('updateLesson', updateLesson)
                            console.log('responseSend', response)
                            auth.toastSuccess('Lesson Edited Successfully!');
                            handleGoBack()
                     } else {
                            auth.toastError('Failed to delete Material.');
                     }
              } catch (error) {
                     const errorMessages = error?.response?.data?.errors || {};
                     let errorMessageString = 'Error occurred';

                     if (errorMessages) {
                            errorMessageString = Object.values(errorMessages).flat().join(' ');
                     }
                     auth.toastError('Error', errorMessageString);
              } finally {
                     setIsLoading(false);
              }
       }


       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };

       if (!lessonEditData) {
              return (
                     <div className="w-1/4 flex items-start mt-[10%] justify-center h-full m-auto">
                            <Loading />
                     </div>
              );
       }



       return (
              <>
                     <form onSubmit={handleSubmitEdit} className="w-full flex flex-col items-center justify-center gap-y-8">
                            <div className="w-full flex flex-wrap items-center justify-start gap-4">
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Name En"
                                                 value={lessonNameEn}
                                                 onChange={(e) => setLessonNameEn(e.target.value)}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Name Ar"
                                                 value={lessonNameAr}
                                                 onChange={(e) => setLessonNameAr(e.target.value)}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="number"
                                                 paddinRight='pr-4'
                                                 placeholder="Lesson Order"
                                                 value={lessonOrder}
                                                 onChange={(e) => setLessonOrder(e.target.value)}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Lesson Description"
                                                 value={lessonDescription}
                                                 onChange={(e) => setLessonDescription(e.target.value)}
                                          />
                                   </div>
                            </div>

                            <div className="w-full">
                                   <div className="w-full flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
                                          <div className="flex items-center gap-x-4">
                                                 <span className="text-2xl text-thirdColor font-medium">Drip Content:</span>
                                                 <div>
                                                        <CheckBox
                                                               checked={lessonDripContent}
                                                               handleClick={handleDripContentClick}
                                                        />
                                                 </div>
                                          </div>
                                          <div className="flex items-center gap-x-4">
                                                 <span className="text-2xl text-thirdColor font-medium">Paid:</span>
                                                 <div>
                                                        <CheckBox
                                                               checked={lessonFree}
                                                               handleClick={handleFreeClick}
                                                        />
                                                 </div>
                                          </div>
                                          <div className="flex items-center gap-x-4">
                                                 <span className="text-2xl text-thirdColor font-medium">Active:</span>
                                                 <div>
                                                        <CheckBox
                                                               checked={lessonActive}
                                                               handleClick={handleActiveClick}
                                                        />
                                                 </div>
                                          </div>
                                          <div className="flex items-center gap-x-4">
                                                 <span className="text-2xl text-thirdColor font-medium">Materials Active:</span>
                                                 <div>
                                                        <CheckBox
                                                               checked={lessonMaterialsActive}
                                                               handleClick={handleMaterialsActiveClick}
                                                        />
                                                 </div>
                                          </div>
                                   </div>
                            </div>

                            {/* Buttons */}
                            <div className="w-full  flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                                   <div className="flex items-center justify-center w-72">
                                          <Button
                                                 type="submit"
                                                 Text="Edit"
                                                 BgColor="bg-mainColor"
                                                 Color="text-white"
                                                 Width="full"
                                                 Size="text-2xl"
                                                 px="px-28"
                                                 handleClick={handleSubmitEdit}
                                                 rounded="rounded-2xl"
                                                 stateLoding={isLoading}
                                          />
                                   </div>
                                   <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                            </div>
                            {/* </div> */}
                     </form >
              </>
       )
}

export default EditLessonPage