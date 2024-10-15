import React from 'react'
import { VideoIssuesPage } from '../../Pages/AllPages'
import TitleHeader from '../../Components/TitleHeader'

const VideoIssuesLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center gap-y-4">
                            <TitleHeader text={"Video Issues"} spaceBottom={3} />
                            <VideoIssuesPage />
                     </div>
              </>
       )
}

export default VideoIssuesLayout