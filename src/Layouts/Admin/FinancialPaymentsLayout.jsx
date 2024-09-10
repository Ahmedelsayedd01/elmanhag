import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { FinancialPaymentsPage } from '../../Pages/AllPages'

const FinancialPaymentsLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center gap-y-4">
                            <TitleHeader text={"Payments"} spaceBottom={3} />
                            <FinancialPaymentsPage />
                     </div>
              </>
              )
}

export default FinancialPaymentsLayout
