import React from 'react'
import { TeachersPage } from '../../Pages/AllPages'
import TitleHeader from '../../Components/TitleHeader'

const TeacherUser = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-y-2">
        <TitleHeader text={"Teachers"} spaceBottom={0} />
        <TeachersPage />
      </div>
    </>
  )
}

export default TeacherUser