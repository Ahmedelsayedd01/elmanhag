import React from 'react'
import { QuestionIssuesPage } from '../../Pages/AllPages'
import TitleHeader from '../../Components/TitleHeader'

const QuestionIssuesLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center gap-y-4">
                            <TitleHeader text={"Question Issues"} spaceBottom={3} />
                            <QuestionIssuesPage />
                     </div>
              </>
       )
}

export default QuestionIssuesLayout