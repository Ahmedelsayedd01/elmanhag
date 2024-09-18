import React from 'react'
import {CurriculaIcon} from '../../../Components/Icons/StudentIcons/CurriculaIcon'
const StudentHomePage = () => {
       return (
              <div>

              <div className={`w-64 min-h-36 overflow-hidden p-3 flex flex-col items-center justify-start bg-mainColor rounded-xl`}>
                     <span className='w-full text-center text-xl text-secoundColor font-medium'>
                            <CurriculaIcon/>
                     </span>
                     <span className='w-full mt-6 text-center text-5xl text-secoundColor font-medium'>
                            count
                     </span>
              </div>
                     StudentHomePage
              </div>
       )
}

export default StudentHomePage