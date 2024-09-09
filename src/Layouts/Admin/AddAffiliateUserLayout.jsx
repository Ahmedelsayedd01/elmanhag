import React from 'react'
import { AddAffiliateUserPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom'

const AddAffiliateUserLayout = () => {
       const navigate = useNavigate()
       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name={'Add User'} />
                     <AddAffiliateUserPage />
              </>
       )
}

export default AddAffiliateUserLayout