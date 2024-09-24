import React from 'react'
import { FinalReviewsPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const FinalReviews = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };

       return (
              <>
                     <div className='directionEN'>
                            <HeaderPageSection handleClick={handleGoBack} name="قريباً" />
                     </div>
                     <FinalReviewsPage/>
              </>
       )
}

export default FinalReviews