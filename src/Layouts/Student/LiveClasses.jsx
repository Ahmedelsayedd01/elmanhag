import React from 'react'
import { LiveClassesPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const LiveClasses = () => {

       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };
       return (
              <>
                     <div className='directionEN'>
                            <HeaderPageSection handleClick={handleGoBack} name="قريباً" />
                     </div>
                     <LiveClassesPage/>
              </>
       )
}

export default LiveClasses