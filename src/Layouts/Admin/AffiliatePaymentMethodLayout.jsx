import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { AffiliatePaymentMethodPage } from '../../Pages/AllPages'

const AffiliatePaymentMethodLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center h-full gap-y-4">
                            <TitleHeader text={"Payment Method"} spaceBottom={3} />
                            <AffiliatePaymentMethodPage />
                     </div>
              </>
       )
}

export default AffiliatePaymentMethodLayout