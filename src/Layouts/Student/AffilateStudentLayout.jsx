import React from 'react'
import { AffilateStudentPage} from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';

const AffilateStudentLayout = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <>
     <div className='directionEN'>
            <HeaderPageSection handleClick={handleGoBack} name="سوق واربح" />
     </div>
     <AffilateStudentPage/>
    </>
  )
}

export default AffilateStudentLayout