import React from 'react'
import { AddBundlesPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const AddBundlesLayout = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Add Bundle" />
      <AddBundlesPage />
    </>
  )
}

export default AddBundlesLayout