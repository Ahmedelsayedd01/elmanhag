import React from 'react'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';
import { AddSubjectPage } from '../../Pages/AllPages';

const AddSubjectLayout = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Add Subject" />
      <AddSubjectPage />
    </>
  )
}

export default AddSubjectLayout