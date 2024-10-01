import React from 'react'

import { StudentPage } from '../../Pages/AllPages';
import TitleHeader from '../../Components/TitleHeader';

const StudentUser = () => {
       return (
              <>
                     <div className="flex flex-col items-center  gap-y-2">
                            <TitleHeader text={"Student"} spaceBottom={3} />
                            <StudentPage />
                     </div>
              </>
       )
}

export default StudentUser