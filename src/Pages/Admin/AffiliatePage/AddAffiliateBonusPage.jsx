import React, { useRef, useState } from 'react'
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddAffiliateBonusPage = () => {
       const imageRef = useRef()
       const auth = useAuth()
       const navigate = useNavigate()

       const [bonusTitle, setBonusTitle] = useState('')
       const [bonusTarget, setBonusTarget] = useState('');
       const [bonus, setBonus] = useState('')
       const [bonusImageFile, setBonusImageFile] = useState(' ');
       const [bonusImage, setBonusImage] = useState('');
       const [isLoading, setIsLoading] = useState(false);


       const handleImageClick = () => {
              if (imageRef.current) {
                     imageRef.current.click(); // Trigger a click on the hidden file input
              }
       };

       // const handleImageChange = (e) => {
       //        const file = e.target.files[0];
       //        if (file) {
       //               setBonusImageFile(file); // Set file object for upload
       //               setBonusImage(file.name); // Display file name in the text input
       //        }
       // };
       const handleImageChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setBonusImageFile(file); // Set file object for upload
                     setBonusImage(URL.createObjectURL(file)); // Display image preview
              }
       };

       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       const handleBonusAdd = async (e) => {
              e.preventDefault(); // Fixed typo

              if (!bonusTitle) {
                     auth.toastError('Please Enter Bonus Title.');
                     return;
              }
              if (!bonusTarget) {
                     auth.toastError('Please Enter Bonus Target.');
                     return;
              }
              if (!bonus) {
                     auth.toastError('Please Enter Bonus.');
                     return;
              }

              setIsLoading(true);
              try {
                     const formData = new FormData();
                     formData.append('title', bonusTitle);
                     formData.append('target', bonusTarget);
                     formData.append('bonus', bonus);
                     formData.append('image', bonusImageFile);

                     const response = await axios.post('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/affilate/bonus/add', formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                                   'Content-Type': 'multipart/form-data',
                            },
                     });

                     if (response.status === 200) {
                            auth.toastSuccess('Bonus added successfully!');
                            console.log('response', response)
                            handleGoBack();
                     } else {
                            auth.toastError('Failed to add Bonus.');
                     }
              } catch (error) {
                     console.error('error', error);
              } finally {
                     setIsLoading(false);
              }
       };


       return (
              <form onSubmit={handleBonusAdd} className="w-full flex flex-col items-start justify-center gap-4 mb-4">
                     <div className="w-full flex flex-wrap items-center justify-start mt-4 gap-4">
                            <div className="sm:w-full xl:w-[30%]">
                                   <InputCustom type={"text"} required={false} placeholder={"Bonus Title"} value={bonusTitle} onChange={(e) => setBonusTitle(e.target.value)} />
                            </div>
                            <div className="sm:w-full xl:w-[30%]">
                                   <InputCustom type={"number"} paddinRight='pr-2' required={false} placeholder={"Bonus Target"} value={bonusTarget} onChange={(e) => setBonusTarget(e.target.value)} />
                            </div>
                            <div className="sm:w-full xl:w-[30%]">
                                   <InputCustom type={"text"} required={false} placeholder={"Bonus"} value={bonus} onChange={(e) => setBonus(e.target.value)} />
                            </div>
                            <div className="lg:w-[30%] sm:w-full">
                                   <InputCustom
                                          type="text"
                                          source="upload"
                                          required={false}
                                          placeholder="Upload Image"
                                          value={bonusImage}
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

                     </div>
                     <div className="text-center sm:w-full">
                            {bonusImage && <img src={bonusImage} alt="Bonus Preview" className="w-auto h-auto rounded-2xl object-cover object-center" />}
                     </div>
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
                                          stateLoding={isLoading}
                                   />
                            </div>
                            <button type='button' onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                     </div>
              </form>
       )
}

export default AddAffiliateBonusPage