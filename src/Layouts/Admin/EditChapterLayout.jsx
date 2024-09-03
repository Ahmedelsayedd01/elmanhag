import React from 'react'
import { useNavigate } from 'react-router-dom';
import { EditChapterPage } from '../../Pages/AllPages';
import HeaderPageSection from '../../Components/HeaderPageSection';

const EditChapterLayout = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Edit Chapter" />
                     <EditChapterPage />
              </>
       )
}

export default EditChapterLayout