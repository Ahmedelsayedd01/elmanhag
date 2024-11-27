import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { RevisionPage } from '../../Pages/AllPages'

const RevisionsLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center gap-y-4">
                            <TitleHeader text={"Revisions"} spaceBottom={3} />
                            <RevisionPage />
                     </div>
              </>
       )
}

export default RevisionsLayout

