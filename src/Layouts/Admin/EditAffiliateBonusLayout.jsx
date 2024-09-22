import React from 'react'
import { EditAffiliateBonusPage } from '../../Pages/AllPages'
import { useNavigate } from 'react-router-dom'
import HeaderPageSection from '../../Components/HeaderPageSection'

const EditAffiliateBonusLayout = () => {
       const navigate = useNavigate()
       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name={'Edit Bonus'} />
                     <EditAffiliateBonusPage />
              </>
       )
}

export default EditAffiliateBonusLayout