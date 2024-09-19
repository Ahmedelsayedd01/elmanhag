import React from 'react'
import { PaymentMethodDetailsPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';


const PaymentMethodDetailsLayout = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
       return (
        <>
        <div className='directionEN'>
            <HeaderPageSection handleClick={handleGoBack} name="تفاصيل الدفع" />
        </div>
        <PaymentMethodDetailsPage/>
        </>
    )
}

export default PaymentMethodDetailsLayout