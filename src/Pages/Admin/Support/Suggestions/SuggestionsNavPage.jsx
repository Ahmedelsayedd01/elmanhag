import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const SuggestionsNavPage = () => {
       const location = useLocation()
       const navigate = useNavigate()
       const [path, setPath] = useState(location.pathname)
       const [isActiveSuggestionsShow, setIsActiveSuggestionsShow] = useState(true)
       const [isActiveSuggestionsHistory, setIsActiveSuggestionsHistory] = useState(false)
       // const path = location.pathname;
       console.log('locationsss', path)

       const handleClickSuggestionsShow = () => {
              setIsActiveSuggestionsShow(true)
              setIsActiveSuggestionsHistory(false)
              navigate('')
       }
       const handleClickSuggestionsHistory = () => {
              setIsActiveSuggestionsHistory(true)
              setIsActiveSuggestionsShow(false)
              navigate('history')
       }
       useEffect(() => {

              if (path === '/dashboard_admin/support/suggestions/' || path === '/dashboard_admin/support/suggestions/' || path === '/dashboard_admin/support/suggestions') {
                     handleClickSuggestionsShow()
              }
              if (path === '/dashboard_admin/support/suggestions/history') {
                     handleClickSuggestionsHistory()
              }
       }, [])
       return (
              <>
                     <nav className="flex items-center w-full justify-center gap-8">
                            <NavLink to={""} className={isActiveSuggestionsShow ? "text-2xl font-medium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-medium pb-2 text-mainColor"} onClick={handleClickSuggestionsShow}>Suggestions</NavLink>
                            <NavLink to={"history"} className={isActiveSuggestionsHistory ? "text-2xl font-medium border-b-4 border-mainColor pb-2 text-mainColor" : "text-2xl font-medium pb-2 text-mainColor"} onClick={handleClickSuggestionsHistory}>History</NavLink>
                     </nav>
              </>
       )
}

export default SuggestionsNavPage