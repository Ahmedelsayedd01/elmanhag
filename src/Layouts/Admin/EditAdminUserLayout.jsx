import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { EditAdminPage } from '../../Pages/AllPages'

const EditAdminUserLayout = () => {
       const navigate = useNavigate()
       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name={'Edit Admin'} />
                     <EditAdminPage />
              </>
       )
}

export default EditAdminUserLayout