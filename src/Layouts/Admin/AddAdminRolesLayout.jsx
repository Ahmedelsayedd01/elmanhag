import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { AddAdminRolesPage } from '../../Pages/AllPages'

const AddAdminRolesLayout = () => {
       const navigate = useNavigate()
       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name={'Add Role'} />
                     <AddAdminRolesPage />
              </>
       )
}

export default AddAdminRolesLayout