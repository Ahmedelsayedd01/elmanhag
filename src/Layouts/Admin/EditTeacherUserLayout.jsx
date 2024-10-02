import React from 'react'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';
import { EditTeacherPage } from '../../Pages/AllPages';

const EditTeacherUserLayout = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="ُEdit Teacher" />
                     <EditTeacherPage />
              </>
       )
}

export default EditTeacherUserLayout