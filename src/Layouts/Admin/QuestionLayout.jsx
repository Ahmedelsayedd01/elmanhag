import React from 'react'
import { QuestionPage } from '../../Pages/AllPages'
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';

const QuestionLayout = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Question" />
                     <QuestionPage />
              </>
       )
}

export default QuestionLayout