import React from 'react'
import { BundlesPage } from '../../Pages/AllPages'
import TitleHeader from '../../Components/TitleHeader'

const BundlesEducationLayout = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-y-4">
        <TitleHeader text={"Bundles"} spaceBottom={3} />
        <BundlesPage />
      </div>
    </>
  )
}

export default BundlesEducationLayout