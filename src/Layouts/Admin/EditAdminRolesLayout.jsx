import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { EditAdminRolesPage } from '../../Pages/AllPages'

const EditAdminRolesLayout = () => {
       const navigate = useNavigate()
       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name={'Edit Role'} />
                     <EditAdminRolesPage />
              </>
       )
}

export default EditAdminRolesLayout