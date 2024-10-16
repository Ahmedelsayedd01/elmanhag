import React from 'react'
import { AddVideoIssuesPage } from '../../Pages/AllPages';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { useNavigate } from 'react-router-dom';

const AddVideoIssuesLayout = () => {
       const navigate = useNavigate();

       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Add Video Issues" />
                     <AddVideoIssuesPage />
              </>
       )
}

export default AddVideoIssuesLayout