import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { AddHomeWorkPage } from '../../Pages/AllPages';

const AddHomeWorkLayout = () => {
      const navigate = useNavigate();
      const handleGoBack = () => {
            navigate(-1, { replace: true });
      };

      return (
            <>
                  <HeaderPageSection handleClick={handleGoBack} name="Add H.W" />
                  <AddHomeWorkPage />
            </>
      )
}

export default AddHomeWorkLayout

