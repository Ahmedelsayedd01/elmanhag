import React from 'react'
import { QuestionsBankPage } from '../../Pages/AllPages'
import TitleHeader from '../../Components/TitleHeader'

const QuestionsBankLayout = () => {
  return (
    <>
      <div className="flex flex-col items-center h-full gap-y-4">
        <TitleHeader text={"Questions Bank"} spaceBottom={3} />
        <QuestionsBankPage />
      </div>
    </>
  )
}

export default QuestionsBankLayout