import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { DiscountPage } from '../../Pages/AllPages'

const DiscountLayout = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-y-4">
            <TitleHeader text={"Discount"} spaceBottom={3} />
            <DiscountPage />
      </div>
    </>
  )
}

export default DiscountLayout

