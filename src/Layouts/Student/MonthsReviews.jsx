import React from 'react'
import { MonthsreviewsPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const MonthsReviews = () => {

       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };

       return (
              <>
                     <div className='directionEN'>
                     <HeaderPageSection handleClick={handleGoBack} name="مراجعات الشهور" />
                     </div>
                     <MonthsreviewsPage/>
              </>
       )
}

export default MonthsReviews