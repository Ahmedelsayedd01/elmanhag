import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { AddAffiliatePaymentMethodPage } from '../../Pages/AllPages'

const AddAffiliatePaymentMethodLayout = () => {
       const navigate = useNavigate()
       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name={'Add Payment Method'} />
                     <AddAffiliatePaymentMethodPage />
              </>
       )
}

export default AddAffiliatePaymentMethodLayout