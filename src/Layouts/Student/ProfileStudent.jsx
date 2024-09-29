import { ProfileStudentPage } from '../../Pages/AllPages'
import React from 'react'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const ProfileStudent = () => {

       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };

       return (
              <>
               <div className='directionEN'>
                     <HeaderPageSection handleClick={handleGoBack}/>
              </div>
              <ProfileStudentPage/>
              </>
       )
}

export default ProfileStudent