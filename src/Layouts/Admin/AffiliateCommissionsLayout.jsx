import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { AffiliateCommissionsPage } from '../../Pages/AllPages'

const AffiliateCommissionsLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center h-full gap-y-4">
                            <TitleHeader text={"Commissions"} spaceBottom={3} />
                            <AffiliateCommissionsPage />
                     </div>
              </>
       )
}

export default AffiliateCommissionsLayout