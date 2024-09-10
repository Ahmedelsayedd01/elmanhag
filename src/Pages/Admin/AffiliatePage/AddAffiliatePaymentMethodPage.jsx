import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../Components/Button';
import InputCustom from '../../../Components/InputCustom';
import CheckBox from '../../../Components/CheckBox';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';
const AddAffiliatePaymentMethodPage = () => {
       const uploadThumbnailRef = useRef();
       const auth = useAuth();
       const navigate = useNavigate();

       const [paymentMethodName, setPaymentMethodName] = useState('');
       const [minPayout, setMinPayout] = useState('');
       const [paymentMethodThumbnailFile, setPaymentMethodThumbnailFile] = useState();
       const [paymentMethhodThumbnail, setPaymentMethhodThumbnail] = useState('');
       const [paymentMethodActive, setPaymentMethodActive] = useState(0);

       const [isLoading, setIsLoading] = useState(false)

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
              }
       };

       const handleClick = (e) => {
              const isChecked = e.target.checked;
              setPaymentMethodActive(isChecked ? 1 : 0);
       };

       const handleSubmitAdd = async (event) => {
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
              if (!paymentMethodThumbnailFile) {  // Fixed typo here
                     auth.toastError('Please Select Payment Method Thumbnail.');
                     return;
              }

              setIsLoading(true);
              try {
                     const formData = new FormData();
                     formData.append('method', paymentMethodName);
                     formData.append('min_payout', minPayout);
                     formData.append('thumbnail', paymentMethodThumbnailFile);  // Fixed typo here
                     formData.append('status', paymentMethodActive);

                     const response = await axios.post('https://bdev.elmanhag.shop/admin/affilate/affilateMethodAdd', formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                                   'Content-Type': 'multipart/form-data',
                            },
                     });

                     if (response.status === 200 || response.status === 201) {  // Also check for 201 status
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

                     // Fixed the toast error handling to use a single argument
                     auth.toastError(errorMessageString);
                     console.error(errorMessages);
              } finally {
                     setIsLoading(false);
              }
       };

       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <form onSubmit={handleSubmitAdd} className='w-full flex flex-col items-center justify-center gap-y-3'>

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
                                                 readonly={true}
                                                 onClick={handleThumbnailClick}
                                          />
                                          <input
                                                 type="file"
                                                 className="hidden"
                                                 onChange={handleThumbnailChange}
                                                 ref={uploadThumbnailRef}
                                          />
                                   </div>
                                   <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                                          <span className="text-2xl text-thirdColor font-medium">Active:</span>
                                          <div>
                                                 <CheckBox handleClick={handleClick} />
                                          </div>
                                   </div>
                            </div>
                            {/* Buttons */}
                            <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">

                                   <div className="flex items-center justify-center w-72">
                                          <Button type='submit' Text={"Done"} BgColor="bg-mainColor" Color="text-white" Width='full' Size='text-2xl' px='px-28' rounded='rounded-2xl' stateLoding={isLoading} />
                                   </div>
                                   <button onClick={handleGoBack} className='text-2xl text-mainColor'>Cancel</button>
                            </div>
                     </form>
              </>
       )
}

export default AddAffiliatePaymentMethodPage