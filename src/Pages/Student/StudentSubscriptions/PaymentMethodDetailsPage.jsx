import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import InputCustom from '../../../Components/InputCustom'; // Adjust the import path as needed
import { Button } from '../../../Components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/Auth';
import { IoIosCopy } from "react-icons/io";

const PaymentMethodDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { plan, paymentMethod, planType, price } = location.state || {};
  const uploadReceiptImageRef = useRef();
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [receiptImageFile, setReceiptImageFile] = useState(null);
  const [receiptImage, setReceiptImage] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [merchantNumber, setMerchantNumber] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  // const [subjectsId, setSubjectsId] = useState([])

  // Function to handle receipt image click
  const handleReceiptImageClick = () => {
    if (uploadReceiptImageRef.current) {
      uploadReceiptImageRef.current.click();
    }
  };

  // Function to handle receipt image change
  const handleReceiptImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptImageFile(file);
      setReceiptImage(file.name);
    }
  };

  // Function to go back to the previous page
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  // Effect to log plan details
  // useEffect(() => {
  //   setSubjectsId([plan.id]);
  // }, [plan.id]); // Dependency array includes plan.id

  useEffect(() => {
    // console.log("setSubjectsId", subjectsId);
    console.log("The plan is ", plan);
    console.log("The plan price is ", price);
    console.log("The plan Type is ", planType);
    console.log("The payment method is ", paymentMethod);
  }, [ plan, price, planType, paymentMethod]); // This will re-run when subjectsId or any other dependencies change


  // Function to submit payment details
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (paymentMethod.title !== 'fawry') {
      try {
        // const formData = new FormData();
        // formData.append('amount', price);
        // formData.append('service', planType);
        // formData.append('payment_method_id', paymentMethod.id);
        // if (receiptImageFile) {  // This checks if receiptImageFile is not null, undefined, or an empty string
        //   formData.append('receipt', receiptImageFile);
        // }
        // if (planType === 'Bundle') {
        //   subjectsId.forEach((subjectId, index) => {
        //     formData.append(`bundle_id[${index}]`, subjectId);
        //   })
        // } else if (planType === 'Subject') {
        //   subjectsId.forEach((subjectId, index) => {
        //     formData.append(`subject_id[${index}]`, subjectId);
        //   })
        // } else if (planType === 'Live session') {
        //   subjectsId.forEach((subjectId, index) => {
        //     formData.append(`live_id[${index}]`, subjectId);
        //   })
        // }

        // const formData = new FormData();
        // formData.append('amount', price);
        // formData.append('service', planType);
        // formData.append('payment_method_id', paymentMethod.id);

        // if (receiptImageFile) {
        //   formData.append('receipt', receiptImageFile);
        // }

        // // Conditionally append IDs based on planType
        // if (planType === 'Bundle') {
        //   subjectsId.forEach((subjectId) => {
        //     formData.append('bundle_id[]', subjectId); // Use 'bundle_id[]' for arrays
        //   });
        // } else if (planType === 'Subject') {
        //   subjectsId.forEach((subjectId) => {
        //     formData.append('subject_id[]', subjectId); // Use 'subject_id[]' for arrays
        //   });
        // } else if (planType === 'Live session') {
        //   subjectsId.forEach((subjectId) => {
        //     formData.append('live_id[]', subjectId); // Use 'live_id[]' for arrays
        //   });
        // } }
        
        // } else if (planType === 'Bundle') {
        //   // Plan type is Bundle, send id as an integer (no need to convert to string)
        //   formData.append('bundle_id', subjectsId); 
        // }

        const formData = new FormData();
        formData.append('amount', price);
        formData.append('service', planType);
        formData.append('payment_method_id', paymentMethod.id);

        if (receiptImageFile) {
          formData.append('receipt', receiptImageFile);
        }

        if (planType === 'Subject') {
          if (Array.isArray(plan)) {
            // Plan is an array, map over it to get all ids, convert ids to strings and JSON stringify
            const subjectIds = plan.map(singlePlan => singlePlan.id); // Extract all plan IDs
            formData.append('subject_id', JSON.stringify(subjectIds.map(String))); // Convert to string and JSON stringify
          } else {
            // Plan is a single object, convert the id to a string and JSON stringify it as a list
            formData.append('subject_id', JSON.stringify([plan.id.toString()])); 
          }
        } else if (planType === 'Bundle') {
          // Plan type is Bundle, send id as an integer (no need to convert to string)
          console.log(plan.id)
          formData.append('bundle_id', JSON.stringify([plan.id.toString()])); 
        }
        
        

        // Now formData is ready to be sent


        const response = await axios.post('https://bdev.elmanhag.shop/student/order/place', formData, {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          auth.toastSuccess("شكرا على اشتاركك في منصة المنهج يتم مراجعة المدفوعات من قبل القسم المختص");
          handleGoBack();
        } 
        else {
          auth.toastError('Failed to add Subject.');
        }
      } catch (error) {
        console.log(error)
        if(error.response.data.faild =="You buy subject before"){
          auth.toastError('عملية الدفع قيد الانتظار للتأكيد من القسم المختص يرجى الانتظار وسوف يتم إبلاغك عند التفعيل شكرا لتفهمكم');
        }
        else if (error.response.data.faild =="You buy bundle before"){
          auth.toastError('عملية الدفع قيد الانتظار للتأكيد من القسم المختص يرجى الانتظار وسوف يتم إبلاغك عند التفعيل شكرا لتفهمكم');
        }
        else{
          const errorMessages = error?.response?.data.errors;
          let errorMessageString = 'Error occurred';
          if (errorMessages) {
            errorMessageString = Object.values(errorMessages).flat().join(' ');
          }
          auth.toastError('Error', errorMessageString);
        }
      } finally {
        setIsLoading(false);
      }
    } 
    
    // else if (paymentMethod.title === 'fawry') {
    //   try {
    //     const chargeItems = [{
    //       "itemId": plan.id,
    //       "description": planType,
    //       "quantity": "1"
    //     }];

    //     const response = await axios.post('https://bdev.elmanhag.shop/api/pay-at-fawry', {
    //       "chargeItems": chargeItems
    //     }, {
    //       headers: {
    //         Authorization: `Bearer ${auth.user.token}`,
    //       },
    //     });

    //     if (response.status === 200) {
    //       setReferenceNumber(response.data.referenceNumber);
    //       setMerchantNumber(response.data.merchantRefNumber);
    //       localStorage.setItem('referenceNumber', response.data.referenceNumber);
    //       localStorage.setItem('merchantNumber', response.data.merchantRefNumber);
    //       setShowModal(true);
    //     } else {
    //       auth.toastError('Failed to submit.');
    //     }
    //   } catch (error) {
    //     const errorMessages = error?.response?.data.errors;
    //     let errorMessageString = 'Error occurred';
    //     if (errorMessages) {
    //       errorMessageString = Object.values(errorMessages).flat().join(' ');
    //     }
    //     auth.toastError('Error', errorMessageString);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    else if (paymentMethod.title === 'fawry') {
      try {
        let chargeItems = [];
    
        if (planType === 'Subject') {
          if (Array.isArray(plan)) {
            // Plan is an array, send list of string ids
            chargeItems = plan.map(singlePlan => ({
              "itemId": singlePlan.id.toString(), // Convert id to string
              "description": 'Subject',
              "quantity": "1"
            }));
          } else {
            // Plan is a single object, send id as string in a list
            chargeItems = [{
              "itemId": plan.id.toString(), // Convert id to string
              "description": 'Subject',
              "quantity": "1"
            }];
          }
        } else if (planType === 'Bundle') {
          // Plan type is Bundle, send id as an integer
          chargeItems = [{
            "itemId": plan.id, // Keep id as an integer
            "description": 'Bundle',
            "quantity": "1"
          }];
        }
    
        // Send request to Fawry API
        const response = await axios.post('https://bdev.elmanhag.shop/api/pay-at-fawry', {
          "chargeItems": chargeItems,
          "amount" :price
        }, {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        });
    
        if (response.status === 200) {
          setReferenceNumber(response.data.referenceNumber);
          setMerchantNumber(response.data.merchantRefNumber);
          localStorage.setItem('referenceNumber', response.data.referenceNumber);
          localStorage.setItem('merchantNumber', response.data.merchantRefNumber);
          setShowModal(true);
        } else {
          auth.toastError('Failed to submit.');
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
    }
    
  };

  // Function to show modal if values exist in local storage
  useEffect(() => {
    const storedReference = localStorage.getItem('referenceNumber');
    const storedMerchantNumber = localStorage.getItem('merchantNumber');

    // Check if reference and merchantNumber exist in localStorage
    if (storedReference && storedMerchantNumber) {
      setReferenceNumber(storedReference);
      setMerchantNumber(storedMerchantNumber);
      setShowModal(true); // Show modal
      setWarningMessage('هناك عملية شراء لم تكتمل بعد'); // Set warning message
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referenceNumber) // Copy referenceNumber to clipboard
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  // Function to check payment status and allow retry if unpaid
  const handleDone = async () => {
    try {
      const merchantNumber = localStorage.getItem('merchantNumber');
      const response = await axios.post('https://bdev.elmanhag.shop/api/fawry/check-status',
        { "merchantRefNum": merchantNumber }
        , {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        });
      if (response) {
        console.log(response)
      }
      if (response.status === 200) {
        if (response.data.orderStatus === 'PAID') {
          auth.toastSuccess('🎉تم الدفع بنجاح');
          setPaymentStatus('Paid');
          setShowModal(false);
          localStorage.removeItem('referenceNumber');
          localStorage.removeItem('merchantNumber'); // Wave goodbye to the local storage items 👋
        } else if (response.data.orderStatus === 'UNPAID') {
          auth.toastError('.😬لم يتم الدفع , من فضلك حاول مره اخره ');
          setPaymentStatus('Unpaid');
          setShowModal(true); // Keep modal open like it's waiting for a second chance 🔁
        }
      } else {
        auth.toastError('حدث خطا في الارسال , حاول مره اخره 😢');
        setPaymentStatus('Unpaid');
        setShowModal(true); // Keep that modal waiting
      }

    } catch (error) {
      auth.toastError('Error checking payment status');
      console.log(error)
    }
  };

  // Function to handle Cancel button click (removes reference and merchant numbers from localStorage)
  const handleCancel = () => {
    localStorage.removeItem('referenceNumber');
    localStorage.removeItem('merchantNumber');
    setReferenceNumber('');
    setMerchantNumber('');
    setPaymentStatus(null); // Reset payment status
    setShowModal(false);
    setWarningMessage(''); // Clear warning message when canceled
  };

  return (
    <div className="p-6 min-h-screen relative">
      {/* Full page overlay when modal is open */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            {warningMessage && (
              <p className="text-red-600 text-center font-semibold text-xl mb-5">{warningMessage}</p> // Show warning message
            )}
            {/* <h1 className='text-xl'>الماده : <span className='text-mainColor'>{plan.name}</span></h1> */}
            <h1 className='text-xl'>
              الماده : 
              <span className='text-mainColor'>
                {Array.isArray(plan) 
                  ? plan.map(singlePlan => singlePlan.name).join(', ') // If plan is an array, join all names with a comma
                  : plan.name // If plan is a single object, display its name
                }
              </span>
            </h1>

            <h1 className='text-xl'>السعر  : <span className='text-mainColor'>{price}</span></h1>
            <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">
              احتفظ بهذا الرقم للدفع بيه <span className='text-mainColor'>{referenceNumber}</span>
              <button onClick={handleCopy} className="m-2">
                <IoIosCopy color='black' />
              </button>
            </h2>

            {copySuccess && (
              <p className="text-red-500">تم نسخ الرقم! <span className="text-gray-500">(Copied)</span></p>
            )}

            {/* <p >Current status: {paymentStatus || "Checking..."}</p> */}
            {paymentStatus === 'Unpaid' && (
              <p className="text-red-600">لم يتم الدفع ,من فضلك حاول مره اخره</p>
            )}
            <div className="flex justify-end gap-4 sm:gap-2">
              <Button Text="الغاء" Width="auto" BgColor="bg-gray-300" Color="text-black" handleClick={handleCancel} />
              <Button Text="تاكيد الدفع" Width="auto" BgColor="bg-mainColor" Color="text-white" handleClick={handleDone} />
            </div>
          </div>
        </div>
      )}

      {/* Rest of the page content */}
      {!['fawry'].includes(paymentMethod.title) && (
        <div className="flex p-4 mb-8 justify-center gap-5">
          <h2 className="text-2xl font-semibold">{paymentMethod.title}</h2>
          <img src={paymentMethod.thumbnail_link} alt={paymentMethod.title} className="w-15 h-10 mb-4" />
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-y-5">
        {/* Your existing form inputs */}
        <div className="w-full flex flex-col flex-wrap justify-start gap-5">
          {paymentMethod.title === 'visa' && (
            <>
              <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                  type="text"
                  placeholder="رقم البطاقة"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                  type="date"
                  placeholder="تاريخ الانتهاء"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </div>
              <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                  type="text"
                  placeholder="رمز الامان"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                  type="text"
                  upload={true}
                  placeholder="صوره الايصال"
                  value={receiptImage}
                  readonly={true}
                  onClick={handleReceiptImageClick}
                />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleReceiptImageChange}
                  ref={uploadReceiptImageRef}
                />
              </div>
            </>
          )}

          {/* {paymentMethod.title === 'fawry' && (
            <>
              <div className="lg:w-[30%] sm:w-full">
                <InputCustom
                  type="text"
                  textDirection="true"
                  placeholder="رقم التليفون"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </>
          )} */}


          {/* Default for any other payment method */}
          {!['visa', 'fawry'].includes(paymentMethod.title) && (
            <>
              <div className="p-6 rounded-lg shadow-lg w-full lg:w-[60%] space-y-6">
                {/* <p className="text-md text-gray-700 directionEN">Please check the payment details below:</p> */}
                <h1 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-gray-200 pb-2 directionEN">{paymentMethod.description}</h1>
                <div className="lg:w-[50%] sm:w-full">
                  <InputCustom
                    type="text"
                    iconDirection="true"
                    textDirection="true"
                    upload={true}
                    placeholder="صوره الايصال"
                    value={receiptImage}
                    readonly={true}
                    onClick={handleReceiptImageClick}
                    className="cursor-pointer focus:ring-2 focus:ring-mainColor"
                  />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleReceiptImageChange}
                    ref={uploadReceiptImageRef}
                  />
                </div>

              </div>
            </>
          )}

          {/* Other payment method inputs... */}
        </div>
        {/* Buttons */}
        {paymentMethod.title === "fawry" ? (
          <>
            <div className="w-full flex sm:flex-col lg:flex-row items-center justify-center sm:gap-y-5 lg:gap-x-24 sm:my-8 lg:my-0">
              <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-96 mx-auto my-8 mt-0">
                {/* Top sentence */}
                <p className="text-center text-xl font-bold text-mainColor mb-6">
                  الدفع عن طريق  فوري
                </p>

                {/* Fawry Image */}
                <div className="flex justify-center mb-4">
                  <img
                    src={paymentMethod.thumbnail_link} // Replace this with the actual image path
                    alt="Fawry Logo"
                    className="w-32 h-auto"
                  />
                </div>

                {/* Pay via Fawry Button */}
                <div className="flex items-center justify-center w-full mb-4">
                  <Button
                    type="submit"
                    Text="الدفع عن طريق كود فوري"
                    BgColor="bg-mainColor"
                    Color="text-white"
                    Width="full"
                    Size="text-2xl"
                    px="px-4"
                    rounded="rounded-2xl"
                  />
                </div>

                {/* Cancel Button */}
                <div className="flex items-center justify-center w-full">
                  <Button
                    Text="الغاء"
                    BgColor="bg-gray-300"
                    Color="text-mainColor"
                    Width="full"
                    Size="text-2xl"
                    px="px-4"
                    rounded="rounded-2xl"
                    handleClick={handleGoBack}
                  />
                </div>
              </div>
            </div>
          </>

          // <>
          //   <div className="flex items-center justify-center w-80">
          //     <Button
          //       type="submit"
          //       Text="الدفع عن طريق كود فوري"
          //       BgColor="bg-mainColor"
          //       Color="text-white"
          //       Width="full"
          //       Size="text-2xl"
          //       px="px-2"
          //       rounded="rounded-2xl"
          //       stateLoding={isLoading}
          //     />
          //   </div>
          //   <div className="flex items-center justify-center w-80">
          //   <Button
          //       // type="submit"
          //       Text="الغاء"
          //       BgColor="bg-mainColor"
          //       Color="text-white"
          //       Width="full"
          //       Size="text-2xl"
          //       px="px-2"
          //       rounded="rounded-2xl"
          //       handleClick={handleGoBack}
          //     />
          //     </div>
          //   {/* <button onClick={handleGoBack} className="text-2xl text-mainColor">
          //     الغاء
          //   </button> */}
          // </>
        ) : (
          <>
            <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-24 sm:my-8 lg:my-0">
              <div className="flex items-center justify-center w-72">
                <Button
                  type="submit"
                  Text="اشتراك"
                  BgColor="bg-mainColor"
                  Color="text-white"
                  Width="full"
                  Size="text-2xl"
                  px="px-28"
                  rounded="rounded-2xl"
                  stateLoding={isLoading}
                />
              </div>
              <button onClick={handleGoBack} className="text-2xl text-mainColor">
                الغاء
              </button>
            </div>
          </>
        )}
        {/* <div className="flex items-center justify-center w-72">
            <Button
              type"submit"
              Text="اشتراك"
              BgColor="bg-mainColor"
              Color="text-white"
              Width="full"
              Size="text-2xl"
              px="px-28"
              rounded="rounded-2xl"
              stateLoding={isLoading}
              // handleClick={handleSubmit} 
            />
          </div>
          <button onClick={handleGoBack} className="text-2xl text-mainColor">الغاء</button> */}
      </form>
    </div>
  );
};

export default PaymentMethodDetailsPage;

