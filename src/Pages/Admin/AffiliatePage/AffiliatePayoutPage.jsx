import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const AffiliatePayoutPage = () => {
       const [isActivePending, setIsActivePending] = useState(true)
       const [isActiveHistory, setIsActiveHistory] = useState(false)

       const handleClickPending = () => {
              setIsActivePending(true)
              setIsActiveHistory(false)
       }
       const handleClickHistory = () => {
              setIsActiveHistory(true)
              setIsActivePending(false)

       }
       return (
              <>
                     <nav className="flex items-center w-full justify-center gap-8 mt-4">
                            <NavLink to={"pending"} className={isActivePending ? "text-2xl font-medium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-medium pb-2 text-mainColor"} onClick={handleClickPending}>Pending</NavLink>
                            <NavLink to={"history"} className={isActiveHistory ? "text-2xl font-medium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-medium pb-2 text-mainColor"} onClick={handleClickHistory}>History</NavLink>
                     </nav>
              </>
       )
}

export default AffiliatePayoutPage