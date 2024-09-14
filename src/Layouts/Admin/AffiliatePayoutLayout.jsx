import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { AffiliatePayoutPage } from '../../Pages/AllPages'
import { Outlet } from 'react-router-dom'

const AffiliatePayoutLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center h-full gap-y-4">
                            <TitleHeader text={"Payout"} spaceBottom={3} />
                            <AffiliatePayoutPage />
                            <Outlet />
                     </div>
              </>
       )
}

export default AffiliatePayoutLayout