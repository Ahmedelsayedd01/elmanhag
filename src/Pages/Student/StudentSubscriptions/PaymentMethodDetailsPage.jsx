// import React from 'react'

// const PaymentMethodDetailsPage = () => {
//        return (
//               <div>PaymentMethodDetailsPage</div>
//        )
// }

// export default PaymentMethodDetailsPage


import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import InputCustom from '../../../Components/InputCustom'; // Adjust the import path as needed
import { Button } from '../../../Components/Button';

const PaymentMethodDetailsPage = () => {
  const location = useLocation();
  const { paymentMethod } = location.state || {}; // Retrieve the payment method state

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log('Payment details submitted:', paymentDetails);
  };

  return (
    <div className="p-6 min-h-screen">
      {/* <h1 className="text-4xl font-bold mb-6">تفاصيل طريقة الدفع</h1> */}

      <div className="flex p-4 mb-8 justify-center gap-5">
        <h2 className="text-2xl font-semibold">{paymentMethod.title}</h2>
        <img src={paymentMethod.thumbnail_link} alt={paymentMethod.title} className="w-15 h-10 mb-4" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {paymentMethod.title === 'vodafon cach' && (
          <>
            <InputCustom
              type="text"
              placeholder="رقم البطاقة"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              name="cardNumber"
              borderColor="gray-300"
              required
            />
            <InputCustom
              type="date"
              placeholder="تاريخ الانتهاء"
              value={paymentDetails.expirationDate}
              onChange={handleChange}
              name="expirationDate"
              borderColor="gray-300"
              required
            />
            <InputCustom
              type="password"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={handleChange}
              name="cvv"
              borderColor="gray-300"
              required
            />
          </>
        )}

        {paymentMethod.title === 'fawry' && (
          <>
            <InputCustom
              type="text"
              placeholder="رقم التليفون"
              value={paymentDetails.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
              borderColor="gray-300"
              required
            />
            <InputCustom
              type="email"
              placeholder="البريد الإلكتروني"
              value={paymentDetails.email}
              onChange={handleChange}
              name="email"
              borderColor="gray-300"
              required
            />
          </>
        )}

        <div className="flex items-center justify-center mt-10">
          <Button
            type="submit"
            Text="تأكيد الدفع"
            BgColor="bg-mainColor"
            Color="text-white"
            Width="full"
            Size="text-2xl"
            px="px-28"
            rounded="rounded-2xl"
          />
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodDetailsPage;
