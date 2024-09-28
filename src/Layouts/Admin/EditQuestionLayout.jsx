import React from 'react'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';
import { EditQuestionPage } from '../../Pages/AllPages';

const EditQuestionLayout = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Edit Question" />
                     <EditQuestionPage />
              </>
       )
}

export default EditQuestionLayout