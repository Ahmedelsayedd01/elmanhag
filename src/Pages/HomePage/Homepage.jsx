import React from 'react'
import { useAuth } from '../../Context/Auth'

const Homepage = () => {
       const auth = useAuth()
       return (
              <>
                     <div className="w-11/12 m-auto flex flex-row-reverse items-center justify-center">Homepage</div>
                     {auth.user && <button type='button' onClick={() => auth.logout() }>
                            logout
                     </button>}
              </>
       )
}

export default Homepage