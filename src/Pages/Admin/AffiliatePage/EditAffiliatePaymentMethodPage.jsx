import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../../Components/Loading'
import { useNavigate, useParams } from 'react-router-dom';
import InputCustom from '../../../Components/InputCustom';
import CheckBox from '../../../Components/CheckBox';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';

const EditAffiliatePaymentMethodLayout = () => {
       const { paymentMethodId } = useParams()
       const auth = useAuth();
       const navigate = useNavigate();
       const uploadThumbnailRef = useRef();


       const [paymentMethodName, setPaymentMethodName] = useState('');
       const [minPayout, setMinPayout] = useState('');
       const [paymentMethodThumbnailFile, setPaymentMethodThumbnailFile] = useState();
       const [paymentPhotoShow, setPaymentPhotoShow] = useState();
       const [paymentMethhodThumbnail, setPaymentMethhodThumbnail] = useState('');
       const [paymentMethodActive, setPaymentMethodActive] = useState(0);

       const [isLoading, setIsLoading] = useState(false);

       useEffect(() => {
              const fetchEdit = async () => {
                     setIsLoading(true);
                     try {
                            const response = await axios.get(`https://bcknd.elmanhag.com/admin/affilate/affilateMethod/${paymentMethodId}`, {
                                   headers: {
                                          Authorization: `Bearer ${auth.user.token}`,
                                   },
                            });

                            if (response.status === 200) {
                                   console.log('response Payment Method', response);

                                   const data = response.data.payment_method;
                                   console.log('data', data);
                                   // setSelectTeacherId(data.teacher.id);
                                   setPaymentMethodName(data?.method || '-')
                                   setMinPayout(data?.min_payout || '')
                                   setPaymentMethodThumbnailFile(data?.thumbnail || '')
                                   setPaymentPhotoShow(data?.thumbnail || '')
                                   setPaymentMethhodThumbnail(data?.thumbnail || '')
                                   setPaymentMethodActive(data?.status || 0)

                            } else {
                                   console.log('response Payment Method error');
                            }
                     } catch (error) {
                            console.log('error', error);
                     } finally {
                            setIsLoading(false);
                     }
              };
              fetchEdit();
       }, []);

       const handleThumbnailClick = () => {
              if (uploadThumbnailRef.current) {
                     uploadThumbnailRef.current.click(); // Trigger a click on the hidden file input
              }
       };
       const handleThumbnailChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setPaymentMethodThumbnailFile(file); // Set file object for upload
                     setPaymentMethhodThumbnail(file.name); // Display file name in the text input
                     setPaymentPhotoShow(URL.createObjectURL(file)); // Display file name in the text input
              }
       };

       const handleClick = (e) => {
              const isChecked = e.target.checked;
              setPaymentMethodActive(isChecked ? 1 : 0);
       };


       const handleSubmitEdit = async (event) => {
              event.preventDefault();

              // Validate input fields
              if (!paymentMethodName) {
                     auth.toastError('Please Enter Payment Method Name.');
                     return;
              }
              if (!minPayout) {
                     auth.toastError('Please Enter Min Payout.');
                     return;
              }
              if (!paymentMethodThumbnailFile) {
                     auth.toastError('Please Select Payment Method Thumbnail.');
                     return;
              }

              setIsLoading(true);
              try {
                     // Create a FormData object
                     const formData = new FormData();
                     formData.append('method', paymentMethodName);  // Use the exact field names expected by the server
                     formData.append('min_payout', minPayout);
                     formData.append('thumbnail', paymentMethodThumbnailFile);  // Ensure this is a file object
                     formData.append('status', paymentMethodActive);

                     // Log FormData contents for debugging
                     for (let [key, value] of formData.entries()) {
                            console.log(key, value);  // This will print all keys and values being sent
                     }

                     const response = await axios.post(
                            `https://bcknd.elmanhag.com/admin/affilate/affilateMethodUpdate/${paymentMethodId}`,
                            formData,
                            {
                                   headers: {
                                          Authorization: `Bearer ${auth.user.token}`,
                                          'Content-Type': 'multipart/form-data',
                                   },
                            }
                     );

                     if (response.status === 200 || response.status === 201) {
                            auth.toastSuccess('Payment Method added successfully!');
                            handleGoBack();
                     } else {
                            auth.toastError('Failed to add Payment Method.');
                     }
              } catch (error) {
                     const errorMessages = error?.response?.data?.errors;  // Safeguarded dot access to data
                     let errorMessageString = 'Error occurred';

                     if (errorMessages) {
                            errorMessageString = Object.values(errorMessages).flat().join(' ');
                     }

                     auth.toastError(errorMessageString);
                     console.error(errorMessages);
              } finally {
                     setIsLoading(false);
              }
       };


       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       if (isLoading) {
              return (
                     <div className="w-1/4 h-full flex items-start justify-center m-auto mt-36">
                            <Loading />
                     </div>
              )
       }

       return (
              <>
                     <form onSubmit={handleSubmitEdit} className='w-full flex flex-col items-center justify-center gap-y-3 mt-4'>

                            <div className="w-full flex flex-wrap items-center justify-start gap-3">
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Name Payment Method"
                                                 value={paymentMethodName}
                                                 onChange={(e) => setPaymentMethodName(e.target.value)}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="number"
                                                 placeholder="Min Payout"
                                                 value={minPayout}
                                                 onChange={(e) => setMinPayout(e.target.value)}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 upload={true}
                                                 placeholder="Thumbnail"
                                                 value={paymentMethhodThumbnail}
                                                 paddinRight='pr-8'
                                                 readonly={true}
                                                 onClick={handleThumbnailClick}
                                          />
                                          <input
                                                 type="file"
                                                 className="hidden"
                                                 onChange={handleThumbnailChange}
                                                 ref={uploadThumbnailRef}
                                          />
                                          <div className="">

                                          </div>
                                   </div>
                                   <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                                          <span className="text-2xl text-thirdColor font-medium">Active:</span>
                                          <div>
                                                 <CheckBox handleClick={handleClick} checked={paymentMethodActive} />
                                          </div>
                                   </div>
                                   <img src={paymentPhotoShow} className='w-full h-[200px] rounded-xl object-contain object-center' alt="photo" loading='lazy' />
                            </div>
                            {/* Buttons */}
                            <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">

                                   <div className="flex items-center justify-center w-72">
                                          <Button type='submit'
                                                 Text={"Edit"}
                                                 BgColor="bg-mainColor"
                                                 Color="text-white"
                                                 Width='full'
                                                 Size='text-2xl'
                                                 px='px-28'
                                                 rounded='rounded-2xl'
                                          // stateLoding={isLoading}
                                          />
                                   </div>
                                   <button onClick={handleGoBack} className='text-2xl text-mainColor'>Cancel</button>
                            </div>
                     </form>
              </>
       )
}

export default EditAffiliatePaymentMethodLayout