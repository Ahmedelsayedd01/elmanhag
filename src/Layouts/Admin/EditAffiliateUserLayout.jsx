import React from 'react'
import { EditAffiliateUserPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate, useParams } from 'react-router-dom'

const EditAffiliateUserLayout = () => {
       const { affiliateId } = useParams()
       const navigate = useNavigate()
       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name={'Edit User'} />
                     <EditAffiliateUserPage number={affiliateId} />
              </>
       )
}

export default EditAffiliateUserLayout