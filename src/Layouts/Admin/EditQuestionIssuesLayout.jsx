import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { EditQuestionIssuesPage } from '../../Pages/AllPages';

const EditQuestionIssuesLayout = () => {
       const navigate = useNavigate();

       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Edit Question Issues" />
                     <EditQuestionIssuesPage />
              </>
       )
}

export default EditQuestionIssuesLayout