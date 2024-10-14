import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { AdminsPage } from '../../Pages/AllPages'

const AdminUserLayout = () => {
  return (
    <>
      <div className="flex flex-col items-center h-full gap-y-4">
        <TitleHeader text={"Admins"} spaceBottom={3} />
        <AdminsPage />
      </div>
    </>
  )
}

export default AdminUserLayout