import React from 'react'
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { ChapterSubjectPage } from '../../Pages/AllPages';

const ChapterSubjectLayout = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Chapters" />
      <ChapterSubjectPage />
    </>
  )
}

export default ChapterSubjectLayout