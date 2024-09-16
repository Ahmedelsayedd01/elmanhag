import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import { UnitsPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const UnitsLayout = () => {
       const { subject_Id } = useParams()
       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };

       useEffect(() => {
              console.log("Subject Id:", subject_Id);  // Log unitId to check if it's coming correctly
          }, [subject_Id]);
      
       return (
              <> 
              <div className='directionEN'>
              <HeaderPageSection handleClick={handleGoBack} name="الوحدات" />
              </div>
              <UnitsPage subjectId={subject_Id}/>
              </>
       )
}

export default UnitsLayout