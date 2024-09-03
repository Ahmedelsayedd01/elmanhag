import React from 'react'
import { useAuth } from '../../Context/Auth'
import { Button } from '../../Components/Button';

const AffiliatePage = () => {
       const auth = useAuth();
       const handleLogOut = () => {
              auth.logout()
       }
       return (
              <>
                     <div>AffiliatePage</div>
                     <Button handleClick={handleLogOut} Text={'LogOut'} />
              </>
       )
}

export default AffiliatePage