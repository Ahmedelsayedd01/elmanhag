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
  const [bundlesData,setBundlesData] =  useState([]);
  const [allBundles,setAllBundles] =  useState([]);
  const [bundleEdit,setBundleEdit] = useState(null)
  const { bundleId } = useParams();

  useEffect(() => {
    const fetchBundlesData = () => {
      const storedBundles = JSON.parse(localStorage.getItem('BundlesData'))|| [];
      console.log('Bundles from local storage:', storedBundles); // Debugging log
      if (storedBundles) {
        setBundlesData(storedBundles);
        setAllBundles(storedBundles.bundles); // Corrected line
      }
    };
    fetchBundlesData(); // Renamed function to avoid shadowing
  }, []);


  useEffect(() => {
    if (allBundles.length > 0 && bundleId) {
      const filteredBundle = allBundles.find(
        (bundle) => bundle.id === parseInt(bundleId)
      );
      setBundleEdit(filteredBundle);
    } else {
      console.warn('No bundles available in local storage.'); // Warn if no countries are found
    }
  }, [allBundles, bundleId]);

  console.log('AllBundlesData', bundlesData); // Logging the whole array
  console.log('Bundles', allBundles);
  console.log('BundleEdit', bundleEdit);

//   useEffect(() => {
//     const bundles = JSON.parse(localStorage.getItem('BundlesData')) || [];
//     console.log('Bundles from local storage:', bundles); // Debugging log

//     if (bundles.length > 0) {
//         const bundle = bundles.find(c => c.id === parseInt(bundleId));
//         console.log('Selected Bundle:', bundle); // Debugging log

//         setBundleEdit(bundle)
//     } else {
//         console.warn('No bundles available in local storage.'); // Warn if no countries are found
//     }
// }, [bundleId]);

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