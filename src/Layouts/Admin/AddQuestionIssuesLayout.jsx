import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { AddQuestionIssuesPage } from '../../Pages/AllPages';

const AddQuestionIssuesLayout = () => {
       const navigate = useNavigate();

       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Add Question Issues" />
                     <AddQuestionIssuesPage />
              </>
       )
}

export default AddQuestionIssuesLayout