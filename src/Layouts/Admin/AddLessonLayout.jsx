import React from 'react'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';
import { AddLessonPage } from '../../Pages/AllPages';

const AddLessonLayout = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <>
                            <HeaderPageSection handleClick={handleGoBack} name="Add Lesson" />
                            <AddLessonPage />
                     </>
              </>
       )
}

export default AddLessonLayout