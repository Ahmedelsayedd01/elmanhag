import React from 'react'
import { EditProfileStudentPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const EditProfileStudentLayout = () => {
       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };

       return (
              <>
                     <div className='directionEN'>
                            <HeaderPageSection handleClick={handleGoBack}/>
                     </div>
                     <EditProfileStudentPage/>
              </>
       )
}

export default EditProfileStudentLayout