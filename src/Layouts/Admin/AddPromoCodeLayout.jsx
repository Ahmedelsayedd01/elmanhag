import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import {AddPromoCodePage } from '../../Pages/AllPages';

const AddPromoCodeLayout = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
        navigate(-1, { replace: true });
  };
  return (
    <>
        <HeaderPageSection handleClick={handleGoBack} name="Add Promo Code" />
        <AddPromoCodePage />
    </>
  )
}

export default AddPromoCodeLayout;
