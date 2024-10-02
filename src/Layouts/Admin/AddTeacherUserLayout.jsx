import React from 'react'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';
import { AddTeacherPage } from '../../Pages/AllPages';

const AddTeacherUserLayout = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Add Teacher" />
                     <AddTeacherPage />
              </>
       )
}

export default AddTeacherUserLayout