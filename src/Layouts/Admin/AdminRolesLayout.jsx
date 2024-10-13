import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { AdminRolesPage } from '../../Pages/AllPages'

const AdminRolesLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center h-full gap-y-4">
                            <TitleHeader text={"Admin Roles"} spaceBottom={3} />
                            <AdminRolesPage />
                     </div>
              </>
       )
}

export default AdminRolesLayout