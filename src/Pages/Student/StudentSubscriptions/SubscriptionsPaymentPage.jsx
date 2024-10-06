import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Components/Loading';
import { Button } from '../../../Components/Button';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SubscriptionsPaymentPage = () => {
  const [planPayment, setPlanPayment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const location = useLocation();
  const { plan ,planType} = location.state || {}; // Access the passed plan data safely
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [code , setCode] = useState('')
  const [newPrice, setNewPrice] = useState(null); // State to hold the new price after applying the promo code

  const fetchPlansPayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://bdev.elmanhag.shop/student/paymentMethods', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setPlanPayment(response.data.payment_methods);
      }
    } catch (error) {
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

  useEffect(() => {
    fetchPlansPayment();
    console.log(plan , planType)
  }, [auth.user.token]);

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  const handleNextClick = () => {
    if (!selectedPaymentMethod) {
      auth.toastError('يجب اختيار طريقة الدفع أولاً');
    } else {
    // Check for newPrice, then discount_price, and if neither, use price
    const priceToSend = newPrice 
    ? newPrice 
    : (plan.price_discount ? plan.price_discount : plan.price);

      console.log(plan ,selectedPaymentMethod,priceToSend)
      navigate('../method_details', { state: {plan:plan, paymentMethod: selectedPaymentMethod , planType:planType , price: priceToSend} });
    }
  };
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!selectedPaymentMethod) {
        auth.toastError('يجب اختيار طريقة الدفع أولاً');
      } 

      if (!code) {
        auth.toastError('ادخل كود الخصم');
      } 
  
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('price', plan.price_discount > 0 ? plan.price_discount : plan.price);
        // formData.append('type', planType);
        formData.append('code', code);
        formData.append('id', plan.id);

        // Check if planType is 'live', and append the appropriate value
        if (planType === 'live') {
          formData.append('type', 'Live session');
        } else {
          formData.append('type', planType);
        }

        for (let pair of formData.entries()) {
          console.log(pair[0]+ ', '+ pair[1]); 
        }
        const response = await axios.post('https://bdev.elmanhag.shop/student/promoCode', formData, {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 200) {
          auth.toastSuccess('تم تطبيق الكود بنجاح');
          console.log(response.data)
          setNewPrice(response.data.price); // Set the new price from the promo code response
          // navigate('../method_details', { state: {plan:plan, paymentMethod: selectedPaymentMethod , planType:planType} });
        } else {
          auth.toastError('Failed to process payment.');
        }
      } catch (error) {
        const errorMessages = error?.response?.data?.errors;
        auth.toastError(error.response.data.faild)
        let errorMessageString = 'Error occurred';
  
        if (errorMessages) {
          errorMessageString = Object.values(errorMessages).flat().join(' ');
        }
      } finally {
        setIsLoading(false);
      }
    };

  return (
      <div className="p-6 min-h-screen">   
          <form onSubmit={handleSubmit} className="w-full flex flex-col">   
        {/* Container with responsive layout */}
        <div className="flex flex-col lg:flex-row-reverse w-full gap-8">
          {/* Plan Info Section */}
          <div className="flex flex-col justify-center bg-white p-4 rounded-lg shadow-lg text-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto transform transition-transform hover:scale-105">
            <div className="flex justify-center">
            {/* <img 
              src={planType === "Bundle" ? plan.cover_photo_link : plan.cover_photo_url} 
              alt={plan.name} 
              className="max-w-full h-auto rounded-lg" 
            /> */}
            <img  
              src={
                planType === "Bundle" 
                  ? plan.cover_photo_link 
                  : planType === "Live session"
                  ? plan.subject.cover_photo_url 
                  : plan.cover_photo_url
              } 
              alt={plan.name} 
              className="max-w-full h-auto rounded-lg" 
            />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-mainColor mt-2">{plan.name}</h2>
              <p className="text-gray-700 mb-4 mt-2">
                  {newPrice ? (
                  // Only display the new price after applying the promo code
                  <span className="text-3xl text-mainColor font-semibold">{newPrice} جنيه</span>
                ) : (
                  // Display the original price and discount if the promo code is not applied
                  <>
                    {plan.price_discount > 0 ? (
                      <>
                        <span className="text-3xl text-mainColor font-semibold">{plan.price_discount} جنيه</span> بدلا من
                        <span className="line-through text-xl text-gray-600">{plan.price} جنيه</span>
                      </>
                    ) : (
                      <span className="text-3xl text-mainColor font-semibold">{plan.price} جنيه</span>
                    )}
                  </>
                )}
               </p>    
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-[#6B6B6B]">اختار طريقه الدفع</h1>
            {planPayment.map((method) => (
              <div
                key={method.id}
                className={`flex gap-4 items-center p-4 bg-white rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105 ${selectedPaymentMethod.title === method.title ? 'border-2 border-red-500' : ''}`}
                onClick={() => setSelectedPaymentMethod(method)}
              >
                <div className={`w-6 h-6 rounded-full border-2 ${selectedPaymentMethod.title === method.title ? 'border-red-500 bg-mainColor' : 'border-gray-300'} mr-3`} />
                <img src={method.thumbnail_link} alt={method.title} 
                  className={`${method.title ==="Vodafone cash" ? '' : 'h-14'}`} 
               />
                <h3 className="text-lg font-semibold">{method.title}</h3>
              </div>
            ))}
          </div>
        </div>
 {/* <div className='w-2/4 sm:w-full sm:mt-8'> */}
  <div className="flex items-center border border-gray-300 lg:pr-4 lg:w-2/4 sm:mt-10 sm:pr-1 box-border rounded-2xl border-mainColor">
           <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.75 11.25C5.6837 11.25 5.62011 11.2763 5.57322 11.3232C5.52634 11.3701 5.5 11.4337 5.5 11.5V12.75C5.5 12.8163 5.52634 12.8799 5.57322 12.9268C5.62011 12.9737 5.6837 13 5.75 13C5.8163 13 5.87989 12.9737 5.92678 12.9268C5.97366 12.8799 6 12.8163 6 12.75V11.5C6 11.4337 5.97366 11.3701 5.92678 11.3232C5.87989 11.2763 5.8163 11.25 5.75 11.25Z" fill="#929292"/>
              <path d="M5.75 8.75C5.6837 8.75 5.62011 8.77634 5.57322 8.82322C5.52634 8.87011 5.5 8.9337 5.5 9V10.25C5.5 10.3163 5.52634 10.3799 5.57322 10.4268C5.62011 10.4737 5.6837 10.5 5.75 10.5C5.8163 10.5 5.87989 10.4737 5.92678 10.4268C5.97366 10.3799 6 10.3163 6 10.25V9C6 8.9337 5.97366 8.87011 5.92678 8.82322C5.87989 8.77634 5.8163 8.75 5.75 8.75Z" fill="#929292"/>
              <path d="M15.25 9.25003C15.3163 9.25003 15.3799 9.22369 15.4268 9.17681C15.4737 9.12993 15.5 9.06634 15.5 9.00003V7.50003C15.4997 7.33737 15.446 7.17929 15.3472 7.05003C15.4402 6.90919 15.4921 6.74523 15.4971 6.57655C15.5021 6.40786 15.46 6.24112 15.3755 6.09503L14.82 5.13428C14.8036 5.10583 14.7818 5.08089 14.7557 5.06088C14.7297 5.04087 14.7 5.02619 14.6683 5.01766C14.6365 5.00914 14.6035 5.00696 14.5709 5.01122C14.5383 5.01549 14.5069 5.02613 14.4785 5.04253C14.1531 5.23041 13.7665 5.28134 13.4036 5.18412C13.0407 5.08691 12.7312 4.84951 12.5434 4.52416C12.3555 4.1988 12.3046 3.81214 12.4018 3.44924C12.499 3.08633 12.7364 2.77691 13.0618 2.58903C13.1189 2.5556 13.1605 2.501 13.1776 2.43707C13.1948 2.37315 13.186 2.30504 13.1532 2.24753L12.4865 1.09303C12.3938 0.934177 12.2422 0.818324 12.0646 0.770665C11.887 0.723007 11.6977 0.747397 11.538 0.838532L1.3 6.75003H1.25C1.05109 6.75003 0.860322 6.82905 0.71967 6.9697C0.579018 7.11036 0.5 7.30112 0.5 7.50003V9.00003C0.5 9.06634 0.526339 9.12993 0.573223 9.17681C0.620107 9.22369 0.683696 9.25003 0.75 9.25003C1.18098 9.25003 1.5943 9.42124 1.89905 9.72598C2.2038 10.0307 2.375 10.4441 2.375 10.875C2.375 11.306 2.2038 11.7193 1.89905 12.0241C1.5943 12.3288 1.18098 12.5 0.75 12.5C0.683696 12.5 0.620107 12.5264 0.573223 12.5733C0.526339 12.6201 0.5 12.6837 0.5 12.75V14C0.5 14.2653 0.605357 14.5196 0.792893 14.7071C0.98043 14.8947 1.23478 15 1.5 15H14.5C14.7652 15 15.0196 14.8947 15.2071 14.7071C15.3946 14.5196 15.5 14.2653 15.5 14V12.75C15.5 12.6837 15.4737 12.6201 15.4268 12.5733C15.3799 12.5264 15.3163 12.5 15.25 12.5C14.819 12.5 14.4057 12.3288 14.101 12.0241C13.7962 11.7193 13.625 11.306 13.625 10.875C13.625 10.4441 13.7962 10.0307 14.101 9.72598C14.4057 9.42124 14.819 9.25003 15.25 9.25003ZM11.788 1.27153C11.8327 1.24601 11.8857 1.23917 11.9354 1.25252C11.9851 1.26586 12.0276 1.2983 12.0535 1.34278L12.6035 2.29478C12.2348 2.57793 11.9815 2.98544 11.8908 3.44144C11.8002 3.89743 11.8783 4.37084 12.1107 4.7735C12.3431 5.17617 12.7139 5.48065 13.1541 5.63027C13.5943 5.77988 14.0739 5.76443 14.5035 5.58678L14.942 6.34628C14.9797 6.4118 14.9986 6.48646 14.9966 6.56203C14.9946 6.6376 14.9717 6.71114 14.9305 6.77453C14.8716 6.75902 14.8109 6.75079 14.75 6.75003H2.3L11.788 1.27153ZM13.125 10.875C13.1256 11.3952 13.3167 11.8971 13.6622 12.2859C14.0076 12.6747 14.4836 12.9235 15 12.9853V14C15 14.1326 14.9473 14.2598 14.8536 14.3536C14.7598 14.4474 14.6326 14.5 14.5 14.5H6V14C6 13.9337 5.97366 13.8701 5.92678 13.8233C5.87989 13.7764 5.8163 13.75 5.75 13.75C5.6837 13.75 5.62011 13.7764 5.57322 13.8233C5.52634 13.8701 5.5 13.9337 5.5 14V14.5H1.5C1.36739 14.5 1.24021 14.4474 1.14645 14.3536C1.05268 14.2598 1 14.1326 1 14V12.9853C1.51669 12.9241 1.99298 12.6755 2.33857 12.2865C2.68417 11.8976 2.87506 11.3953 2.87506 10.875C2.87506 10.3547 2.68417 9.85251 2.33857 9.46356C1.99298 9.07462 1.51669 8.82598 1 8.76478V7.50003C1 7.43373 1.02634 7.37014 1.07322 7.32326C1.12011 7.27637 1.1837 7.25003 1.25 7.25003H5.5V7.75003C5.5 7.81634 5.52634 7.87993 5.57322 7.92681C5.62011 7.97369 5.6837 8.00003 5.75 8.00003C5.8163 8.00003 5.87989 7.97369 5.92678 7.92681C5.97366 7.87993 6 7.81634 6 7.75003V7.25003H14.75C14.8163 7.25003 14.8799 7.27637 14.9268 7.32326C14.9737 7.37014 15 7.43373 15 7.50003V8.76478C14.4836 8.82657 14.0076 9.07538 13.6622 9.4642C13.3167 9.85301 13.1256 10.3549 13.125 10.875Z" fill="#929292"/>
              <path d="M8.5 10.5C8.69778 10.5 8.89112 10.4414 9.05557 10.3315C9.22002 10.2216 9.34819 10.0654 9.42388 9.88268C9.49957 9.69996 9.51937 9.49889 9.48079 9.30491C9.4422 9.11093 9.34696 8.93275 9.20711 8.79289C9.06725 8.65304 8.88907 8.5578 8.69509 8.51922C8.50111 8.48063 8.30004 8.50043 8.11732 8.57612C7.93459 8.65181 7.77841 8.77998 7.66853 8.94443C7.55865 9.10888 7.5 9.30222 7.5 9.5C7.5 9.76522 7.60536 10.0196 7.79289 10.2071C7.98043 10.3946 8.23478 10.5 8.5 10.5ZM8.5 9C8.59889 9 8.69556 9.02932 8.77779 9.08427C8.86001 9.13921 8.9241 9.2173 8.96194 9.30866C8.99978 9.40002 9.00969 9.50056 8.99039 9.59755C8.9711 9.69454 8.92348 9.78363 8.85355 9.85355C8.78363 9.92348 8.69454 9.9711 8.59755 9.99039C8.50056 10.0097 8.40002 9.99978 8.30866 9.96194C8.2173 9.9241 8.13921 9.86001 8.08426 9.77779C8.02932 9.69556 8 9.59889 8 9.5C8 9.36739 8.05268 9.24021 8.14645 9.14645C8.24021 9.05268 8.36739 9 8.5 9Z" fill="#929292"/>
              <path d="M11.5 11.5C11.3022 11.5 11.1089 11.5586 10.9444 11.6685C10.78 11.7784 10.6518 11.9346 10.5761 12.1173C10.5004 12.3 10.4806 12.5011 10.5192 12.6951C10.5578 12.8891 10.653 13.0673 10.7929 13.2071C10.9327 13.347 11.1109 13.4422 11.3049 13.4808C11.4989 13.5194 11.7 13.4996 11.8827 13.4239C12.0654 13.3482 12.2216 13.22 12.3315 13.0556C12.4414 12.8911 12.5 12.6978 12.5 12.5C12.5 12.2348 12.3946 11.9804 12.2071 11.7929C12.0196 11.6054 11.7652 11.5 11.5 11.5ZM11.5 13C11.4011 13 11.3044 12.9707 11.2222 12.9157C11.14 12.8608 11.0759 12.7827 11.0381 12.6913C11.0002 12.6 10.9903 12.4994 11.0096 12.4025C11.0289 12.3055 11.0765 12.2164 11.1464 12.1464C11.2164 12.0765 11.3055 12.0289 11.4025 12.0096C11.4994 11.9903 11.6 12.0002 11.6913 12.0381C11.7827 12.0759 11.8608 12.14 11.9157 12.2222C11.9707 12.3044 12 12.4011 12 12.5C12 12.6326 11.9473 12.7598 11.8536 12.8536C11.7598 12.9473 11.6326 13 11.5 13Z" fill="#929292"/>
              <path d="M7.71875 12.5C7.71856 12.6542 7.76418 12.8049 7.84982 12.933C7.93546 13.0611 8.05725 13.1609 8.19973 13.2197C8.3422 13.2785 8.49894 13.2936 8.65002 13.2631C8.8011 13.2327 8.93971 13.158 9.04825 13.0485L12.0285 10.0305C12.1676 9.88905 12.2456 9.69857 12.2456 9.50016C12.2456 9.30174 12.1676 9.11127 12.0285 8.96978C11.8853 8.83451 11.6957 8.75916 11.4988 8.75916C11.3018 8.75916 11.1122 8.83451 10.969 8.96978L7.94975 11.95C7.87676 12.0219 7.81875 12.1075 7.7791 12.2019C7.73944 12.2963 7.71893 12.3976 7.71875 12.5ZM8.301 12.305L11.3218 9.32303C11.3446 9.29805 11.3723 9.27797 11.4032 9.26401C11.434 9.25005 11.4674 9.24251 11.5012 9.24184C11.5351 9.24116 11.5687 9.24737 11.6001 9.26009C11.6315 9.27281 11.66 9.29177 11.6838 9.31583C11.7076 9.33988 11.7263 9.36852 11.7388 9.40002C11.7512 9.43152 11.7571 9.46522 11.7561 9.49906C11.7551 9.53291 11.7473 9.56621 11.733 9.59693C11.7188 9.62765 11.6984 9.65516 11.6733 9.67778L8.69325 12.697C8.66751 12.7228 8.63695 12.7432 8.60332 12.7572C8.56968 12.7711 8.53363 12.7783 8.49721 12.7783C8.4608 12.7783 8.42474 12.7712 8.3911 12.7572C8.35745 12.7433 8.32688 12.7229 8.30113 12.6972C8.27537 12.6714 8.25494 12.6409 8.24099 12.6072C8.22705 12.5736 8.21986 12.5375 8.21985 12.5011C8.21984 12.4647 8.227 12.4287 8.24092 12.395C8.25485 12.3614 8.27526 12.3308 8.301 12.305Z" fill="#929292"/>
            </svg>

          <input type="text" placeholder="كود الخصم" className="flex-1 outline-none lg:p-4 text-xl sm:text-lg sm:p-0"  value={code}
            onChange={(e) => setCode(e.target.value)} />
        
          <button type='submit' className="bg-[#FDF4F5] rounded-l-2xl sm:text-lg lg:p-4 sm:p-2 hover:bg-mainColor hover:text-white text-mainColor lg:text-2xl px-6 py-4 h-full w-1/4 rounded">
            تطبيق
          </button>
       </div>
{/* </div> */}
       </form>

        {/* Button Section */}
        <div className="flex items-center justify-center w-72 mt-10 rounded-2xl">
              <Button handleClick={handleNextClick} type='submit' Text={"التالي"} BgColor="bg-mainColor" Color="text-white" Width='full' Size='text-2xl' px='px-28' rounded='rounded-2xl' stateLoding={isLoading} />
        </div>
      </div>
  );
};

export default SubscriptionsPaymentPage;

