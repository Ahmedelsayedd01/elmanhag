import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const AffiliatePayoutPage = () => {
       const location = useLocation()
       const navigate = useNavigate()
       const [path, setPath] = useState(location.pathname)
       const [isActivePending, setIsActivePending] = useState(true)
       const [isActiveHistory, setIsActiveHistory] = useState(false)
       // const path = location.pathname;
       console.log('locationsss', path)

       const handleClickPending = () => {
              setIsActivePending(true)
              setIsActiveHistory(false)
              navigate('pending')
       }
       const handleClickHistory = () => {
              setIsActiveHistory(true)
              setIsActivePending(false)
              navigate('history')
       }
       useEffect(() => {

              if (path === '/dashboard_admin/affiliate_payout/pending' || path === '/dashboard_admin/affiliate_payout/' || path === '/dashboard_admin/affiliate_payout') {
                     handleClickPending()
              }
              if (path === '/dashboard_admin/affiliate_payout/history') {
                     handleClickHistory()
              }
       }, [])
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