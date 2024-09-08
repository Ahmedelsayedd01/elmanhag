import React from 'react'
import { AffiliateUserPage } from '../../Pages/AllPages'
import TitleHeader from '../../Components/TitleHeader'

const AffiliateUserLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center h-full gap-y-4">
                            <TitleHeader text={"User"} spaceBottom={3} />
                            <AffiliateUserPage />
                     </div>
              </>
       )
}

export default AffiliateUserLayout