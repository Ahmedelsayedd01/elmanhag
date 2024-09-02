import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { EditLessonPage } from '../../Pages/AllPages';

const EditLessonLayout = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Edit Lesson" />
                     <EditLessonPage />
              </>
       )
}

export default EditLessonLayout