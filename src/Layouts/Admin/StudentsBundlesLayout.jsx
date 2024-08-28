import React from 'react'
import { StudentsBundlesPage } from '../../Pages/AllPages'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate, useParams } from 'react-router-dom'

const StudentsBundlesLayout = () => {

  const navigate = useNavigate();

  const { bundleId } = useParams();

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Students" />
      <StudentsBundlesPage />
    </>
  )
}

export default StudentsBundlesLayout