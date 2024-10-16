import React, { useState } from 'react'
import { useAuth } from '../../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import CheckBox from '../../../../Components/CheckBox';
import Loading from '../../../../Components/Loading';

const AddQuestionIssuesPage = () => {
       const auth = useAuth();
       const navigate = useNavigate();

       const [titleIssues, setTitleIssues] = useState('');
       const [descriptionIssues, setDescriptionIssues] = useState('');
       const [thumbnailIssues, setThumbnailIssues] = useState('');
       const [thumbnailIssuesFile, setThumbnailIssuesFile] = useState('');
       const [statusIssues, setStatusIssues] = useState('');

       const [isLoading, setIsLoading] = useState(false);

       const handleClick = (e) => {
              const isChecked = e.target.checked;
              setStatusIssues(isChecked ? 1 : 0);
       };

       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };

       const handleSubmit = async (e) => {
              e.preventDefault();

              if (!titleIssues) {
                     auth.toastError('Please Enter Question Issues.');
                     return;
              }
              setIsLoading(true);

              try {
                     const formData = new FormData();
                     formData.append('title', titleIssues);
                     formData.append('status', statusIssues);
                     // formData.append('description', descriptionIssues);
                     // formData.append('thumbnail', thumbnailIssuesFile);

                     const response = await axios.post('https://bdev.elmanhag.shop/admin/Settings/questionIssues/add', formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                                   'Content-Type': 'multipart/form-data',
                            },
                     });

                     if (response.status === 200) {
                            handleGoBack();
                            auth.toastSuccess("Question Issues Added Successfully!");
                     }
              } catch (error) {
                     auth.toastError(`Error: ${error}`);
              } finally {
                     setIsLoading(false);
              }
       };
       if (isLoading) {

              return (<div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                     <Loading />
              </div>)
       }

       return (
              <>
                     <form className="w-full flex flex-col items-center justify-center gap-y-8 mt-4" onSubmit={handleSubmit}>
                            <div className="w-full flex flex-wrap items-center justify-start gap-3">
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Question Issues"
                                                 value={titleIssues}
                                                 required={false}
                                                 onChange={(e) => setTitleIssues(e.target.value)}
                                          />
                                   </div>
                                   <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                                          <span className="text-2xl text-thirdColor font-medium">Active:</span>
                                          <div>
                                                 <CheckBox checked={statusIssues} handleClick={handleClick} />
                                          </div>
                                   </div>
                            </div>

                            {/* Buttons */}
                            <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                                   <div className="flex items-center justify-center w-72">
                                          <Button
                                                 type="submit"
                                                 Text="Add"
                                                 BgColor="bg-mainColor"
                                                 Color="text-white"
                                                 Width="full"
                                                 Size="text-2xl"
                                                 px="px-28"
                                                 rounded="rounded-2xl"
                                          />
                                   </div>
                                   <button type='button' onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                            </div>
                     </form>
              </>
       )
}

export default AddQuestionIssuesPage