import React, { createContext, useEffect, useState } from 'react'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate, useParams } from 'react-router-dom';
import { EditDiscountPage } from '../../Pages/AllPages'
export const DiscountEditContext = createContext()

const EditDiscountLayout = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const [discountData, setDiscountData] = useState([])
  const [allDiscounts, setAllDiscounts] = useState([])
  const [discountEdit,setDiscountEdit] = useState(null)
  const { discountId } = useParams();

  useEffect(() => {
    const fetchDiscountData = () => {
      const storedDiscountData = JSON.parse(localStorage.getItem('AllDiscountData')) || [];
      console.log('Discount Data from local storage:', storedDiscountData); // Debugging log
      if (storedDiscountData) {
        setAllDiscounts(storedDiscountData.discounts);
        setDiscountData(storedDiscountData); // Corrected line
      }
    };
    fetchDiscountData(); // Renamed function to avoid shadowing
  }, []);

  useEffect(() => {
    if (allDiscounts.length > 0 && discountId) {
              const filteredDiscount = allDiscounts.find(discount => discount.id === parseInt(discountId));
              console.log('Selected Discount:', filteredDiscount); // Debugging log   
              setDiscountEdit(filteredDiscount)
          } else {
              console.warn('No Discount available in local storage.'); // Warn if no countries are found
          }
    }, [allDiscounts, discountId]);
  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Edit Discount" />
      <DiscountEditContext.Provider value={discountEdit}>
        <EditDiscountPage />
      </DiscountEditContext.Provider>
    </>
  )
}

export default EditDiscountLayout









 