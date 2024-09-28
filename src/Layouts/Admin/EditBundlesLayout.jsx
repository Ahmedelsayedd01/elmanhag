import React, { createContext, useEffect, useState } from 'react'
import { EditBundlesPage } from '../../Pages/AllPages';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';

export const BundleDataContext = createContext();

const EditBundlesLayout = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  let { bundleId } = useParams();

  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Edit Bundle" />
      {/* <BundleDataContext.Provider value={bundleEdit}>
      </BundleDataContext.Provider> */}
      <EditBundlesPage number={bundleId} />
    </>
  )
}

export default EditBundlesLayout