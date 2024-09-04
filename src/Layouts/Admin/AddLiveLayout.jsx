import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { AddLivePage } from '../../Pages/AllPages';

const AddLiveLayout = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
        navigate(-1, { replace: true });
  };
  return (
          <>
              <HeaderPageSection handleClick={handleGoBack} name="Add Live" />
              <AddLivePage />
          </>
  )
}

export default AddLiveLayout
