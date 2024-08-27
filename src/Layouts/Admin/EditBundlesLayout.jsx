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

  const [bundleEdit,setBundleEdit] = useState(null)
  const { bundleId } = useParams();

  useEffect(() => {
    const bundles = JSON.parse(localStorage.getItem('bundles')) || [];
    console.log('Bundles from local storage:', bundles); // Debugging log

    if (bundles.length > 0) {
        const bundle = bundles.find(c => c.id === parseInt(bundleId));
        console.log('Selected Bundle:', bundle); // Debugging log

        setBundleEdit(bundle)
    } else {
        console.warn('No bundles available in local storage.'); // Warn if no countries are found
    }
}, [bundleId]);

  return (
    <>
    <HeaderPageSection handleClick={handleGoBack} name="Edit Bundle" />
      <BundleDataContext.Provider value={bundleEdit}>
        <EditBundlesPage />
      </BundleDataContext.Provider>
    </>
  )
}

export default EditBundlesLayout