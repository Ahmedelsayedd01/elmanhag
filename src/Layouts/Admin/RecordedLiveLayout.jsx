import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { RecordedLivePage } from '../../Pages/AllPages'

const RecordedLiveLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center">
                            <TitleHeader text={"Recorded Live"} spaceBottom={6} />
                            <RecordedLivePage />
                     </div>
              </>
       )
}

export default RecordedLiveLayout