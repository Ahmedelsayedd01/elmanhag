import React from 'react'
import { useNavigate } from 'react-router-dom';
import { EditVideoIssuesPage } from '../../Pages/AllPages';
import HeaderPageSection from '../../Components/HeaderPageSection';

const EditVideoIssuesLayout = () => {
       const navigate = useNavigate();

       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Edit Video Issues" />
                     <EditVideoIssuesPage />
              </>
       )
}

export default EditVideoIssuesLayout