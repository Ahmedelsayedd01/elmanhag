import React, { useEffect, useRef, useState } from 'react';
import { CurriculaPage } from '../../Pages/AllPages'
import { useParams } from 'react-router-dom'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { useNavigate } from 'react-router-dom';


const Curricula = () => {
  return (
    <>
      <CurriculaPage />
    </>
  )
}

export default Curricula