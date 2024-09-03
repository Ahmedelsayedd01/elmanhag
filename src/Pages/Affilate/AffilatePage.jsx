import React from 'react'
import { useAuth } from '../../Context/Auth'
import { Button } from '../../Components/Button';

const AffilatePage = () => {
       const auth = useAuth();
       const handleLogOut = () => {
              auth.logout()
       }
       return (
              <>
                     <div>AffilatePage</div>
                     <Button handleClick={handleLogOut} Text={'LogOut'} />
              </>
       )
}

export default AffilatePage