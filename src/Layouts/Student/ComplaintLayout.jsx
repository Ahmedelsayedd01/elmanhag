import React from 'react'
import { ComplaintPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';


const ComplaintLayout = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
       return (
        <>
        <div className='directionEN'>
            <HeaderPageSection handleClick={handleGoBack} name="الاقتراحات والشكاوي" size={"4xl"}/>
        </div>
        <ComplaintPage/>
        </>
    )
}

export default ComplaintLayout