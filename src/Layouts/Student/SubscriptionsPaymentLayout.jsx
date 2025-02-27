import React from 'react'
import { SubscriptionsPaymentPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';


const SubscriptionsPaymentLayout = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
       return (
        <>
        <div className='directionEN'>
            <HeaderPageSection handleClick={handleGoBack} name="طرق الدفع " />
        </div>
        <SubscriptionsPaymentPage/>
        </>
    )
}

export default SubscriptionsPaymentLayout