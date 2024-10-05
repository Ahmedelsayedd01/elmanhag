import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { EditAffiliatePaymentMethodPage } from '../../Pages/AllPages'

const EditAffiliatePaymentMethodLayout = () => {
       const navigate = useNavigate()
       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name={'Edit Payment Method'} />
                     <EditAffiliatePaymentMethodPage />
              </>
       )
}

export default EditAffiliatePaymentMethodLayout