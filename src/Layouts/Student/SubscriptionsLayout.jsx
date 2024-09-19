import React from 'react'
import { SubscriptionsPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const SubscriptionsLayout = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
       return (
                     <>
                     <div className='directionEN'>
                     <HeaderPageSection handleClick={handleGoBack} name="اشتراكاتي" />
                     </div>
                     <SubscriptionsPage/>
                     </>
       )
}

export default SubscriptionsLayout

