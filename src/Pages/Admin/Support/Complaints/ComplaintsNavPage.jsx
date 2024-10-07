import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const ComplaintsNavPage = () => {
       const location = useLocation();
       const navigate = useNavigate();
       const [path, setPath] = useState(location.pathname)
       const [isActiveComplaintsShow, setIsActiveComplaintsShow] = useState(true)
       const [isActiveComplaintsHistory, setIsActiveComplaintsHistory] = useState(false)
       // const path = location.pathname;
       console.log('locationsss', path)

       const handleClickComplaintsShow = () => {
              setIsActiveComplaintsShow(true)
              setIsActiveComplaintsHistory(false)
              navigate('')
       }
       const handleClickComplaintsHistory = () => {
              setIsActiveComplaintsHistory(true)
              setIsActiveComplaintsShow(false)
              navigate('history')
       }
       useEffect(() => {

              if (path === '/dashboard_admin/support/complaints' || path === '/dashboard_admin/support/complaints/' || path === '/dashboard_admin/support') {
                     handleClickComplaintsShow()
              }
              if (path === '/dashboard_admin/support/complaints/history') {
                     handleClickComplaintsHistory()
              }
       }, [])
       return (
              <>
                     <nav className="flex items-center w-full justify-center gap-8">
                            <NavLink to={""} className={isActiveComplaintsShow ? "text-2xl font-medium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-medium pb-2 text-mainColor"} onClick={handleClickComplaintsShow}>Complaints</NavLink>
                            <NavLink to={"history"} className={isActiveComplaintsHistory ? "text-2xl font-medium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-medium pb-2 text-mainColor"} onClick={handleClickComplaintsHistory}>History</NavLink>
                     </nav>
              </>
       )
}

export default ComplaintsNavPage