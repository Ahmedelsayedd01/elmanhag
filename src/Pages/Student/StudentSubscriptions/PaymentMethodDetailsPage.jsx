import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import InputCustom from '../../../Components/InputCustom'; // Adjust the import path as needed
import { Button } from '../../../Components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/Auth';

const PaymentMethodDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { plan, paymentMethod, planType ,price} = location.state || {}; // Retrieve state passed via navigation
  const uploadReceiptImageRef = useRef();
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [receiptImageFile, setReceiptImageFile] = useState(null);
  const [receiptImage, setReceiptImage] = useState('');
  const [referenceNumber,setReferenceNumber]=useState('')
  // const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // Modal state

  const handleReceiptImageClick = () => {
    if (uploadReceiptImageRef.current) {
      uploadReceiptImageRef.current.click(); // Trigger a click on the hidden file input
    }
  };

  const handleReceiptImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptImageFile(file); // Set file object for upload
      setReceiptImage(file.name); // Display file name in the text input
    }
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  useEffect(() => {
    console.log("The plan is ", plan);
    console.log("The plan price is ",price);
    console.log("The plan Type is ", planType);
    console.log("The payment method is ", paymentMethod);
  }, []);

  const handleSubmit= async (event) => {
    event.preventDefault();

    setIsLoading(true);
    
  if(paymentMethod.title !== 'fawry'){
    try {
      const formData = new FormData();
      formData.append('amount', price);
      formData.append('service', planType);
      formData.append('payment_method_id', paymentMethod.id);
      // if (receiptImageFile) {  // This checks if receiptImageFile is not null, undefined, or an empty string
        formData.append('receipt', receiptImageFile);
      // }
      // formData.append('bundle_id', plan.id);
      // Conditionally append either bundle_id or subject_id based on planType
      if (planType === 'Bundle') {
        formData.append('bundle_id', plan.id);

      } else if (planType === 'Subject') {
        formData.append('subject_id', plan.id);
      } 
      else if (planType === 'Live session') {
        formData.append('live_id', plan.id);
      } 

        // Print each FormData entry for debugging
        for (const [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);}
  
        const response = await axios.post('https://bdev.elmanhag.shop/student/order/place', formData, {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          console.log('formData', formData)
          auth.toastSuccess("شكرا على اشتاركك في منصة المنهج يتم مراجعة المدفوعات من قبل القسم المختص");
          handleGoBack();
        } else {
          auth.toastError('Failed to add Subject.');
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

     else if(paymentMethod.title === 'fawry'){
      try {
        const formData = new FormData();

        const chargeItems = [
          { 
              "itemId": plan.id,  // Convert itemId to string
              "description": planType,      // Keep description as is
              "quantity": "1"               // Keep quantity as a string
          },
        ];

  // Print each FormData entry for debugging
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    
        const response = await axios.post('https://bdev.elmanhag.shop/api/pay-at-fawry',{
          "chargeItems" : chargeItems
        }, {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
                // 'Content-Type': 'multipart/form-data',
            },
        });
    
        if (response.status === 200) {
            console.log(response.data);
            setReferenceNumber(response.data.referenceNumber)
            // setErrorMessage('Lesson data not found.');
            setShowModal(true); // Show modal when error occurs
            // auth.toastSuccess("شكرا على اشتراكك في منصة المنهج يتم مراجعة المدفوعات من قبل القسم المختص");
            // handleGoBack();
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
    }}
  };

  return (
    <div className="p-6 min-h-screen">
      
{showModal && (
<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:mr-10">
  <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
    <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">احتفظ بهذا الرقم للدفع بيه <span className='text-mainColor'>{referenceNumber}</span></h2>
    <div className="flex justify-end gap-4 sm:gap-2">
    <Button Text="حسناً" Width="auto" BgColor="bg-mainColor" Color="text-white" handleClick={()=>setShowModal(false)} />

      {/* Conditional rendering based on the error message
      {errorMessage === `عذرًا , يبدوا ان هذا الدرس غير متاح حالياً إلا للمشتركين. اشترك الآن واستمتع بجميع الدروس بدون قيود !` ? (
        <>
          <Link to="/dashboard/subscriptions/plans" state={{ subject_Id: subjectId }}>
            <Button Text="اشترك الان" Width="auto" BgColor="bg-mainColor" Color="text-white" />
          </Link>
          <Button Text="حاول لاحقا" Width="auto" BgColor="bg-gray-300" Color="text-black" handleClick={handleGoBack} />
        </>
      ) : (
        <Button Text="حسناً" Width="auto" BgColor="bg-mainColor" Color="text-white" handleClick={handleGoBack} />
      )} */}
    </div>
  </div>
</div>
)}
      <div className="flex p-4 mb-8 justify-center gap-5">
        <h2 className="text-2xl font-semibold">{paymentMethod.title}</h2>
        <img src={paymentMethod.thumbnail_link} alt={paymentMethod.title} className="w-15 h-10 mb-4" />
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-y-5">
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

         {paymentMethod.title === 'fawry' && (
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
              {/* <div className="lg:w-[30%] sm:w-full">
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
              </div> */}
            </>
          )}


          {/* Default for any other payment method */}
          {!['visa', 'fawry'].includes(paymentMethod.title) && (
            <>      
            <div className="p-6 rounded-lg shadow-lg w-full lg:w-[60%] space-y-6">
              <p className="text-md text-gray-700 directionEN">Please check the payment details below:</p>
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
        
        </div>
         {/* Buttons */}
         <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
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
          <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodDetailsPage;

