import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { AddLiveUpcomingPage } from '../../Pages/AllPages';

const AddLiveLayout = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Add Live" />
      <AddLiveUpcomingPage />
    </>
  )
}

export default AddLiveLayout
