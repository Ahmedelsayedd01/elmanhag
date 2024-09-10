import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { EditAffiliatePaymentMethodPage } from '../../Pages/AllPages'

const EditAffiliatePaymentMethodLayout = () => {
       const { paymentMethodId } = useParams()
       const navigate = useNavigate()
       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name={'Edit Payment Method'} />
                     <EditAffiliatePaymentMethodPage number={paymentMethodId} />
              </>
       )
}

export default EditAffiliatePaymentMethodLayout