import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AddChapterPage } from '../../Pages/AllPages';
import HeaderPageSection from '../../Components/HeaderPageSection';

const AddChapterLayout = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Add Chapter" />
                     <AddChapterPage />
              </>
       )
}

export default AddChapterLayout