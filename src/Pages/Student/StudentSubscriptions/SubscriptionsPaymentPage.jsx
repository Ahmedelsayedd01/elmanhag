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
    console.log(plan)
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
      console.log(plan ,selectedPaymentMethod,planType)
      navigate('../method_details', { state: {plan:plan, paymentMethod: selectedPaymentMethod , planType:planType} });
    }
  };

  return (
//     <div className="p-6 min-h-screen">      
//      {/* <div className="flex flex-col justify-center bg-white p-4 rounded-lg shadow-lg mb-8 text-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto transform transition-transform hover:scale-105">
//         <div className="flex justify-center">
//           <img src={plan.cover_photo_url} alt={plan.name} className="max-w-full h-auto rounded-lg" />
//         </div>
//         <div>
//           <h2 className="text-xl sm:text-2xl font-semibold text-mainColor">{plan.name}</h2>
//           <p className="text-md sm:text-lg text-mainColor mt-2">{plan.price_discount} جنيه</p>
//         </div>
//       </div>   */}

// <div className='flex'>
//       <div className="flex flex-col gap-4 w-1/2">
//         <h1 className="text-4xl font-bold mb-6">اختار طريقه الدفع</h1>
//         {planPayment.map((method) => (
//           <div
//             key={method.id}
//             className={`flex gap-4 items-center p-4 bg-white rounded-lg shadow-md cursor-pointer ${selectedPaymentMethod.title === method.title ? 'border-2 border-red-500' : ''}`}
//             onClick={() => setSelectedPaymentMethod(method)}
//           >
//             <div className={`w-6 h-6 rounded-full border-2 ${selectedPaymentMethod.title === method.title ? 'border-red-500 bg-mainColor' : 'border-gray-300'} mr-3`} />
//             <img src={method.thumbnail_link} alt={method.title} className="w-10 h-10" />
//             <h3 className="text-lg font-semibold ml-2">{method.title}</h3>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col justify-center bg-white p-4 rounded-lg shadow-lg text-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto transform transition-transform hover:scale-105">
//         <div className="flex justify-center">
//           <img src={plan.cover_photo_url} alt={plan.name} className="max-w-full h-auto rounded-lg" />
//         </div>
//         <div>
//           <h2 className="text-xl sm:text-2xl font-semibold text-mainColor">{plan.name}</h2>
//           <p className="text-md sm:text-lg text-mainColor mt-2">{plan.price_discount} جنيه</p>
//         </div>
//       </div> 

// </div>
//       <div className="flex items-center justify-center w-72 mt-10 rounded-2xl">
//         <button onClick={handleNextClick}>
//           <Button type='submit' Text={"التالي"} BgColor="bg-mainColor" Color="text-white" Width='full' Size='text-2xl' px='px-28' rounded='rounded-2xl' stateLoding={isLoading} />
//         </button>
//       </div>
//     </div>

<div className="p-6 min-h-screen">      
  {/* Container with responsive layout */}
  <div className="flex flex-col lg:flex-row-reverse w-full gap-8">
    {/* Plan Info Section */}
    <div className="flex flex-col justify-center bg-white p-4 rounded-lg shadow-lg text-center w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto transform transition-transform hover:scale-105">
      <div className="flex justify-center">
        <img src={plan.cover_photo_url} alt={plan.name} className="max-w-full h-auto rounded-lg" />
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-mainColor">{plan.name}</h2>
        <p className="text-gray-700 mb-2">
                  {plan.price_discount} جنيه بدلا من <span className="line-through">{plan.price || 0} جنيه</span>
        </p>      </div>
    </div>

    {/* Payment Methods Section */}
    <div className="flex flex-col gap-4 w-full lg:w-1/2">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">اختار طريقه الدفع</h1>
      {planPayment.map((method) => (
        <div
          key={method.id}
          className={`flex gap-4 items-center p-4 bg-white rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105 ${selectedPaymentMethod.title === method.title ? 'border-2 border-red-500' : ''}`}
          onClick={() => setSelectedPaymentMethod(method)}
        >
          <div className={`w-6 h-6 rounded-full border-2 ${selectedPaymentMethod.title === method.title ? 'border-red-500 bg-mainColor' : 'border-gray-300'} mr-3`} />
          <img src={method.thumbnail_link} alt={method.title} className="w-10 h-10" />
          <h3 className="text-lg font-semibold">{method.title}</h3>
        </div>
      ))}
    </div>
  </div>

  {/* Button Section */}
  <div className="flex items-center justify-center w-72 mt-10 rounded-2xl">
         <Button handleClick={handleNextClick} type='submit' Text={"التالي"} BgColor="bg-mainColor" Color="text-white" Width='full' Size='text-2xl' px='px-28' rounded='rounded-2xl' stateLoding={isLoading} />
  </div>
</div>

  );
};

export default SubscriptionsPaymentPage;
