import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import { AllLiveUnitsPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const AllLiveUnitsLayout = () => {
       const { subjectliveId } = useParams()
       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };

       useEffect(() => {
              console.log("Subject Live Id:", subjectliveId);  // Log unitId to check if it's coming correctly
          }, [subjectliveId]);
      
       return (
              <> 
              <div className='directionEN'>
              <HeaderPageSection handleClick={handleGoBack} name="الوحدات" />
              </div>
              <AllLiveUnitsPage subjectId={subjectliveId}/>
              </>
       )
}

export default AllLiveUnitsLayout