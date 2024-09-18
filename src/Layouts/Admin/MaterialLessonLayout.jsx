import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { MaterialLessonPage } from '../../Pages/AllPages';

const MaterialLessonLayout = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Edit Material Lesson" />
                     <MaterialLessonPage />
              </>
       )
}

export default MaterialLessonLayout