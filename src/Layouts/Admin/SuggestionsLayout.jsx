import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { Outlet } from 'react-router-dom'
import { SuggestionsNavPage } from '../../Pages/AllPages'

const SuggestionsLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center h-full gap-y-4">
                            <TitleHeader text={"Suggestions"} />
                            <SuggestionsNavPage />
                            <Outlet />
                     </div>
              </>
       )
}

export default SuggestionsLayout