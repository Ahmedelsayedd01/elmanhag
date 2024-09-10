import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { PendingPaymentsPage } from '../../Pages/AllPages'

const FinancialPendingPaymentsLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center gap-y-4">
                            <TitleHeader text={"Pending Payments"} spaceBottom={3} />
                            <PendingPaymentsPage/>
                     </div>
              </>
       )
}

export default FinancialPendingPaymentsLayout