import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { AffiliateBonusPage } from '../../Pages/AllPages'

const AffiliateBonusLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center h-full gap-y-4">
                            <TitleHeader text={"Bonus"} spaceBottom={3} />
                            <AffiliateBonusPage />
                     </div>
              </>
       )
}

export default AffiliateBonusLayout