import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const LiveNavPage = () => {
       const location = useLocation();
       const navigate = useNavigate();
       const [path, setPath] = useState(location.pathname)
       const [isActiveLiveUpcoming, setIsActiveLiveUpcoming] = useState(true)
       const [isActiveLiveHistory, setIsActiveLiveHistory] = useState(false)
       // const path = location.pathname;
       console.log('locationsss', path)

       const handleClickLiveUpcoming = () => {
              setIsActiveLiveUpcoming(true)
              setIsActiveLiveHistory(false)
              navigate('upcoming')
       }
       const handleClickLiveHistory = () => {
              setIsActiveLiveHistory(true)
              setIsActiveLiveUpcoming(false)
              navigate('history')
       }
       useEffect(() => {

              if (path === '/dashboard_admin/live/upcoming' || path === '/dashboard_admin/live/upcoming/' || path === '/dashboard_admin/live') {
                     handleClickLiveUpcoming()
              }
              if (path === '/dashboard_admin/live/history') {
                     handleClickLiveHistory()
              }
       }, [])
       return (
              <>
                     <nav className="flex items-center w-full justify-center gap-8">
                            <NavLink to={""} className={isActiveLiveUpcoming ? "text-2xl font-medium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-medium pb-2 text-mainColor"} onClick={handleClickLiveUpcoming}>UpComing</NavLink>
                            <NavLink to={"history"} className={isActiveLiveHistory ? "text-2xl font-medium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-medium pb-2 text-mainColor"} onClick={handleClickLiveHistory}>History</NavLink>
                     </nav>
              </>
       )
}

export default LiveNavPage