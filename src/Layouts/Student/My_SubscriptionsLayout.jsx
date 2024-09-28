import React from 'react'
import { My_SubscriptionsPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const SolveExams = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };

       return (
              <>
                     {/* <div className='directionEN'>
                            <HeaderPageSection handleClick={handleGoBack} name="قريباً" />
                     </div> */}
                     <My_SubscriptionsPage/>
              </>
       )
}

export default SolveExams