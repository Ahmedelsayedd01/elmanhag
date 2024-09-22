import React from 'react'
import { AddAffiliateBonusPage } from '../../Pages/AllPages'
import { useNavigate } from 'react-router-dom'
import HeaderPageSection from '../../Components/HeaderPageSection'

const AddAffiliateBonusLayout = () => {
       const navigate = useNavigate()
       const handleGoBack = () => {
              navigate(-1, { replace: true })
       }
       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name={'Add Bonus'} />
                     <AddAffiliateBonusPage />
              </>
       )
}

export default AddAffiliateBonusLayout