import React, { createContext, useEffect, useState } from 'react'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { EditPromoCodePage } from '../../Pages/AllPages'
import { useNavigate, useParams } from 'react-router-dom';
export const PromoCodeEditContext = createContext()

const EditPromoCodeLayout = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  const [promoCodeData, setPromoCodeData] = useState([])
  const [allPromoCode, setAllPromoCode] = useState([])
  const [promoCodeEdit,setPromoCodeEdit] = useState(null)
  const { promoCodeId } = useParams();

  useEffect(() => {
    const fetchPromoCodeData = () => {
      const storedPromoCodeData = JSON.parse(localStorage.getItem('AllPromoCodeData')) || [];
      console.log('PromoCode Data from local storage:', storedPromoCodeData); // Debugging log
      if (storedPromoCodeData) {
        setAllPromoCode(storedPromoCodeData.promo_codes);
        setPromoCodeData(storedPromoCodeData); // Corrected line
      }
    };
    fetchPromoCodeData(); // Renamed function to avoid shadowing
  }, []);

  useEffect(() => {
    if (allPromoCode.length > 0 && promoCodeId) {
              const filteredPromoCode = allPromoCode.find(promo => promo.id === parseInt(promoCodeId));
              console.log('Selected PromoCode:', filteredPromoCode); // Debugging log   
              setPromoCodeEdit(filteredPromoCode)
          } else {
              console.warn('No PromoCode available in local storage.'); // Warn if no countries are found
          }
    }, [allPromoCode, promoCodeId]);

  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Edit Promo Code" />
      <PromoCodeEditContext.Provider value={promoCodeEdit}>
        <EditPromoCodePage />
      </PromoCodeEditContext.Provider>
    </>
  )
}

export default EditPromoCodeLayout







 